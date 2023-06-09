module.exports = function(label,actionType, val, other = {}) {
  let {align,visibleOn,className, type, confirmText, close, hiddenOn, reload, required} = other
  let data = {
    type: "button",
    label
  }
  if (type) {
    data.type = type
  }
  if (align) {
    data.align = align
  }
  if (visibleOn) {
    data.visibleOn = visibleOn
  }
  if (className) {
    data.className = className
  }
  if (confirmText) {
    data.confirmText = confirmText
  }
  if (hiddenOn) {
    data.hiddenOn = hiddenOn
  }
  if (required) {
    data.required = required
  }
  if (close || close === false) {
    data.close = close
  }
  if (actionType) {
    data.actionType = actionType
    if (actionType === 'ajax') {
      actionType = 'api'
    }
    val && (data[actionType] = val)
  }
  if (reload) {
    data.reload = reload
  }
  return data
}