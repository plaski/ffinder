<template>
  <v-container>
    <v-layout wrap row>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card v-for="game in games" :key="game.id" class="mb-3">
          <v-container fluid>
            <v-layout row>
              <v-flex xs7>
                <v-card-title primary-title class="error--text">
                  <div>
                    <h2 class="error--text">{{ game.location }} | {{ game.date | date }} | {{ game.time }}</h2>
                  </div>
                </v-card-title>
                <v-card-text>
                  <div>{{ game.description }}</div>
                </v-card-text>
                <v-card-text>
                  <div>{{ game.playersNumber }}</div>
                </v-card-text>
                <v-card-actions>
                  <v-btn flat :to="'/games/' + game.id">View Game</v-btn>
                  <!-- <v-btn flat class="error">Register!</v-btn> -->
                </v-card-actions>
              </v-flex>
              <v-flex xs5>
                <v-card-media src="http://via.placeholder.com/300x200" height="200"></v-card-media>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    games () {
      return this.$store.getters.loadedGames
    }
  }
}
</script>

<style>
</style>
