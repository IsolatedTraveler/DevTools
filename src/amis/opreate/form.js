module.exports = function (controls = [], other={}) {
  let {submitText, target, title = '', label = '4', api,reload, data, name,actions, resetAfterSubmit} = other
  let formData = {
    type: 'form',
    title,
    className: `form-label-${label}`
  }
  if (name) {
    formData.name = name
  }
  if (submitText) {
    formData.submitText = submitText === true ? '' : submitText
  }
  if (target) {
    formData.target = target
  }
  if (reload) {
    formData.reload = reload
  }
  if (api){
    formData.api =api
  }
  if (data){
    formData.data =data
  }
  if (actions){
    formData.actions =actions
  }
  if (resetAfterSubmit){
    formData.resetAfterSubmit =resetAfterSubmit
  }
  formData.controls = controls
  return formData
}