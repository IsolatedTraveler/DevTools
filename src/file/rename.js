const { getFileState, readDir, copy } = require("./opreate"), fs = require("fs")

const ml = 'E:/jtGit/web/his-nm/webs/ggws', backMl = 'E:/version/his-nm/20221111/his-nm/webs/ggws/'
function dealMl(old) {
  // 自定义目录更名规则
  return
}
function dealUrl(old) {
  // 自定义文件更名规则
  if (/\/2022_/.test(old))
    // return changeName(old, old.replace('/2011_', '/2022_'))
    return copy(old, old.replace(ml, backMl))
}
function changeName(old, name) {
  return new Promise((resolve, reject) => {
    fs.rename(old, name, (err) => {
      if (err) {
        console.log(old + '改名失败')
        reject()
      } else {
        resolve()
      }
    })
  })
}
function getFiles(url) {
  return readDir(url).catch(res => {
    console.log(url + '       读取失败       ', res)
    return {data: []}
  }).then(async res => {
    let files = res.data || []
    return Promise.all(files.map(file => {
      return deal(file)
    }))
  }).then(() => {
    dealMl(url)
  })
}
function deal(url) {
  return getFileState(url).then(({data}) => {
    if (data.isFile()) {
      return dealUrl(url)
    } else {
      return getFiles(url)
    }
  }).catch(() => '')
}
function init() {
  getFiles(ml)
}
init()