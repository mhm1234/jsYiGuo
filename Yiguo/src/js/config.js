require.config({
    //公共路径
    baseUrl:"../js",
    paths:{
        jquery:"lib/jquery-1.11.3",
        header:"common/header",
        index:"js/index",
        menu:"js/menu"
    },
    shim: {
        highcharts: {
            //导出模块  一般情况下内部如果不是AMD规范的  导出的名字基本都是文件名字但是首字母大写即可
            exports: "Highcharts",

        },
        bootstrap: {
            //当前模块所依赖的模块
            deps: ["jquery"],
        }
    }
})