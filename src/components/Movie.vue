<template>
		<v-app>
				<section>
						<v-parallax
								v-bind:src="latestMovie.Poster"
								height="800"
								class="contain">
								<v-layout
										column
										align-center
										justify-end
										class="white--text pb-5"
								>
										<h1 class="white--text round mb-2 display-3 text-xs-center">{{ latestMovie.Title }}</h1>
								</v-layout>
						</v-parallax>
				</section>
				<v-container>
					<v-layout row wrap>
							<v-flex
								xs8
								offset-xs2
								align-self-center>
								<h2 class="headline text-xs-center mb-2">Plot:</h2>
								<p class="text-xs-center">{{ latestMovie.Plot }} </p>
							</v-flex>
							<v-flex
								class="my-3"
								xs6 
								offset-xs3>
								<v-divider></v-divider>
							</v-flex>
							<v-flex
								xs8
								offset-xs2
								align-self-center>
								<h2 class="headline text-xs-center mb-2">Cast:</h2>
								<v-list>
									<v-list-tile
										v-for="(actor, index) in actorsArray"
										:key="index"
										>
											<v-list-tile-content
												:style="{
													'align-items':'center'
												}">
												{{ actor }}
											</v-list-tile-content>
										</v-list-tile>
								</v-list>
							</v-flex>
							<v-flex xs12>
									<div class="text-xs-center">
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
															Check the Ratings!
															</v-btn>
													</template>
													<v-card>
													<v-card-title
														class="headline grey lighten-2"
														primary-title
													>
														Ratings
													</v-card-title>
													<v-card-text>
														<table style="width:100%" border="1" >
															<tr>
																<th>Source</th>
																<th>Ratings</th>
															</tr>
															<tr v-for="(rating,index) in latestMovie.Ratings" :key="index">
																<td align="center">{{rating.Source}}</td>
																<td align="center">
																	<v-rating 
																	half-increments
																	:value="ratings[index].Value"></v-rating>
																</td>
															</tr>
														</table>
													</v-card-text>
													<v-divider></v-divider>
													<v-card-actions>
														<v-spacer></v-spacer>
														<v-btn
															color="primary"
															flat
															@click="dialog = false"
														>
															OK
														</v-btn>
													</v-card-actions>
												</v-card>
											</v-dialog>
									</div>
							</v-flex>
					</v-layout>
			</v-container>
		</v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
		data () {
				return {
						dialog: false,
						center: 'center',
						ratings: undefined
				}
		},
		computed: {
			...mapState([
				'latestMovie'
			]),
			actorsArray () {
				return this.$store.state.latestMovie.Actors.split(',');
			}
		},
		mounted() {
			this.$store.dispatch('loadSingleMovie', this.$route.params),
	
			this.ratings = this.latestMovie.Ratings,

			this.ratings.forEach((element) => {
			element.Value = parseFloat(element.Value.split(/\/|%/)[0])
			element.Value = element.Value <= 10 ? element.Value / 2 : element.Value / 20
			})
		}	
}
</script>

<style>
		.v-parallax__image-container{
				background-color: rgba(0,0,0, .5);
		}
		.v-parallax__image {
				min-width: unset;
				min-height: 75%;
		}
</style>
