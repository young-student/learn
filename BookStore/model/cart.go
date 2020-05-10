package model

type Cart struct {
	ID 				int 	`json:"id"`
	//购物车id
	CartID 			string 	`json:"cart_id"`
	//购物车中图书的总数量，通过计算得到
	TotalCount 		int		`json:"total_count"`
	//购物车中图书的总金额，通过计算得到
	TotalAmount 	float32 `json:"total_amount"`
	//当前购物车所属的用户
	UserID 			int 	`json:"user_id"`
}
//根据cart_id返回当前一个购物车的实例，用于获取总数量和总金额
func (c *Cart)ShowShoppingCartInfoByCartID(cart_id string)(Cart,error){
	var cart Cart
	err := Db.Where("cart_id = ?",cart_id).Take(&cart).Error
	if err != nil {
		return cart,err
	}
	return cart,nil
}
//将创建的购物商品添加到切片当中，遍历出商品的数量和金额，然后通过cart_id更新购物车中的总数量和总金额
func (c *Cart)UpdateCart(shops []Shop,cart_id string)error{
	//遍历
	var total_count int
	var total_amount float32
	for _,v := range shops {
		total_count = total_count + v.ShopCount
		total_amount = total_amount + v.ShopAmount
	}
	updateCart := &Cart{
		TotalCount:  total_count,
		TotalAmount: total_amount,
	}
	err := Db.Model(&Cart{}).Where("cart_id = ?",cart_id).Updates(updateCart).Error
	if err != nil {
		return err
	}
	return nil
}
//根据cart_id清空购物车
func (c *Cart)DeleteCartByCartID(cart_id string)error{
	err := Db.Unscoped().Where("cart_id = ?",cart_id).Delete(c).Error
	if err != nil {
		return err
	}
	return nil
}


