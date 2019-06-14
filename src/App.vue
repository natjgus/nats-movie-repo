<template>
  <v-app>
    <AppNav></AppNav>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppNav from './components/AppNav'

export default {
  name: 'App',
  components: {
    AppNav
  },
  data () {
    return {
      //
    }
  },
  methods: {
    sendHome(){
      this.$router.push(`/`)
    }
  },
  computed: {
    route() {
      return this.$store.state.route
    }
  }
}
</script>
