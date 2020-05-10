package book

import "github.com/gin-gonic/gin"

func BookRouter(r *gin.Engine) *gin.Engine {
	bookRouter := r.Group("/v1/book")
	{
		bookRouter.POST("/ShowBookShop", GetAllPageBook)
	}
	return r
}
