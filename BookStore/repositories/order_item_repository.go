
package repositories

import (
"BookStore/common"
"BookStore/datamodels"
"fmt"
"github.com/jinzhu/gorm"
)

type OrderItemRepositoryInterface interface {
	Conn()error
	SelectAllOrderItem()(items []*datamodels.OrderItem,err error)
	SelectOrder(orderID string)(items []datamodels.OrderItem,err error)
}
type OrderItemManagerRepository struct {
	table string
	mysqlConn *gorm.DB
}
func NewOrderItemManagerRepository(table string,db *gorm.DB) OrderItemRepositoryInterface{
	return &OrderItemManagerRepository{table:table,mysqlConn:db}
}
func (o *OrderItemManagerRepository)Conn()error{
	if o.mysqlConn == nil {
		db, err := common.NewMySQL()
		if err != nil {
			return err
		}
		o.mysqlConn = db
	}
	if o.table == "" {
		o.table = "orderitems"
	}
	return nil
}
func (o *OrderItemManagerRepository)SelectAllOrderItem()(items []*datamodels.OrderItem,err error){
	err = o.Conn()
	if err != nil {
		fmt.Println(err)
		return nil,err
	}
	err = o.mysqlConn.Find(&items).Error
	if err != nil {
		fmt.Println(err)
		return nil,err
	}
	return items,nil
}
func (o *OrderItemManagerRepository)SelectOrder(orderID string)(items []datamodels.OrderItem,err error){
	err = o.Conn()
	if err != nil {
		return nil,err
	}
	err = o.mysqlConn.Where("order_id=?", orderID).Find(&items).Error
	if err != nil {
		return nil,err
	}
	return items,nil
}
