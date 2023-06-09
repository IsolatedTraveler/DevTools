const { format } = require('./date');

module.exports = {
  ...require('./date'),
  ...require('./ajax'),
  getUUid() {
    return format(new Date(), 'YYYYMMDD') + '-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })
  }
}