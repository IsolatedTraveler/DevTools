module.exports = function(title, body, other = {}) {
  let {size,className, actions} = other
  let returnVal = {
    title
  }
  if (size) {
    returnVal.size = size
  }
  if (className) {
    returnVal.className = className
  }
  if (actions) {
    returnVal.actions = actions
  }
  returnVal.body = body
  return returnVal
}