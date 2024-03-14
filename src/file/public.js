const { getList } = require('../cmd'), { readDir, getFileState, copy, setConfig, delFolder, readFile, createFile } = require('./opreate'), { format } = require('../util'), config = require('./config.json'), { js, html } = require('../compress/opreat')
let filter = require('./filter')
var projectNmae = '', mtime = null, ml = '', versionFile = '', sfys = null, temp = 0
function publicVersion(url) {
  url = url || ml
  return getFiles(ml)
}
function getFiles(url) {
  if (filter) {
    if (filter.test(url + '/')) {
      return Promise.resolve('')
    }
  }
  return readDir(url).catch(res => {
    console.log(url + '       读取失败       ', res)
    return ''
  }).then(async res => {
    let files = res.data || [], judge = false, len = files.length, mls = []
    for (var i = 0; i < len; i++) {
      let file = files[i]
      if (filter.test(file)) {
        continue
      }
      let res = await getFileState(file), state = res.data
      if (state.isFile()) {
        if (state.mtime > mtime) {
          let a = await copyFile(file, file.replace(ml, versionFile), judge)
          if (judge === false && a) {
            judge = true
          }
        } else {
          continue
        }
      } else {
        mls.push(file)
      }
    }
    len = mls.length
    for (let i = 0; i < len; i++) {
      await getFiles(mls[i])
    }
  })
}
function copyFile(old, url, judge) {
  return new Promise((resolve, reject) => {
    if (sfys && ysnr && ysnr.test(old) && !(notYsnr && notYsnr.test(old))) {
      if (/\.js$/.test(old)) {
        ysjs(old, url, judge).then(resolve).catch(reject)
      } else if (/\.html$/.test(old)) {
        readFile(old).then(res => {
          const code = res.data
          dealHtml(code).catch(e => {
            console.warn('html:' + old + '        压缩失败  ')
            reject()
          }).then(res => {
            resolve(res)
          })
        })
      } else {
        reject()
      }
    } else {
      reject()
    }
  }).then(res => {
    if (res !== true) {
      return createFile(url, res, judge).then(e => {
        console.log('文件：' + old)
      })
    } else {
      console.log('文件：' + old)
    }
  }).then(e => {
    return true
  }).catch(e => {
    return copy(old, url, judge).catch(e => {
      console.log('文件：' + old + '拷贝失败  ' + e.message)
      return false
    })
  })
}
function dealHtml(old) {
  return html(old).then(res => {
    res = (res || '').replace(/(<script[^>]* src[ ]*=[ "']*)([-A-Za-z0-9.\/]+)(["']*( [^>]*|)>[\s\n]*<\/script>)/g, `$1$2?version=${temp}$3`)
    res = (res || '').replace(/(<link[^>]* href[ ]*=[ "']*)([-A-Za-z0-9.\/]+)(["']*( [^>]*|)[/]*>)/g, `$1$2?version=${temp}$3`)
    return res
  })
}
function ysjs(old, url, judge) {
  return readFile(old).then(res => {
    const code = res.data
    return js(code, url, judge).then(res => true).catch(e => {
      console.warn('js:' + old + '        压缩失败  ')
      return Promise.reject()
    })
  })
}
function setData(data) {
  let now = new Date(), version = format(now, 'YYYYMMDD')
  projectNmae = data.name
  mtime = new Date(data.mtime)
  filter = data.filter || filter
  if (filter && filter.length) {
    filter = projectNmae + '/(' + filter.join('|') + ')'
    filter = new RegExp(filter)
  }
  ysnr = data.ysnr || [
    "lib23/css/",
    "lib23/js/layui-v2.5.7/extend/",
    "lib23/js/modules/",
    "lib23/js/commonUtil.js",
    "public23/js/",
    "index.html",
    "index.js",
    "webs/tymb/",
    "webs/mtysz/zybl/"
  ]
  notYsnr = data.notYsnr || [
    ".*\\.min\\.js"
  ]
  if (ysnr && ysnr) {
    ysnr = projectNmae + '/(' + ysnr.join('|') + ')'
    ysnr = new RegExp(ysnr)
  }
  if (notYsnr && notYsnr) {
    notYsnr = projectNmae + '/(' + notYsnr.join('|') + ')'
    notYsnr = new RegExp(notYsnr)
  }
  data.mtime = temp = new Date().getTime()
  ml = data.ml
  versionFile = (data.versionFile || ('E:/version/' + projectNmae)) + '/' + version + '/' + projectNmae
  sfys = data.sfys
}
getList('Please select the project to be released?', Object.keys(config)).then(e => {
  setData(config[e])
  publicVersion().then((e) => {
    delFolder('./temp').then(res => {
      setConfig(config, true)
    })
  })
}).catch(e => { throw e })