package shops

import (
	"BookStore/model"
	"BookStore/utils"
	"fmt"
	"github.com/gin-gonic/gin"
)

type AddBookToCartReq struct {
	BookID   int    `json:"book_id"`
	UserName string `json:"user_name"`
	//前面两个字段用于获取前端传过来的数据
	//后面的字段用于后台发送给前端显示数据
	BookName string `json:"book_name"`
}

func AddBookToCart(c *gin.Context) {
	var req AddBookToCartReq
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println("绑定JSON解析失败", err)
		return
	}
	//根据图书id获取到该图书的信息
	var book model.Book
	resBook, err := book.FindBookByID(req.BookID)
	if err != nil {
		fmt.Println("根据id获取图书失败", err)
		return
	}
	//根据用户名获取用户信息
	var user model.User
	resUser, err := user.AddUser(req.UserName)
	if err != nil {
		fmt.Println("根据用户名获取用户信息失败", err)
		return
	}
	//声明一个切片
	var shops []model.Shop
	//获取数据库链接
	db := model.Db
	var cart model.Cart
	if resUser.CartID != "0" {
		//当前用户以及有购物车
		//判断当前用户是否拥有该图书，有就count+1 没有就创建并保存在数据库当中
		var shop model.Shop
		resShop, err := shop.ShowShopInfoByBookIDAndCartID(req.BookID, resUser.CartID)
		if err == nil {
			//说明购物车中有该图书，只需要将该图书对应中的购物项中的数量count+1即可
			updateShop := &model.Shop{
				ShopCount:  resShop.ShopCount + 1,
				ShopAmount: float32(resShop.ShopCount+1) * resShop.ShopPrice,
			}
			err = db.Model(&model.Shop{}).Where("book_id = ? and cart_id = ?", req.BookID, resUser.CartID).Updates(updateShop).Error
			if err != nil {
				fmt.Println("count+1更新失败", err)
				return
			}
		} else {
			//说明购物车中还没有该图书，此时需要创建一个购物项并添加到数据库中
			shop := model.Shop{
				BookID:     resBook.ID,
				ImgPath:    resBook.Img_path,
				ShopName:   resBook.Title,
				ShopCount:  1,
				ShopPrice:  resBook.Price,
				ShopAmount: resBook.Price * 1,
				CartID:     resUser.CartID,
			}
			err = db.Create(&shop).Error
			if err != nil {
				fmt.Println("创建购物项失败", err)
				return
			}
			//将购物项添加到切片中
			shops = append(shops, shop)
		}
		//不管之前购物车中是否有当前对应的图书 ,都需要更新购物车中的图书总数量和总金额
		//获取对应cart_id的所有商品
		resShops1, err := shop.ShowShopsInfoByCartID(resUser.CartID)
		if err != nil {
			fmt.Println("获取对应的cart_id的所有商品失败", err)
			return
		}
		err = cart.UpdateCart(resShops1, resUser.CartID)
		if err != nil {
			fmt.Println("更新购物车失败", err)
			return
		}
		c.JSON(200, "您已将"+resBook.Title+"添加到购物车中")
	} else {
		//创建当前用户的cart_id,即更新users表所对应的用户
		//生成购物车id
		cartID := utils.CreateUUID()
		updateUser := &model.User{
			CartID: cartID,
		}
		err = db.Model(&model.User{}).Where("id = ?", resUser.ID).Updates(updateUser).Error
		if err != nil {
			fmt.Println("更新用户cart_id失败", err)
			return
		}
		//当前用户还没有购物车，需要创建一个购物车并添加到数据库中
		//1、创建购物车
		cart := model.Cart{
			CartID: cartID,
			UserID: resUser.ID,
		}
		err := db.Create(&cart).Error
		if err != nil {
			fmt.Println("创建购物车失败", err)
			return
		}
		//2、创建购物车中的购物项
		shop := model.Shop{
			BookID:     resBook.ID,
			ShopName:   resBook.Title,
			ImgPath:    resBook.Img_path,
			ShopCount:  1,
			ShopPrice:  resBook.Price,
			ShopAmount: resBook.Price * 1,
			CartID:     cartID,
		}
		err = db.Create(&shop).Error
		if err != nil {
			fmt.Println("创建购物项失败", err)
			return
		}
		//将购物项添加到切片中
		shops = append(shops, shop)
		//更新购物车
		err = cart.UpdateCart(shops, cartID)
		if err != nil {
			fmt.Println("更新购物车失败", err)
			return
		}
		c.JSON(200, "您已将"+resBook.Title+"添加到购物车中")
	}
}

