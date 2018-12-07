define(function () {
    function menu() {
        function Catalogs() {
            this.cataList = $(".catalogs-list");
        }
        $.extend(Catalogs.prototype,{
            init: function() {
                var that = this
                $.ajax({
                    type: "get",
                    url: "/Handler/InitLayOut?r=0.37862722169256613&_=1536923889601",
                    dataType: "json",
                    success: function (res) {
                        // data代表获取的数据，相当于res
                        that.addData(res.Catrgories);
                        that.addEvent();
                    }
                })
            },
            addData: function(res) {
                var str1 = "";
                
                for(var i = 0; i < res.length - 1; i++) {
                    var str2 = "";
                    for(var j = 0; j < res[i].SubCategory0.length; j++) {
                        str2 += `<a href="javascript:void(0)" data-id="${res[i].SubCategory0[j].CategoryCode}">${res[i].SubCategory0[j].CategoryName}</a>`;
                    }
                    if (res[i].CategoryImageAd.length > 0) {
                        str1 += `<div class="item">
                            <h3 class="${"t" + res[i].CategoryCode}"><a href="javascript:void(0)" data-id="${res[i].CategoryCode}"><i></i>${res[i].CategoryName}<s>&gt;</s></a></h3>
                            <div class="sub-item">
                                <h4><a href="javascript:void(0);">${res[i].CategoryName}</a></h4>
                                <div class="sub-list">`+str2+`</div>
                                <div class="catalogs-ad">
                                    <a href="javascript:void(0);"><img src="${res[i].CategoryImageAd[0].Image}" alt="${res[i].CategoryName}"></a>
                                </div>
                            </div>
                        </div>`;
                    }else {
                        str1 += `<div class="item">
                            <h3 class="${res[i].CategoryCode}"><a href="javascript:void(0)" data-id="${res[i].CategoryCode}"><i></i>${res[i].CategoryName}<s>&gt;</s></a></h3>
                            <div class="sub-item">
                                <h4><a href="javascript:void(0);">${res[i].CategoryName}</a></h4>
                                <div class="sub-list">`+str2+`</div>
                            </div>
                        </div>`;
                    }
                }
                this.cataList.html(str1);
            },
            addEvent() {
                $('.catalogs-list .item').hover($.proxy(this.over),$.proxy(this.out));
                $('.catalogs-list a').click(function() {
                    var dataId = $(this).attr("data-id");
                    location.href = "/html/products.html?" + dataId;
                });
            },
            over:function() {
                $(this).addClass('current');
                $(this).find('.sub-item').show();
            },
            out:function() {
                $(this).removeClass('current');
                $(this).find('.sub-item').hide();
            }
        });
        new Catalogs().init();
    }
    return {
        init: menu
    }
})

// function AdItem() {
//     this.ad = $(".ad-item");
// }
// $.extend(AdItem.prototype,{
//     init:function(res) {
//         this.addData(res.HomeNav);
//     },
//     addData:function(res) {
//         console.log(res);
//     }
// });

// define(function () {
//     function menu() {
        // $.ajax({
        //     type: "get",
        //     url: "/Handler/InitLayOut?r=0.37862722169256613&_=1536923889601",
        //     dataType: "json",
        //     success: function (res) {
        //         // data代表获取的数据，相当于res
        //         getData(res.Catrgories);
        //     }
        // })

//         function getData(res) {
//             console.log('res')
//             console.log(res)

//             var str1 = "";
        
//             for(var i = 0; i < res.length - 1; i++) {
//                 var str2 = "";
//                 for(var j = 0; j < res[i].SubCategory0.length; j++) {
//                     str2 += `<a href="javascript:void(0)" data-id="${res[i].SubCategory0[j].CategoryCode}">${res[i].SubCategory0[j].CategoryName}</a>`;
//                 }
//                 if (res[i].CategoryImageAd.length > 0) {
//                     str1 += `<div class="item">
//                         <h3 class="${"t" + res[i].CategoryCode}"><a href="javascript:void(0)" data-id="${res[i].CategoryCode}"><i></i>${res[i].CategoryName}<s>&gt;</s></a></h3>
//                         <div class="sub-item">
//                             <h4><a href="javascript:void(0);">${res[i].CategoryName}</a></h4>
//                             <div class="sub-list">`+str2+`</div>
//                             <div class="catalogs-ad">
//                                 <a href="javascript:void(0);"><img src="${res[i].CategoryImageAd[0].Image}" alt="${res[i].CategoryName}"></a>
//                             </div>
//                         </div>
//                     </div>`;
//                 }else {
//                     str1 += `<div class="item">
//                         <h3 class="${res[i].CategoryCode}"><a href="javascript:void(0)" data-id="${res[i].CategoryCode}"><i></i>${res[i].CategoryName}<s>&gt;</s></a></h3>
//                         <div class="sub-item">
//                             <h4><a href="javascript:void(0);">${res[i].CategoryName}</a></h4>
//                             <div class="sub-list">`+str2+`</div>
//                         </div>
//                     </div>`;
//                 }
//             }
//             $(".catalogs-list").html(str1);

//             /* start */
//             // let twomenu = data.Catrgories
//             // var str = ''

//             // for (var i = 0; i < twomenu.length; i++) {
//             //     // console.log(twomenu[i].CategoryImageAd[0].Image)菜单
//             //     str += `<li class="one-menu">
//             //         <div>
//             //             <a href="##">
//             //                 <i></i>
//             //                 <div class="item">${twomenu[i].CategoryName}</div>
//             //                 <s>></s>
//             //             </a>
//             //         </div>
//             //         <ul class="two-menu">
//             //             <h3>${twomenu[i].CategoryName}</h3>
//             //     `
//             //     for (var j = 0; j < twomenu[i].SubCategory0.length; j++) {
//             //         str += `
//             //         <li><a href="##">${twomenu[i].SubCategory0[j].CategoryName}</a></li>
//             // `
//             //     }
//             //     str += `</ul></li>`;
//             // }
//             // $('#menu-box').html(str)
//             /* end */

//         }
//         //菜单导航
       
//         //鼠标移入 导航出现   移出消失   点击出现  再次点击消失
//         $.fn.extend({ 
//             boxint: function () {
//                 var box = $(".catalogs-list");
                   
//                 box.bind({
//                     addEvent: function() {
//                         console.log('绑定事件 ')
//                         $('.catalogs-list .item').hover($.proxy(this.over),$.proxy(this.out));
//                         $('.catalogs-list a').click(function() {
//                             var dataId = $(this).attr("data-id");
//                             location.href = "/html/products.html?" + dataId;
//                         });
//                     },
//                     over: function() {
//                         console.log(1)
//                         $(this).addClass('current');
//                         $(this).find('.sub-item').show();
//                     },
//                     out: function() {
//                         $(this).removeClass('current');
//                         $(this).find('.sub-item').hide();
//                     }

//                     // mouseenter: function () {
//                     //     $(".catalogs-list").css("display", "block")
//                     // }, mouseleave: function () {
//                     //     if(flag){
//                     //         $(".catalogs-list").css("display", "block")
//                     //     }else{
//                     //         $(".catalogs-list").css("display", "none")
//                     //     }
                       
//                     // }, click: function () {
//                     //     flag = !flag;
//                     //     if(flag){
//                     //         $(".catalogs-list").css("display", "block")
//                     //     }else{
//                     //         $(".catalogs-list").css("display", "none")
//                     //     }
                        
//                     // }
//                 })
//             }
//         })
//         $(".catalogs-list").boxint();
//     }
//     return {
//         init: menu
//     }
// })