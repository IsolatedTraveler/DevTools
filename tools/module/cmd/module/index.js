(function(){
    "use strict";
    const exec = require('child_process').exec;
    var exeCmd=(cmd)=>{
        return new Promise((resolve,reject)=>{
            exec(cmd,{encoding:"binary"},(e,d,n)=>{
                if(e){
                    reject();
                }else{
                    resolve();
                }
            });
        });
    };
    module.exports={
        exeCmd
    };
})();