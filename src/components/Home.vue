<template>
  <v-container grid-list-lg>
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
    <v-layout row wrap v-if="!loading" class="mt-1 mb-1">
      <v-flex xs12 sm6 md4 v-for="(game, id) in games" :key="game.id">
        <v-card color="secondary" class="white--text">
          <v-card-title primary-title>
            <div class="headline">{{ game.location }} | {{ game.date | date }} | {{ game.time }}</div>
          </v-card-title>
          <v-divider class="grey darken-1"></v-divider>
          <v-card-text>
            <div>{{ game.description }}</div>
          </v-card-text>
          <v-card-text>
            <div>{{ game.playersNumber }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              flat
              class="white--text"
              :to="'/games/' + game.id">View Details</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    games () {
      return this.$store.getters.featuredGames
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style>
</style>
