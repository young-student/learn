$(function () {
    // 登录
    $(".login").click(function () {
        $(".login-box").css("display", "block");
        $(".bg").css("display", "block");
    });
    $(".log").click(function () {
        $(".login-box").css("display", "none");
        $(".bg").css("display", "none");
    });

    $("#u").keyup(function () {
        if ($(this).val() == "") {
            $(".user").css("display", "block");
        } else {
            $(".user").css("display", "none");
        }
    });

    $("#p").keyup(function () {
        if ($(this).val() == "") {
            $(".pass").css("display", "block");
        } else {
            $(".pass").css("display", "none");
        }
    });
    //新用户注册
    $(".newuser").click(function () {
        $(".login-box").css("display", "none");
        $(".bg").css("display", "none");

        $(".register-box").css("display", "block");
        $(".bg").css("display", "block");
    });
    // 注册
    $(".register").click(function () {
        $(".register-box").css("display", "block");
        $(".bg").css("display", "block");
    });

    $(".reg").click(function (e) {
        var flag = window.confirm("你确定要退出注册界面？");
        if(flag){
            $(".register-box").css("display", "none");
            $(".bg").css("display", "none");
            window.location.reload();
            e.preventDefault();
        }else {
            $(".bg").css("display", "block");
        }
    });


    $("#username").keyup(function () {
        if ($(this).val() == "") {
            $(".u").css("display", "block");
            $(".format").eq(0).html("6~10位数字和字母组成(字母开头)");
        } else {
            $(".u").css("display", "none");
        }
    });

    $("#email").keyup(function () {
        if ($(this).val() == "") {
            $(".e").css("display", "block");
            $(".format").eq(1).html("xxx@xxx.com");
        } else {
            $(".e").css("display", "none");
        }
    });
    $("#password").keyup(function () {
        if ($(this).val() == "") {
            $(".p").css("display", "block");
            $(".format").eq(2).html("6~10位数字组成");
        } else {
            $(".p").css("display", "none");
        }
    });
    $("#confirm").keyup(function () {
        if ($(this).val() == "") {
            $(".c").css("display", "block");
        } else {
            $(".c").css("display", "none");
        }
    });
    // 正则表达式 验证用户名、邮箱、密码是否合法
    var username = /^[A-z][A-z0-9]{5,9}$/;
    var email = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
    var password = /^\d{6,10}$/;

    $("#username").blur(function () {
        if ($(this).val() == "") {

        } else if (username.test($(this).val())) {
            $(".format").eq(0).html("格式正确");
        } else {
            $(".format").eq(0).html("格式错误");
        }

    });

    $("#email").blur(function () {
        if ($(this).val() == "") {

        } else if (email.test($(this).val())) {
            $(".format").eq(1).html("格式正确");
        } else {
            $(".format").eq(1).html("格式错误");
        }
    });
    $("#password").blur(function () {
        if ($(this).val() == "") {

        } else if (password.test($(this).val())) {
            $(".format").eq(2).html("格式正确");
        } else {
            $(".format").eq(2).html("格式错误");
        }
    });
    $("#confirm").blur(function () {
        if ($(this).val() == "") {
            $(".format").eq(3).html("请确认密码");
        } else if ($(this).val() == $("#password").val()) {
            $(".format").eq(3).html("正确");
        } else {
            $(".format").eq(3).html("两次密码不一致");
        }
    });
});