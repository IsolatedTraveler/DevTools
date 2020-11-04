const {getList} = require('../cmd/'), {readDir, getFileState, copy, setConfig,delAll} = require('./opreate'), config = require('./config.json')
var name = '', data = null, mtime = null, xdlj = '', ml =''
function forFiles(files = []) {
  return Promise.all(files.map(file => {
    return getFileState(file).then(state => {
      if (state.isFile()) {
        if (state.mtime > mtime) {
          return copy(file.replace(ml, xdlj), file)
        } else {
          return ''
        }
      } else {
        return readDir(file).then(forFiles)
      }
    })
  }))
}
function getArr(arr) {
  const a = []
  arr.forEach(it => {
    if (it) {
      if (Array.isArray(it)) {
        a.push(...getArr(it))
      } else {
        a.push(it)
      }
    }
  })
  return a
}
getList('Please select the project to be released?', Object.keys(config)).then(e => {
  data = config[e]
  let now = new Date(), m = now.getMonth() + 1, d = now.getDate(), version = now.getFullYear() + '-' + (m > 9 ? m : ('0' + m)) + '-' + (d > 9 ? d : ('0' + d)),  h = now.getHours(), M = now.getMinutes(), s = now.getSeconds()
  name = e
  mtime = new Date(data.mtime)
  ml = data.ml
  xdlj = (data.versionFile || ('D:/version/' + name)) + '/' + version.replace(/-/g, '') + '/' + name
  delAll(xdlj).then(res => {
    readDir(data.ml).then(forFiles).then(files => {
      let arr = getArr(files)
      arr.forEach(it => {
        console.log(it.url, it.state)
      })
      data.mtime = version + ' ' + (h > 9 ? h : ('0' + h)) + ':' + (M > 9 ? M : ('0' + M)) + ':' + (s > 9 ? s : ('0' + s))
      if (arr.length) {
        setConfig('./config.json', config)
      } else {
        console.log('未找到修改文件')
      }
    })
  })
})