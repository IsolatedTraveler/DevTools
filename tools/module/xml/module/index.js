(()=>{
    "use strict";
    const xml2js = require('xml2js');
    const {readFile,paramDeal,printInfo,writeFile} = require('./../../../common');
    var xmlParser = new xml2js.Parser({explicitArray: true, ignoreAttrs: false}),
    builder = new xml2js.Builder({}),
    get=(src)=>{
        return new Promise((resolve,reject)=>{
            if(paramDeal(src,true)){
                src=src[0];
            }
            readFile(src).then((data)=>{
                xmlParser.parseString(data,(err,data)=>{
                    if(err){
                        printInfo(src+'解析失败','warning')
                        reject();
                    }else{
                        resolve(data);
                    }
                });
            });
        })
    },
    alert=(src,keys,val,printUrl,deal)=>{
        return new Promise((resolve,reject)=>{
            if(paramDeal(src,true)){
                keys=src[1];
                val=src[2];
                printUrl=src[3];
                src=src[0];
            }
            paramDeal(keys);
            paramDeal(val);
            printUrl=printUrl||src;
            get(src).then((data)=>{
                keys=keys.split(',');
                let last = keys.pop();
                let setData=data;
                [].forEach.call(keys,(key)=>{
                    setData=setData[key];
                })
                setData[last]=val;
                var str=builder.buildObject(data);
                if(deal){
                    str=deal(str);
                }
                if(printUrl!=true){
                    writeFile(printUrl,str).then(()=>{
                        resolve();
                    });
                }else{
                    resolve(str);
                }
            });
        });
    };
    module.exports={
        get,
        alert
    };
})();