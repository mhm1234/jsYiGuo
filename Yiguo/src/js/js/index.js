define(function(){
    function index(){
        function FloorGuide() {
    
        }
        $.extend(FloorGuide.prototype, {
            init:function() {
                this.ready();
            },
            ready:function() {
                $(window).scroll($.proxy(this.scroll, this));
            },
            scroll:function() {
                this.top = $(document).scrollTop();
                this.curId = "";
                var menu = $(".floor-guide");
                var items = $(".floor");  
        
                items.each($.proxy(this.traverse, this));
        
                // 滚动时给相应的楼层添加current类名并取消其他楼层的current类名
                var curLink = menu.find(".current");
                if(this.curId && curLink.attr("href") != this.curId) {
                    curLink.removeClass("current");
                    menu.find("[href=" + this.curId + "]").addClass("current");
                }
            },
            traverse:function(index, item) {
                var itemTop = $(item).offset().top;
                if(this.top > itemTop - 200) {
                    this.curId = "#" + $(item).attr("id");
                }else {
                    return false;
                }
            }
        });
        
        jQuery.fn.anchorGoWhere = function(options){
            var obj = jQuery(this);
            var defaults = {target:0, timer:500};
            var o = jQuery.extend(defaults,options);
            obj.each(function(i){
                jQuery(obj[i]).click(function(){
                    var _rel = jQuery(this).attr("href").substr(1);
                    // target：1 纵向   target：2 横向
                    switch(o.target){
                        case 1: 
                            var _targetTop = jQuery("#"+_rel).offset().top;
                            jQuery("html,body").animate({scrollTop:_targetTop},o.timer);
                            break;
                        case 2:
                            var _targetLeft = jQuery("#"+_rel).offset().left;
                            jQuery("html,body").animate({scrollLeft:_targetLeft},o.timer);
                            break;
                    }
                    return false;
                });                  
            });
        };
        
        $(document).ready(function() {
            var floorGuide = new FloorGuide();
            floorGuide.init();
            $(".floor-guide a").anchorGoWhere({target:1});
            $(".goTop").anchorGoWhere({target:1});
        });
        $(function () {
            var gao=($(window).height()/2);
            $(window).scroll(function () {
                var totop = $(this).scrollTop();
                if (totop >= 700) {
                    $('.floor-guide').show();
                }
                else{
                    $('.floor-guide').hide();
                };
                if (totop >= 500) {
                    $('.goTop').css('display','block');
                }
                else{
                    $('.goTop').css('display','none');
                };
            })
        });
        // //楼层引导
        // var guide = $("#guide");
        // //  console.log(guide);
        // var list = $("#guide .mui-nav>a");
        // var floor = $(".loadfloor");
        // $.extend({
        //     init: function () {
        //         this.scroll();
        //         this.click();
        //     },
        //     scroll: function () {
        //         $(window).scroll(function () {
        //             var sTop = $(document).scrollTop();
        //             if (sTop > 640) {
        //                 guide.css("display", "block")


        //             } else {
        //                 guide.css("display", "none")
        //             }
        //             var $f = floor.filter(function () {
        //                 return Math.abs(sTop - $(this).offset().top) < $(this).height() / 4;
        //             })

        //             var index = $f.index();
        //             if (index != -1) {
        //                 //根据下标找到楼层号并高亮显示
        //                 $("#guide .mui-nav>a").eq(index)
        //                     .addClass("current")
        //                     .siblings()
        //                     .removeClass("current");

        //             }

        //         })
        //     },
        //     click: function () {
        //         list.click(function () {
        //             $("#guide .mui-nav>a").eq(index)
        //                 .addClass("current")
        //                 .end()
        //                 .siblings()
        //                 .find("a")
        //                 .removeClass("current");
        //             // console.log($("#guide .mui-nav>a").eq(index));
        //             var index = $(this).index();
        //             var t = floor.eq(index).offset().top;
        //             $("html,body").animate({ "scrollTop": t }, 1000)
        //         })
        //     }
        // })

        // $.init();
        //轮播图
        var uList = $(".b-slider>li"); 
        // console.log(uList)
        var oList = $(".b-dot ul li");
        var a = $(".b-btn>a");
        var leftBtn = $(".prev");
        var rightBtn = $(".next");
        var index = 0;
        var timer = null;
        $.fn.extend({
            banner: function () {
                timer = setInterval(autoPlay, 2000)
                function autoPlay() {
                    // console.log(index)
                    index++;
                    if (index == uList.size()) {
                        index = 0;
                    }
                    oList.eq(index).addClass("on").siblings().removeClass("on");
                    uList.eq(index).fadeIn(1500).siblings().fadeOut(1500);
                }
                oList.mouseenter(function () {
                    index = $(this).index() - 1;
                    autoPlay();
                })
                $(".banner-slider").mouseenter(function () {
                    a.css({
                        "display": "inline",
                        opacity: .3
                    })
                    clearInterval(timer);
                }).mouseleave(function () {
                    a.css({
                        "display": "none"
                    })
                    autoPlay();
                })
                leftBtn.click(function () {
                    index--;
                    if (index == -1) {
                        index = uList.length - 1;
                    }
                    oList.eq(index).addClass("on").siblings().removeClass("on");
                    uList.eq(index).fadeIn(1500).siblings().fadeOut(1500);
                })
                rightBtn.click(function () {
                    // console.log(index)
                    index++;
                    if (index == uList.length) {
                        index = 0;
                    }
                    oList.eq(index).addClass("on").siblings().removeClass("on");
                    uList.eq(index).fadeIn(1500).siblings().fadeOut(1500);
                })

            }
        })
        uList.banner();

    }
    return {
        init:index
    }
})
