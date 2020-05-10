package datamodels

type User struct {
	ID         int    `json:"id"`
	Username   string `json:"username"`
	Password   string `json:"password"`
	Email      string `json:"email"`
	CartID     string `json:"cart_id"`
	CreateTime string `json:"create_time"`
	UpdateTime string `json:"update_time"`
}
