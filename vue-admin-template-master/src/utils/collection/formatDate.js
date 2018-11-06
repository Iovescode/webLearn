/**
 * @param date {String|Date|Number}
 * @param format {String}
 * @return {string}
 */
export default function formatDate(date, format = 'YYYY-MM-DD hh:mm:ss') {
  if (typeof date === 'string') {
    if (Number.isNaN(Date.parse(date))) {
      format = date
      date = Date.now()
    }
  } else if (date == null) {
    date = Date.now()
  }

  date = new Date(date)

  if (isNaN(date)) {
    throw new TypeError('Illegal `date` type .')
  }

  // All be local time
  const tokens = [
    ['YYYY', date.getFullYear()],
    ['YY', `${date.getFullYear()}`.slice(-2)],
    ['MM', `0${date.getMonth() + 1}`.slice(-2)],
    ['DD', `0${date.getDate()}`.slice(-2)],
    ['hh', `0${date.getHours()}`.slice(-2)],
    ['mm', `0${date.getMinutes()}`.slice(-2)],
    ['ss', `0${date.getSeconds()}`.slice(-2)],
    ['ms', `00${date.getMilliseconds()}`.slice(-3)]
  ]

  tokens.forEach((pair) => {
    const [k, v] = pair
    // k = new RegExp(`${k}`, 'g')
    format = format.replace(k, v)
  }
  )
  return format
}
