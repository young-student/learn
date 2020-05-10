package repositories

import (
	"BookStore/common"
	"BookStore/datamodels"
	"fmt"
	"github.com/jinzhu/gorm"
)

type AdminRepositoryInterface interface {
	Conn()error
	SelectAllAdmin()(admins []datamodels.Admin,err error)
}
type AdminManagerRepository struct {
	table string
	mysqlConn *gorm.DB
}
func NewAdminManagerRepository(table string,db *gorm.DB)AdminRepositoryInterface{
	return &AdminManagerRepository{table:table,mysqlConn:db}
}
func (a *AdminManagerRepository)Conn()error{
	if a.mysqlConn == nil {
		db, err := common.NewMySQL()
		if err != nil {
			return err
		}
		a.mysqlConn = db
	}
	if a.table == "" {
		a.table = "admins"
	}
	return nil
}
func (a *AdminManagerRepository)SelectAllAdmin()(admins []datamodels.Admin,err error){
	err = a.Conn()
	if err != nil {
		fmt.Println(err)
		return nil,err
	}
	err = a.mysqlConn.Find(&admins).Error
	if err != nil {
		fmt.Println(err)
		return nil,err
	}
	return admins,nil
}
