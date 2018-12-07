(function(){
    "use strict";
    const {writeFile} = require('./../../common');
    const getData=()=>{
        const {toJson} = require('./../excelToJson/module');
        return toJson([],true);
    };
    var outUrl='C:/Users/wdgw/Desktop/json.txt',outUrl1='C:/Users/wdgw/Desktop/json1.txt',outUrl2='C:/Users/wdgw/Desktop/json2.txt';
    const template=(data,temp)=>{
        const {html}=require('./../template/module');
        let params={key:temp[0]};
        params[temp[0]]=data;
        html([JSON.stringify(params),outUrl]);
    };
    const tempDeal=(data,obj)=>{
        data=data.split('/');
        let ywdm=data.pop();
        let mkbh=data.pop();
        if(obj[mkbh]){
            obj[mkbh].push(ywdm);
        }else{
            obj[mkbh]=[ywdm];
        }
    };
    const getStr=(obj,table)=>{
        let keys=Object.keys(obj);
        let where=[];
        [].forEach.call(keys,key=>{
            let data=obj[key]||[];
            let ywdm="('"+data.join("','")+"')";
            where.push("(mkbh='"+key+"' and ywdm in "+ywdm+')');
        });
        return "select mkbh,ywdm,sm from "+table+' where '+ where.join(' or ')+' order by mkbh,ywdm';
    };
    const dataDeal = (params)=>{
        var data=getData(params),sqldy={},prody={},unknow={};
        // data格式 ： [{A1:A2,B1:B2...},{A1:A3,B1:B3...},{A1:A4,B1:B4...}...]
        template(data,['laytd'])
        // [].forEach.call(data,function(item){
        //     let data=item.data;
        //     if(data.indexOf('queryDataBySql')!=-1){
        //         tempDeal(data,sqldy);
        //     }else if(data.indexOf('commitData')!=-1){
        //         tempDeal(data,prody);
        //     }else{
        //         tempDeal(data,unknow);
        //     }
        // });
        // let sqldyStr=getStr(sqldy,'sqldy');
        // let prodyStr=getStr(prody,'prody');
        // writeFile(outUrl,sqldyStr);
        // writeFile(outUrl1,prodyStr);
    };
    module.exports={
        dataDeal
    };
})();