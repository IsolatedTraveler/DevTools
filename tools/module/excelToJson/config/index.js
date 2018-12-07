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
        toJson:{
            desc:"excel 转换成 Array[Object]",
            params:[
                'inUrl',
                "数据源地址",
                "position",
                "表格位置,默认值:sheet1",
                "outUrl",
                "输出数据地址,默认值:C:/Users/wdgw/Desktop/json.text"
            ],
            order:"inUrl [position] [outUrl]"
        }
    },
    sum:['version','help','toJson','-H','-V'],
    simpled:{
        desc:"命令简写",
        H:"help",
        V:"version"
    }
}
module.exports={
    config
}