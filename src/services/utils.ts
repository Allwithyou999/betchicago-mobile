import { Platform, Dimensions } from 'react-native'

export function IsIPhoneX() {
  const dimen = Dimensions.get('window')
  return Platform.OS === 'ios' && (dimen.height === 812 || dimen.width === 812)
}

export function IsAndroid() {
  return Platform.OS === 'android'
}

export function DoCalc(firstNum, operator, secondNum) {
  const { width, height } = Dimensions.get('window')
  const screenWidth = width < height ? width : height
  let val = 0

  if (operator === '-') {
    val = (screenWidth * firstNum) / 100 - secondNum
  } else if (operator === '+') {
    val = (screenWidth * firstNum) / 100 + secondNum
  }
  return val
}

export const FormatMoney = value => value && value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const GetMonthName = month => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return monthNames[month]
}

export const GetWeekName = week => {
  const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return weekNames[week]
}

export const GetLocalDate = date => new Date(date.getTime())
export const ConvertToUTC = date => new Date(date.getTime() - date.getTimezoneOffset() * 60000)

export const FormatDate = (date, format = 'mm dd') => {
  const local = GetLocalDate(date)
  const day = local.getDate()
  const month = GetMonthName(local.getMonth())
  const year = local.getFullYear()
  const week = GetWeekName(local.getDay())

  return format
    .replace('yyyy', year.toString())
    .replace('MMM', month)
    .replace('mm', month.substr(0, 3))
    .replace('MM', (local.getMonth() + 1).toString())
    .replace('dd', day.toString())
    .replace('ww', week.substr(0, 3))
    .replace('WW', week)
}

export const FormatAMPM = (date, full = false, sec = false) => {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  if (full) {
    return hours + ':' + minutes
  } else {
    let ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes
    if (sec) {
      return hours + ':' + minutes + ':' + seconds + ampm
    } else {
      return hours + ':' + minutes + ampm
    }
  }
}

export const FormatDateFull = (date, dashed = false) => {
  const local = GetLocalDate(date)
  const day = local.getDate()
  const year = local.getFullYear()
  const month = local.getMonth() + 1

  if (dashed) {
    return `${year}-${TwoDigits(month)}-${TwoDigits(day)}`
  } else {
    return `${year}/${TwoDigits(month)}/${TwoDigits(day)}`
  }
}

export const GetTimezone = () => {
  let timezone = new Date()
    .toString()
    .split('(')[1]
    .split(')')[0]
  if (timezone.split(' ').length) {
    return timezone
      .split(' ')
      .map(s => s.substr(0, 1))
      .join('')
  }
  return timezone
}

export const TwoDigits = val => {
  let temp = '00' + val
  return temp.substr(temp.length - 2)
}

export const GetAgeFromBirth = (birth: Date, date?: Date) => {
  date = date || new Date()
  let diff = date.getTime() - birth.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
}

export const FormatPeriod = (startDate, endDate) => {
  const startLocal = GetLocalDate(startDate)
  const endLocal = GetLocalDate(endDate)

  return (
    GetMonthName(startLocal.getMonth()) +
    ' ' +
    startLocal.getDate() +
    ' - ' +
    GetMonthName(endLocal.getMonth()) +
    ' ' +
    endLocal.getDate()
  )
}

export const FormatTourPeriod = (start_date, end_date) => {
  const start = GetLocalDate(new Date(start_date))
  const end = GetLocalDate(new Date(end_date))
  if (start.getFullYear() !== end.getFullYear()) {
    return `${GetMonthName(start.getMonth())} ${start.getDate()}, ${start.getFullYear()} - ${GetMonthName(
      end.getMonth(),
    )} ${end.getDate()}, ${end.getFullYear()}`
  } else if (start.getMonth() !== end.getMonth()) {
    return `${GetMonthName(start.getMonth())} ${start.getDate()} - ${GetMonthName(
      end.getMonth(),
    )} ${end.getDate()}, ${start.getFullYear()}`
  } else {
    return `${GetMonthName(start.getMonth())} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`
  }
}

export const FormatLeaderboardRound = (leaderboard, size = -1) => {
  const { players, summary } = leaderboard

  if (!summary || !summary.rounds) return

  return players.slice(0, size).map((data, index) => {
    let name = data.first_name ? data.first_name.substr(0, 1) + '. ' + data.last_name : data.name
    let ldata = {
      pos: data.position,
      name,
      earning: data.money ? '$' + FormatMoney(data.money) : '',
      final: '-',
      par: data.score,
      fedex: data.points,
      link: `${data.id}`,
    }

    // if (ldata.final === 0) ldata.final = 'E';
    // if (ldata.final > 0) ldata.final = '+' + ldata.final;

    if (ldata.par === 0) ldata.par = 'E'
    if (ldata.par > 0) ldata.par = '+' + ldata.par

    let i
    for (i = 0; i < 4; i++) {
      if (!data.rounds || !data.rounds[i]) {
        ldata[`r${i + 1}`] = ''
        continue
      }

      let thru = data.rounds[i].thru
      if (thru === 0) {
        ldata[`r${i + 1}`] = ''
      } else if (thru > 0 && thru < 18) {
        if (data.rounds[i].score === 0) {
          ldata[`r${i + 1}`] = 'E (' + thru + ')'
        } else if (data.rounds[i].score > 0) {
          ldata[`r${i + 1}`] = '+' + data.rounds[i].score.toString() + ' (' + thru + ')'
        } else {
          ldata[`r${i + 1}`] = data.rounds[i].score.toString() + ' (' + thru + ')'
        }
      } else if (thru >= 18) {
        ldata[`r${i + 1}`] = data.rounds[i].strokes.toString()

        if (ldata.final === '-') {
          ldata.final = data.rounds[i].strokes
        } else {
          ldata.final += data.rounds[i].strokes
        }
      } else {
        ldata[`r${i + 1}`] = ''
      }
    }

    return ldata
  })
}

export const GetLastDayOfWeek = (date = new Date()) => {
  const curr = new Date(date)
  const first = curr.getDate() - curr.getDay() // First day is the day of the month - the day of the week
  const last = first + 6 // last day is the first day + 6

  // var firstday = new Date(curr.setDate(first))
  const lastday = new Date(curr.setDate(last))
  return lastday
}

export const getFormatedDateString = (prev: string, next: string) => {
  if (next.length < prev.length) {
    return next
  }

  let result = next.split('/').join('')

  if (result.length > 2) {
    result = result.slice(0, 2) + '/' + result.slice(2)
  }

  if (result.length > 5) {
    result = result.slice(0, 5) + '/' + result.slice(5)
  }

  return result.slice(0, 10)
}

export const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const validatePassword = password => password && password.length >= 6

export const FormatPlayerTourData = list => {
  return list.map(data => {
    let ldata = {
      date: FormatDate(new Date(data.summary.start_date), 'mm dd'),
      event: data.summary.name,
      link: `/golf-odds/leaderboard/${data.id}`,
      pos: data.player.position,
      par: data.player.score,
      total: data.player.points,
      win: data.winner ? data.winner.score : '',
    }
    let i
    for (i = 0; i < data.player.rounds.length; i++) {
      ldata[`r${i + 1}`] = data.player.rounds[i].strokes
    }
    for (let j = i; j < 4; j++) {
      ldata[`r${j + 1}`] = '- -'
    }

    return ldata
  })
}
