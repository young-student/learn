package shops

import "github.com/gin-gonic/gin"

func ShopRouter(r *gin.Engine) *gin.Engine {
	shopRouter := r.Group("/v1/shop")
	{
		shopRouter.GET("/cart", ShopView)
		shopRouter.POST("/AddBookToCart", AddBookToCart)
		shopRouter.POST("/ShowUserCart", ShowUserCart)
		shopRouter.POST("/DeleteCart", DeleteShopCart)
		shopRouter.POST("/DeleteShop", DeleteShop)
	}
	return r
}
