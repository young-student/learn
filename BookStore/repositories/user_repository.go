package repositories

import (
	"BookStore/common"
	"BookStore/datamodels"
	"fmt"
	"github.com/jinzhu/gorm"
)

type UserRepositoryInterface interface {
	Conn()error
	SelectAllUser()(users []*datamodels.User,err error)
	SelectUserByID(UserID int)(users []datamodels.User,err error)
	AddUser(user *datamodels.User) error
}
type UserManagerRepository struct {
	table string
	mysqlConn *gorm.DB
}
func NewUserManagerRepository(table string,db *gorm.DB)UserRepositoryInterface{
	return &UserManagerRepository{table:table,mysqlConn:db}
}
func (u *UserManagerRepository)Conn()error{
	if u.mysqlConn == nil {
		db, err := common.NewMySQL()
		if err != nil {
			return err
		}
		u.mysqlConn = db
	}
	if u.table == "" {
		u.table = "users"
	}
	return nil
}
func (u *UserManagerRepository)SelectAllUser()(users []*datamodels.User,err error){
	err = u.Conn()
	if err != nil {
		fmt.Println(err)
		return nil,err
	}
	err = u.mysqlConn.Find(&users).Error
	if err != nil {
		fmt.Println(err)
		return nil,err
	}
	return users,nil
}
func (u *UserManagerRepository)SelectUserByID(UserID int)(users []datamodels.User,err error){
	err = u.Conn()
	if err != nil {
		return nil,err
	}
	err = u.mysqlConn.Where("id=?", UserID).Take(&users).Error
	if err != nil {
		return nil,err
	}
	return users,nil
}
func (u *UserManagerRepository)AddUser(user *datamodels.User)error{
	err := u.Conn()
	if err != nil {
		return err
	}
	err = u.mysqlConn.Create(&user).Error
	if err != nil {
		return err
	}
	return nil
}
