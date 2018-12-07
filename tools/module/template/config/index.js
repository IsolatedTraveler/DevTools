'use strict';
const config={
    detail:{
        desc:"配置详细信息",
        version:{
            desc:"显示版本信息"
        },
        help:{
            desc:"帮助文档"
        },
        html:{
            desc:"html模板解析"
        },
        js:{
            desc:"js模板解析"
        }
    },
    sum:['version','help','html','js'],
    simpled:{
        desc:"命令简写",
        H:"help",
        V:"version"
    }
}
module.exports={
    config
}