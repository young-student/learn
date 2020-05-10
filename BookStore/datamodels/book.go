package datamodels

type Book struct {
	ID int64 `json:"id"`
	//书名
	Title string `json:"title"`
	//作者
	Author string `json:"author"`
	//价格
	Price float32 `json:"price"`
	//销售量
	Sales int64 `json:"sales"`
	//库存
	Stock int64 `json:"stock"`
	//
	ImgPath string `json:"img_path"`
}
