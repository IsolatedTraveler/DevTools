(()=>{
    'use strict';
    const config={
        detail:{
            version:{
                desc:"显示版本信息"
            },
            get:{
                desc:"复制文件",
                params:[
                    "src1",
                    "原文件路径",
                    "src2",
                    "生成文件路径"
                ],
                order:"src1 src2"
            },
            alert:{
                desc:"创建文件路径",
                params:[
                    "src1",
                    "已存在绝对的路径/待创建的绝对路径",
                    "src2",
                    "待创建路径相对于src1的相对路径"
                ],
                order:"src1 [src2]"
            }
        },
        sum:["get","alert",'-V','-H'],
        simpled:{
            desc:"命令简写",
            H:"help",
            V:"version"
        },
        info:{
            version:'1.0.0'
        }
    }
    module.exports={
        config
    }
})();