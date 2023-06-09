const {getList} = require('../cmd'), config = require('./config.json'), {readDir, getFileState, copy, setConfig, delFolder, readFile, createFile} = require('./opreate')
var ml = ''
function getFiles(url) {
  return readDir(url).catch(res => {
    console.log(url + '       读取失败       ', res)
    return ''
  }).then(async res => {
    let files = res.data || [], len = files.length, len1 = len
    if (len) {
      for(let i = 0; i < len; i++) {
        let file = files[i]
        let res = await getFileState(file), state = res.data
        if (!state.isFile()) {
          let judge = await getFiles(file)
          judge && len1--
        }
      }
      if (len1 === 0) {
        console.log('delete  ' + url)
        await delFolder(url)
        return true
      } else {
        return false
      }
    } else {
      console.log('delete  ' + url)
      await delFolder(url)
      return true
    }
  })
}
getList('Please select the project to be released?', Object.keys(config)).then(e => {
  let data = config[e]
  ml = data.versionFile || ('E:/version/' + data.name)
  getFiles(ml)
})