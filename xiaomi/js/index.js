window.addEventListener("DOMContentLoaded", function () {
    // 商品列表栏切换
    var shopInfoList = document.getElementById("shop-info-list");
    var shopInfoImgs = shopInfoList.getElementsByClassName("shop-img");
    var shopInfoTitles = shopInfoList.getElementsByClassName("title");
    var shopInfoPrices = shopInfoList.getElementsByClassName("price");

    // 创建 小米手机 对象
    var phoneList = {
        "arr": [
            { "src": "./updateimg/phoneImg/phone_shop01.png", "title": "小米10 青春版 5G", "price": "2099元起" },
            { "src": "./updateimg/phoneImg/phone_shop02.png", "title": "小米10 Pro", "price": "4999元起" },
            { "src": "./updateimg/phoneImg/phone_shop03.png", "title": "小米10", "price": "2099元起" },
            { "src": "./updateimg/phoneImg/phone_shop04.png", "title": "小米CC9", "price": "1499元起" },
            { "src": "./updateimg/phoneImg/phone_shop05.png", "title": "小米CC9e", "price": "2099元起" },
            { "src": "./updateimg/phoneImg/phone_shop06.png", "title": "小米CC9 美图定制版", "price": "1999元起" },
        ]
    };
    // 创建 Redmi红米 对象
    var RedmiList = {
        "arr": [
            { "src": "./updateimg/RedmiImg/Redmi_shop01.png", "title": "Redmi K30 Pro", "price": "2999元起" },
            { "src": "./updateimg/RedmiImg/Redmi_shop02.png", "title": "Redmi K30 Pro 变焦版", "price": "3799元起" },
            { "src": "./updateimg/RedmiImg/Redmi_shop03.png", "title": "Redmi K30", "price": "1599元起" },
            { "src": "./updateimg/RedmiImg/Redmi_shop04.png", "title": "Redmi K30 5G", "price": "1999元起" },
            { "src": "./updateimg/RedmiImg/Redmi_shop05.png", "title": "Redmi 8A", "price": "599元起" },
            { "src": "./updateimg/RedmiImg/Redmi_shop06.png", "title": "Redmi Note 8", "price": "899元起" },
        ]
    };
    // 创建 电视 对象
    var tvList = {
        "arr": [
            { "src": "./updateimg/tvImg/tv_shop01.png", "title": "Redmi 智能电视 MAX 98''", "price": "19999元" },
            { "src": "./updateimg/tvImg/tv_shop02.png", "title": "Redmi 红米电视 70英寸 R70A", "price": "2999元" },
            { "src": "./updateimg/tvImg/tv_shop03.png", "title": "小米壁画电视 65英寸", "price": "6999元" },
            { "src": "./updateimg/tvImg/tv_shop04.png", "title": "小米全屏电视E55A", "price": "1749元" },
            { "src": "./updateimg/tvImg/tv_shop05.png", "title": "小米电视4A 32英寸", "price": "699元" },
            { "src": "./updateimg/tvImg/tv_shop06.png", "title": "小米电视4A 55英寸", "price": "1699元" },
        ]
    };
    // 创建 笔记本 对象
    var computerList = {
        "arr": [
            { "src": "./updateimg/computerImg/computer_shop01.png", "title": "RedmiBook 13", "price": "4199元起" },
            { "src": "./updateimg/computerImg/computer_shop02.png", "title": "小米笔记本Pro 15", "price": "5499元起" },
            { "src": "./updateimg/computerImg/computer_shop03.png", "title": "RedmiBook 14", "price": "3999元起" },
            { "src": "./updateimg/computerImg/computer_shop04.png", "title": "游戏本2019款", "price": "6999元起" },
            { "src": "./updateimg/computerImg/computer_shop05.png", "title": "小米笔记本 15.6''", "price": "3899元起" },
            { "src": "./updateimg/computerImg/computer_shop06.png", "title": "小米笔记本Air 12.5''", "price": "3299元起" },

        ]
    };
    // 创建 家电 对象
    var elecList = {
        "arr": [
            { "src": "./updateimg/electricalImg/electrical_shop01.png", "title": "米家互联网空调C1(一级能效)", "price": "1999元" },
            { "src": "./updateimg/electricalImg/electrical_shop02.png", "title": "米家互联网空调(一级能效)", "price": "1999元" },
            { "src": "./updateimg/electricalImg/electrical_shop03.png", "title": "Redmi全自动波轮洗衣机1A", "price": "749元" },
            { "src": "./updateimg/electricalImg/electrical_shop04.png", "title": "米家互联网洗烘一体机10kg", "price": "1999元" },
            { "src": "./updateimg/electricalImg/electrical_shop05.png", "title": "米家风冷对开门冰箱483L", "price": "2099元" },
            { "src": "./updateimg/electricalImg/electrical_shop06.png", "title": "米家两门冰箱 160L", "price": "899元" },

        ]
    };
    // 创建 路由器 对象
    var routerList = {
        "arr": [
            { "src": "./updateimg/routerImg/router_shop01.png", "title": "小米AloT路由器 AX3600", "price": "599元" },
            { "src": "./updateimg/routerImg/router_shop02.png", "title": "Redmi路由器 AC2100", "price": "169元" },
            { "src": "./updateimg/routerImg/router_shop03.png", "title": "小米路由器 AC2100", "price": "229元" },
            { "src": "./updateimg/routerImg/router_shop04.png", "title": "小米路由器 Mesh", "price": "999元" },
            { "src": "./updateimg/routerImg/router_shop05.png", "title": "小米路由器4A千兆版", "price": "129元" },
            { "src": "./updateimg/routerImg/router_shop06.png", "title": "小米路由器 4C", "price": "59元" },

        ]
    };
    // 创建 智能硬件 对象
    var aiList = {
        "arr": [
            { "src": "./updateimg/aiImg/ai_shop01.png", "title": "小米米家智能摄像机云台版", "price": "199元" },
            { "src": "./updateimg/aiImg/ai_shop02.png", "title": "小米小爱老师", "price": "429元起" },
            { "src": "./updateimg/aiImg/ai_shop03.png", "title": "小米米家智能门锁", "price": "1299元起" },
            { "src": "./updateimg/aiImg/ai_shop04.png", "title": "Redmi小爱触屏音箱 8", "price": "349元" },
            { "src": "./updateimg/aiImg/ai_shop05.png", "title": "小米小爱触屏音箱", "price": "199元起" },
            { "src": "./updateimg/aiImg/ai_shop06.png", "title": "Redmi小爱音箱 Play", "price": "79元起" },
        ]
    };



    var shopGoods = this.document.querySelectorAll(".shop-goods");
    for (var i = 0; i < shopGoods.length; i++) {
        shopGoods[i].setAttribute("index", i);
        shopGoods[i].addEventListener("mouseenter", function () {
            var index = this.getAttribute("index");
            if (index == 0) {
                for (var i = 0; i < shopInfoImgs.length; i++) {
                    shopInfoImgs[i].children[0].src = phoneList.arr[i].src;
                    shopInfoTitles[i].innerHTML = phoneList.arr[i].title;
                    shopInfoPrices[i].innerHTML = phoneList.arr[i].price;
                }
            } else if (index == 1) {
                for (var i = 0; i < shopInfoImgs.length; i++) {
                    shopInfoImgs[i].children[0].src = RedmiList.arr[i].src;
                    shopInfoTitles[i].innerHTML = RedmiList.arr[i].title;
                    shopInfoPrices[i].innerHTML = RedmiList.arr[i].price;
                }
            } else if (index == 2) {
                for (var i = 0; i < shopInfoImgs.length; i++) {
                    shopInfoImgs[i].children[0].src = tvList.arr[i].src;
                    shopInfoTitles[i].innerHTML = tvList.arr[i].title;
                    shopInfoPrices[i].innerHTML = tvList.arr[i].price;
                }
            } else if (index == 3) {
                for (var i = 0; i < shopInfoImgs.length; i++) {
                    shopInfoImgs[i].children[0].src = computerList.arr[i].src;
                    shopInfoTitles[i].innerHTML = computerList.arr[i].title;
                    shopInfoPrices[i].innerHTML = computerList.arr[i].price;
                }
            } else if (index == 4) {
                for (var i = 0; i < shopInfoImgs.length; i++) {
                    shopInfoImgs[i].children[0].src = elecList.arr[i].src;
                    shopInfoTitles[i].innerHTML = elecList.arr[i].title;
                    shopInfoPrices[i].innerHTML = elecList.arr[i].price;
                }
            } else if (index == 5) {
                for (var i = 0; i < shopInfoImgs.length; i++) {
                    shopInfoImgs[i].children[0].src = routerList.arr[i].src;
                    shopInfoTitles[i].innerHTML = routerList.arr[i].title;
                    shopInfoPrices[i].innerHTML = routerList.arr[i].price;
                }
            } else if (index == 6) {
                for (var i = 0; i < shopInfoImgs.length; i++) {
                    shopInfoImgs[i].children[0].src = aiList.arr[i].src;
                    shopInfoTitles[i].innerHTML = aiList.arr[i].title;
                    shopInfoPrices[i].innerHTML = aiList.arr[i].price;
                }
            }
        });
    }




    // 改变小圆圈当前样式
    function setStyle(num) {
        for (var i = 0; i < circlNav.children.length; i++) {
            circlNav.children[i].style.borderColor = "";
            circlNav.children[i].style.backgroundColor = "";
        }
        circlNav.children[num].style.borderColor = "rgba(0, 0, 0,0.4)";
        circlNav.children[num].style.backgroundColor = "rgba(248, 245, 245, 0.864)";
    }
    // 自动切换图片动画
    var timer = null;
    function autoPlay() {
        timer = setInterval(function () {
            num++;
            ul.style.left = -banner.offsetWidth * num + "px";
            if (num == ul.children.length - 1) {
                ul.style.left = 0 + "px";
                num = 0;
            }
            setStyle(num);
        }, 5000);
    }
    autoPlay();
    // 轮播图
    // 获取ul
    var banner = this.document.querySelector(".banner");
    var ul = banner.children[0];
    // 点击切换上一张
    var prev = this.document.querySelector(".prev");
    var num = 0;
    prev.addEventListener("click", function () {
        // 每次点击之前关闭定时器
        clearInterval(timer);
        if (num == 0) {
            ul.style.left = banner.offsetWidth + "px";
            num = ul.children.length - 1;
        }
        num--;
        ul.style.left = -banner.offsetWidth * num + "px";
        // 改变小圆圈当前样式
        setStyle(num);
        // 再次开启
        autoPlay();
    });
    // 点击切换下一张
    var next = this.document.querySelector(".next");
    next.addEventListener("click", function () {
        // 每次点击之前关闭定时器
        clearInterval(timer);
        num++;
        ul.style.left = -banner.offsetWidth * num + "px";
        if (num == ul.children.length - 1) {
            ul.style.left = 0 + "px";
            num = 0;
        }
        // 改变小圆圈当前样式
        setStyle(num);
        // 再次开启
        autoPlay();
    });
    // 获取小圆圈
    var circlNav = this.document.querySelector(".circl-nav");
    // 初始化样式
    circlNav.children[0].style.borderColor = "rgba(0, 0, 0,0.4)";
    circlNav.children[0].style.backgroundColor = "rgba(248, 245, 245, 0.864)";

    // 点击小圆圈切换到指定的图片
    for (var i = 0; i < circlNav.children.length; i++) {
        circlNav.children[i].setAttribute("index", i);
        circlNav.children[i].addEventListener("click", function () {
            // 每次点击之前关闭定时器
            clearInterval(timer);
            ul.style.left = -banner.offsetWidth * this.num + "px";
            // 获取属性值
            var num = this.getAttribute("index");
            ul.style.left = -banner.offsetWidth * num + "px";
            // 改变小圆圈当前样式
            setStyle(num);
            // 再次开启
            autoPlay();
        });
    }


    // 秒杀商品结束时间 倒计时
    var countdown = this.document.querySelector(".countdown");
    var startTime = this.document.querySelector(".start-time");
    var spans = countdown.querySelectorAll("span");

    spans[0].innerHTML = "0" + 3;
    spans[1].innerHTML = 59;
    spans[2].innerHTML = 60;

    var hour = 3;
    var minute = 59;
    var second = 60;
    setInterval(function () {
        second--;
        spans[2].innerHTML = second;
        if (second < 10) {
            spans[2].innerHTML = "0" + second;
        }
        if (second == 0) {
            minute--;
            second = 60;
            spans[1].innerHTML = minute;
        }
        if (minute < 10) {
            spans[1].innerHTML = "0" + minute;
        }
        if (minute == 0) {
            hour--;
            if (hour == -1) {
                startTime.innerHTML = "18:00场";
                hour = 3;
                minute = 59;
                second = 60;
            }
            minute = 59;
            spans[0].innerHTML = "0" + hour;
        }
    }, 1000);

    // 秒杀商品自动切换
    var discountList = this.document.querySelector(".discount-list");
    var discountShopList = discountList.children[0];

    var timer1 = null;
    timer1 = this.setInterval(function () {
        // 设置随机颜色
        var count1 = Math.random() * 255;
        var count2 = Math.random() * 255;
        var count3 = Math.random() * 255;
        var num1 = Math.round(count1);
        var num2 = Math.round(count2);
        var num3 = Math.round(count3);

        // 获取所有的li 设置上边框
        for (var i = 0; i < discountShopList.children.length; i++) {
            discountShopList.children[i].style.borderTopColor = "rgb(" + num1 + "," + num2 + "," + num3 + ")";
        }
        if (count == discountShopList.children.length / 4 - 1) {
            count = 0;
            animate(discountShopList, (-discountList.offsetWidth - 16) * count);
        } else {
            count++;
            animate(discountShopList, (-discountList.offsetWidth - 16) * count);
        }
    }, 3000);

    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
            obj.style.left = obj.offsetLeft + step + "px";
        }, 15);
    }
    // 点击按钮切换列表，停止动画
    var controlsArrow = this.document.querySelector(".controls-arrow");
    var controlsPrev = controlsArrow.children[0];

    controlsPrev.addEventListener("click", function () {
        clearInterval(timer1);
        if (count == 0) {
            discountShopList.style.left = (-discountList.offsetWidth - 16) * count + "px";
        } else {
            count--;
            discountShopList.style.left = (-discountList.offsetWidth - 16) * count + "px";
            setControlBtn(count);
        }
    });

    var controlsNext = controlsArrow.children[1];
    var count = 0;
    controlsNext.addEventListener("click", function () {
        clearInterval(timer1);
        if (count == discountShopList.children.length / 4 - 1) {
            discountShopList.style.left = (-discountList.offsetWidth - 16) * count + "px";
        } else {
            count++;
            discountShopList.style.left = (-discountList.offsetWidth - 16) * count + "px";
            setControlBtn(count);
        }
    });

    // 设置按钮样式,有问题还需要完善
    setControlBtn(count);
    function setControlBtn(count) {
        if (count == 0) {
            controlsPrev.className = "disable";
        } else {
            controlsPrev.className = "";

            controlsPrev.addEventListener("mouseenter", function () {
                controlsPrev.className = "enter";
            });
            controlsPrev.addEventListener("mouseleave", function () {
                controlsPrev.className = "leave";
            });
        }
        if (count == 3) {
            controlsNext.className = "disable";
        } else {
            controlsNext.className = "";

            controlsNext.addEventListener("mouseenter", function () {
                controlsNext.className = "enter";
            });
            controlsNext.addEventListener("mouseleave", function () {
                controlsNext.className = "leave";
            });
        }
    }


    // 主页面模块替换图片，创建每个模块的对象
    // 创建主页家电模块
    var electricPage = {
        "arr1": [
            { "src": "./updateimg/tvPageImg/tv_shop01.png", "title": "Redmi 红米电视 70英寸", "describe": "70英寸震撼巨屏，4K画质，细腻如真", "price": "<span>2999</span>元 <del>3799元</del>" },
            { "src": "./updateimg/tvPageImg/tv_shop02.png", "title": "小米全面屏电视E32C", "describe": "全面屏设计，人工智能系统", "price": "<span>699</span>元 <del>899元</del>" },
            { "src": "./updateimg/tvPageImg/tv_shop03.png", "title": "小米全面屏电视E55A", "describe": "全面屏设计，人工智能语音", "price": "<span>1749</span>元 <del>1999元</del>" },
            { "src": "./updateimg/tvPageImg/tv_shop04.png", "title": "米家空调", "describe": "出众静音，快速制冷热", "price": "<span>1299</span>元 <del>1799元</del>" },
            { "src": "./updateimg/tvPageImg/tv_shop05.png", "title": "米家互联网洗烘一体机 Pro 10kg", "describe": "智能洗烘，省心省力", "price": "<span>2999</span>元 <del></del>" },
            { "src": "./updateimg/tvPageImg/tv_shop06.png", "title": "Redmi全自动波轮洗衣机1A 8kg", "describe": "一键操作，父母都爱用", "price": "<span>749</span>元 <del>899元</del>" },
            { "src": "./updateimg/tvPageImg/tv_shop07.png", "title": "15.6''四核i7 16G 独显 512G", "describe": "全面均衡的国民轻薄本", "price": "<span>4699</span>元 <del>4899元</del>" },
            { "src": "./updateimg/tvPageImg/tv_shop08.png", "title": "Air 13.3''2019款", "describe": "", "price": "<span>3999</span>元起 <del></del>" },
        ],
        "arr2": [
            { "src": "./updateimg/tvPageImg/tv_shop09.png", "title": "小米电视4C 32英寸", "describe": "高清液晶屏，人工智能系统", "price": "<span>699</span>元 <del>799元</del>" },
            { "src": "./updateimg/tvPageImg/tv_shop10.png", "title": "全面屏电视 55英寸E55X", "describe": "潮流全面屏设计", "price": "<span>1749</span>元 <del>1999元</del>" },
            { "src": "./updateimg/tvPageImg/tv_shop11.png", "title": "小米电视4A 70英寸", "describe": "大屏更享受", "price": "<span>2999</span>元 <del>3999元</del>" },
            { "src": "./updateimg/tvPageImg/tv_shop12.png", "title": "小米电视4C 43英寸", "describe": "FHD全高清屏，刚请烤漆", "price": "<span>999</span>元 <del>1399元</del>" },
            { "src": "./updateimg/tvPageImg/tv_shop13.png", "title": "小米电视4S 75英寸", "describe": "4K HDR，人工智能语音", "price": "<span>4499</span>元 <del>5999元</del>" },
            { "src": "./updateimg/tvPageImg/tv_shop14.png", "title": "小米全面屏电视65英寸 E65C", "describe": "震撼大屏，时尚全面屏", "price": "<span>2599</span>元 <del>3099元</del>" },
            { "src": "./updateimg/tvPageImg/tv_shop15.png", "title": "小米全面屏电视E32C", "describe": "全面屏设计，人工智能系统", "price": "<span>699</span>元 <del>899元</del>" },
            { "src": "./updateimg/tvPageImg/tv_shop16.png", "title": "小米壁画电视65英寸", "describe": "", "price": "<span>6999</span>元 <del></del>" },
        ]
    }
    // 创建主页智能模块
    var aiPage = {
        "arr1": [
            { "src": "./updateimg/aiPageImg/ai_shop01.png", "title": "小米 [小爱老师]", "describe": "英语提分利器", "price": "<span>429</span>元起 <del>499元</del>" },
            { "src": "./updateimg/aiPageImg/ai_shop02.png", "title": "小米米家智能门锁 推拉式", "describe": "一步推拉，高端智能门锁", "price": "<span>1599</span>元 <del>1699元</del>" },
            { "src": "./updateimg/aiPageImg/ai_shop03.png", "title": "小米小爱音箱 Play", "describe": "听音乐、语音遥控家电", "price": "<span>89元</span>元 <del>169元</del>" },
            { "src": "./updateimg/aiPageImg/ai_shop04.png", "title": "小爱音箱万能遥控版", "describe": "传统家电秒变智能", "price": "<span>149</span>元 <del>199元</del>" },
            { "src": "./updateimg/aiPageImg/ai_shop05.png", "title": "米家电饭煲4L", "describe": "890W 立体加热", "price": "<span>249</span>元 <del>299元</del>" },
            { "src": "./updateimg/aiPageImg/ai_shop06.png", "title": "小米手环", "describe": "大屏彩显，20天超长续航", "price": "<span>169</span>元 <del></del>" },
            { "src": "./updateimg/aiPageImg/ai_shop07.png", "title": "小米体脂称2", "describe": "轻松掌握身体脂肪率", "price": "<span>99</span>元 <del></del>" },
            { "src": "./updateimg/aiPageImg/ai_shop08.png", "title": "九号平衡车", "describe": "", "price": "<span>1899</span>元 <del></del>" },
        ],
        "arr2": [
            { "src": "./updateimg/aiPageImg/ai_shop09.png", "title": "米家智能门锁 标准锁体 碳素黑", "describe": "一体化活体指纹识别，多种开锁方式", "price": "<span>1199</span>元 <del>1299元</del>" },
            { "src": "./updateimg/aiPageImg/ai_shop10.png", "title": "米家智能门锁 标准锁体 磨砂金", "describe": "全新磨砂金配金色，精湛工艺升级", "price": "<span>1199</span>元 <del>1499元</del>" },
            { "src": "./updateimg/aiPageImg/ai_shop11.png", "title": "米家智能门锁 推拉式 通用版", "describe": "一步推拉，高端智能门锁", "price": "<span>1599</span>元 <del>1699元</del>" },
            { "src": "./updateimg/aiPageImg/ai_shop12.png", "title": "米家智能门锁 青春版", "describe": "隐形指纹识别设计 简单一步快进家门", "price": "<span>999</span>元 <del></del>" },
            { "src": "./updateimg/aiPageImg/ai_shop13.png", "title": "米家智能门锁 霸王锁体 碳素黑", "describe": "一体化活体指纹识别，多种开锁方式", "price": "<span>1499</span>元 <del>1599元</del>" },
            { "src": "./updateimg/aiPageImg/ai_shop14.png", "title": "米家智能门锁 霸王锁体 磨砂金", "describe": "适配霸王锁体，多种开锁方式", "price": "<span>1499</span>元 <del>1799元</del>" },
            { "src": "./updateimg/aiPageImg/ai_shop15.png", "title": "小米米家小白智能摄像机增强版", "describe": "智能看护，AI你所爱", "price": "<span>399</span>元 <del></del>" },
            { "src": "./updateimg/aiPageImg/ai_shop16.png", "title": "小米米家智能摄像机云台版", "describe": "", "price": "<span>2999</span>元 <del>199元</del>" },
        ],
        "arr3": [
            { "src": "./updateimg/aiPageImg/ai_shop17.png", "title": "小米米家电动滑板车", "describe": "便携折叠，自由穿行", "price": "<span>1899</span>元 <del>1999元</del>" },
            { "src": "./updateimg/aiPageImg/ai_shop18.png", "title": "米兔折叠婴儿推车", "describe": "出发去向往的地方", "price": "<span>649</span>元 <del>699元</del>" },
            { "src": "./updateimg/aiPageImg/ai_shop19.png", "title": "九号平衡车 Plus", "describe": "一个形影不离的新伙伴", "price": "<span>3199</span>元 <del>3499元</del>" },
            { "src": "./updateimg/aiPageImg/ai_shop20.png", "title": "米家充气宝", "describe": "便携电动打气筒", "price": "<span>199</span>元 <del></del>" },
            { "src": "./updateimg/aiPageImg/ai_shop21.png", "title": "小米小背包", "describe": "城市休闲，简约设计", "price": "<span>24.9</span>元起 <del></del>" },
            { "src": "./updateimg/aiPageImg/ai_shop22.png", "title": "小米旅行箱 青春版", "describe": "环保材料，轻便重量", "price": "<span>199</span>元起 <del></del>" },
            { "src": "./updateimg/aiPageImg/ai_shop23.png", "title": "骑记电动助力自行车 新国际版本 黑色", "describe": "更多助力选择，更多城市风景", "price": "<span>2799</span>元 <del>2999元</del>" },
            { "src": "./updateimg/aiPageImg/ai_shop24.png", "title": "小米米家对讲机2", "describe": "", "price": "<span>429</span>元 <del></del>" },
        ]
    }
    // 创建主页搭配模块
    var dpPage = {
        "arr1": [
            { "src": "./updateimg/dpPageImg/dp_shop01.png", "title": "小米真无线蓝牙耳机 Air 2", "describe": "智能真无线，轻松舒适戴", "price": "<span>369</span>元 <del>399元</del>" },
            { "src": "./updateimg/dpPageImg/dp_shop02.png", "title": "高速无线充套装", "describe": "快速无线闪充，Qi充电标准", "price": "<span>149</span>元 <del></del>" },
            { "src": "./updateimg/dpPageImg/dp_shop03.png", "title": "Redmi充电宝 10000mAh 标准版 白色", "describe": "10000mAh大电量", "price": "<span>55</span>元 <del></del>" },
            { "src": "./updateimg/dpPageImg/dp_shop04.png", "title": "Redmi充电宝 20000mAh 快充版", "describe": "大容量，可上飞机", "price": "<span>99</span>元 <del></del>" },
            { "src": "./updateimg/dpPageImg/dp_shop05.png", "title": "小米插线板 5孔位", "describe": "多重安全保护", "price": "<span>39</span>元 <del></del>" },
            { "src": "./updateimg/dpPageImg/dp_shop06.png", "title": "小米蓝牙耳机AirDots青春版", "describe": "雅致简约，收纳充电盒", "price": "<span>199</span>元 <del></del>" },
            { "src": "./updateimg/dpPageImg/dp_shop07.png", "title": "小米小爱蓝牙音箱 随身版", "describe": "小巧便携，一键唤醒小爱", "price": "<span>39</span>元 <del>49元</del>" },
            { "src": "./updateimg/dpPageImg/dp_shop08.png", "title": "小米小爱触屏音箱", "describe": "", "price": "<span>199</span>元起 <del></del>" },
        ],
        "arr2": [
            { "src": "./updateimg/dpPageImg/dp_shop09.png", "title": "小米真无线蓝牙耳机 Air 2", "describe": "智能真无线，轻松舒适戴", "price": "<span>369</span>元 <del>399元</del>" },
            { "src": "./updateimg/dpPageImg/dp_shop10.png", "title": "小米降噪项圈蓝牙耳机", "describe": "无线降噪，静无止境", "price": "<span>399</span>元 <del>499元</del>" },
            { "src": "./updateimg/dpPageImg/dp_shop11.png", "title": "小米蓝牙耳机AirDots青春版", "describe": "雅致简约，收纳充电盒", "price": "<span>199</span>元 <del></del>" },
            { "src": "./updateimg/dpPageImg/dp_shop12.png", "title": "小米小爱音箱 Pro", "describe": "语音遥控5000+品牌主流家电", "price": "<span>299</span>元 <del></del>" },
            { "src": "./updateimg/dpPageImg/dp_shop13.png", "title": "小米运动蓝牙耳机青春版", "describe": "音随你动", "price": "<span>99</span>元 <del></del>" },
            { "src": "./updateimg/dpPageImg/dp_shop14.png", "title": "小米蓝牙项圈耳机", "describe": "挂在脖子上的好耳机", "price": "<span>269</span>元 <del>299元</del>" },
            { "src": "./updateimg/dpPageImg/dp_shop15.png", "title": "小米双单元半入耳式耳机", "describe": "半入耳式舒适佩戴", "price": "<span>59</span>元 <del>69元</del>" },
            { "src": "./updateimg/dpPageImg/dp_shop16.png", "title": "小米随身蓝牙音箱", "describe": "", "price": "<span>69</span>元 <del></del>" },
        ]
    }
    // 创建主页配件模块
    var pjPage = {
        "arr1": [
            { "src": "./updateimg/pjPageImg/pj_shop01.png", "title": "小米USB充电器30W快充版本(1A1C)", "describe": "多一种接口，多一种选择", "price": "<span>59</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop02.png", "title": "高速无线充套装", "describe": "快速无线闪充，Qi充电标准", "price": "<span>149</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop03.png", "title": "小米无线充电宝青春版10000mAh", "describe": "能量满满，无线有线都能充", "price": "<span>129</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop04.png", "title": "米家LED随身灯", "describe": "小巧轻便 5级亮度调节", "price": "<span>19.9</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop05.png", "title": "移动电源高配版(10000mAh)", "describe": "轻薄设计，轻松出行", "price": "<span>129</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop06.png", "title": "小米二合一数据线100cm", "describe": "支持快充，安全保护", "price": "<span>24.9</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop07.png", "title": "小米真无线蓝牙耳机 Air 2", "describe": "智能真无线，轻松舒适戴", "price": "<span>369</span>元 <del>399元</del>" },
            { "src": "./updateimg/pjPageImg/pj_shop08.png", "title": "小米CC9e高透果冻保护壳", "describe": "", "price": "<span>49</span>元 <del></del>" },
        ],
        "arr2": [
            { "src": "./updateimg/pjPageImg/pj_shop09.png", "title": "小米CC9&小米CC9美图定制版 标准高透贴膜", "describe": "高清透亮，耐磨性强", "price": "<span>19</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop10.png", "title": "小米CC9e 标准高透贴膜", "describe": "高清透亮，耐磨性强", "price": "<span>19</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop11.png", "title": "Redmi 7A标准高透贴膜", "describe": "高清高透，精彩清晰可见", "price": "<span>19</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop12.png", "title": "小仙女心愿手链保护壳", "describe": "手链绕于指尖，仙气满满", "price": "<span>199</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop13.png", "title": "小米CC9 荧光色高透果冻保护壳", "describe": "玩转多彩青春色", "price": "<span>49</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop14.png", "title": "小米9 ARE U OK 保护壳", "describe": "一个与众不同的保护壳", "price": "<span>39</span>元 <del>49元</del>" },
            { "src": "./updateimg/pjPageImg/pj_shop14.png", "title": "小米9 ARE U OK 保护壳", "describe": "一个与众不同的保护壳", "price": "<span>39</span>元 <del>49元</del>" },
            { "src": "./updateimg/pjPageImg/pj_shop14.png", "title": "小米9 ARE U OK 保护壳", "describe": "", "price": "<span>39</span>元 <del></del>" },
        ],
        "arr3": [
            { "src": "./updateimg/pjPageImg/pj_shop15.png", "title": "小米USB充电器30W快充版本(1A1C)", "describe": "多一种接口，多一种选择", "price": "<span>59</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop16.png", "title": "小米USB充电器快充版(18W)", "describe": "安卓、苹果设备均可使用", "price": "<span>29.9</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop17.png", "title": "小米USB充电器60W快充版本(6口)", "describe": "6口输出，USB-C输出接口", "price": "<span>129</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop18.png", "title": "小米USB充电器36W快充版本(2口)", "describe": "多重安全保护，小巧便携", "price": "<span>59</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop19.png", "title": "小米车载充电器快充版", "describe": "让爱车成为移动充电站", "price": "<span>69</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop20.png", "title": "小米车载充电器快充版(37W)", "describe": "双口快充，车载充电更安全", "price": "<span>49</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop21.png", "title": "小米二合一移动电源(充电器)", "describe": "一个设备多种用途", "price": "<span>99</span>元 <del></del>" },
            { "src": "./updateimg/pjPageImg/pj_shop21.png", "title": "小米二合一移动电源(充电器)", "describe": "", "price": "<span>99</span>元 <del></del>" },
        ]
    }
    // 创建主页周边模块
    var zbPage = {
        "arr1": [
            { "src": "./updateimg/zbPageImg/zb_shop01.png", "title": "米家飞行员太阳镜 Pro", "describe": "尼龙偏光，轻巧佩戴", "price": "<span>169</span>元 <del>199元</del>" },
            { "src": "./updateimg/zbPageImg/zb_shop02.png", "title": "小米巨能写中性笔10支装", "describe": "一支顶4支，超长顺滑书写", "price": "<span>9.99</span>元 <del></del>" },
            { "src": "./updateimg/zbPageImg/zb_shop03.png", "title": "小米旅行箱 20英寸 布朗熊限量版", "describe": "“国际巨星” LINE FRIENDS布朗熊", "price": "<span>299</span>元 <del>399元</del>" },
            { "src": "./updateimg/zbPageImg/zb_shop04.png", "title": "米家迷你保温杯", "describe": "可以随身携带的温度", "price": "<span>49</span>元 <del></del>" },
            { "src": "./updateimg/zbPageImg/zb_shop05.png", "title": "米家驱蚊器基础版 3个装", "describe": "3个装 长效驱蚊", "price": "<span>99</span>元 <del>129元</del>" },
            { "src": "./updateimg/zbPageImg/zb_shop06.png", "title": "3卷装抽绳式垃圾袋", "describe": "让清洁更简单", "price": "<span>9.9</span>元 <del>14.9元</del>" },
            { "src": "./updateimg/zbPageImg/zb_shop07.png", "title": "贝医生巴氏牙刷 四色装", "describe": "进口刷毛，好品质", "price": "<span>39.9</span>元 <del></del>" },
            { "src": "./updateimg/zbPageImg/zb_shop08.png", "title": "8H 乳胶弹簧静音床垫 M3", "describe": "", "price": "<span>1399</span>元起 <del></del>" },
        ],
        "arr2": [
            { "src": "./updateimg/zbPageImg/zb_shop09.png", "title": "90分框体旅行箱", "describe": "专利轻量合金中框，轻盈坚固", "price": "<span>599</span>元 <del></del>" },
            { "src": "./updateimg/zbPageImg/zb_shop10.png", "title": "小米商旅多功能双肩包 2", "describe": "商务旅行多场景，切换无压力", "price": "<span>199</span>元 <del></del>" },
            { "src": "./updateimg/zbPageImg/zb_shop11.png", "title": "米家飞行员太阳镜 Pro", "describe": "尼龙偏光，轻巧佩戴", "price": "<span>169</span>元 <del>199元</del>" },
            { "src": "./updateimg/zbPageImg/zb_shop12.png", "title": "自动折叠伞", "describe": "防泼水伞布，轻盈拒水", "price": "<span>89</span>元 <del>99元</del>" },
            { "src": "./updateimg/zbPageImg/zb_shop13.png", "title": "最生活毛巾·青春系列", "describe": "3秒吸水，杀菌无刺激", "price": "<span>19.9</span>元 <del></del>" },
            { "src": "./updateimg/zbPageImg/zb_shop14.png", "title": "九号平衡车", "describe": "年轻人的酷玩具", "price": "<span>1899</span>元 <del>1999元</del>" },
            { "src": "./updateimg/zbPageImg/zb_shop15.png", "title": "小米米家电动滑板车 Pro", "describe": "性能提升，动力更强劲", "price": "<span>2699</span>元 <del>2799元</del>" },
            { "src": "./updateimg/zbPageImg/zb_shop16.png", "title": "米家经典方框太阳镜", "describe": "", "price": "<span>89</span>元 <del></del>" },
        ]
    }
    var hotWords = document.querySelectorAll(".hotwords");
    var lastShopTitle = document.querySelectorAll("lastshop-title");
    var moreHots = document.querySelectorAll(".more-hot");
    // 获取家电模块里对应的元素
    var electricShop = document.querySelector(".electric-shop");
    var electricShopImg = electricShop.querySelectorAll(".shop-img");
    var electricShopTile = electricShop.querySelectorAll(".title");
    var electricShopDescribe = electricShop.querySelectorAll(".describe");
    var electricShopPrice = electricShop.querySelectorAll(".price");
    // 获取智能模块里对应的元素
    var AIShop = document.querySelector(".ai-shop");
    var AIShopImg = AIShop.querySelectorAll(".shop-img");
    var AIShopTile = AIShop.querySelectorAll(".title");
    var AIShopDescribe = AIShop.querySelectorAll(".describe");
    var AIShopPrice = AIShop.querySelectorAll(".price");
    // 获取搭配模块里对应的元素
    var dpShop = document.querySelector(".dapei-shop");
    var dpShopImg = dpShop.querySelectorAll(".shop-img");
    var dpShopTile = dpShop.querySelectorAll(".title");
    var dpShopDescribe = dpShop.querySelectorAll(".describe");
    var dpShopPrice = dpShop.querySelectorAll(".price");
    // 获取配件模块里对应的元素
    var pjShop = document.querySelector(".peijian-shop");
    var pjShopImg = pjShop.querySelectorAll(".shop-img");
    var pjShopTile = pjShop.querySelectorAll(".title");
    var pjShopDescribe = pjShop.querySelectorAll(".describe");
    var pjShopPrice = pjShop.querySelectorAll(".price");
    // 获取周边模块里对应的元素
    var zbShop = document.querySelector(".zhoubian-shop");
    var zbShopImg = zbShop.querySelectorAll(".shop-img");
    var zbShopTile = zbShop.querySelectorAll(".title");
    var zbShopDescribe = zbShop.querySelectorAll(".describe");
    var zbShopPrice = zbShop.querySelectorAll(".price");

    for (var i = 0; i < hotWords.length; i++) {
        hotWords[i].setAttribute("index", i);
        hotWords[i].addEventListener("mouseover", function (e) {
            var index = this.getAttribute("index");
            if (index == 0) {
                if (e.target.className == "link1") {
                    this.children[1].classList.remove("active");
                    this.children[0].classList.add("active");

                    for (var i = 0; i < electricPage.arr1.length - 1; i++) {
                        electricShopImg[i].children[0].src = electricPage.arr1[i].src;
                        electricShopTile[i].innerHTML = electricPage.arr1[i].title;
                        electricShopDescribe[i].innerHTML = electricPage.arr1[i].describe;
                        electricShopPrice[i].innerHTML = electricPage.arr1[i].price;
                    }

                    electricShopImg[electricPage.arr1.length - 1].children[0].src = electricPage.arr1[electricPage.arr1.length - 1].src;
                    lastShopTitle.innerHTML = electricPage.arr1[electricPage.arr1.length - 1].title;
                    electricShopPrice[electricPage.arr1.length - 1].innerHTML = electricPage.arr1[electricPage.arr1.length - 1].price;
                    moreHots[index].querySelector("span").innerHTML = hotWords[index].children[0].innerHTML;
                } else if (e.target.className == "link2") {
                    this.children[0].classList.remove("active");
                    this.children[1].classList.add("active");

                    for (var i = 0; i < electricPage.arr2.length - 1; i++) {
                        electricShopImg[i].children[0].src = electricPage.arr2[i].src;
                        electricShopTile[i].innerHTML = electricPage.arr2[i].title;
                        electricShopDescribe[i].innerHTML = electricPage.arr2[i].describe;
                        electricShopPrice[i].innerHTML = electricPage.arr2[i].price;
                    }

                    electricShopImg[electricPage.arr2.length - 1].children[0].src = electricPage.arr2[electricPage.arr2.length - 1].src;
                    lastShopTitle.innerHTML = electricPage.arr2[electricPage.arr2.length - 1].title;
                    electricShopPrice[electricPage.arr2.length - 1].innerHTML = electricPage.arr2[electricPage.arr2.length - 1].price;
                    moreHots[index].querySelector("span").innerHTML = hotWords[index].children[1].innerHTML;
                }
            } else if (index == 1) {
                if (e.target.className == "link1") {
                    this.children[2].classList.remove("active");
                    this.children[1].classList.remove("active");
                    this.children[0].classList.add("active");

                    for (var i = 0; i < aiPage.arr1.length - 1; i++) {
                        AIShopImg[i].children[0].src = aiPage.arr1[i].src;
                        AIShopTile[i].innerHTML = aiPage.arr1[i].title;
                        AIShopDescribe[i].innerHTML = aiPage.arr1[i].describe;
                        AIShopPrice[i].innerHTML = aiPage.arr1[i].price;
                    }

                    AIShopImg[aiPage.arr1.length - 1].children[0].src = aiPage.arr1[aiPage.arr1.length - 1].src;
                    lastShopTitle.innerHTML = aiPage.arr1[aiPage.arr1.length - 1].title;
                    AIShopPrice[aiPage.arr1.length - 1].innerHTML = aiPage.arr1[aiPage.arr1.length - 1].price;
                    moreHots[index].querySelector("span").innerHTML = hotWords[index].children[0].innerHTML;
                } else if (e.target.className == "link2") {
                    this.children[2].classList.remove("active");
                    this.children[0].classList.remove("active");
                    this.children[1].classList.add("active");

                    for (var i = 0; i < aiPage.arr2.length - 1; i++) {
                        AIShopImg[i].children[0].src = aiPage.arr2[i].src;
                        AIShopTile[i].innerHTML = aiPage.arr2[i].title;
                        AIShopDescribe[i].innerHTML = aiPage.arr2[i].describe;
                        AIShopPrice[i].innerHTML = aiPage.arr2[i].price;
                    }

                    AIShopImg[aiPage.arr2.length - 1].children[0].src = aiPage.arr2[aiPage.arr2.length - 1].src;
                    lastShopTitle.innerHTML = aiPage.arr2[aiPage.arr2.length - 1].title;
                    AIShopPrice[aiPage.arr2.length - 1].innerHTML = aiPage.arr2[aiPage.arr2.length - 1].price;
                    moreHots[index].querySelector("span").innerHTML = hotWords[index].children[1].innerHTML;
                } else if (e.target.className == "link3") {
                    this.children[0].classList.remove("active");
                    this.children[1].classList.remove("active");
                    this.children[2].classList.add("active");

                    for (var i = 0; i < aiPage.arr3.length - 1; i++) {
                        AIShopImg[i].children[0].src = aiPage.arr3[i].src;
                        AIShopTile[i].innerHTML = aiPage.arr3[i].title;
                        AIShopDescribe[i].innerHTML = aiPage.arr3[i].describe;
                        AIShopPrice[i].innerHTML = aiPage.arr3[i].price;
                    }

                    AIShopImg[aiPage.arr3.length - 1].children[0].src = aiPage.arr3[aiPage.arr3.length - 1].src;
                    lastShopTitle.innerHTML = aiPage.arr3[aiPage.arr3.length - 1].title;
                    AIShopPrice[aiPage.arr3.length - 1].innerHTML = aiPage.arr3[aiPage.arr3.length - 1].price;
                    moreHots[index].querySelector("span").innerHTML = hotWords[index].children[2].innerHTML;
                }

            } else if (index == 2) {
                if (e.target.className == "link1") {
                    this.children[1].classList.remove("active");
                    this.children[0].classList.add("active");

                    for (var i = 0; i < dpPage.arr1.length - 1; i++) {
                        dpShopImg[i].children[0].src = dpPage.arr1[i].src;
                        dpShopTile[i].innerHTML = dpPage.arr1[i].title;
                        dpShopDescribe[i].innerHTML = dpPage.arr1[i].describe;
                        dpShopPrice[i].innerHTML = dpPage.arr1[i].price;
                    }

                    dpShopImg[dpPage.arr1.length - 1].children[0].src = dpPage.arr1[dpPage.arr1.length - 1].src;
                    lastShopTitle.innerHTML = dpPage.arr1[dpPage.arr1.length - 1].title;
                    dpShopPrice[dpPage.arr1.length - 1].innerHTML = electdpPagericPage.arr1[dpPage.arr1.length - 1].price;
                    moreHots[index].querySelector("span").innerHTML = hotWords[index].children[0].innerHTML;
                } else if (e.target.className == "link2") {
                    this.children[0].classList.remove("active");
                    this.children[1].classList.add("active");

                    for (var i = 0; i < dpPage.arr2.length - 1; i++) {
                        dpShopImg[i].children[0].src = dpPage.arr2[i].src;
                        dpShopTile[i].innerHTML = dpPage.arr2[i].title;
                        dpShopDescribe[i].innerHTML = dpPage.arr2[i].describe;
                        dpShopPrice[i].innerHTML = dpPage.arr2[i].price;
                    }

                    dpShopImg[dpPage.arr2.length - 1].children[0].src = dpPage.arr2[dpPage.arr2.length - 1].src;
                    lastShopTitle.innerHTML = dpPage.arr2[dpPage.arr2.length - 1].title;
                    dpShopPrice[dpPage.arr2.length - 1].innerHTML = dpPage.arr2[dpPage.arr2.length - 1].price;
                    moreHots[index].querySelector("span").innerHTML = hotWords[index].children[1].innerHTML;
                }

            } else if (index == 3) {
                if (e.target.className == "link1") {
                    this.children[2].classList.remove("active");
                    this.children[1].classList.remove("active");
                    this.children[0].classList.add("active");

                    for (var i = 0; i < pjPage.arr1.length - 1; i++) {
                        pjShopImg[i].children[0].src = pjPage.arr1[i].src;
                        pjShopTile[i].innerHTML = pjPage.arr1[i].title;
                        pjShopDescribe[i].innerHTML = pjPage.arr1[i].describe;
                        pjShopPrice[i].innerHTML = pjPage.arr1[i].price;
                    }

                    pjShopImg[pjPage.arr1.length - 1].children[0].src = pjPage.arr1[pjPage.arr1.length - 1].src;
                    lastShopTitle.innerHTML = pjPage.arr1[pjPage.arr1.length - 1].title;
                    pjShopPrice[pjPage.arr1.length - 1].innerHTML = pjPage.arr1[pjPage.arr1.length - 1].price;
                    moreHots[index].querySelector("span").innerHTML = hotWords[index].children[0].innerHTML;
                } else if (e.target.className == "link2") {
                    this.children[2].classList.remove("active");
                    this.children[0].classList.remove("active");
                    this.children[1].classList.add("active");

                    for (var i = 0; i < pjPage.arr2.length - 1; i++) {
                        pjShopImg[i].children[0].src = pjPage.arr2[i].src;
                        pjShopTile[i].innerHTML = pjPage.arr2[i].title;
                        pjShopDescribe[i].innerHTML = pjPage.arr2[i].describe;
                        pjShopPrice[i].innerHTML = pjPage.arr2[i].price;
                    }

                    pjShopImg[pjPage.arr2.length - 1].children[0].src = pjPage.arr2[pjPage.arr2.length - 1].src;
                    lastShopTitle.innerHTML = pjPage.arr2[pjPage.arr2.length - 1].title;
                    pjShopPrice[pjPage.arr2.length - 1].innerHTML = pjPage.arr2[pjPage.arr2.length - 1].price;
                    moreHots[index].querySelector("span").innerHTML = hotWords[index].children[1].innerHTML;
                } else if (e.target.className == "link3") {
                    this.children[0].classList.remove("active");
                    this.children[1].classList.remove("active");
                    this.children[2].classList.add("active");

                    for (var i = 0; i < pjPage.arr3.length - 1; i++) {
                        pjShopImg[i].children[0].src = pjPage.arr3[i].src;
                        pjShopTile[i].innerHTML = pjPage.arr3[i].title;
                        pjShopDescribe[i].innerHTML = pjPage.arr3[i].describe;
                        pjShopPrice[i].innerHTML = pjPage.arr3[i].price;
                    }

                    pjShopImg[pjPage.arr3.length - 1].children[0].src = pjPage.arr3[pjPage.arr3.length - 1].src;
                    lastShopTitle.innerHTML = pjPage.arr3[pjPage.arr3.length - 1].title;
                    pjShopPrice[pjPage.arr3.length - 1].innerHTML = pjPage.arr3[pjPage.arr3.length - 1].price;
                    moreHots[index].querySelector("span").innerHTML = hotWords[index].children[2].innerHTML;
                }

            } else if (index == 4) {
                if (e.target.className == "link1") {
                    this.children[1].classList.remove("active");
                    this.children[0].classList.add("active");

                    for (var i = 0; i < zbPage.arr1.length - 1; i++) {
                        zbShopImg[i].children[0].src = zbPage.arr1[i].src;
                        zbShopTile[i].innerHTML = zbPage.arr1[i].title;
                        zbShopDescribe[i].innerHTML = zbPage.arr1[i].describe;
                        zbShopPrice[i].innerHTML = zbPage.arr1[i].price;
                    }

                    zbShopImg[zbPage.arr1.length - 1].children[0].src = zbPage.arr1[zbPage.arr1.length - 1].src;
                    lastShopTitle.innerHTML = zbPage.arr1[zbPage.arr1.length - 1].title;
                    zbShopPrice[zbPage.arr1.length - 1].innerHTML = zbPage.arr1[zbPage.arr1.length - 1].price;
                    moreHots[index].querySelector("span").innerHTML = hotWords[index].children[0].innerHTML;
                } else if (e.target.className == "link2") {
                    this.children[0].classList.remove("active");
                    this.children[1].classList.add("active");

                    for (var i = 0; i < zbPage.arr2.length - 1; i++) {
                        zbShopImg[i].children[0].src = zbPage.arr2[i].src;
                        zbShopTile[i].innerHTML = zbPage.arr2[i].title;
                        zbShopDescribe[i].innerHTML = zbPage.arr2[i].describe;
                        zbShopPrice[i].innerHTML = zbPage.arr2[i].price;
                    }

                    zbShopImg[zbPage.arr2.length - 1].children[0].src = zbPage.arr2[zbPage.arr2.length - 1].src;
                    lastShopTitle.innerHTML = zbPage.arr2[zbPage.arr2.length - 1].title;
                    zbShopPrice[zbPage.arr2.length - 1].innerHTML = zbPage.arr2[zbPage.arr2.length - 1].price;
                    moreHots[index].querySelector("span").innerHTML = hotWords[index].children[1].innerHTML;
                }

            }
        });
    }
    // 视频播放模块
    var videoBtn = document.querySelectorAll(".video-img");
    var videoTitle = document.querySelector(".video-title");
    var videoContent = document.querySelector(".video-content");
    var videoBox = document.querySelector(".video-box");
    var videoClose = document.querySelector(".close-icon");
    var bg = document.querySelector(".bg");
    // 点击关闭视频按钮
    videoClose.addEventListener("click", function () {
        videoBox.style.display = "none";
        bg.style.display = "none";
        videoContent.children[0].pause();
    });
    for (var i = 0; i < videoBtn.length; i++) {
        videoBtn[i].setAttribute("index", i);
        videoBtn[i].addEventListener("click", function () {
            var index = this.getAttribute("index");
            videoBox.style.display = "block";
            bg.style.display = "block";
            if (index == 0) {
                videoTitle.innerHTML = "小米10 青春版 发布会";
                videoContent.children[0].src = "./video/video1.mp4";
            } else if (index == 1) {
                videoTitle.innerHTML = "小米10 8K手机拍大片";
                videoContent.children[0].src = "./video/video2.mp4";
            } else if (index == 2) {
                videoTitle.innerHTML = "小米10发布会";
                videoContent.children[0].src = "./video/video3.mp4";
            } else if (index == 3) {
                videoTitle.innerHTML = "小米MIX Alpha 开箱视频";
                videoContent.children[0].src = "./video/video4.mp4";
            }

        });
    }

    // 返回顶部按钮事件
    var goTop = document.querySelector(".gotop");
    document.addEventListener("scroll", function () {
        if (window.pageYOffset > 850) {
            goTop.style.visibility = "visible";
        } else {
            goTop.style.visibility = "hidden";
        }
    });

    goTop.addEventListener("click", function () {
        window.scroll(0, 0);
    });

});