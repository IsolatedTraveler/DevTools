module.exports = function(label, name, other={}) {
  let {mode='inline',format="YYYY-MM-DD", value, ranges= ["7daysago", "prevweek", "thismonth", "prevmonth"],disabledOn} = other
  let  data  = {
    type: 'date-range',
    label,
    name,
    format
  }
  if (mode) {
    data.mode = mode
  }
  if (value) {
    data.value = value
  }
  if(disabledOn){
    data.disabledOn = disabledOn
  }
  data.ranges = ranges
  return data
}