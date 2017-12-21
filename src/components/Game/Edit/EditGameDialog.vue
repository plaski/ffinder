<template>
  <div>
    <v-dialog width="300px" persistent v-model="dialogIsOpen">
      <v-btn
        flat
        class="error"
        slot="activator">Edit</v-btn>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>
                <span class="headline">Edit Game</span>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  class="accent--text"
                  name="location"
                  label="Location"
                  id="location"
                  prepend-icon="location_on"
                  v-model="editedLocation"
                  :rules="[() => editedLocation.length > 0 || '']"
                ></v-text-field>
                <v-menu
                  lazy
                  :close-on-content-click="false"
                  v-model="datePicker"
                  transition="scale-transition"
                  offset-y
                  full-width
                >
                  <v-text-field
                    slot="activator"
                    name="date"
                    label="Date"
                    id="date"
                    prepend-icon="date_range"
                    readonly
                    required
                    :rules="[() => editedDate != null || '']"
                    v-model="editedDate"
                  ></v-text-field>
                  <v-date-picker
                    v-model="editedDate"
                    no-title
                    scrollable
                    autosave
                    :allowed-dates="allowedDates">
                  </v-date-picker>
                </v-menu>
                <v-menu
                  lazy
                  :close-on-content-click="false"
                  v-model="timePicker"
                  transition="scale-transition"
                  offset-y
                  full-width
                >
                  <v-text-field
                    slot="activator"
                    name="time"
                    label="Time"
                    id="time"
                    prepend-icon="access_time"
                    readonly
                    required
                    :rules="[() => editedTime != null || '']"
                    v-model="editedTime"
                  ></v-text-field>
                  <v-time-picker
                    v-model="editedTime"
                    format="24hr"
                    no-title
                    autosave
                    :allowed-minutes="allowedTimes.minutes"
                    ></v-time-picker>
                </v-menu>
                <v-text-field
                class="accent--text"
                name="description"
                label="Description"
                id="description"
                prepend-icon="description"
                v-model="editedDescription"
                :rules="[() => editedDescription.length > 0 || '']"
                ></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click.native="dialogIsOpen = false">Cancel</v-btn>
                <v-btn flat @click.native="onSaveChanges">Save</v-btn>
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
  props: ['game'],
  data () {
    return {
      editedLocation: this.game.location,
      editedDate: this.game.date,
      editedTime: this.game.time,
      editedDescription: this.game.description,
      dialogIsOpen: false,
      datePicker: false,
      allowedDates: {
        min: null
      },
      allowedTimes: {
        minutes: function (value) {
          return value % 15 === 0
        }
      },
      timePicker: false
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedLocation.trim() === '' || this.editedDescription.trim() === '') {
        return
      }
      this.dialogIsOpen = false
      this.$store.dispatch('updateGameData', {
        id: this.game.id,
        location: this.editedLocation,
        date: this.editedDate,
        time: this.editedTime,
        description: this.editedDescription
      })
    }
  },
  mounted () {
    const date = new Date()
    this.allowedDates.min = date.toISOString().substr(0, 10)
  }
}
</script>

<style>
</style>
