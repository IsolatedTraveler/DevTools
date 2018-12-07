(()=>{
    "use strict";
    const chalk = require('chalk');
    const Type={
        msg:'white',
        error:"red",
        warning:"yellow",
        success:"green",
        info:"blue"
    };
    var printInfo=(msg,type)=>{
        type=type||'msg';
        let color=null;
        if(type!='obj'){
            color=Type[type]||type;
            console.log(chalk[color](msg));
        }else{
            
        }
        if(type=='error'){
            process.exit();
        }
    },
    paramDeal=(param,judge)=>{
        if(!param){
            printInfo("缺少必要的参数！","error");
        }else if(typeof param != 'string'){
            if(judge){
                if(param.length){
                    return true
                }else{
                    printInfo("缺少必要的参数！","error");
                }
            }
        }
    };
    module.exports={
        printInfo,
        paramDeal
    }
})()