function Detail() {
    this.data = location.href.split("?")[1];
}
$.extend(Detail.prototype, {
    init:function() {
        this.addData();
        this.addEvent();
    },
    addEvent:function() {
        var _this = this;
        $('.catalogs').hover($.proxy(this.menuShow), $.proxy(this.menuHide));
        $('.increase').click($.proxy(this.increase));
        $('.decrease').click($.proxy(this.decrease));
        $('#p_number').blur($.proxy(this.enterNum));
        $('.btn-gn').click($.proxy(this.submitProduct, _this));
    },
    menuShow:function() {
        $('.catalogs .catalogs-list').show();
    },
    menuHide:function() {
        $('.catalogs .catalogs-list').hide();
    },
    addData:function() {
        var arr = this.data.split("&");
        var obj = {};
        for(var i = 0; i < arr.length; i++) {
            obj[arr[i].split("=")[0]] = arr[i].split("=")[1];
        }
        obj.title = decodeURI(obj.title);
        var str = `<div class="pic-preview">
            <div class="pic-big">
                <img class="j_product_img" width="500" height="500" src="${obj.imgUrl}">
            </div>
        </div>
        <div class="product-info">
            <div class="summary-name">
                <h1>${obj.title}</h1>
                <p>香气浓郁 皮薄宜剥</p>
                <input type="hidden" name="CommodityId" id="CommodityId" value="e871ebf9-8753-4554-ac6b-0175e45156d8">
            </div>
            <div class="summary-price clearfix">
                <div class="pro-price">
                    <div>
                        <span class="tt">价格：</span>
                        <span><em>¥</em><strong>${obj.price}</strong></span>
                    </div>
                        <div class="pro-m2">
                            更多商品优惠，尽在易果生鲜APP
                        </div>
                    </div>
                <div class="pro-tel">
                    <p><i></i>手机下单购买<strong>立即扫码</strong></p><div class="code">
                        <img id="qrcodeUrl" width="114" height="114" display:="" block="" src="data:img/png;base64,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">
                    </div>
                </div>
                <div class="pro-review">
                    <p>总体满意度</p>
                    <p><b>5.0</b> 分</p>
                    <p><a href="#comment"><span>(评论数420)</span></a></p>
                </div>
            </div>
        </div>
        <div class="summary-other clearfix">
            <div class="left">
                <div class="pro-service">满百包邮，<b>20:00</b> 前完成订单 预计明日<b>(9月26日)</b>送达</div>
                <div class="pro-service"><i class="mr5"><img src="http://static01.yiguo.com/www/images/icon1.png"></i>不支持7天无理由退货</div>
                <div class="pro-amount clearfix">
                    <div class="dt">数量：</div>
                    <div class="dd">
                        <div class="spinner value" maxlength="2">
                            <button class="decrease" disabled="disabled">-</button>
                            <input type="text" class="spinner value" id="p_number" maxlength="2" value="1">
                            <button class="increase">+</button>
                        </div>
                        <div class="addcart"><a class="btn-gn" href="javascript:void(0);"><i></i>加入购物车</a></div>
                    </div>
                </div>
            </div>
        </div>`;
        $(".product-intro").html(str);
    },
    increase:function() {
        var val = $(this).prev().prop("value");
        val++;
        $(this).prev().prop("value", val);
        if(val > 1) {
            $(".decrease").attr("disabled", false);
        }
    },
    decrease:function() {
        var val = $(this).next().prop("value");
        val--;
        $(this).next().prop("value", val);
        if(val === 1) {
            $(".decrease").prop("disabled", "disabled");
        }
    },
    enterNum:function() {
        var reg = /^[1-9][0-9]*$/;
        var val = $(this).prop("value");
        if(!reg.test(val) || val === "0") {
            $(this).prop("value", "1");
        }
        if($(this).prop("value") === "1") {
            $(".decrease").prop("disabled", "disabled");
        }else {
            $(".decrease").attr("disabled", false);
        }
    },
    submitProduct:function() {
        var arr = this.data.split("&");
        var obj = {};
        for(var i = 0; i < arr.length; i++) {
            obj[arr[i].split("=")[0]] = arr[i].split("=")[1];
        }
        obj.title = decodeURI(obj.title);
        obj.num = $("#p_number").prop("value");

        console.log(obj);
        //存储
        localStorage.setItem(obj.id,JSON.stringify(obj))
         $(location).attr('href', 'cart.html')
        console.log('提交至购物车')
        // $.ajax({
        //     type:"get",
        //     url:"/addCart",
        //     data:obj,
        //     dataType:"json",
        //     success:function(data) {
        //         console.log(data);
        //     }
        // })
    }
});
var detail = new Detail();
detail.init();