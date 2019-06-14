<template>
    <v-app>
        <v-container>
            <v-layout 
                justify-center
                my-3>
                <h1 class="display-2">Welcome to Nat's Movie Depo!</h1>
                <p class="subheading"></p>
            </v-layout>
            <v-layout justify-center v-if="!apiProgress">
                <v-progress-circular
                    indeterminate
                    :size="50"
                    :width="8"
                    color="green">
                </v-progress-circular>
            </v-layout>
            <v-card v-if="latestMovies === undefined">
                <v-card-text
                    class="red--text text-xs-center">
                    Sorry, there are no movies that match your query. Please try again.
                </v-card-text>
            </v-card>  
            <v-layout wrap>
                <v-flex xs4
                v-for="(movie, index) in latestMovies"
                :key="index"
                mb-2>
                    <v-hover>
                        <v-card 
                            slot-scope="{ hover }"
                            :class="`elevation-${hover ? 12 : 2} card-flex`"
                            height="600"
                            color="grey">
                            <v-img
                            contain
                            :src="movie.Poster"
                            aspect-ratio="1"></v-img>

                            <v-card-title primary-title>
                                <div>
                                    <h2>{{ movie.Title }}</h2>
                                    <div>Year: {{ movie.Year }}</div>
                                    <div>Type: {{ movie.Type }}</div>
                                </div>
                            </v-card-title>

                            <v-card-actions class="justify-center">
                                <v-btn
                                    depressed
                                    color="green"
                                    @click="singleMovie(movie.imdbID)"
                                    >
                                    View More
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-hover>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'LatestMovie',
    methods: {
        singleMovie (id) {
            this.$router.push(`/movie/${id}`)
        }
    },
    computed: mapState([
        'latestMovies',
        'apiProgress'
    ]),
    mounted() {
        this.$store.dispatch('loadMovies')
    }
}
</script>

<style>
    .card-flex{
        display: flex;
        flex-direction: column;
    }
</style>
