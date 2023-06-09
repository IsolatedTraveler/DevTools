module.exports = function(label, cols, other = {}) {
  let {className, toggled} = other,
  data = {type: 'button-group', label}
  if (className){
    data.className = className
  }
  if (toggled) {
    data.toggled = toggled
  }
  data.buttons = cols
  return data
}