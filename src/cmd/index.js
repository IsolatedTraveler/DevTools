var prompt = require('inquirer').createPromptModule()
function getInput(msg) {
  return prompt({
    type: 'input',
    message: msg,
    name: 'text'
  }).then(res => {
    return res.text
  }).catch(e => {throw e})
}
function getList(msg, options) {
  return prompt({
    type: 'list',
    message: msg,
    name: 'li',
    choices: options
  }).then(e => {
    return e.li
  })
}
module.exports = {
  getInput,
  getList
}