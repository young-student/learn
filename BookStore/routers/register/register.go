package register

import (
	"BookStore/model"
	"fmt"
	"github.com/gin-gonic/gin"
	"time"
)

type RegisterReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

func Register(c *gin.Context) {
	var req RegisterReq
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	//判断用户名是否存在
	var user model.User
	_, err = user.AddUser(req.Username)
	if err != nil { //表示没有注册过
		//判断邮箱是否被使用
		err := user.UserEmail(req.Email)
		if err != nil {
			//注册
			db := model.Db
			//时间格式化
			timeStr := time.Now().Format("2006-01-02 15:04:05")
			createUser := &model.User{
				Username:   req.Username,
				Password:   req.Password,
				Email:      req.Email,
				CreateTime: timeStr,
				UpdateTime: timeStr,
				CartID:     "0",
			}
			err = db.Create(createUser).Error
			if err != nil {
				fmt.Println(err)
			}
			c.JSON(200, "注册成功")
		} else {
			c.JSON(200, "该邮箱已被使用")
		}
	} else {
		c.JSON(200, "该用户已存在")
	}
}
