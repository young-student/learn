package model

type Order struct {
	ID 			int 		`json:"id"`
	//订单号
	OrderID 	string 		`json:"order_id"`
	//生成的订单号时间
	CreateTime 	string 	`json:"create_time"`
	//订单中图书的总数量
	TotalCount 	int 		`json:"total_count"`
	//订单中图书的总金额
	TotalAmount float32 	`json:"total_amount"`
	//订单的状态，比如：0表示 未发货，1表示已发货，2交易完成……
	Status 		int 		`json:"state"`
	//订单号所属的用户
	UserID 		int 		`json:"user_id"`
}
//查看所有用户的订单
func (o *Order)ShowUserOrder()([]Order,error){
	var orders []Order
	err := Db.Find(&orders).Error
	if err != nil {
		return orders,err
	}
	return orders,nil
}
//根据用户的id获取该用户的订单
func (o *Order)MyOrder(user_id int)([]Order,error){
	var orders []Order
	err := Db.Where("user_id = ?",user_id).Find(&orders).Error
	if err != nil {
		return orders,err
	}
	return orders,nil
}
