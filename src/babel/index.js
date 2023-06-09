const babel = require("@babel/core")
babel.transform("function code(name) {console.log(`hello ${name}, this is a test`)};", {}, function(err, result) {
  console.log(err)
  console.log(result.code)
})