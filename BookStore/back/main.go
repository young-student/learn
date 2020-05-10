package main

import (
	"BookStore/back/web/controllers"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()
	//加载静态资源
	r.Static("/assets", "./back/web/assets")
	//加载这个目录下所有的html模板
	r.LoadHTMLGlob("./web/views/**/*")
	r.GET("/manager", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})
	r.GET("/login", func(c *gin.Context) {
		c.HTML(http.StatusOK, "login.html", nil)
	})
	startRouter(r)
	r.Run(":8989")
}
func startRouter(r *gin.Engine) {
	bookController := &controllers.BookController{}
	bookController.BookControllerRouters(r)

	orderController := &controllers.OrderController{}
	orderController.OrderControllerRouter(r)

	orderItemController := &controllers.OrderItemController{}
	orderItemController.OrderItemControllerRouter(r)

	userController := controllers.UserController{}
	userController.UserControllerRouter(r)

	adminController := controllers.AdminController{}
	adminController.AdminControllerRouter(r)
}
