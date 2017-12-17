import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertComp from './components/Shared/Alert.vue'
import EditGameDialog from './components/game/edit/EditGameDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertComp)
Vue.component('app-edit-game-dialog', EditGameDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCobDwpqJDbc3dzB6AZVLX-wPHiFWN2C1o',
      authDomain: 'futbolfinder.firebaseapp.com',
      databaseURL: 'https://futbolfinder.firebaseio.com',
      projectId: 'futbolfinder',
      storageBucket: 'futbolfinder.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadGames')
  }
})
