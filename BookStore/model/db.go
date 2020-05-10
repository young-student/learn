package model

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var Db *gorm.DB

func init() {
	db, err := gorm.Open("mysql", "root:@tcp(localhost:3306)/test?charset=utf8&parseTime=true&loc=Local")
	if err != nil {
		panic(err)
	}
	//设置空闲连接池中的最大连接数。
	db.DB().SetMaxIdleConns(50)
	//设置打开到数据库的最大连接数。
	db.DB().SetMaxOpenConns(500)
	//设置日志模式，‘真’为详细日志，‘假’为无日志，默认情况下，将只打印错误日志.
	db.LogMode(true)
	//自动迁移表
	//db.AutoMigrate(&Personal{}, &Sms{}, &HealthFile{},&Admin{},&Message{})
	Db = db
}
