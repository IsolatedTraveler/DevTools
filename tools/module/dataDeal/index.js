'use strict';
const {writeFile} = require('./../../common');
const getData=()=>{
    const {toJson} = require('./../excelToJson/module');
    return toJson([],true);
}
var outUrl='C:/Users/wdgw/Desktop/json.txt';
const dataDeal = (params)=>{
    var outData={},idList={},dataList={};
    var data=getData(params);
    [].forEach.call(data,item=>{
        var id=item.id.toLowerCase();
        item.id=id;
        idList[id]='';
        var sm=item.sm||'';
        var filter=[];
        if(item.filter.trim()=='NUMBER'){
            filter.push('number');
        }
        if(item.sfbt){
            filter.push('required');
        }else if(sm){
            if(sm.indexOf('必填')!=-1){
                filter.push('required');
            }
        }
        filter=filter.filter(item=>{
            return item;
        });
        item.filter=filter.join(',');
        if(sm){
            if(sm.indexOf('多选')!=-1){
                dataList[id]=[];
                item.type='multi'
            }else if(item.sm.indexOf('字典')!=-1){
                dataList[id]=[];
                item.type='list'
            }else{
                item.type='text'
            }
            if(sm.indexOf('为空')!=-1){
                item.readonly=false
            }
        }else{
            item.type='text'
        }
        delete item.sfbt;
    });
    outData.formFormat=data;
    outData.formData=idList;
    outData.formDataShow=idList;
    outData.formDataList=dataList;
    var str=JSON.stringify(outData,null,'\t');
    str=str.replace(/"([a-zA-D0-9]+)":/g,"$1:");
    writeFile(outUrl,str);
};
module.exports={
    dataDeal
};