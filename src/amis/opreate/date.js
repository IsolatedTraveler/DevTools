module.exports = function(label, name, other={}) {
  let {mode='inline',format="YYYY-MM-DD", disabledOn, value,required} = other
  let  data  = {
    type: 'date',
    label,
    name,
    mode,
    format
  }
  if (required) {
    data.required = true
  }
  if (disabledOn) {
    data.disabledOn = disabledOn
  }
  if (value) {
    data.value = value
  }
  return data
}