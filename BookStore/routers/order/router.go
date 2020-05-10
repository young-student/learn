package order

import "github.com/gin-gonic/gin"

func OrderRouter(r *gin.Engine) *gin.Engine {
	orderRouter := r.Group("/v1/order")
	{
		orderRouter.POST("/CreateOrder", CreateOrder)
		orderRouter.GET("/", MyOrderView)
		orderRouter.POST("/MyOrder", MyOrder)
		orderRouter.POST("/MyOrderInfo", MyOrderInfo)
	}
	return r
}
