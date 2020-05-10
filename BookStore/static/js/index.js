$(function () {
    //获取用户名
    getUname();
    function getUname() {
        var uname = sessionStorage.getItem("uname");
        if (uname != null) {
            $(".login").css("display", "none");
            $(".register").css("display", "none");
            $(".cart").css("display", "none");

            $(".welcome").find("a").html("欢迎" + uname);
            //显示欢迎链接、我的购物车、我的订单
            $(".welcome").css("display", "block");
            $(".mycart").css("display", "block");
            $(".myorder").css("display", "block");
            $(".logout").css("display", "block");
        } else {
            //界面
            $(".welcome").css("display", "none");
            $(".mycart").css("display", "none");
            $(".myorder").css("display", "none");
            $(".logout").css("display", "none");
        }
    }

    var laypage = layui.laypage;
    init(1, 4);
    function init(pi, ps) {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/v1/book/ShowBookShop",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ pi: pi, ps: ps }),
            dataType: "json",
            success: function (resp) {
                var html = [];
                for (var i = 0; i < resp.items.length; i++) {
                    html.push(
                        `<li>
                            <img src="${resp.items[i].img_path}" alt="">
                            <p>书名:<span>${resp.items[i].title}</span></p>
                            <p>作者:<span>${resp.items[i].author}</span></p>
                            <p>价格:<span class="price">￥${resp.items[i].price}</span></p>
                            <p>销量:<span>${resp.items[i].sales}</span></p>
                            <p>库存:<span>${resp.items[i].stock}</span></p>
                            <a href="javascript:;" onclick="buy(${resp.items[i].id})">加入购物车</a>
                        </li>`
                    );
                }
                $("#book").html(html.join(''));
                laypage.render({
                    elem: "page",
                    count: resp.count,
                    curr: pi,
                    limit: ps,
                    layout: ["prev", "page", "next", "count"],
                    jump: function (obj, first) {
                        if (!first) {
                            init(obj.curr, obj.limit);
                        }
                    }
                })
            },
            error: function (resp) {
                // console.log(resp);
            }
        });
    }
    //登录
    $("#logsub").click(function () {
        var username = $("#u").val();
        var password = $("#p").val();
        if (username == "") {
            $(".tip").html("<i></i>用户名不能为空");
            $(".tip").css("visibility", "visible");
            if ($(".tip").css("visibility") == "visible") {
                var num = 3;
                var timer = setInterval(function () {
                    if (num == 0) {
                        $(".tip").css("visibility", "hidden");
                        clearInterval(timer);
                    }
                    num--;
                }, 1000);
            }
            return false;
        }
        if (password == "") {
            $(".tip").html("<i></i>密码不能为空");
            $(".tip").css("visibility", "visible");
            if ($(".tip").css("visibility") == "visible") {
                var num = 3;
                var timer = setInterval(function () {
                    if (num == 0) {
                        $(".tip").css("visibility", "hidden");
                        clearInterval(timer);
                    }
                    num--;
                }, 1000);
            }
            return false;
        } else {
            $.ajax({
                type: "post",
                url: "http://localhost:8080/v1/login/user",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({ username: username, password: password }),
                dataType: "json",
                success: function (resp) {
                    if (resp == "用户名或密码错误") {
                        alert(resp);
                    } else {
                        //获取用户名
                        sessionStorage.setItem("uname", resp);
                        //隐藏登录界面
                        $(".login-box").css("display", "none");
                        $(".bg").css("display", "none");
                        getUname();
                    }
                },
                error: function (resp) {
                    // console.log(resp);
                }
            });
        }
    });
    //注册
    $("#regsub").click(function () {
        var username = $("#username").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var confirm = $("#confirm").val();
        if (username == "" || email == "" || password == "" || confirm == "") {
            alert("请按要求注册信息");
            return false;
        }
        $.ajax({
            type: "post",
            url: "http://localhost:8080/v1/register/user",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ username: username, email: email, password: password }),
            dataType: "json",
            success: function (resp) {
                alert(resp);
                if (resp == "注册成功") {
                    $(".register-box").css("display", "none");
                    $(".bg").css("display", "none");

                    $(".login-box").css("display", "block");
                    $(".bg").css("display", "block");
                }
            },
            error: function (resp) {
                // console.log(resp);
            }
        });
    });
    //退出登录，注销
    $(".logout").click(function () {
        sessionStorage.clear();
        window.location.reload();
    });
});