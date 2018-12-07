//页面加载后 需要取数据  显示到页面购物列表中
function Cart() {
    this.carStr = "";
    // 单类商品总价
    this.tMoney = 0;
    // 所有商品总价
    this.allMoney = 0;
    // 所有选中商品总数
    this.allNum = 0;
    // 定义开关
    this.bStop = true;
    // 选中商品总价
    this.all = 0;
    // 被选中的商品IDS
    this.ids = [];

}
$.extend(Cart.prototype, {
    init: function () {
        this.getLocalStorage();
        this.addEvent();
        // this.sum();
    },
    getLocalStorage: function () { 
        var _this =this;
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var val = JSON.parse(localStorage.getItem(key));
            _this.tMoney = val.price * val.num;
            _this.tMoney = parseFloat(_this.tMoney.toFixed(2));
            this.carStr += `<tr data-ls="${key}" data-id="${val.id}">
                        <td class="cart-t-check"><input type="checkbox"  class="ck" ></td>
                        <td class="cart-t-img"><a href="javascript:void(0)"><img src="${val.imgUrl}"></a></td>
                        <td class="cart-t-info"><a href="javascript:void(0)">${val.title}</a></td>
                        <td class="cart-t-ub" style="width:75px;"></td>
                        <td class="cart-t-price">￥${val.price}</td>
                        <td class="cart-t-num">
                            <div class="quantity-form">
                                <a href="javascript:void(0);" class="decrement"></a>
                                <input type="text" class="itxt" oldnum="1" value="${val.num}" disabled>
                                <a href="javascript:void(0);" class="increment"></a>
                            </div>
                        </td>
                        <td class="cart-t-total">￥<span>${_this.tMoney.toFixed(2)}  </span></td>
                        <td class="cart-t-spec">1份</td>
                        <td class="cart-t-opera">
                            <a href="javascript:void(0);">移入收藏</a>
                            <br>
                            <a href="javascript:void(0);" class="del-btn">删除</a>
                        </td>
                    </tr>`
        }
        $(".cart-list .cart-table tbody").html(this.carStr);
    },
    addEvent: function () {
        $(".cart-alert").on("click", $.proxy(this.clickEvent, this));
    },
    clickEvent: function (e) {
        var target = e.target;

        // 点击加操作
        if (target.tagName === "A" && target.className === "increment") {
            // 设置当前操作类型（加操作）
            var action = "increase";
            // 获取当前点击加操作的商品ID
            var id = $(target).parent().parent().parent().attr("data-id");
            // 获取当前点击加操作的商品数量
            var n = $(target).prev().val();
            // 获取当前点击加操作的商品单价
            var price = $(target).parent().parent().prev().text().slice(1);
            // 递增
            n++;
            // 刷新页面该商品数量
            $(target).prev().val(n);
            // 刷新页面该商品总价，并保留两位小数
            $(target).parent().parent().next().children().eq(0).text((n * price).toFixed(2));
            // 刷新购物车操作
            this.operaReq(action, id);
        }

        // 点击减操作
        if (target.tagName === "A" && target.className === "decrement") {
            // 设置当前操作类型（减操作）
            var action = "decrease";
            // 获取当前点击减操作的商品ID
            var id = $(target).parent().parent().parent().attr("data-id");
            // 获取当前点击减操作的商品数量
            var n = $(target).next().val();
            // 获取当前点击减操作的商品单价
            var price = $(target).parent().parent().prev().text().slice(1);
            // 递减
            if (n > 1) n--;
            // 刷新页面该商品数量
            $(target).next().val(n);
            // 刷新页面该商品总价，并保留两位小数
            $(target).parent().parent().next().children().eq(0).text((n * price).toFixed(2));
            // 刷新购物车操作
            this.operaReq(action, id);
        }

        // 点击复选框
        if (target.tagName === "INPUT" && target.parentNode.className === "cart-t-check") {
            this.bStop = true;
            // 遍历商品复选框只要有一个框没被选中则取消全选效果
            $(".cart-list .cart-t-check input[type=checkbox]").each($.proxy(this.sinSelect, this));
            $(".chkAll").prop("checked", this.bStop);
        }

        // 全选&&反选
        if (target.tagName === "INPUT" && target.className === "chkAll") {
            $(".cart-t-check input[type=checkbox]").each($.proxy(this.allCheck, target));
        }

        // 单类商品删除操作
        $(".del-btn").click(function () {
            var tid = $(".del-btn").parent().parent().attr("data-id");
            localStorage.removeItem(tid);
            console.log(tid)
             //页面删除
            $(".del-btn").parent().parent().remove();
            window.location.reload();
        })
        // 选中商品删除操作
        if (target.tagName === "A" && target.className === "del-checked") {
            // 设置当前操作类型（选中商品删除）
            var action = "delChecked";
            // 每点击一次重置商品ID数组
            this.ids = "";
            // 遍历被选中的商品ID，并删除该节点
            $(".cart-list .cart-t-check input[type=checkbox]").each($.proxy(this.checkedPro, this));
              
            // 刷新购物车操作
            this.ids = this.ids.slice(1);
            this.operaReq(action, JSON.stringify(this.ids));
            
            // 刷新页面
            window.location.reload();
        }

        // 清空购物车操作
        if (target.tagName === "A" && target.className === "clear-cart") {
            // 设置当前操作类型（清空购物车）
            var action = "clearCart";
            // 清空所有商品节点
            $(".cart-list .cart-table tbody").html("");
            var tid = $(".del-btn").parent().parent().attr("data-id");
            localStorage.clear(tid);
            console.log(tid)
            // 刷新页面
            window.location.reload();
        }

        this.caculateMoney(this);
    },
    // 全选&&反选处理函数
    allCheck: function (index, item) {
        $(item).prop("checked", $(this).prop("checked"));
        $(".chkAll").prop("checked", $(this).prop("checked"));
    },
    // 复选框处理函数
    sinSelect: function (index, item) {
        if (!item.checked) {
            this.bStop = false;
        }
    },
    // 计算选中商品总价格
    caculateMoney: function (_this) {
        _this.all = 0;
        $(".cart-t-total>span").each($.proxy(_this.caculate, _this));
        $(".allMoney").text(_this.all.toFixed(2));
    },
    // 选中商品计算处理函数
    caculate: function (index, item) {
        if ($(item).parent().parent().children().eq(0).children().eq(0).prop("checked")) {
            this.all += Number($(item).text());
        }
    },
    // 选中商品ID遍历处理函数
    checkedPro: function (index, item) {
        if ($(item).prop("checked")) {
            var id = $(item).parent().parent().attr("data-id");
            this.ids += "," + id;
            $(item).parent().parent().remove();
        }
    },
    operaReq: function (action, id) {
        var tid = $(this).parent().parent().attr("data-ls");
        localStorage.removeItem(tid);
        console.log(tid)
    }
    
});
new Cart().init();

