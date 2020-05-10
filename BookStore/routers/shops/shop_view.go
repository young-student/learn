package shops

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func ShopView(c *gin.Context) {
	c.HTML(http.StatusOK, "shopcart.html", nil)
}
