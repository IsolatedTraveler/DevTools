module.exports = function(label,name, other = {}) {
  let {required, className, addOn, mode ='inline', disabled, disabledOn, value} = other
  let data = {
    type: 'number',
    label,
    mode,
    name
  }
  if (className) {
    data.className = className
  }
  if (disabled) {
    data.disabled = disabled
  }
  if (disabledOn) {
    data.disabledOn = disabledOn
  }
  if (required) {
    data.required = true
  }
  if (value) {
    data.value = value
  }
  if (addOn) {
    data.addOn = addOn
  }
  return data
}