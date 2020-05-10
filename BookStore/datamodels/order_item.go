package datamodels
type OrderItem struct {
	//订单项的id
	ID 		int 	`json:"id"`
	//订单项中的图书数量
	Count 	int 	`json:"count"`
	// 订单项中图书的金额小计
	Amount 	float32 `json:"amount"`
	// 订单项中图书的书名
	Title 	string 	`json:"title"`
	// 订单项中图书的作者
	Author 	string  `json:"author"`
	// 订单项中图书的价格
	Price 	float32 `json:"price"`
	// 订单项中图书的封面
	ImgPath string  `json:"img_path"`
	// 订单项所属的订单
	OrderId string  `json:"order_id"`
}
