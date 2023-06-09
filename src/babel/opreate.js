const babel = require("@babel/core")
function es2015(code) {
  return new Promise((resolve, reject) => {
    babel.transform(code, {}, function(err, result) {
      if (err) {
        console.log(err)
        reject('转es2015出错')
      } else {
        resolve(result.code)
      }
    })
  })
}

module.exports = {
  es2015
}