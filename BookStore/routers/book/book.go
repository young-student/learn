package book

import (
	"BookStore/model"
	"fmt"
	"github.com/gin-gonic/gin"
)

//带分页查询和价格查询（将无条件的分页查询和 有条件的分页查询合并）
type PageBook struct {
	//当前页（如第几页）
	Pi int `json:"pi"`
	//页数（如每一页显示10条或者20条）
	Ps int `json:"ps"`
	//图书总数量
	Count int `json:"count"`
	//用于存放图书的切片
	Items []model.Book `json:"items"`
}

func GetAllPageBook(c *gin.Context) {
	var req PageBook
	err := c.BindJSON(&req)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	var book model.Book
	books, err := book.GetAllBooks(req.Pi, req.Ps)
	if err != nil {
		fmt.Println(err)
	}
	count, err := book.GetAllBooksCount()
	if err != nil {
		fmt.Println(err)
	}
	data := &PageBook{
		Items: books,
		Count: count,
	}
	c.JSON(200, data)
}
