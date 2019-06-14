import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        latestMovies: [],
        latestMovie: [],
        apiProgress: false,
        route: null,
        id: null,
        apiMessage: ''
    },
    mutations: {
        SET_MOVIES (state, latestMovies) {
            state.latestMovies = latestMovies;
            state.apiProgress = true
        },
        SET_MOVIE (state, singleMovie) {
            state.latestMovie = singleMovie
        },

    },
    actions: {
        updateId ( { commit }, movieId) {
            commit('SET_SINGLE_MOVIE', movieId)
        },
        loadMovies ({ commit, state }){
            if (state.latestMovies.length === 0){
                axios.get('http://www.omdbapi.com/?apikey=1ef35a85&', {
                    params: {
                        s: 'vanilla',
                        type: 'movie',
                        page: 1,
                        r: 'json'
                    }
                })
                .then(response => response.data.Search)
                .then(latestMovies => {
                    commit('SET_MOVIES', latestMovies);
                })
                .catch(e => alert(e))
            } else {
                return
            }
        },
        reloadMovies({ commit, state}, searchString) {
            state.apiProgress = false;
            axios.get('http://www.omdbapi.com/?apikey=1ef35a85&', {
                    params: {
                        s: searchString,
                        type: 'movie',
                        page: 1,
                        r: 'json'
                    }
                })
                .then(response => response.data.Search)
                .then(latestMovies => {
                    commit('SET_MOVIES', latestMovies);
                })
                .catch(e => alert(e))
        },
        loadSingleMovie({ commit }, id) {
            axios.get('http://www.omdbapi.com/?apikey=1ef35a85&', {
                    params: {
                        i: id.id,
                        type: 'movie',
                        plot: 'full',
                        r: 'json'
                    }
                })
                .then(response => response.data)
                .then(singleMovie => {
                    commit('SET_MOVIE', singleMovie);
                })
                .catch(e => alert(e))
        }
    }

});