type ShowUserCartReq struct {
	UserName    string       `json:"user_name"`
	Items       []model.Shop `json:"items"`
	TotalCount  int          `json:"total_count"`
	TotalAmount float32      `json:"total_amount"`
}

func ShowUserCart(c *gin.Context) {
	var req ShowUserCartReq
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println("绑定JSON解析失败", err)
		return
	}
	//根据用户名获取用户信息
	var user model.User
	resUser, err := user.AddUser(req.UserName)
	if err != nil {
		fmt.Println("根据用户名获取用户信息失败", err)
		return
	}
	//先判断当前用户是否已经创建cart_id
	if resUser.CartID == "0" {
		c.JSON(200, "nothing")
	} else {
		//获取用户的cart_id,查询出该用户购买的所有商品
		var shop model.Shop
		shops, err := shop.ShowShopsInfoByCartID(resUser.CartID)
		if err != nil {
			//该用户的购物车空空如也
			fmt.Println("获取所有商品失败", err)
			return
		}
		//在查询出该用户购物车中商品的总数量和总金额
		var cart model.Cart
		resCart, err := cart.ShowShoppingCartInfoByCartID(resUser.CartID)
		if err != nil {
			fmt.Println("获取购物车信息失败", err)
			return
		}
		data := &ShowUserCartReq{
			Items:       shops,
			TotalCount:  resCart.TotalCount,
			TotalAmount: resCart.TotalAmount,
		}
		c.JSON(200, data)
	}
}

type DeleteShopCartReq struct {
	UserName string `json:"user_name"`
}

func DeleteShopCart(c *gin.Context) {
	var req DeleteShopCartReq
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println("绑定JSON解析失败", err)
		return
	}
	//根据用户名获取cart_id
	var user model.User
	resUser, err := user.AddUser(req.UserName)
	if err != nil {
		fmt.Println("根据用户名获取用户信息失败", err)
		return
	}
	//删除该用户的cart_id，即更新将cart_id设为 "0"
	updateUser := &model.User{
		CartID: "0",
	}
	db := model.Db
	err = db.Model(&model.User{}).Where("cart_id = ?", resUser.CartID).Updates(updateUser).Error
	if err != nil {
		fmt.Println("更新用户信息失败", err)
		return
	}
	var shop model.Shop
	err = shop.DeleteShopsByCartID(resUser.CartID)
	if err != nil {
		fmt.Println("根据cart_id删除所有商品失败", err)
		return
	}
	var cart model.Cart
	err = cart.DeleteCartByCartID(resUser.CartID)
	if err != nil {
		fmt.Println("根据cart_id删除购物车失败", err)
		return
	}
	c.JSON(200, "已清空购物车")
}

type DeleteShopsReq struct {
	ShopID   int    `json:"shop_id"`
	UserName string `json:"user_name"`
}

func DeleteShop(c *gin.Context) {
	var req DeleteShopsReq
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	//根据用户名获取cart_id
	var user model.User
	resUser, err := user.AddUser(req.UserName)
	if err != nil {
		fmt.Println("根据用户名获取用户信息失败", err)
		return
	}
	var shop model.Shop
	err = shop.DeleteShopsByCartIDAndShopID(resUser.CartID, req.ShopID)
	if err != nil {
		fmt.Println(err)
		return
	}
	//更新购物车里面的总数量和总金额--->ShowUserCart
	shops, err := shop.ShowShopsInfoByCartID(resUser.CartID)
	if err != nil {
		fmt.Println("获取所有商品信息失败", err)
		return
	}
	var cart model.Cart
	if len(shops) == 0 {
		//删除该用户的cart_id，即更新将cart_id设为 "0"
		updateUser := &model.User{
			CartID: "0",
		}
		db := model.Db
		err = db.Model(&model.User{}).Where("cart_id = ?", resUser.CartID).Updates(updateUser).Error
		if err != nil {
			fmt.Println("更新用户信息失败", err)
			return
		}
		//清空购物车
		err = cart.DeleteCartByCartID(resUser.CartID)
		if err != nil {
			fmt.Println("根据cart_id删除购物车失败", err)
			return
		}
		c.JSON(200, "已清空购物车")
	} else {
		err = cart.UpdateCart(shops, resUser.CartID)
		if err != nil {
			fmt.Println("更新购物车信息失败", err)
			return
		}
		c.JSON(200, "success")
	}
}
