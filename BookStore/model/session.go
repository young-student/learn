package model
type Session struct {
	SessionID 	string  `json:"session_id"`
	Username 	string  `json:"username"`
	UserID 		int		`json:"user_id"`
}
//根据id删除session
func (s *Session)DeleteSession(session_id string)error{
	err := Db.Unscoped().Where("session_id = ?",session_id).Delete(s).Error
	if err != nil {
		return err
	}
	return nil
}
//根据id查找session
func (s *Session)FindSession(session_id string)(Session,error){
	var session Session
	err := Db.Where("session_id = ?",session_id).Last(&session).Error
	if err != nil {
		return session,err
	}
	return session,nil
}
