export default (value) => {
  const date = new Date(value)
  return date.toLocaleString('pl-PL', {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})
}
