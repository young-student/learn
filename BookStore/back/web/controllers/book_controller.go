package controllers

import (
	"BookStore/common"
	"BookStore/datamodels"
	"BookStore/repositories"
	"BookStore/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type BookController struct {

}
func (b *BookController)BookControllerRouters(router *gin.Engine){
	router.POST("/manager/book",b.ShowBooks)
	router.POST("/manager/book/delete",b.DeleteBook)
	router.POST("/manager/getBookID",b.GetBookByID)
	router.POST("/manager/book/update",b.Update)
	router.GET("/manager/book/add",b.AddBookView)
	router.POST("/manager/book/add",b.AddBook)
}

func newBookController() services.BookServiceInterface{
	db, err := common.NewMySQL()
	if err != nil {
		fmt.Println(err)
	}
	bookRepositoryManager := repositories.NewBookRepositoryManager("books", db)
	return services.NewBookServiceManager(bookRepositoryManager)
}
//图书管理，展示所有图书
type PageQuery struct {
	//当前页（如第几页）
	Pi 		int 		 `json:"pi"`
	//页数（如每一页显示10条或者20条）
	Ps 		int 		 `json:"ps"`
	//图书总数量
	Count	int 		 `json:"count"`
	Items 	[]*datamodels.Book `json:"items"`
}
func (b *BookController)ShowBooks(c *gin.Context){
	var req PageQuery
	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(400,err)
		fmt.Println(err)
		return
	}
	bookServiceManager := newBookController()
	books, err := bookServiceManager.GetAllBooks(req.Pi,req.Ps)
	//fmt.Println(len(books),"-------------------")
	if err != nil {
		fmt.Println(err)
		c.HTML(http.StatusOK,"error.html",gin.H{"Message":err})
		return
	}
	count, err := bookServiceManager.GetBookCount()
	if err != nil {
		fmt.Println(err)
		return
	}
	data := &PageQuery{
		Count: count,
		Items:books,
	}
	c.JSON(200,data)
}
//删除图书
func (b *BookController)DeleteBook(c *gin.Context){
	//bookIdStr := c.Query("id")
	//bookID, err := strconv.ParseInt(bookIdStr, 10, 64)
	//if err != nil {
	//	fmt.Println(err)
	//}
	var req getBookID
	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(400,err)
		fmt.Println(err)
		return
	}
	fmt.Println(req.ID,"~~~~~~~~~``````~~`~")
	bookServiceManager := newBookController()
	err = bookServiceManager.DeleteBook(req.ID)
	if err != nil {
		fmt.Println(err)
	}
	//删除成功后，到管理商品页面
	//b.ShowBooks(c)
	c.JSON(200,"成功删除")
}
//修改图书
//1.先要获取原来的图书商品信息
type getBookID struct {
	ID int64 `json:"id"`
}

func (b *BookController)GetBookByID(c *gin.Context){
	//bookIdStr := c.Query("bookID")
	//bookID, err := strconv.ParseInt(bookIdStr, 10, 64)
	//if err != nil {
	//	fmt.Println(err)
	//}
	var req getBookID
	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(400,err)
		fmt.Println(err)
		return
	}
	//fmt.Println(req.ID)
	bookServiceManager := newBookController()
	book, err := bookServiceManager.GetBookByID(req.ID)
	if err != nil {
		fmt.Println(err)
	}
	//c.HTML(http.StatusOK,"book_update.html",gin.H{"book":book})
	c.JSON(200,book)
}
func (b *BookController)Update(c *gin.Context){
	bookIdStr := c.PostForm("id")
	bookID, err := strconv.ParseInt(bookIdStr, 10, 64)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(bookID,"++++++++++++")
	bookName := c.PostForm("title")
	bookAuthor := c.PostForm("author")
	bookPriceStr:= c.PostForm("price")
	bookSaleStr := c.PostForm("sale")
	bookStockStr := c.PostForm("stock")
	bookPrice, err := strconv.ParseFloat(bookPriceStr, 10)
	bookSale, _  := strconv.ParseInt(bookSaleStr,10,64)
	bookStock, _  := strconv.ParseInt(bookStockStr,10,64)
	fmt.Println(bookName,bookAuthor,bookPrice,bookSale,bookStock)
	if err != nil {
		fmt.Println(err)
		return
	}
	book := &datamodels.Book{
		ID:		 bookID,
		Title:   bookName,
		Author:  bookAuthor,
		Price:   float32(bookPrice),
		Sales:	bookSale,
		Stock:	bookStock,
	}
	bookServiceManager := newBookController()
	err = bookServiceManager.GetUpdateBook(book)
	if err != nil {
		fmt.Println(err)
	}
	//修改成功之后，回到商品管理页面
	//b.ShowBooks(c)
}
//添加图书商品页面
func (b *BookController)AddBookView(c *gin.Context){
	c.HTML(http.StatusOK,"book_add.html",nil)
}
func (b *BookController)AddBook(c *gin.Context){
	bookCover := c.PostForm("cover")
	bookName := c.PostForm("title")
	bookAuthor := c.PostForm("author")
	bookPriceStr:= c.PostForm("price")
	bookSaleStr := c.PostForm("sale")
	bookStockStr := c.PostForm("stock")
	bookPrice, err := strconv.ParseFloat(bookPriceStr, 10)
	bookSale, _  := strconv.ParseInt(bookSaleStr,10,64)
	bookStock, _  := strconv.ParseInt(bookStockStr,10,64)
	if err != nil {
		fmt.Println(err)
		return
	}
	book := &datamodels.Book{
		Title:   bookName,
		Author:  bookAuthor,
		Price:   float32(bookPrice),
		ImgPath: bookCover,
		Sales:	bookSale,
		Stock:	bookStock,
	}
	bookServiceManager := newBookController()
	err = bookServiceManager.GetAddBook(book)
	if err != nil {
		fmt.Println(err)
		return
	}
	//b.ShowBooks(c)
}
