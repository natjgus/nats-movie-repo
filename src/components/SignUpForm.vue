<template>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          Sign Up
        </v-btn>
      </template>

      
    </v-dialog>
</template>

<script>
export default {
    name: 'SignUpForm',
    data () {
        return {
            dialog: false
        }
    }
}
</script>

<style>

</style>
