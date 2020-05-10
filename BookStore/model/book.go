package model

type Book struct {
	ID int `json:"id"`
	//书名
	Title string `json:"title"`
	//作者
	Author string `json:"author"`
	//价格
	Price float32 `json:"price"`
	//销售量
	Sales int `json:"sales"`
	//库存
	Stock int `json:"stock"`
	//
	Img_path string `json:"img_path"`
}

//分页查询，并显示所有图书
func (b *Book) GetAllBooks(pi int, ps int) ([]Book, error) {
	var books []Book
	err := Db.Order("id desc").Limit(ps).Offset((pi - 1) * ps).Find(&books).Error
	if err != nil {
		return books, err
	}
	return books, nil
}

//书籍总数
func (b *Book) GetAllBooksCount() (count int, err error) {
	err = Db.Table("books").Count(&count).Error
	if err != nil {
		return 0, nil
	}
	return count, nil
}

//------------------------
//根据id删除图书
func (b *Book)DeleteBookByID(book_id int)error{
	err := Db.Unscoped().Where("id = ?",book_id).Delete(b).Error
	if err != nil {
		return err
	}
	return nil
}
//根据id查询图书，显示在修改页面
func (b *Book)FindBookByID(book_id int)(Book,error){
	var book Book
	err := Db.Where("id = ?",book_id).Take(&book).Error
	if err != nil {
		return book,err
	}
	return book,nil
}
//分页查询，并显示所有图书
func (b *Book)BookPage(pi int,ps int)([]Book,error){
	var books []Book
	err := Db.Order("id desc").Limit(ps).Offset((pi-1)*ps).Find(&books).Error
	if err != nil {
		return books,err
	}
	return books,nil
}
//书籍总数
func (b *Book)BookCount()(count int,err error){
	err = Db.Table("books").Count(&count).Error
	if err != nil {
		return 0,nil
	}
	return count,nil
}
//带分页查询和价格查询
func (b *Book)BookPageByPrice(pi int,ps int,min int,max int)([]Book,error){
	var books []Book
	err := Db.Where("price between ? and ?",min,max).Order("id desc").Limit(ps).Offset((pi-1)*ps).Find(&books).Error
	if err != nil {
		return books,err
	}
	return books,nil
}
//筛选后的书籍总数
func (b *Book)BookByPriceCount(min int,max int)(count int,err error){
	err = Db.Table("books").Where("price between ? and ?",min,max).Count(&count).Error
	if err != nil {
		return 0,nil
	}
	return count,nil
}

