module.exports = function(other) {
  let {api, schemaApi, data} = other
  let serviceData = {
    type: "service"
  }
  if (api) {
    serviceData.api = api
  }
  if (data) {
    serviceData.data = data
  }
  if (schemaApi) {
    serviceData.schemaApi = schemaApi
  }
  return serviceData
}