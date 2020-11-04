const fs = require("fs"), path = require("path");
function readDir(url) {
  return new Promise((resolve, reject) => {
    fs.readdir(url, (err, files) => {
      if (err) {
        reject()
      } else {
        resolve(files.map(it => {return url + '/' + it}))
      }
    })
  })
}
function getFileState(url) {
  return new Promise((resolve, reject) => {
    fs.stat(url, (err, states) => {
      if (err) {
        reject()
      } else {
        resolve(states)
      }
    })
  })
}
function exists(url) {
  return new Promise((resolve, reject) => {
    fs.exists(url, exists => {
      if (exists) {
        resolve()
      } else {
        reject()
      }
    })
  })
}
function getSjFolder(url) {
  return url.replace(/(\\|\/)[^\/\\:\*\?\"<>|]+$/,'')
}
function createFolder(url) {
  return new Promise((resolve, reject) => {
    exists(url).catch(e => {
      return createFolder(getSjFolder(url)).then(e => {
        fs.mkdir(url, {recursive: true}, (err) => {
          if (err) {
            console.log(err)
            reject()
          } else {
            resolve()
          }
        })
      })
    }).then(e => {
      resolve()
    })
  })
}
function createFile(url, data) {
  return new Promise((resolve, reject) => {
    exists(url).catch(e => {
      return createFolder(getSjFolder(url))
    }).then(e => {
      fs.writeFile(url, data, 'utf-8', err => {
        if (err) {
          console.log(err)
          reject()
        } else {
          resolve({url, state:'success'})
        }
      })
    })
  })
}
function setConfig(url, data) {
  createFile(path.join(__dirname, url), JSON.stringify(data, null, '  ')).then(v => {
    console.log("版本更新成功")
  })
}
function readFile(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf-8', (err,data) => {
      if (err) {
        console.log(url, 'read fail')
        reject()
      } else {
        resolve(data)
      }
    })
  })
}
function copy(url, old) {
  return readFile(old).then(res => {
    return createFile(url, res)
  })
}
function delFolder(url) {
  return new Promise((resolve, reject) => {
    fs.rmdir(url, (err) => {
      if (err) {
        console.log('删除文件夹url:' + url + '失败')
        reject()
      } else {
        resolve()
      }
    })
  })
}
function delFile(url) {
  return new Promise((resolve, reject) => {
    fs.unlink(url, (err) => {
      if (err) {
        console.log('删除文件url:' + url + '失败')
        reject()
      } else {
        resolve()
      }
    })
  })
}
function del(url) {
  return readDir(url).then(arr => {
    return Promise.all(arr.map(it => {
      return getFileState(it).then(state => {
        if (state.isFile()) {
          return delFile(it)
        } else {
          return del(it).then(e => {
            return delFolder(it)
          })
        }
      })
    }))
  })
}
function delAll(url) {
  return new Promise((resolve, reject) => {
    exists(url).catch(e => {
      resolve()
    }).then(() => {
      del(url).then(e => {
        return delFolder(url)
      }).then(e => {
        resolve()
      }).catch(e => {
        reject()
      })
    })
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
  delFile,
  delAll
}