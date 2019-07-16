<template>
  <v-app>
    <v-container>
      <v-layout justify-center my-3>
        <h1 class="display-2 animated fadeIn">Welcome to Nat's Movie Depo!</h1>
        <p class="subheading"></p>
      </v-layout>
      <v-layout justify-center v-if="!apiProgress">
        <v-progress-circular indeterminate :size="50" :width="8" color="green"></v-progress-circular>
      </v-layout>
      <v-card v-if="latestMovies === undefined">
        <v-card-text
          class="red--text text-xs-center"
        >Sorry, there are no movies that match your query. Please try again.</v-card-text>
      </v-card>
      <v-layout wrap class="animated rotate infinite">
        <v-flex
          xs8
          md4
          offset-xs2
          offset-md0
          class="animated rotate infinite"
          v-for="(movie, index) in latestMovies"
          :key="index"
          mb-2
        >
          <v-hover>
            <v-card
              transition="test"
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2} card-flex animated`"
              min-height="600"
              color="grey"
            >
              <v-img contain :src="movie.Poster" aspect-ratio="1"></v-img>

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
                  small
                  color="green"
                  @click="singleMovie(movie.imdbID, movie.Title)"
                >View More</v-btn>
                <v-btn
                  v-if="user !== null"
                  depressed
                  small
                  color="pink"
                  @click="addToFavorites(movie, index)"
                >
                  <v-icon>add</v-icon>Add to Favorites
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
import { mapState } from "vuex";
import MovieActions from "../Mixins/MovieActions";

export default {
  name: "LatestMovie",
  mixins: [MovieActions],
  data() {
    return {
      selectedItem: null
    };
  },
  // methods: {
  //   singleMovie(id, title) {
  //     this.$router.push(`/movie/${id}`);
  //   },
  //   addToFavorites(movie) {
  //     this.$store.dispatch("addFavorite", movie);
  //     this.selectedItem = movie.Title;
  //   }
  // },
  computed: mapState(["latestMovies", "apiProgress", "user"]),
  mounted() {
    this.$store.dispatch("loadMovies");
  }
};
</script>

<style>
.card-fade-enter {
  opacity: 0;
}
.card-fade-enter-active {
  transition: opacity 10s;
}
.card-fade-leave {
  /* opac */
}
.card-fade-leave-active {
  /* opac */
}
.card-flex {
  display: flex;
  flex-direction: column;
}
</style>
