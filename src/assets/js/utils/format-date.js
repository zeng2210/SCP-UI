/**
 * @title 时间格式化
 * @param date {*} 需要格式化的日期，可以是number也可以是一个日期对象，非法的值返回空字符串。
 * @param fmt {string} 格式描述串，如 'YYYY-MM-DD hh:mm:ss'
 * @return {string}
 */
export default function (date, fmt) {
  if (typeof date === 'number') {
    date = new Date(date)
  }
  var isValidDate = (date instanceof Date) && !isNaN(date.getYear())
  if (!isValidDate) {
    return ''
  }
  let dateFormat = /(Y{2,4})|(M{1,2})|(D{1,2})|(h{1,2})|(m{1,2})|(s{1,2})/g
  return fmt.replace(dateFormat, function (self, Y, M, D, h, m, s) {
    let txt = null
    switch (true) {
      case !!Y :
        txt = date.getFullYear().toString()
        return txt.substr(txt.length - Y.length)
      case !!M :
        txt = '0' + (date.getMonth() + 1)
        return txt.substr(txt.length - M.length)
      case !!D :
        txt = '0' + date.getDate()
        return txt.substr(txt.length - D.length)
      case !!h :
        txt = '0' + date.getHours()
        return txt.substr(txt.length - h.length)
      case !!m :
        txt = '0' + date.getMinutes()
        return txt.substr(txt.length - m.length)
      case !!s :
        txt = '0' + date.getSeconds()
        return txt.substr(txt.length - s.length)
      default : return ''
    }
  })
}
