/**
 * @type {Number} id
 */
export default {
  methods: {
    singleMovie(id) {
      this.$router.push(`/movie/${id}`);
      this.$store.dispatch("loadSingleMovie", id)
    },
    addToFavorites(movie) {
      this.$store.dispatch("addFavorite", movie);
      this.selectedItem = movie.Title;
    }
  }
}