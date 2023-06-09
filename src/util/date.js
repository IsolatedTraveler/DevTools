module.exports = {
  format(date, format = 'YYYY-MM-DD') {
    const o = {
      'Y': date.getFullYear() + '',
      'M': date.getMonth() + 1,
      'D': date.getDate(),
      'h': date.getHours(),
      'm': date.getMinutes(),
      's': date.getSeconds(),
      'q': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }, arr = format.match(/(Y+|M+|D+|h+|m+|s+|q+|S+)/g)
    arr.forEach(it => {
      let k = it[0], v = o[k], len = it.length
      format = format.replace(it, len === 1 ? v : ('0' + v).slice(-len))
    })
    return format
  }
}