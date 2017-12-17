import * as firebase from 'firebase'
import router from '@/router'

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForGame (state, payload) {
      const id = payload.id
      const registeredGames = state.user.registeredGames
      if (registeredGames.findIndex(game => game.id === id) >= 0) {
        return
      }
      registeredGames.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromGame (state, payload) {
      const id = payload.id
      const registeredGames = state.user.registeredGames
      registeredGames.splice(registeredGames.findIndex(game => game.id === id), 1)
      Reflect.deleteProperty(state.user.fbKeys, id)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signNewUser ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredGames: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredGames: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    registerUserForGame ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registeredGames')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForGame', {id: payload, fbKey: data.key})
        })
        .catch(error => {
          commit('setLoading', false)
          // commit('setError', error)
          console.log(error)
        })
    },
    unregisterUserFromGame ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registeredGames/' + fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromGame', payload)
        })
        .catch(error => {
          commit('setLoading', false)
          // commit('setError', error)
          console.log(error)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredGames: [],
        fbKeys: {}
      })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registeredGames').once('value')
        .then(data => {
          const gamesData = data.val()
          let registeredGames = []
          let swappedGamesData = {}
          for (let key in gamesData) {
            registeredGames.push(gamesData[key])
            swappedGamesData[gamesData[key]] = key
          }
          const newUser = {
            id: getters.user.id,
            registeredGames: registeredGames,
            fbKeys: swappedGamesData
          }
          commit('setLoading', false)
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    logout ({commit}) {
      commit('setLoading', true)
      firebase.auth().signOut()
        .then(() => {
          commit('setLoading', false)
          commit('setUser', null)
          router.push('/')
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    userGames (state) {
      return state.user.registeredGames
    }
  }
}
