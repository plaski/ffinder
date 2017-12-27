<template>
  <div>
    <v-dialog width="250px" persistent v-model="dialogIsOpen">
      <v-btn
        flat
        class="error"
        slot="activator">Delete</v-btn>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                Please confirm to delete this game
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click.native="dialogIsOpen = false">Cancel</v-btn>
                <v-btn flat @click.native="onDelete">Delete</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['gameId'],
  data () {
    return {
      dialogIsOpen: false
    }
  },
  methods: {
    onDelete () {
      this.dialogIsOpen = false
      this.$store.dispatch('deleteGame', this.gameId)
    }
  }
}
</script>

<style>
</style>
