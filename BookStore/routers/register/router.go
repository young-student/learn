package register

import "github.com/gin-gonic/gin"

func RegisterRouter(r *gin.Engine) *gin.Engine {
	registerRouter := r.Group("/v1/register")
	{
		registerRouter.POST("/user", Register)
	}
	return r
}
