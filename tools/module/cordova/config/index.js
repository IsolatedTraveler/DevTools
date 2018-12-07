(()=>{
    'use strict';
    const config={
        detail:{
            desc:"配置详细信息",
            version:{
                desc:"显示版本信息"
            },
            create:{
                desc:"创建新的打包模块"
            },
            check:{
                desc:"校验打包信息是否成功"
            },
            build:{
                desc:"构建cordova项目apk文件"
            },
            help:{
                desc:'帮助系统'
            },
            pub:{
                desc:"版本发布",
                param:['target','项目名','purpose','构建类型:test/null','isUpdate','是否更新','iscopy','是否重新拷贝源码','isbuild','是否重新构建源码'],
                order:'target purpose isUpdate iscopy isbuild'
            }
        },
        sum:["create","check",'version','build','help','-H','pub'],
        simpled:{
            desc:"命令简写",
            H:"help"
        }
    }
    module.exports={
        config
    }
})();