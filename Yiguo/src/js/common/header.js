define(function(){
    function header(){
        //侧边悬浮
        var goTop = $("#goTop");

        //获取页面滑动
        $(window).scroll(function () {
            var sTop = $(document).scrollTop();
            if (sTop > 500) {
                goTop.css("display", "block");
            } else {
                goTop.css("display", "none");
            }
            //头部  吸顶
            var header = $("#header");
            if (sTop > 30) {
                header.addClass("header_fixed")
                header.removeClass("header")
            } else {
                header.removeClass("header_fixed")
                header.addClass("header")
            }


        })
        goTop.click(function () {
            $("html,body").animate({ "scrollTop": 0 }, 1000)
        })
    }
    return {
        init:header
    }
})

