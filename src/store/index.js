import Vue from 'vue'
import Vuex from 'vuex'

import game from './game'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    game: game,
    shared: shared,
    user: user
  }
})
