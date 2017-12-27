import * as firebase from 'firebase'
import router from '@/router'

export default {
  state: {
    loadedGames: []
  },
  mutations: {
    setLoadedGames (state, payload) {
      state.loadedGames = payload
    },
    createGame (state, payload) {
      state.loadedGames.push(payload)
    },
    deleteGame (state, payload) {
      const index = state.loadedGames.indexOf(payload)
      state.loadedGames.splice(index, 1)
    },
    updateGame (state, payload) {
      const game = state.loadedGames.find(game => {
        return game.id === payload.id
      })
      if (payload.location) {
        game.location = payload.location
      }
      if (payload.description) {
        game.description = payload.description
      }
      if (payload.date) {
        game.date = payload.date
      }
      if (payload.time) {
        game.time = payload.time
      }
    }
  },
  actions: {
    loadGames ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('games').once('value')
        .then((data) => {
          const games = []
          const obj = data.val()
          for (let key in obj) {
            games.push({
              id: key,
              location: obj[key].location,
              date: obj[key].date,
              time: obj[key].time,
              description: obj[key].description,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedGames', games)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createGame ({commit, getters}, payload) {
      const game = {
        location: payload.location,
        date: payload.date,
        time: payload.time,
        description: payload.description,
        creatorId: getters.user.id
      }
      firebase.database().ref('games').push(game)
        .then((data) => {
          const key = data.key
          commit('createGame', {
            ...game,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteGame ({commit}, payload) {
      // commit('setLoading', true)
      firebase.database().ref('games').child(payload).remove()
        .then(() => {
          router.push('/games')
          // commit('setLoading', false)
          commit('deleteGame', payload)
        })
        .catch(error => {
          // commit('setLoading', false)
          console.log(error)
        })
    },
    updateGameData ({commit}, payload) {
      commit('setLoading', true)
      const updateGame = {}
      if (payload.location) {
        updateGame.location = payload.location
      }
      if (payload.description) {
        updateGame.description = payload.description
      }
      if (payload.date) {
        updateGame.date = payload.date
      }
      if (payload.time) {
        updateGame.time = payload.time
      }
      firebase.database().ref('games').child(payload.id).update(updateGame)
        .then(() => {
          commit('setLoading', false)
          commit('updateGame', payload)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    }
  },
  getters: {
    loadedGames (state) {
      return state.loadedGames.sort((gameA, gameB) => {
        return gameA.date > gameB.date
      })
    },
    featuredGames (state, getters) {
      return getters.loadedGames.slice(0, 10)
    },
    loadedGame (state) {
      return (gameId) => {
        return state.loadedGames.find((game) => {
          return game.id === gameId
        })
      }
    }
  }
}
