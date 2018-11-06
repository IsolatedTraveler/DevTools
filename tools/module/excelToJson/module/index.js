'use strict';
const {writeFile} = require('./../../../common');
const xlsx = require("node-xlsx");
var inUrl='C:/Users/wdgw/Desktop/test.xlsx',outUrl='C:/Users/wdgw/Desktop/json.txt';
const praseExcel = (list,judge)=>{
    var excleData = list.data,keyArray =  excleData[0],sheetArray=[];
    for (var j = 1; j < excleData.length ; j++){
        var curData = excleData[j];
        if(curData.length == 0) continue;
        var item = {};
        [].forEach.call(keyArray,(key,index)=>{
            item[key]=curData[index];
        })
        sheetArray.push(item);
    }
    if(judge){
        return sheetArray;
    }
    writeFile(outUrl,str);
};
const toJson=(params,judge)=>{
    inUrl=params.shift()||inUrl;
    var position=params.shift()||0;
    outUrl=params.shift()||outUrl;
    try{
        var list = xlsx.parse(inUrl);
        return praseExcel(list[position],judge);
    }catch(e){
        console.error(e);
    }
};
module.exports={
    toJson
}