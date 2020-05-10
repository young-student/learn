package model

type User struct {
	ID         int    `json:"id"`
	Username   string `json:"username"`
	Password   string `json:"password"`
	Email      string `json:"email"`
	CartID     string `json:"cart_id"`
	CreateTime string `json:"create_time"`
	UpdateTime string `json:"update_time"`
}

//登录 用户名和密码检验
func (u *User) CheckUserNameAndPassword(username string, password string) (User, error) {
	var user User
	err := Db.Where("username = ? and password = ?", username, password).Take(&user).Error
	if err != nil {
		return user, err
	}
	return user, nil
}

//根据用户ID显示用户名，欢迎界面
func (u *User) ShowUserNameByUserID(user_id int) (User, error) {
	var user User
	err := Db.Where("id = ?", user_id).Take(&user).Error
	if err != nil {
		return user, err
	}
	return user, nil
}

//根据用户名查询,查询该用户名是否被注册 ,以及用于购物车指定的用户名
func (u *User) AddUser(username string) (User, error) {
	var user User
	err := Db.Where("username = ?", username).Take(&user).Error
	if err != nil {
		return user, err
	}
	return user, nil
}
func (u *User) UserEmail(email string) error {
	var user User
	err := Db.Where("email = ?", email).Take(&user).Error
	if err != nil {
		return err
	}
	return nil
}
