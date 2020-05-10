package services

import (
	"BookStore/datamodels"
	"BookStore/repositories"
)

type BookServiceInterface interface {
	//获取书籍总数
	GetBookCount() (count int,err error)
	//获取所有书籍
	GetAllBooks(pi int,ps int) (books []*datamodels.Book, err error)
	//
	GetBookByID(bookID int64)(book *datamodels.Book,err error)
	//添加图书
	GetAddBook(book *datamodels.Book) error
	//删除图书
	DeleteBook(bookID int64) error
	//修改图书
	GetUpdateBook(book *datamodels.Book) error
}
type BookServiceManager struct {
	bookRepository	repositories.BookRepositoryInterface
}
func NewBookServiceManager(bookRepository repositories.BookRepositoryInterface) BookServiceInterface{
	return &BookServiceManager{bookRepository:bookRepository}
}
func (b *BookServiceManager)GetBookCount()(count int,err error){
	return b.bookRepository.SelectBookCount()
}
func (b *BookServiceManager)GetAllBooks(pi int,ps int) (books []*datamodels.Book, err error){
	return b.bookRepository.SelectAllBooks(pi,ps)
}
func (b *BookServiceManager)GetAddBook(book *datamodels.Book) error{
	return b.bookRepository.AddBook(book)
}
func (b *BookServiceManager)DeleteBook(bookID int64) error{
	return b.bookRepository.DeleteBookByID(bookID)
}
func (b *BookServiceManager)GetUpdateBook(book *datamodels.Book) error{
	return b.bookRepository.UpdateBook(book)
}
func (b *BookServiceManager)GetBookByID(bookID int64)(book *datamodels.Book,err error){
	return b.bookRepository.SelectBookByID(bookID)
}