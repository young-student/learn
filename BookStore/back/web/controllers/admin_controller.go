package controllers

import (
	"BookStore/common"
	"BookStore/repositories"
	"BookStore/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type AdminController struct {
}

func (u *AdminController) AdminControllerRouter(router *gin.Engine) {
	router.POST("/manager/admin", u.GetAllAdmin)
}
func newAdminController() services.AdminServiceInterface {
	db, err := common.NewMySQL()
	if err != nil {
		fmt.Println(err)
	}
	AdminRepository := repositories.NewAdminManagerRepository("admins", db)
	return services.NewAdminManagerService(AdminRepository)
}

type AdminLogin struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

func (u *AdminController) GetAllAdmin(c *gin.Context) {
	var req AdminLogin
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(req.Name,req.Password)
	//admin := c.PostForm("admin")
	//password := c.PostForm("password")
	AdminController := newAdminController()
	admins, err := AdminController.GetAllAdmin()
	if err != nil {
		fmt.Println(err)
		c.HTML(http.StatusOK, "error.html", gin.H{"Message": err})
		return
	}
	fmt.Println(admins)
	var status = 0
	var adminName string
	for i := 0; i < len(admins); i++ {
		if req.Name == admins[i].Name && req.Password == admins[i].Password {
			status = 1
			adminName = admins[i].Name
			break
		}
	}
	if status !=0 {
		c.JSON(200,adminName)
	}else {
		c.JSON(200,"用户名或密码错误")
	}
}
