package services

import (
	"BookStore/datamodels"
	"BookStore/repositories"
)

type OrderItemServiceInterface interface {
	GetAllOrderItem() (items []*datamodels.OrderItem, err error)
	GetOrder(orderID string) (items []datamodels.OrderItem, err error)
}
type OrderItemManagerService struct {
	orderItemRepository repositories.OrderItemRepositoryInterface
}

func NewOrderItemManagerService(orderItemRepository repositories.OrderItemRepositoryInterface) OrderItemServiceInterface {
	return &OrderItemManagerService{orderItemRepository: orderItemRepository}
}

func (o *OrderItemManagerService) GetAllOrderItem() (items []*datamodels.OrderItem, err error) {
	return o.orderItemRepository.SelectAllOrderItem()
}
func (o *OrderItemManagerService) GetOrder(orderID string) (items []datamodels.OrderItem, err error) {
	return o.orderItemRepository.SelectOrder(orderID)
}
