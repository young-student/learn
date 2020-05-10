package routers

import (
	"BookStore/routers/book"
	"BookStore/routers/login"
	"BookStore/routers/order"
	"BookStore/routers/register"
	"BookStore/routers/shops"
	"github.com/gin-gonic/gin"
)

func InitRouter(r *gin.Engine) *gin.Engine{
	login.LoginRouter(r)
	register.RegisterRouter(r)
	book.BookRouter(r)
	shops.ShopRouter(r)
	order.OrderRouter(r)
	return r
}