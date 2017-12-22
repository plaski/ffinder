import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'
import * as Cookie from 'js-cookie'

import game from './game'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    game: game,
    shared: shared,
    user: user
  },

  plugins: [
    createPersistedState({
      paths: ['user.user'],
      key: 'futbolFinderUser',
      getState: (key) => Cookie.getJSON(key),
      setState: (key, state) => {
        const in30minutes = 1 / 48
        Cookie.set(key, state, { expires: in30minutes, secure: false })
      }
    })
  ]
})
