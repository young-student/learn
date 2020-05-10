$(function () {
    $("#logsub").click(function () {
        var name = $("#admin").val();
        var password = $("#password").val();
        if (name != "" && password != "") {
            $.ajax({
                type: "post",
                url: "http://localhost:8080/manager/admin",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({ name: name, password: password }),
                dataType: "json",
                success: function (resp) {
                    if (resp == "用户名或密码错误") {
                        alert(resp);
                    } else {
                        window.location.href = "http://localhost:8080/manager?admin=" + resp;
                    }
                },
                error: function (resp) {
                    // console.log(resp);
                }
            });
        } else {
            alert("请输入用户名和密码");
        }
    });
});

