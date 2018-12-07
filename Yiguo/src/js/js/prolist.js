function Products() {
    this.pageId = location.href.split("?")[1];
}
$.extend(Products.prototype, {
    init:function() {
        this.menu();
        this.addEvent();
        this.addPageAd();
        this.addData();
        this.waterFull(".goods_list", 0);
    },
    menu:function() {
        var navItems = $("<div class='nav-items'></div>");
        var str = `<ul id="homenav">
            <li><a href="javascript:void(0)"">新品专区</a></li>
            <li><a href="javascript:void(0)"">优质生活</a></li>
            <li><a href="javascript:void(0)"">银行专区</a></li>
            <li><a href="javascript:void(0)"">菜谱专栏</a></li>
        </ul>`;
        navItems.html(str);
        $("#header-nav .wrap").append(navItems);
    },
    addEvent:function() {
        $('.catalogs').hover($.proxy(this.menuShow), $.proxy(this.menuHide));
        $('.goods_list').on("click", $.proxy(this.dealALink, this));
        $('#select').on("click", $.proxy(this.selectALink));
    },
    menuShow:function() {
        $('.catalogs .catalogs-list').show();
    },
    menuHide:function() {
        $('.catalogs .catalogs-list').hide();
    },
    addPageAd:function() {
        if(this.pageId.split("_")[0].length === 4) {
            var pId = this.pageId.split("_")[0].slice(0,2) + "_channelhome";
            var str = `<a class="big" href="javascript:void(0)"><img src="../img/products/${pId}_b_1.jpg" width="1200" height="300"></a>
            <a class="medium mr" href="javascript:void(0)"><img src="../img/products/${pId}_m_1.jpg" width="405" height="180"></a>
            <a class="medium mr" href="javascript:void(0)"><img src="../img/products/${pId}_m_2.jpg" width="405" height="180"></a>
            <a class="small mr" href="javascript:void(0)"><img src="../img/products/${pId}_s_1.jpg" width="180" height="180"></a>
            <a class="small" href="javascript:void(0)"><img src="../img/products/${pId}_s_2.jpg" width="180" height="180"></a>`;
        }else {
            var str = `<a class="big" href="javascript:void(0)"><img src="../img/products/${this.pageId}_b_1.jpg" width="1200" height="300"></a>
            <a class="medium mr" href="javascript:void(0)"><img src="../img/products/${this.pageId}_m_1.jpg" width="405" height="180"></a>
            <a class="medium mr" href="javascript:void(0)"><img src="../img/products/${this.pageId}_m_2.jpg" width="405" height="180"></a>
            <a class="small mr" href="javascript:void(0)"><img src="../img/products/${this.pageId}_s_1.jpg" width="180" height="180"></a>
            <a class="small" href="javascript:void(0)"><img src="../img/products/${this.pageId}_s_2.jpg" width="180" height="180"></a>`;
        }
        
        $(".page_ad").html(str);
    },
    addData:function() {
        var _this = this;
        new Promise((resolve, reject)=>{
            $.ajax({
                type:"get",
                url:"/Handler/InitLayOut?r=0.37862722169256613&_=1536923889601",
                dataType:"json",
                success(res) {
                    resolve(res.Catrgories);
                }
            });
        }).then((res)=>{
            console.log(res);
            var str2 = "";
            // ID格式：05_channelhome   下划线前面的数字为2的话代表一级菜单，为4则代表2级菜单
            for(var i = 0; i < res.length; i++) {
                if(_this.pageId.split("_")[0].length === 2 && _this.pageId === res[i].CategoryCode) {
                    for(var j = 0; j < res[i].SubCategory0.length; j++) {
                        str2 += `<li><a href="javascript:void(0)" data-id="${res[i].SubCategory0[j].CategoryCode}">${res[i].SubCategory0[j].CategoryName}</a></li>`;
                    }
                }else if(_this.pageId.split("_")[0].length === 4 && (_this.pageId.split("_")[0].slice(0,2)+"_channelhome") === res[i].CategoryCode) {
                    for(var j = 0; j < res[i].SubCategory0.length; j++) {
                        str2 += `<li><a href="javascript:void(0)" data-id="${res[i].SubCategory0[j].CategoryCode}">${res[i].SubCategory0[j].CategoryName}</a></li>`;
                    }
                }
            }
            var str1 = `<div class="all clearfix">
                <div class="tit">►所有分类</div>
                <ul>`+str2+`</ul>
            </div>`;

            $(".goods_list").attr("_category", _this.pageId);
            $("#select").html(str1);
        });
    },
    waterFull:function(container, offset) {
        var _this = this;
        $(window).scroll(this.scrollStart(container, offset, _this));
    },
    scrollStart:function(_container, _offset, _this) {
        if($(_container).attr("_end") === "true") {
            console.log("到结尾了");
            return;
        }
        if($(_container).attr("_loaded") === "false") {
            console.log("加载完了");
            return;
        }
        // 盒子底部距文档顶端的距离
        var offsetTop = $(_container).offset().top + $(_container).height();
        // 滚动条滚动的高度
        var scrollHeight = $(window).scrollTop();
        // 当前屏幕的可视区域高度
        var screenHeight = $(window).height();

        if(offsetTop - (scrollHeight + screenHeight) <= 0) {
            if(parseInt($(_container).attr("_maxpage")) <= parseInt($(_container).attr("_page"))) {
                console.log("maxpage生效了");
                return;
            }
            $(_container).append("<div class=\"loading\"></div>");
            $(_container).attr("_loaded", "false");
            
            var _category = _this.pageId;
            var url = "/productsdata/" + _category + ".html?" + "currentindex=" + $(_container).attr("_page");
            $.get(url, function(data) {
                if(data && data.length > 4) {
                    $(_container).find("ul").append(data);
                    $(_container).attr("_page", parseInt($(_container).attr("_page")) + 1);
                    $(_container).attr("_loaded", "true");
                    $(_container).find(".loading").remove();
                    $(".product_item .p_img a, .product_item .p_name a").each(function() {
                        if(!$(this).attr("_productid")) {
                            $(this).attr("_productid", $(this).attr("href").slice(-12, -5));
                        }
                    });
                    $(".product_item .p_img a, .product_item .p_name a").attr("href", "javascript:void(0)").attr("target", "");
                    $(".product_item .p-buy a").attr("onclick", "");
                }else {
                    $(_container).attr("_end", "true");
                    $(_container).attr("_maxpage", $(_container).attr("_page"));
                    $(_container).find(".loading").remove();
                }
            })
        }
    },
    dealALink:function(e) {
        var _this = this;
        var target = e.target;
        // 因为易果列表页没有扒到接口，所以只能通过传参数这种方法去详情页了
        if(target.tagName === "IMG" && target.parentNode.parentNode.className === "p_img clearfix") {
            var id = $(target).parent().attr("_productid");
            var tit = encodeURI($(target).parent().parent().next().children().eq(0).children().eq(0).text());
            var price = $(target).parent().parent().next().children().eq(1).children().eq(0).children().eq(0).text().slice(1);
            var imgUrl = $(target).attr("src");

            location.href = "/html/detail.html?id=" + id + "&title=" + tit + "&price=" + price + "&imgUrl=" + imgUrl;
        }

        if(target.tagName === "A" && target.parentNode.className === "p_name") {
            var id = $(target).attr("_productid");
            var tit = encodeURI($(target).text());
            var price = $(target).parent().next().children().eq(0).children().eq(0).text().slice(1);
            var imgUrl = $(target).parent().parent().prev().children().eq(0).children().eq(0).attr("src");

            location.href = "/html/detail.html?id=" + id + "&title=" + tit + "&price=" + price + "&imgUrl=" + imgUrl;
        }

        if($(target).hasClass("btn-buy")) {
            var id = $(target).parent().prev().prev().children().eq(0).attr("_productid");
            var tit = $(target).parent().prev().children().eq(0).children().eq(0).text();
            var price = $(target).parent().prev().children().eq(1).children().eq(0).children().eq(0).text().slice(1);
            var imgUrl = $(target).parent().prev().prev().children().eq(0).children().eq(0).attr("src");

            console.log(id, tit, price, imgUrl);
            $.ajax({
                type:"get",
                url:"/addCart",
                data:{
                    "id":id,
                    "title":tit,
                    "price":price,
                    "imgUrl":imgUrl,
                    "num":1
                },
                dataType:"json",
                success:function(data) {
                    console.log(data);
                    _this.refreshCart();
                }
            })
        }
    },
    // 刷新页面上的购物车数据
    // refreshCart:function() {
    //     console.log("加1");
    //     $.ajax({
    //         type:"get",
    //         url:"/getCart",
    //         data:{},
    //         success:function(data) {
    //             if(data) {
    //                 data = JSON.parse(data);
    //                 var num = 0, money = 0;
    //                 for(var i = 0; i < data.length; i++) {
    //                     num += Number(data[i].num);
    //                     money += data[i].num * data[i].price;
    //                 }
    //                 $(".shopping-btn .totleNum b").text(num + "");
    //                 $(".shopping-btn .totlePrice").text(money.toFixed(1));
    //             }else {
    //                 $(".shopping-btn .totleNum b").text("0");
    //                 $(".shopping-btn .totlePrice").text("0.0");
    //             }
    //         }
    //     })
    // },
    // select分类标签点击事件
    selectALink:function(e) {
        var target = e.target;
        if(target.tagName === "A" && target.parentNode.parentNode.parentNode.parentNode.className === "select") {
            var dataId = $(target).attr("data-id");
            location.href = "/html/products.html?" + dataId;
        }
    },
    getCookie:function(key) {
        var cookie = document.cookie;
        var arr = cookie.split("; ");
        for(var i=0;i<arr.length;i++){
            var newArr = arr[i].split("=");
            if(key == newArr[0]){
                return newArr[1];
            }
        }
    },
    setCookie:function(key,val,expires) {
        var d = new Date();
        d.setDate(d.getDate()+expires);
    
        document.cookie = key+"="+val+";path=/;expires="+d;
    }
});
var pros = new Products();
pros.init();
$(window).scroll(function() {
    pros.waterFull(".goods_list", 0);
});