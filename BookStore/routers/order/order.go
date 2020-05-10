package order

import (
	"BookStore/model"
	"BookStore/utils"
	"fmt"
	"github.com/gin-gonic/gin"
	"time"
)

type CreateOrderReq struct {
	UserName string `json:"user_name"`
}

func CreateOrder(c *gin.Context) {
	var req CreateOrderReq
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	//根据用户名获取cart_id
	var user model.User
	resUser, err := user.AddUser(req.UserName)
	if err != nil {
		fmt.Println("获取用户cart_id失败", err)
		return
	}
	//根据cart_id获取购物车信息
	var cart model.Cart
	resCart, err := cart.ShowShoppingCartInfoByCartID(resUser.CartID)
	if err != nil {
		fmt.Println("获取购物车信息失败", err)
		return
	}
	//创建订单
	//获取UUID
	uuid := utils.CreateUUID()
	//时间格式化
	timeStr := time.Now().Format("2006-01-02 15:04:05")
	createOrder := &model.Order{
		OrderID:     uuid,
		CreateTime:  timeStr,
		TotalCount:  resCart.TotalCount,
		TotalAmount: resCart.TotalAmount,
		Status:      0,
		UserID:      resCart.UserID,
	}
	db := model.Db
	err = db.Create(createOrder).Error
	if err != nil {
		fmt.Println("创建订单失败", err)
		return
	}
	//创建订单项
	//1、根据cart_id去获取book_id
	var shop model.Shop
	shops, err := shop.ShowShopsInfoByCartID(resCart.CartID)
	if err != nil {
		fmt.Println("获取所有商品失败", err)
		return
	}
	//2、遍历获取book_id
	for _, v := range shops {
		//3、根据book_id获取图书信息
		var book model.Book
		resBook, err := book.FindBookByID(v.BookID)
		if err != nil {
			fmt.Println("获取图书信息失败", err)
			return
		}
		//4、创建订单项
		createOrderItem := &model.OrderItem{
			Count:   v.ShopCount,
			Amount:  v.ShopAmount,
			Title:   v.ShopName,
			Author:  resBook.Author,
			Price:   v.ShopPrice,
			ImgPath: resBook.Img_path,
			OrderId: uuid,
		}
		err = db.Create(createOrderItem).Error
		if err != nil {
			fmt.Println("创建购物项失败", err)
			return
		}
		//更新图书的库存和销售量
		//这里还需要考虑 库存为0 的情况
		updateBook := &model.Book{
			Sales: resBook.Sales + v.ShopCount,
			Stock: resBook.Stock - v.ShopCount,
		}
		err = db.Model(&model.Book{}).Where("id = ?", v.BookID).Updates(updateBook).Error
		if err != nil {
			fmt.Println("更新图书的库存和销量失败", err)
			return
		}
	}
	//清空购物车
	err = cart.DeleteCartByCartID(resUser.CartID)
	if err != nil {
		fmt.Println("情况购物车失败", err)
		return
	}
	//清空购物项
	err = shop.DeleteShopsByCartID(resCart.CartID)
	if err != nil {
		fmt.Println("情况购物项失败", err)
		return
	}
	//恢复users表中的cart_id 为"0"
	updateUser := &model.User{
		CartID: "0",
	}
	err = db.Model(&model.User{}).Where("id = ?", resUser.ID).Updates(updateUser).Error
	if err != nil {
		fmt.Println("更新用户的cart_id失败", err)
		return
	}
	//显示新的页面
	c.JSON(200, "success")
}

//我的订单
type MyOrdersReq struct {
	UserName string        `json:"user_name"`
	Items    []model.Order `json:"items"`
}

func MyOrder(c *gin.Context) {
	var req MyOrdersReq
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println("解析JSON失败", err)
		return
	}
	//通过用户名获取该用户的id
	var user model.User
	resUser, err := user.AddUser(req.UserName)
	if err != nil {
		fmt.Println("获取用户信息失败", err)
		return
	}
	//根据用户的id获取该用户的订单
	var order model.Order
	resMyOrder, err := order.MyOrder(resUser.ID)
	if err != nil {
		fmt.Println("获取我的订单失败", err)
		return
	}
	data := &MyOrdersReq{
		Items: resMyOrder,
	}
	c.JSON(200, data)
}

//我的订单详情
type MyOrdersInfoReq struct {
	OrderID string            `json:"order_id"`
	Items   []model.OrderItem `json:"items"`
}

func MyOrderInfo(c *gin.Context) {
	var req MyOrdersInfoReq
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println("解析JSON失败", err)
		return
	}
	//通过订单号查看订单详情
	var items model.OrderItem
	orderItems, err := items.OrderItemsInfoByOrderID(req.OrderID)
	if err != nil {
		fmt.Println("获取订单详情失败", err)
		return
	}
	data := &MyOrdersInfoReq{
		Items: orderItems,
	}
	c.JSON(200, data)
}
