package services

import (
	"BookStore/datamodels"
	"BookStore/repositories"
)

type OrderServiceInterface interface {
	GetAllOrder() (orders []*datamodels.Order, err error)
	GetOrder(orderID int) (orders []datamodels.Order, err error)
}
type OrderManagerService struct {
	orderRepository repositories.OrderRepositoryInterface
}

func NewOrderManagerService(orderRepository repositories.OrderRepositoryInterface) OrderServiceInterface {
	return &OrderManagerService{orderRepository: orderRepository}
}

func (o *OrderManagerService) GetAllOrder() (orders []*datamodels.Order, err error) {
	return o.orderRepository.SelectAllOrder()
}
func (o *OrderManagerService) GetOrder(orderID int) (orders []datamodels.Order, err error) {
	return o.orderRepository.SelectOrder(orderID)
}
