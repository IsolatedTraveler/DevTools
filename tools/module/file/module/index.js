(()=>{
    "use strict";
    const fs = require("fs");
    const {printInfo,paramDeal} = require('./../common');
    var mkdir=(src,relative)=>{//创建文件目录
        if(paramDeal(src,true)){
            relative=src[1];
            src=src[0];
        }
        if(!relative){
            var temp=src.replace(/\\/g,'/').split('/');
            src = temp.shift();
            temp.pop();
            relative=temp;
        }else{
            if(typeof relative == 'string'){
                relative=relative.replace(/\\/g,'/');
                relative=relative.split('/');
            }
        }
        var name=relative.shift();
        src+='/'+name;
        return exists(src,relative);
    },
    exists=(src,relative)=>{
        return new Promise((resolve,reject)=>{
            fs.exists(src,(exists)=>{
                if(exists){
                    resolve();
                }else{
                    fs.mkdir(src,()=>{
                        resolve();
                    })
                }
            });
        }).then(()=>{
            if(relative&&relative.length){
                return mkdir(src,relative)
            }
        });
    },
    copy=(src,src1)=>{
        return new Promise((resolve,reject)=>{
            if(paramDeal(src,true)){
                src1=src[1];
                src=src[0];
            }
            paramDeal(src1);
            mkdir(src1).then(()=>{
                fs.createReadStream(src).pipe(fs.createWriteStream(src1));
                resolve()
            });
        }).then(()=>{
            printInfo(src+"复制成功","info");
        })
    },
    writeFile =(url,str)=>{
        return new Promise((resolve,reject)=>{
            mkdir(url).then(()=>{
                fs.writeFile(url,str,function(e){
                    if(e){
                        reject()
                        printInfo('写入失败','error');
                    }else{
                        resolve()
                        printInfo(url+"复制成功","success");
                    }
                })
            });
        });
    },
    checkState=(path,ignore,condition,callback)=>{
        return new Promise((resolve,reject)=>{
            fs.stat(path,function(err,states){
                if(err){
                    printInfo("文件："+path+"状态读取失败",'warning');
                }else if(states.isFile()){
                    if(!condition||condition(states)){
                        resolve(path);
                    }else{
                        resolve("");
                    }
                }else{
                    callback(path,ignore,condition).then(data=>{
                        resolve(data);
                    })
                }
            });
        })
    },
    fileFilter = (url,ignore,condition)=>{
        return new Promise((resolve,reject)=>{
            readDir(url,ignore,condition,fileFilter).then((files)=>{
                resolve(files);
            }).catch(()=>{
                resolve('');
            });
        });
    },
    deleteFiles=(src)=>{
        if(paramDeal(src,true)){
            src=src[0];
        }
        return new Promise((resolve,reject)=>{
            readDir(src,'','',deleteFiles).then((files)=>{
                if(files.length){
                    let exe =[];
                    [].forEach.call(files,(file)=>{
                        if(file){
                            exe.push(deleteFile(file));
                        }
                    })
                    Promise.all(exe).then(()=>{
                        fs.rmdir(src,(error)=>{
                            if(error){
                                printInfo(src+'删除失败，请手动删除','warning');
                                reject();
                            }else{
                                printInfo(src+'删除成功','success');
                                resolve();
                            }
                        });
                    })
                }else{
                    fs.rmdir(src,(error)=>{
                        if(error){
                            printInfo(src+'删除失败，请手动删除','warning');
                            reject();
                        }else{
                            printInfo(src+'删除成功','success');
                            resolve();
                        }
                    }); 
                }
            });
        });
    },
    deleteFile=(src)=>{
        return new Promise((resolve,reject)=>{
            fs.unlink(src,(error)=>{
                if(error){
                    printInfo(src+'删除失败，请手动删除','warning');
                    reject();
                }else{
                    resolve();
                    printInfo(src+'删除成功','success');
                }
            })
        });
    },
    readDir=(src,ignore,condition,callback)=>{
        return new Promise((resolve,reject)=>{
            fs.readdir(src,(err,files)=>{
                if(err){
                    printInfo("目录文件："+url+"打开失败",'warning');
                    reject();
                }else {
                    files=files||[];
                    let exe=[];
                    [].forEach.call(files,function(file){
                        if(!ignore||ignore.indexOf(','+file+',')==-1){
                            exe.push(checkState(src+'/'+file,ignore,condition,callback));
                        }
                    });
                    if(exe.length){
                        Promise.all(exe).then(data=>{
                            let data1=[].filter.call(data,(i)=>{return i})
                            resolve(data1);
                        })
                    }else{
                        resolve(files);
                    }
                }
            });
        });
    },
    copyDir=(old,src)=>{
        if(paramDeal(old,true)){
            src=old[1];
            old=old[0];
        }
        let sum=0,n=0;
        paramDeal(src,true);
        var copy1=(src1)=>{
            return new Promise((resolve,reject)=>{
                readDir(src1,'','',copy1).then((files)=>{
                    n++;
                    if(files.length){
                        let exe=[];
                        [].forEach.call(files,(file)=>{
                            sum++;
                            exe.push(copy(file,file.replace(old,src)));
                        })
                        Promise.all(exe).then(()=>{
                            resolve();
                        })
                    }else{
                        resolve()
                    }
                });
            });
        };
        copy1(old).then(()=>{
            printInfo("共拷贝文件:"+sum+"个,文件夹:"+n+"个","info");
        });
    },
    readFile=(src,charset)=>{
        charset=charset||'utf-8';
        return new Promise((resolve,reject)=>{
            fs.readFile(src,charset,(err,data)=>{
                if(err){
                    printInfo('文件:'+src+'读取失败','warning');
                    reject();
                }else{
                    resolve(data);
                }
            });
        });
    };
    module.exports={
        copy,
        mkdir,
        writeFile,
        printInfo,
        paramDeal,
        fileFilter,
        readFile,
        deleteFiles,
        copyDir
    };
})();