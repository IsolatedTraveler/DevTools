const { getUUid } = require("../util"), UglifyJS = require("uglify-js"), { es2015 } = require('../babel/opreate'),
  minify = require('html-minifier').minify, browserify = require('browserify'), { createFile, readFile } = require("../file/opreate")
  , lssj = {}, fs = require("fs")
function jxEs2015(code, url, judge) {
  let id
  do {
    id = getUUid()
  } while (lssj[id])
  lssj[id] = './temp/' + id + '.js'
  return Promise.all([createFile(lssj[id], code, judge), createFile(url, '', judge)]).then(e => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let b = browserify()
        b.add(lssj[id])
        let a = b.bundle().pipe(fs.createWriteStream(url))
        a.on('close', function () {
          setTimeout(() => {
            ysjs(url).then(resolve)
          }, 100);
        })
      }, 100)
    })
  })
}
function js(code, url, judge) {
  return es2015(code).then(code => {
    return jxEs2015(code, url, judge)
  })
}
function ysjs(url) {
  return readFile(url).then(res => {
    res = UglifyJS.minify(res.data, {
      mangle: true,
      compress: {
        sequences: true,
        drop_debugger: true,
        conditionals: true,
        comparisons: true,
        booleans: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      }
    })
    if (res.error) {
      return Promise.reject(res)
    } else {
      return createFile(url, res.code)
    }
  })
}
function html(code) {
  return new Promise((resolve, reject) => {
    let data = minify(code, {
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true
    })
    resolve(data)
  })
}
module.exports = {
  js,
  html,
  ysjs
}