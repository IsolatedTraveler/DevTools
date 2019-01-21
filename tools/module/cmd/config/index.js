(()=>{
    'use strict';
    const config={
        detail:{
            desc:"配置详细信息",
            version:{
                desc:"显示版本信息"
            },
            exeCmd:{
                desc:"执行cmd命令",
                param:['cmd','带执行命令语句'],
                order:'cmd'
            }
        },
        sum:[,'version','help','-H','exeCmd'],
        simpled:{
            desc:"命令简写",
            H:"help"
        }
    }
    module.exports={
        config
    }
})();