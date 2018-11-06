'use strict';
const {writeFile} = require('./../../common');
const getData=()=>{
    const {toJson} = require('./../excelToJson/module');
    return toJson([],true);
};
const template=(data)=>{
    const {html,js}=require('./../template/module');
    html([JSON.stringify({key:"tbody",tbody:data}),outUrl]);
};
var outUrl='C:/Users/wdgw/Desktop/json.txt',outUrl1='C:/Users/wdgw/Desktop/json1.txt',outUrl2='C:/Users/wdgw/Desktop/json2.txt';
const dataDeal = (params)=>{
    var data=getData(params),outData=[];
    [].forEach.call(data,(item,index)=>{
        // 数据处理
        // item.index=index;
        var keys=['a','b','c','d'];
        var tds=[],tr={key:'td'};
        [].forEach.call(keys,(key)=>{
            var val=item[key]||'';
            val=val.replace(/^[ ]+/,"");
            val=val.replace(/[ ]{2,}/g,' ');
            item[key]=val;
            var td={
                className:'',
                colspan:'',
                rowspan:'none'
            };
            if(val){
                if(key=='a'){
                    val='<div class="center"><span>'+item[key]+'</span></div>';
                }else{
                    val=val.replace(/[ ]*$/,'');
                    if(val=='none'){
                        val='<div class="center"><span name="'+item.name+'"></span></div>';
                    }else{
                        val+=" ";
                        var square = val.replace(/^[^□]*/,'');
                        square = square.replace(/[^□]*&/,'');
                        val = val.replace(/□\//g,'');
                        val = val.replace(/□/g,'');
                        val=val.replace(/[ ]{2,}/g,' ');
                        val=val.replace(/([\S]+) /g,'<span class="wall" val="$1">$1</span>');
                        val=val.replace(/(val="[0-9]+)[\.]*/g,"$1-");
                        val='<div>'+val+'</div>';
                        square = square.replace(/\//g,'<span class="square none none1"></span>');
                        square = square.replace(/□/g,'<span class="square" name="'+item.name+'"></span>');
                        square ='<div>'+ square +'</div>';
                        val='<div name="'+item.name+'">' + val + square +"</div>";
                    }
                }
                td.content=val;
                tds.push(td);
            }else{
                td=tds.pop();
                if(!td){
                    return;
                }
                var col=Number(td.colspan);
                if(col){
                    col++;
                }else{
                    col=2;
                }
                td.colspan=col;
                tds.push(td);
            }
        });
        tr.td=tds;
        outData.push({key:'tr',tr:[tr]})
    });
    template(outData);
    var str=JSON.stringify(outData,null,'\t');
    str=str.replace(/"([a-zA-D0-9]+)":/g,"$1:");
    var str1=JSON.stringify(data,null,'\t');
    str1=str1.replace(/"([a-zA-D0-9]+)":/g,"$1:");
    writeFile(outUrl2,str1);
    writeFile(outUrl1,str);
};
module.exports={
    dataDeal
};