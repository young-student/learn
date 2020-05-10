package order

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func MyOrderView(c *gin.Context) {
	c.HTML(http.StatusOK, "myorder.html", nil)
}
