require(["config"],function(){
    require(["jquery","header","index","menu"],
    function($,header,index,menu,prolist){
        header.init();
        index.init();
        menu.init();
    })
})