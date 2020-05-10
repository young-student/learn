package login

import (
	"BookStore/model"
	"fmt"
	"github.com/gin-gonic/gin"
)

type LoginReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Login(c *gin.Context) {
	var req LoginReq
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	var user model.User
	res, err := user.CheckUserNameAndPassword(req.Username, req.Password)
	if err != nil {
		fmt.Println(err)
		c.JSON(200, "用户名或密码错误")
		return
	}
	c.JSON(200, res.Username)
}
