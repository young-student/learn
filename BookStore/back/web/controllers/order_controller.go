package controllers

import (
	"BookStore/common"
	"BookStore/repositories"
	"BookStore/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type OrderController struct {

}
func (o *OrderController)OrderControllerRouter(router *gin.Engine){
	router.GET("/manager/order",o.Order)
	router.POST("/manager/order/info",o.OrderInfo)
}
func newOrderController() services.OrderServiceInterface{
	db, err := common.NewMySQL()
	if err != nil {
		fmt.Println(err)
	}
	orderRepository := repositories.NewOrderManagerRepository("orders",db)
	return services.NewOrderManagerService(orderRepository)
}
func (o *OrderController)Order(c *gin.Context){
	orderController := newOrderController()
	orders, err := orderController.GetAllOrder()
	if err != nil {
		fmt.Println(err)
		c.HTML(http.StatusOK,"error.html",gin.H{"Message":err})
		return
	}
	//c.HTML(http.StatusOK,"order.html",gin.H{"orders":orders})
	c.JSON(200,orders)
}
type GetOrderID struct {
	ID int `json:"id"`
}
func (o *OrderController)OrderInfo(c *gin.Context){
	var req GetOrderID
	err := c.BindJSON(&req)
	if err != nil {
		//c.JSON(400,err)
		fmt.Println(err)
		return
	}
	orderController := newOrderController()
	order, err := orderController.GetOrder(req.ID)
	if err != nil {
		fmt.Println(err)
	}
	//c.JSON(200,order)
	fmt.Println(order)
}
