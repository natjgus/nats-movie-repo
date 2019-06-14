<template>
    <v-toolbar app>
        <router-link to="/">
            <v-toolbar-title 
                class="headline text-uppercase">
                <span>Nat's</span>
                <span class="font-weight-light">Movie Repo</span>
            </v-toolbar-title>
        </router-link>  
        <v-spacer></v-spacer>
        <SignUpForm></SignUpForm>
        <v-text-field
            label='Movie Name'
            v-model='searchString'
            v-on:keyup.enter="searchMovie"
            >
        </v-text-field>
        <v-btn
            flat
            :disabled="!dataAvailable"
            @click="searchMovie"
        >
        <span class="mr-2">Search</span>
        </v-btn>
    </v-toolbar>
</template>

<script>
import SignUpForm from './SignUpForm'

export default {
    name: 'AppNav',
    components: {
        SignUpForm
    },
    data () {
        return {
            searchString: ''
        }
    },
    computed: {
        dataAvailable () {
        return this.searchString !== null && this.searchString !== ''
        }
    },
    methods: {
        searchMovie() {
            this.$store.dispatch('reloadMovies', this.searchString);
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    a {
    color: black;
    text-decoration: none;
    }
</style>
