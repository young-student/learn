package controllers

import (
	"BookStore/common"
	"BookStore/datamodels"
	"BookStore/repositories"
	"BookStore/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type UserController struct {
}

func (u *UserController) UserControllerRouter(router *gin.Engine) {
	router.GET("/manager/users", u.GetAllUser)
	router.POST("/manager/user", u.GetUserByID)
	router.POST("/manager/add/user",u.AddUser)
}
func newUserController() services.UserServiceInterface {
	db, err := common.NewMySQL()
	if err != nil {
		fmt.Println(err)
	}
	userRepository := repositories.NewUserManagerRepository("users", db)
	return services.NewUserManagerService(userRepository)
}
func (u *UserController) GetAllUser(c *gin.Context) {
	userController := newUserController()
	users, err := userController.GetAllUser()
	if err != nil {
		fmt.Println(err)
		c.HTML(http.StatusOK, "error.html", gin.H{"Message": err})
		return
	}
	c.JSON(200, users)
}

type GetUserID struct {
	ID int `json:"id"`
}

func (u *UserController) GetUserByID(c *gin.Context) {
	var req GetUserID
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println(err)
		return
	}
	userController := newUserController()
	user, err := userController.GetUserByID(req.ID)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(user)
}
func (u *UserController) AddUser(c *gin.Context) {
	userName := c.PostForm("username")
	passWord := c.PostForm("password")
	//时间格式化
	timeStr := time.Now().Format("2006-01-02 15:04:05")
	user := &datamodels.User{
		Username:   userName,
		Password:   passWord,
		CreateTime: timeStr,
		UpdateTime: timeStr,
	}
	userController := newUserController()
	err := userController.AddUser(user)
	if err != nil {
		fmt.Println(err)
		return
	}
}
