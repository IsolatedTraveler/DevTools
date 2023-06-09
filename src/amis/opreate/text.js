module.exports = function(label,name, other = {}) {
  let {required, className, addOn, mode ='inline', disabled, disabledOn, value, validations} = other
  let data = {
    type: 'text',
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
  if (validations) {
    data.validations = validations
  }
  if (value) {
    data.value = value
  }
  if (addOn) {
    data.addOn = addOn
  }
  return data
}