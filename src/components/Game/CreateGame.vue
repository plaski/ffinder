<template>
  <v-container>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <h1 class="mb-3">Create New Game</h1>
          <form @submit.prevent="onCreateGame">
            <v-text-field
              class="accent--text"
              name="location"
              label="Location"
              id="location"
              prepend-icon="location_on"
              required
              v-model="location"
              :rules="[() => location.length > 0 || '']"
            ></v-text-field>
            <v-menu
              lazy
              :close-on-content-click="false"
              v-model="datePicker"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-left="10"
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                name="date"
                label="Date"
                id="date"
                prepend-icon="date_range"
                readonly
                required
                :rules="[() => date != null || '']"
                v-model="date"
              ></v-text-field>
              <v-date-picker v-model="date" no-title scrollable autosave>
              </v-date-picker>
            </v-menu>
            <v-menu
              lazy
              :close-on-content-click="false"
              v-model="timePicker"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                name="time"
                label="Time"
                id="time"
                prepend-icon="access_time"
                readonly
                required
                :rules="[() => time != null || '']"
                v-model="time"
              ></v-text-field>
              <v-time-picker v-model="time" format="24hr" no-title autosave></v-time-picker>
            </v-menu>
            <v-text-field
              class="accent--text"
              name="description"
              label="Description"
              id="description"
              prepend-icon="description"
              v-model="description"
            ></v-text-field>
            <v-btn
              class="secondary mt-3"
              :disabled="!formIsValid"
              type="submit">Create Game</v-btn>
          </form>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      location: '',
      date: null,
      time: null,
      description: '',
      datePicker: false,
      timePicker: false
    }
  },
  computed: {
    formIsValid () {
      return this.location !== '' && this.date !== '' && this.time !== '' && this.description !== ''
    }
  },
  methods: {
    onCreateGame () {
      if (!this.formIsValid) {
        return
      }
      const gameData = {
        location: this.location,
        date: this.date,
        time: this.time,
        description: this.description
      }
      this.$store.dispatch('createGame', gameData)
      this.$router.push('/games')
    }
  }
}
</script>

<style>
</style>
