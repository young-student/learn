$(function () {
    var uname = sessionStorage.getItem("uname");
    $(".welcome").html("欢迎" + uname);
    getMyOrder();
    function getMyOrder() {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/v1/order/MyOrder",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ user_name: uname }),
            dataType: "json",
            success: function (resp) {
                // console.log(resp);
                var html = [];
                for (var i = 0; i < resp.items.length; i++) {
                    html.push(
                        `<tr>
                            <td>${resp.items[i].order_id}</td>
                            <td>${resp.items[i].create_time}</td>
                            <td>${resp.items[i].total_count}</td>
                            <td>￥${resp.items[i].total_amount}</td>
                            <td><a href="javascript:;"  class="detail" onclick=detail('${resp.items[i].order_id}')>查看详情</a></td>
                        </tr>`)
                }
                $("#tbd").html(html.join(''));
            },
            error: function (resp) {
                // console.log(resp);
            }
        });
    }

    $(".close-info").click(function () {
        $(".order-list").css("display", "block");
        $(".order-info").css("display", "none");
        $(".bg").css("display", "none");
    });
});

