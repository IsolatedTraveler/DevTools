(function(){
    "use strict";
    const {config} = require ('./config.js');
    const {printInfo,checkKey,alertConfig,paramDeal,copy} = require('./../../../common');
    const exec = require('child_process').exec;
    const path = require("path");
    const {alert} = require("./../../xml/module");
    var config1=config,
    creat=(config)=>{
        var cmd = ['cd /d "'+config.site+'" && cordova create',config.name,config.url,config.title].join(' ');
        return exeCmd(cmd).then(()=>{
            printInfo("成功创建移动项目:"+config.name,'success');
        });
    },
    exeCmd=(cmd)=>{
        return new Promise((resolve,reject)=>{
            exec(cmd,{encoding:"binary"},(e,d,n)=>{
                if(e){
                    reject();
                }else{
                    resolve();
                }
            });
        });
    },
    add=(config,plat,val,judge)=>{
        var site = config.site+'/'+config.name,value=val;
        if(typeof val!='string'){
            value=val.shift();
        }else{
            val='';
        }
        var cmd=['cd /d','"'+site+'"','&&','cordova',plat,'add',value].join(' ');
        printInfo('添加:'+value,'info')
        return exeCmd(cmd).then(()=>{
            printInfo("项目"+config.name+"成功添加"+plat+':'+value,'success');
            if(judge){
                return building(config,site).then(()=>{
                    if(val.length){
                        return add(config,plat,val,judge);
                    }
                });
            }else{
                if(val.length){
                    return add(config,plat,val,judge);
                }
            }
        }).catch(()=>{
            printInfo("项目"+config.name+"添加失败"+plat+':'+value,'warning');
            printInfo(cmd,'warning');
        });
    },
    building=(config,site)=>{
        site=site||config.site+'/'+config.name;
        var cmd=['cd /d','"'+site+'"','&&','cordova build android'].join(' ');
        return exeCmd(cmd).then(()=>{
            printInfo("项目:"+config.name+"构建成功",'success');
        }).catch(()=>{
            printInfo("项目:"+config.name+"构建失败",'warning');
        });
    },
    build_r=(config,site)=>{
        site=site||config.site+'/'+config.name;
        var cmd=['cd /d','"'+site+'"','&&','cordova build android --release -- --keystore="'+config.keystore+'" --alias='+config.alias+' --storePassword='+config.storePassword+' --password='+config.password].join(' ');
        console.log(cmd);
        return exeCmd(cmd).then(()=>{
            printInfo("项目:"+config.name+"构建成功",'success');
        }).catch(()=>{
            printInfo("项目:"+config.name+"构建失败",'warning');
        });
    },
    build=(param)=>{
        var name = param.shift();
        var config=checkKey(name,config1);
        if(param[0]=='r'){
            build_r(config);
        }else{
            building(config);
        }
    },
    create = (param)=>{
        var name = param.shift();
        var config=checkKey(name,config1);
        creat(config).then(()=>{
            let plat=config.platform,plug=config.plugin;
            adds(config,'platform',plat).then(()=>{
                adds(config,'plugin',plug).then(()=>{
                    build_r(config);
                })
            });
        });
    },
    adds=(config,plat,param)=>{
        return new Promise((resolve,reject)=>{
            if(param.length){
                add(config,plat,param.shift()).then(()=>{
                    adds(config,plat,param).then(()=>{
                        resolve();
                    })
                })
            }else{
                resolve()
            }
        });
    },
    check=(param)=>{
        var name = param.shift();
        var config=checkKey(name,config1);
        creat(config).then(()=>{
            add(config,'platform',config.platform[0],true).then(()=>{
                add(config,'plugin',config.plugin,true);
            });
        });
    },
    pub=(target,purpose,isbuild,iscopy,isUpdate)=>{
        if(paramDeal(target,true)){
            purpose=target[1];
            isbuild=target[2];
            iscopy=target[3];
            isUpdate=target[4];
            target=target[0];
        }
        let data=config[target];
        if(purpose=='test'){
            purpose='testversion';
        }else{
            purpose='version';
        }
        let exe=[];
        if(!isbuild){
            exe.push(alertVersion(target,purpose));
        }
        if(!iscopy){
            exe.push(copy(data.sourceAddr,data.site+'/'+data.name+'/www'));
        }
        if(!isUpdate){
            exe.push(alertVersion(target,purpose));
        }
        if(exe.length){
            Promise.all(exe).then(()=>{
                build_r(data).then(()=>{
                })
            });
        }else{
            build_r(data).then(()=>{
            })
        }
    },
    alertVersion=(target,purpose)=>{
        return new Promise((resolve,reject)=>{
            let data=config[target];
            let versionTemp=Number(data[purpose].split('.').join(''))+1;
            let version=[];
            while(versionTemp>0){
                version.unshift(versionTemp%10);
                versionTemp=Math.floor(versionTemp/10);
            }
            version=version.join('.');
                data[purpose]=version;
            if(purpose=='version'){
                data.testversion=version+'.0.0';
            }
            var url = path.join(__dirname,'./config.js');
            alertConfig(url,config);
            alert(data.site+'/'+data.name+'/config.xml','widget,$,version',version,'',(str)=>{
                return str.replace(' standalone="yes"','');
            }).then(()=>{
                console.log("版本修改成功")
                resolve()
            });
        })
    };
    module.exports={
        create,
        check,
        build,
        pub,
        build_r
    };
})();