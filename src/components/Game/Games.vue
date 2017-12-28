<template>
  <v-container>
    <v-layout wrap row>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card v-for="game in games" :key="game.id" class="mb-3">
          <v-container fluid>
            <v-layout row>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div class="headline headline--date">{{ game.location }}</div>
                  <div class="headline headline--date">{{ game.date | date }}</div>
                  <div class="headline headline--date">{{ game.time }}</div>
                </v-card-title>
                <v-card-text>
                  <div class="mb-2">{{ game.description }}</div>
                  <div>Still {{ game.playersNumber }} <span v-if="game.playersNumber === '1'">place</span><span v-else>places</span> left!</div>
                </v-card-text>
              </v-flex>
              <v-flex xs5>
                <v-card-media src="http://via.placeholder.com/300x200" height="200"></v-card-media>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn outline :to="'/games/' + game.id">View Game</v-btn>
                  <!-- <v-btn flat class="error">Register!</v-btn> -->
                </v-card-actions>
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
