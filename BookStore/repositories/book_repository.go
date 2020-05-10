package repositories

import (
	"BookStore/common"
	"BookStore/datamodels"
	"github.com/jinzhu/gorm"
)

//定义接口
type BookRepositoryInterface interface {
	//数据库连接
	Conn() error
	//获取商品总数量
	SelectBookCount() (count int,err error)
	//商品展示，查询所有
	SelectAllBooks(pi int,ps int) (books []*datamodels.Book, err error)
	//
	SelectBookByID(bookID int64)(book *datamodels.Book,err error)
	//添加图书
	AddBook(book *datamodels.Book) error
	//删除图书
	DeleteBookByID(bookID int64) error
	//修改图书
	UpdateBook(book *datamodels.Book) error
}
type BookRepositoryManager struct {
	//数据库表名
	table string
	//数据库连接
	mysqlConn *gorm.DB
}
//构造函数
func NewBookRepositoryManager(table string, db *gorm.DB) BookRepositoryInterface {
	return &BookRepositoryManager{table: table, mysqlConn: db}
}
func (b *BookRepositoryManager) Conn() error {
	if b.mysqlConn == nil {
		db, err := common.NewMySQL()
		if err != nil {
			return err
		}
		b.mysqlConn = db
	}
	if b.table == ""{
		b.table = "books"
	}
	return nil
}
func (b *BookRepositoryManager) SelectBookCount()(count int,err error){	err = b.Conn()
	if err != nil {
		return 0,err
	}
	err = b.mysqlConn.Table("books").Count(&count).Error
	if err != nil {
		return 0,nil
	}
	return count,nil
}
func (b *BookRepositoryManager) SelectAllBooks(pi int,ps int) (books []*datamodels.Book, err error) {
	err = b.Conn()
	if err != nil {
		return nil,err
	}
	err = b.mysqlConn.Order("id desc").Limit(ps).Offset((pi-1)*ps).Find(&books).Error
	if err != nil {
		return nil,err
	}
	return books,nil
}
func (b *BookRepositoryManager) AddBook(book *datamodels.Book) error {
	err := b.Conn()
	if err != nil {
		return err
	}
	err = b.mysqlConn.Create(&book).Error
	if err != nil {
		return err
	}
	return nil

}
func (b *BookRepositoryManager) DeleteBookByID(bookID int64) error {
	err := b.Conn()
	if err != nil {
		return err
	}
	book := &datamodels.Book{}
	err = b.mysqlConn.Unscoped().Where("id=?", bookID).Delete(book).Error
	if err != nil {
		return err
	}
	return nil
}
func (b *BookRepositoryManager) UpdateBook(book *datamodels.Book) error {
	err := b.Conn()
	if err != nil {
		return err
	}
	err = b.mysqlConn.Model(book).Where("id=?",book.ID).Updates(&book).Error
	if err != nil {
		return err
	}
	return nil
}
func (b *BookRepositoryManager) SelectBookByID(bookID int64)(book *datamodels.Book,err error){
	err = b.Conn()
	if err != nil {
		return nil,err
	}
	book = &datamodels.Book{}
	err = b.mysqlConn.Where("id=?",bookID).Take(book).Error
	if err != nil {
		return nil,err
	}
	return book,nil
}
