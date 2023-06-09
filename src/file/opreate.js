const fs = require("fs"), path = require("path"), { getUUid } = require('../util')
codeData = {
  '-1': '文件：#{url}不存在',
  '0': '成功',
  '1': '文件：#{url}状态读取失败',
  '2': '文件：#{url}不是文件夹，不能使用readDir方法打开',
  '3': '删除文件夹:#{url}失败',
  '4': '删除文件:#{url}失败',
  '5': '文件;#{url}数据读取失败',
  '6': '创建文件：#{url}失败',
  '7': '创建文件夹：#{url}失败'
}
function getCode(code, url, data) {
  if (code === 0) {
    data = data || url
    return { code, msg: '成功', data }
  } else {
    let msg = codeData[code]
    if (msg) {
      msg = msg.replace('#{url}', url)
    } else {
      msg = url + '异常：' + ((data || {}).message || '未获取到异常信息')
    }
    return { code, message: msg }
  }
}
function exists(url) {
  return new Promise((resolve, reject) => {
    fs.exists(url, exists => {
      if (exists) {
        resolve(getCode(0))
      } else {
        reject(getCode(-1, url))
      }
    })
  })
}
function getFileState(url) {
  return new Promise((resolve, reject) => {
    fs.stat(url, (err, states) => {
      if (err) {
        reject(getCode(1, url))
      } else {
        resolve(getCode(0, states))
      }
    })
  })
}
function readDir(url) {
  return new Promise((resolve, reject) => {
    fs.readdir(url, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(getCode(0, files.map(it => { return url + '/' + it })))
      }
    })
  }).catch(err => {
    return exists(url).then(() => {
      return getFileState(url).then(res => {
        return Promise.reject(getCode(res.data.isFile() ? 2 : 100, url, err))
      })
    })
  })
}
function delFile(url) {
  return new Promise((resolve, reject) => {
    fs.unlink(url, (err) => {
      if (err) {
        reject(getCode(4, url))
      } else {
        resolve(getCode(0))
      }
    })
  })
}
function delFolder(url) {
  return new Promise((resolve, reject) => {
    fs.rm(url, { recursive: true }, (err) => {
      if (err) {
        resolve(getCode(0))
      } else {
        resolve(getCode(0))
      }
    })
  })
}
function copy(old, url) {
  return notRepeat([old, url], copy1)
}
function copy1(old, url) {
  return new Promise((resolve, reject) => {
    exists(url).catch(() => {
      return createFolder(getSjFolder(url))
    }).then(e => {
      fs.createReadStream(old).on('error', function (e) {
        reject('')
      }).pipe(fs.createWriteStream(url).on('error', function (e) {
        reject('')
      }).on('close', function (e) {
        resolve('')
      }))
    })
  })
}
function readFile(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf-8', (err, data) => {
      if (err) {
        reject(getCode(5, url))
      } else {
        resolve(getCode(0, data))
      }
    })
  })
}
function getSjFolder(url) {
  return url.replace(/(\\|\/)[^\/\\:\*\?\"<>|]+$/, '')
}
let repeatObj = {}
function notRepeat(arr, callBack, id) {
  if (!id) {
    id = getUUid()
    repeatObj[id] = 0
  } else if (repeatObj[id] > 9) {
    return Promise.reject()
  }
  repeatObj[id]++
  return callBack(...arr).catch(e => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        notRepeat(arr, callBack, id).then(e => {
          delete repeatObj[id]
          resolve()
        }).catch(reject)
      }, 50);
    })
  })
}
function createFile1(url, data) {
  return new Promise((resolve, reject) => {
    exists(url).catch(() => {
      return createFolder(getSjFolder(url))
    }).then(e => {
      fs.writeFile(url, data, 'utf-8', err => {
        if (err) {
          reject()
        } else {
          resolve(getCode(0))
        }
      })
    })
  })
}
function createFile(url, data) {
  return notRepeat([url, data], createFile1)
}

function createFolder(url) {
  return new Promise((resolve, reject) => {
    exists(url).catch(() => {
      return createFolder(getSjFolder(url)).then(() => {
        fs.mkdir(url, { recursive: true }, (err) => {
          if (err) {
            reject(getCode(7, url))
          } else {
            resolve(getCode(0))
          }
        })
      })
    }).then(e => {
      resolve(getCode(0))
    })
  })
}
function setConfig(data, judge, url = './config.json', fj = __dirname) {
  createFile(path.join(fj, url), JSON.stringify(data, null, '  '), judge).then(v => {
    console.log("版本更新成功")
  })
}
module.exports = {
  readDir,
  getFileState,
  createFolder,
  createFile,
  setConfig,
  copy,
  readFile,
  delFolder,
  delFile
}