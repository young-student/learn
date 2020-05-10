$(function () {
    var uname = sessionStorage.getItem("uname");
    $(".welcome").html("欢迎" + uname);

    $(".selectall").change(function () {
        var flag = $(this).prop("checked");
        $(".select,.selectall").prop("checked", flag);
    });

    $(".tbd").on("change", ".select", function () {
        if ($(".select:checked").length == $(".select").length) {
            $(".selectall").prop("checked", true);
        } else {
            $(".selectall").prop("checked", false);
        }
    });
    // 统计商品总数量和总额
    getSum();
    function getSum() {
        var count = 0;
        var total = 0;
        $(".txt").each(function (i, ele) {
            count += parseInt($(ele).val());
        });
        $(".totalcount").html(count);
        $(".sum").each(function (i, ele) {
            var totalprice = $(ele).html().substr(1, 5);
            total += parseFloat(totalprice);
        });
        $(".total").html("￥" + total.toFixed(2) + "元");
    }

    //渲染后台数据
    $.ajax({
        type: "post",
        url: "http://localhost:8080/v1/shop/ShowUserCart",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ user_name: uname }),
        dataType: "json",
        success: function (resp) {
            if (resp == "nothing") {
                $(".tip").css("display", "block");
                $(".tip").html("亲~您没有购买任何商品哦！");
            } else {
                var html = [];
                for (var i = 0; i < resp.items.length; i++) {
                    html.push(
                        ` <div class="row shop-count">
                <div class="col-md-1">
                    <input type="checkbox" class="select" data-ipt="${resp.items[i].id}">
                </div>
                <div class="col-md-3 shop-info">
                    <div class="media">
                        <div class="media-left">
                            <img src="${resp.items[i].img_path}" alt="" class="media-object">
                        </div>
                        <div class="media-body ">
                            <p>${resp.items[i].shop_name}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 shop-price">￥${resp.items[i].shop_price}</div>
                <div class="col-md-2 count">
                    <button class="add">+</button><input type="text" value="${resp.items[i].shop_count}" class="txt"><button
                        class="reduce">-</button>
                </div>
                <div class="col-md-2 shop-sum-price">
                    <span class="sum">￥${resp.items[i].shop_amount}</span>
                </div>
                <div class="col-md-2">
                    <a href="javascript:;" class="shop-id" data-id="${resp.items[i].id}">删除</a>
                </div>
            </div>`
                    );
                }
                $(".tbd").html(html.join(''));
                getSum();
            }
        },
        error: function (resp) {
            // console.log(resp);
        }
    });
    $(".tbd").on("click", ".add", function () {
        var num = $(this).siblings(".txt").val();
        num++;
        $(this).siblings(".txt").val(num);
        // 计算价格
        var p = $(this).parent().siblings(".shop-price").html();
        p = p.substr(1);
        $(this).parent().siblings(".shop-sum-price").children(".sum").html("￥" + (p * num).toFixed(2));
        getSum();
    });
    $(".tbd").on("click", ".reduce", function () {
        var num = $(this).siblings(".txt").val();
        if (num == 1) {
            return false;
        }
        num--;
        $(this).siblings(".txt").val(num);
        // 计算价格
        var p = $(this).parent().siblings(".shop-price").html();
        p = p.substr(1);
        $(this).parent().siblings(".shop-sum-price").children(".sum").html("￥" + (p * num).toFixed(2));
        getSum();
    });
    $(".tbd").on("change", ".txt", function () {
        var num = $(this).val();
        var p = $(this).parent().siblings(".shop-price").html();
        p = p.substr(1);
        $(this).parent().siblings(".shop-sum-price").children(".sum").html("￥" + (p * num).toFixed(2));
        getSum();
    });
    //删除购物项
    function deleteShop(id, name) {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/v1/shop/DeleteShop",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ shop_id: parseInt(id), user_name: name }),
            dataType: "json",
            success: function (resp) {
                window.location.reload();
            },
            error: function (resp) {
                // console.log(resp);
            }
        });
    }
    $(".tbd").on("click", ".shop-id", function () {
        var flag = confirm("亲~你确定要删除该商品嘛？");
        var id = $(this).attr("data-id");
        if (flag) {
            deleteShop(id, uname);
        }
    });
    //删除选中的商品
    $(".del").click(function () {
        var status = 0;
        var arr = [];
        $(".select").each(function (index, ele) {
            // console.log(index, $(ele).prop("checked"));
            if ($(ele).prop("checked")) {
                var id = $(this).attr("data-ipt");
                arr.push(id);
                status = 1;
            }
        });
        if (!status) {
            alert("没有选中任何商品");
        } else {
            if (confirm("您确定要删除选中的商品嘛？")) {
                // console.log(arr);
                for (var i = 0; i < arr.length; i++) {
                    // console.log(arr[i]);
                    deleteShop(arr[i], uname);
                }
            }
        }
    });

    //清空购物车
    $(".empty").click(function () {
        var con = confirm("确定要清空购物车吗?");
        if (con) {
            $.ajax({
                type: "post",
                url: "http://localhost:8080/v1/shop/DeleteCart",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({ user_name: uname }),
                dataType: "json",
                success: function (resp) {
                    window.location.reload();
                },
                error: function (resp) {
                    // console.log(resp);
                }
            });
        }
    });
    //去结算
    $(".checkout").click(function () {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/v1/order/CreateOrder",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ user_name: uname }),
            dataType: "json",
            success: function (resp) {
                // console.log(resp);
                window.location.reload();
            },
            error: function (resp) {
                // console.log(resp);
            }
        });
    })
});