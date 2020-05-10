package controllers

import (
	"BookStore/common"
	"BookStore/repositories"
	"BookStore/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type OrderItemController struct {

}
func (o *OrderItemController)OrderItemControllerRouter(router *gin.Engine){
	router.GET("/manager/orderItem",o.OrderItem)
	router.POST("/manager/orderItem/info",o.OrderItemInfo)
}
func newOrderItemController() services.OrderItemServiceInterface{
	db, err := common.NewMySQL()
	if err != nil {
		fmt.Println(err)
	}
	repository := repositories.NewOrderItemManagerRepository("orderitems", db)
	return  services.NewOrderItemManagerService(repository)
}
func (o *OrderItemController)OrderItem(c *gin.Context){
	orderItemController := newOrderItemController()
	orderItems, err := orderItemController.GetAllOrderItem()
	if err != nil {
		fmt.Println(err)
		c.HTML(http.StatusOK,"error.html",gin.H{"Message":err})
		return
	}
	//c.JSON(200,orders)
	fmt.Println(orderItems)
}
type getOrderId struct {
	OrderID string `json:"order_id"`
}
func (o *OrderItemController)OrderItemInfo(c *gin.Context){
	var req getOrderId
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println(err)
		return
	}
	orderItemController := newOrderItemController()
	order, err := orderItemController.GetOrder(req.OrderID)
	if err != nil {
		fmt.Println(err)
	}
	c.JSON(200,order)
	//fmt.Println(order)
}
