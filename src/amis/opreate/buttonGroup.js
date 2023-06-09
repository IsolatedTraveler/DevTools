module.exports = function(cols, className, other = {}) {
  let {} = other,
  data = {type: 'button-group'}
  if (className){
    data.className = className
  }
  data.buttons = cols
  return data
}