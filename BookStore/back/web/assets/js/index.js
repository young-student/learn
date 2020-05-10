$(function () {
    var laypage = layui.laypage;
    $(".close").click(function () {
        $(this).parent().css("display", "none");
    });
    $(".user-link").click(function () {
        $(".user").css("display", "block");
        $(".book").css("display", "none");
        $(".order").css("display", "none");
    });
    $(".book-link").click(function () {
        $(".book").css("display", "block");
        $(".user").css("display", "none");
        $(".order").css("display", "none");
    });
    $(".order-link").click(function () {
        $(".order").css("display", "block");
        $(".user").css("display", "none");
        $(".book").css("display", "none");
    });
    $(".adduser").click(function () {
        $(".userlist").css("display", "block");
    });
    $("#usersub").click(function () {
        $(".userlist").css("display", "none");
        window.location.reload();
    });

    $(".addbook").click(function () {
        $(".booklist").css("display", "block");
    });
    $("#booksub").click(function () {
        $(".booklist").css("display", "none");
        window.location.reload();
    });
    $("#sure").click(function () {
        $(".updatebook").css("display", "none");
        window.location.reload();
    });
    $(".close-info").click(function () {
        $(".order-info").css("display", "none");
        $(".order").css("display", "block");
    });
    var str = location.search.substr(1);
    var username = str.split('=');
    $(".admin-name").find("span").html(username[1]);
    pageUser();
    function pageUser() {
        $.ajax({
            type: "get",
            url: "http://localhost:8080/manager/users",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({}),
            dataType: "json",
            success: function (resp) {
                var html = [];
                for (var i = 0; i < resp.length; i++) {
                    html.push(
                        `<tr>
                            <td>${resp[i].username}</td>
                            <td>${resp[i].email}</td>
                            <td>${resp[i].create_time}</td>
                            <td>${resp[i].update_time}</td>
                        </tr>`
                    );
                }
                $("#user").html(html.join(''));
                laypage.render({
                    elem: "pageuser",
                    count: resp.length,
                    curr: 1,
                    limit: 10,
                    layout: ["prev", "page", "next", "count", "skip", "refresh", "limit"],
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
    pageOrder();
    function pageOrder() {
        $.ajax({
            type: "get",
            url: "http://localhost:8080/manager/order",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({}),
            dataType: "json",
            success: function (resp) {
                var html = [];
                for (var i = 0; i < resp.length; i++) {
                    html.push(
                        `<tr>
                        <td>${resp[i].user_id}</td>
                        <td>${resp[i].order_id}</td>
                        <td>${resp[i].create_time}</td>
                        <td>${resp[i].total_count}</td>
                        <td>${resp[i].total_amount}</td>
                        <td><a href="javascript:;" onclick=detail('${resp[i].order_id}')>查看详情</a></td>
                    </tr>`
                    );
                }
                $("#ord").html(html.join(''));
                laypage.render({
                    elem: "pageorder",
                    count: resp.length,
                    curr: 1,
                    limit: 10,
                    layout: ["prev", "page", "next", "count", "skip", "refresh", "limit"],
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
    getBook(1, 10);
    function getBook(pi, ps) {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/manager/book",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ pi: pi, ps: ps }),
            dataType: "json",
            success: function (resp) {
                var html = [];
                for (var i = 0; i < resp.items.length; i++) {
                    html.push(
                        `<tr>
                        <td>${resp.items[i].title}</td>
                        <td>${resp.items[i].author}</td>
                        <td>${resp.items[i].price}</td>
                        <td>${resp.items[i].sales}</td>
                        <td>${resp.items[i].stock}</td>
                        <td><a href="javascript:;" onclick=upd('${resp.items[i].id}')>修改</a></td>
                        <td><a href="javascript:;" onclick=del('${resp.items[i].id}')>删除</a></td>
                    </tr>`
                    );
                }
                $("#tbd").html(html.join(''));
                laypage.render({
                    elem: "pagebook",
                    count: resp.count,
                    curr: pi,
                    limit: ps,
                    layout: ["prev", "page", "next", "count", "skip", "refresh", "limit"],
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
});