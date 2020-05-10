package datamodels

type Order struct {
	ID         int    `json:"id"`
	OrderID    string `json:"order_id"`
	CreateTime string `json:"create_time"`
	TotalCount int    `json:"total_count"`
	TotalAmount float32    `json:"total_amount"`
	Status     int    `json:"status"`
	UserID     int    `json:"user_id"`
}
