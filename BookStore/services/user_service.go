package services

import (
	"BookStore/datamodels"
	"BookStore/repositories"
)

type UserServiceInterface interface {
	GetAllUser() (users []*datamodels.User, err error)
	GetUserByID(UserID int) (users []datamodels.User, err error)
	AddUser(user *datamodels.User) error
}
type UserManagerService struct {
	userRepository repositories.UserRepositoryInterface
}

func NewUserManagerService(userRepository repositories.UserRepositoryInterface) UserServiceInterface {
	return &UserManagerService{userRepository: userRepository}
}

func (u *UserManagerService) GetAllUser() (Users []*datamodels.User, err error) {
	return u.userRepository.SelectAllUser()
}
func (u *UserManagerService) GetUserByID(UserID int) (Users []datamodels.User, err error) {
	return u.userRepository.SelectUserByID(UserID)
}
func (u *UserManagerService) AddUser(user *datamodels.User) error{
	return u.userRepository.AddUser(user)
}
