package utils

import (
	"fmt"
	"testing"
)

func TestUUID(t *testing.T){
	t.Run("测试",test1)
}
func test1(t *testing.T){
	uuid := CreateUUID()
	fmt.Println(uuid)
}
