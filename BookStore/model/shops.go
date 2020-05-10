package model
type Shop struct {
	ID 			int		`json:"id"`
	BookID		int		`json:"book_id"`
	ImgPath		string	`json:"img_path"`		
	ShopName 	string	`json:"shop_name"`
	ShopCount 	int		`json:"shop_count"`
	ShopPrice 	float32	`json:"shop_price"`
	ShopAmount 	float32	`json:"shop_amount"`
	CartID		string  `json:"cart_id"`
}
//根据图书id和cart_id 返回当前购买商品信息，并用于判断是否存在，存在 count+1,否则创建
func (s *Shop)ShowShopInfoByBookIDAndCartID(book_id int,cart_id string)(Shop,error){
	var shop Shop
	err := Db.Where("book_id = ? and cart_id = ?",book_id,cart_id).Take(&shop).Error
	if err != nil{
		return shop,err
	}
	return shop,nil
}
//根据cart_id返回当前用户的购物车里所有的商品信息
func (s *Shop)ShowShopsInfoByCartID(cart_id string)([]Shop,error){
	var shops []Shop
	err := Db.Where("cart_id = ?",cart_id).Find(&shops).Error
	if err != nil{
		return shops,err
	}
	return shops,nil
}
//根据cart_id清空该购物车里面所有商品
func (s *Shop)DeleteShopsByCartID(cart_id string)error{
	err := Db.Unscoped().Where("cart_id = ?",cart_id).Delete(s).Error
	if err != nil {
		return err
	}
	return nil
}
//根据cart_id和book_id删除该购物车里面的某一件商品
func (s *Shop)DeleteShopsByCartIDAndShopID(cart_id string,shop_id int)error{
	err := Db.Unscoped().Where("cart_id = ? and id = ?",cart_id,shop_id).Delete(s).Error
	if err != nil {
		return err
	}
	return nil
}