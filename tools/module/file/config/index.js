(()=>{
    'use strict';
    const config={
        detail:{
            version:{
                desc:"显示版本信息"
            },
            copy:{
                desc:"复制文件",
                params:[
                    "src1",
                    "原文件路径",
                    "src2",
                    "生成文件路径"
                ],
                order:"src1 src2"
            },
            mkdir:{
                desc:"创建文件路径",
                params:[
                    "src1",
                    "已存在绝对的路径/待创建的绝对路径",
                    "src2",
                    "待创建路径相对于src1的相对路径"
                ],
                order:"src1 [src2]"
            },
            writeFile:{
                desc:"创建文件路径",
                params:[
                    "src1",
                    "已存在绝对的路径/待创建的绝对路径",
                    "src2",
                    "待创建路径相对于src1的相对路径"
                ],
                order:"src1 [src2]"
            },
            deleteFiles:{
                desc:"删除目录文件",
                params:[
                    "src",
                    "已存在绝对的路径/待创建的绝对路径",
                ],
                order:"src"
            },
            copyDir:{
                desc:"拷贝目录文件",
                params:[
                    "src1",
                    "已存在的目录",
                    "src2",
                    "待创建目录"
                ],
                order:"src"
            }
        },
        sum:["copy","mkdir","writeFile",'-V','-H','-W','deleteFiles','copyDir'],
        simpled:{
            desc:"命令简写",
            H:"help",
            V:"version",
            W:"writeFile"
        },
        info:{
            version:'1.0.0'
        }
    }
    module.exports={
        config
    }
})();