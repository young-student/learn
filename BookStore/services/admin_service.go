package services

import (
	"BookStore/datamodels"
	"BookStore/repositories"
)

type AdminServiceInterface interface {
	GetAllAdmin() (admins []datamodels.Admin, err error)
}
type AdminManagerService struct {
	AdminRepository repositories.AdminRepositoryInterface
}

func NewAdminManagerService(AdminRepository repositories.AdminRepositoryInterface) AdminServiceInterface {
	return &AdminManagerService{AdminRepository: AdminRepository}
}

func (u *AdminManagerService) GetAllAdmin() (admins []datamodels.Admin, err error) {
	return u.AdminRepository.SelectAllAdmin()
}
