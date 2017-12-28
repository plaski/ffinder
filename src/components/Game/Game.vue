<template>
  <v-container>
    <v-layout row v-if="loading">
      <v-flex xs12 text-xs-center>
        <v-progress-circular
          indeterminate
          color="secondary"
          :size="100"
          :width="2"
          ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h1 class="error--text">{{ game.location }} | {{ game.date | date }} | {{ game.time }}</h1>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-game-dialog :game="game"></app-edit-game-dialog>
            </template>
          </v-card-title>
          <v-layout>
            <v-flex xs8>
              <v-card-text>{{ game.description }}</v-card-text>
              <v-card-text>{{ game.playersNumber }}</v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-card-media src="http://via.placeholder.com/300x300" height="300" class="mr-4 mb-3"></v-card-media>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              flat
              class="error"
              @click="registerUnregister"
              v-if="userIsAuthenticated && !userIsCreator"> {{ showRegister }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['gameId'],
  computed: {
    game () {
      return this.$store.getters.loadedGame(this.gameId)
    },
    loading () {
      return this.$store.getters.loading
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.game.creatorId
    },
    userIsRegistered () {
      return this.$store.getters.userGames.findIndex(gameId => {
        return gameId === this.gameId
      }) >= 0
    },
    showRegister () {
      if (this.userIsRegistered) {
        return 'unregister'
      } else {
        return 'register'
      }
    }
  },
  methods: {
    registerUnregister () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFromGame', this.gameId)
      } else {
        this.$store.dispatch('registerUserForGame', this.gameId)
      }
    }
  }
}
</script>

<style>
</style>
