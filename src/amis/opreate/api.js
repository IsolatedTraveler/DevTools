module.exports = function(url, data, other ={}) {
  let {keys,type, addOptions, api} = other
  let apiVal = {
    url,
    method: "post"
  }
  if (api) {
    apiVal.api = api
  }
  if (type === 'crud') {
    data = data || {}
    data.pageNumber = '${page}'
    data.pageSize = '${perPage}'
  } else {
    apiVal.type = type
    if (type === 'option' && keys) {
      apiVal.keys = keys
    }
  }
  if (addOptions) {
    apiVal.addOptions = addOptions
  }
  data && (apiVal.data = data)
  return apiVal
}