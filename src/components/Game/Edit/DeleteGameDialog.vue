<template>
  <div>
    <v-dialog width="280px" persistent v-model="dialogIsOpen">
      <v-btn
        outline
        class="error--text"
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
                <v-btn outline @click.native="dialogIsOpen = false">Cancel</v-btn>
                <v-btn outline class="error--text" @click.native="onDelete">Delete</v-btn>
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
