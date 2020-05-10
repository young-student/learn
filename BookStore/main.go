package main

import (
	"BookStore/routers"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	startService()
}
func startService(){
	r := gin.New()
	r.Static("/static","./static")
	r.LoadHTMLGlob("views/page/**")
	r.GET("/index", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})
	routers.InitRouter(r)
	r.Run(":8080")
}
