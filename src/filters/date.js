export default (value) => {
  const date = new Date(value)
  const gameDay = date.getDay()
  const now = new Date()
  const today = now.getDay()
  if (gameDay === today) {
    return 'today, ' + date.toLocaleString('pl-PL', {month: 'numeric', day: 'numeric', year: 'numeric'})
  } else if (gameDay - today === 1) {
    return 'tomorrow, ' + date.toLocaleString('pl-PL', {month: 'numeric', day: 'numeric', year: 'numeric'})
  }
  return date.toLocaleString('pl-PL', {weekday: 'long', month: 'numeric', day: 'numeric', year: 'numeric'})
}
