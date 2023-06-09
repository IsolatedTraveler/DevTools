module.exports = function(label, name, other ={}) {
  let {mode='inline',disabledOn, required} = other
  let  data  = {
    type: 'textarea',
    label,
    name,
    mode
  }
  if (disabledOn) {
    data.disabledOn = disabledOn
  }
  if (required) {
    data.required = true
  }
  return data
}