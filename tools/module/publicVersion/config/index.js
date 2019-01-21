'use strict';
const config={
    detail:{
        desc:"配置详细信息",
        version:{
            desc:"显示版本信息"
        },
        ggws:{
            desc:"公卫发版管理"
        },
        jwjg:{
            desc:"基卫监管发版管理"
        },
        wtgl:{
            desc:"服务跟踪系统"
        },
        ydgw:{
            desc:"移动公卫版本发布"
        },
        help:{
            desc:"显示使用方法"
        },
        set:{
            desc:"配置系统信息"
        },
        get:{
            desc:"查看配置信息"
        }
    },
    sum:["ggws","jwjg",'version','wtgl',"set","get",'ydgw','-H','help'],
    simpled:{
        desc:"命令简写",
        H:"help"
    },
    version:'1.0.0'
}
module.exports={
    config
}