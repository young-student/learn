package repositories

import (
	"BookStore/common"
	"BookStore/datamodels"
	"fmt"
	"github.com/jinzhu/gorm"
)

type OrderRepositoryInterface interface {
	Conn()error
	SelectAllOrder()(orders []*datamodels.Order,err error)
	SelectOrder(orderID int)(orders []datamodels.Order,err error)
}
type OrderManagerRepository struct {
	table string
	mysqlConn *gorm.DB
}
func NewOrderManagerRepository(table string,db *gorm.DB) OrderRepositoryInterface{
	return &OrderManagerRepository{table:table,mysqlConn:db}
}
func (o *OrderManagerRepository)Conn()error{
	if o.mysqlConn == nil {
		db, err := common.NewMySQL()
		if err != nil {
			return err
		}
		o.mysqlConn = db
	}
	if o.table == "" {
		o.table = "orders"
	}
	return nil
}
func (o *OrderManagerRepository)SelectAllOrder()(orders []*datamodels.Order,err error){
	err = o.Conn()
	if err != nil {
		fmt.Println(err)
		return nil,err
	}
	err = o.mysqlConn.Find(&orders).Error
	if err != nil {
		fmt.Println(err)
		return nil,err
	}
	return orders,nil
}
func (o *OrderManagerRepository)SelectOrder(orderID int)(orders []datamodels.Order,err error){
	err = o.Conn()
	if err != nil {
		return nil,err
	}
	err = o.mysqlConn.Where("id=?", orderID).Take(&orders).Error
	if err != nil {
		return nil,err
	}
	return orders,nil
}
