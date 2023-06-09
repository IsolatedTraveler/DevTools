module.exports = function(cols, className) {
  let data = {type: 'group'}
  if (className){
    data.className = className
  }
  data.controls = cols
  return data
}