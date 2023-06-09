
module.exports = function(label,name,source, other = {}) {
  let {mode = 'inline', required,disabledOn,multiple,placeholder,value, joinValues = true} = other
  let data = {
    type: 'select',
    label,
    name,
    mode
  }
  if (multiple) {
    data.multiple = multiple
  }
  if (placeholder) {
    data.placeholder = placeholder
  }
  if (required) {
    data.required = true
  }
  if (disabledOn) {
    data.disabledOn = disabledOn
  }
  if (joinValues !== true) {
    data.joinValues = joinValues
  }
  if (value) {
    data.value = value
  }
  data.source = source
  return data
}