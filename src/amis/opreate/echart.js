module.exports = function(title) {
  let config = {}, echart = {
    type: 'chart',
    api: {
      type: 'chart',
      url: '',
      data: {
        config
      }
    }
  }
  if (title) {
    if (typeof title === 'string') {
      config.title = {text: title}
    } else {
      config.title = title
    }
  }
  return echart
}