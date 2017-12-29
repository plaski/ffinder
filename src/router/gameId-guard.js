import { store } from '@/store'

export default (to, from, next) => {
  const gamesId = store.getters.loadedGames.map(game => game.id)
  const gameId = to.params.gameId
  const gameIdExist = gamesId.find(game => gameId === game)
  if (gameIdExist) {
    next()
  } else {
    next('deadend')
  }
}
