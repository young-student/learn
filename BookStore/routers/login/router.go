package login

import "github.com/gin-gonic/gin"

func LoginRouter(r *gin.Engine) *gin.Engine {
	loginRouter := r.Group("/v1/login")
	{
		loginRouter.POST("/user", Login)
	}
	return r
}
