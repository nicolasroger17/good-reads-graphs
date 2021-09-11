<script lang="ts">
  import { search as searchApi } from './services/api';
  import Chart from './Chart.svelte';

  export interface BookData {
    name: String;
    rating: Number;
    ratingCount: Number;
    reviewCount: Number;
	}

  // let url: string = 'https://www.goodreads.com/series/45935-dune';
	// let url: string = 'https://www.goodreads.com/series/45175-harry-potter';
	let url: string = 'https://www.goodreads.com/series/43803-sword-of-truth';
  let data: BookData[];
	let serieTitle: string;
	let loading: boolean = false;

  async function search(): BookData[] {
		loading = true;
		const lastUrlPart = url.split('/').pop().split('-');
		lastUrlPart.shift();
		serieTitle = lastUrlPart.join(' ');
		const apiData = await searchApi(url).then(data => data.data);
		// dune
    // const apiData = [{"name":"Dune","rating":4.24,"ratingCount":905773,"reviewCount":32146},{"name":"Dune","rating":4.24,"ratingCount":905773,"reviewCount":32146},{"name":"Dune Messiah","rating":3.89,"ratingCount":161370,"reviewCount":5730},{"name":"Children of Dune","rating":3.95,"ratingCount":121459,"reviewCount":3109},{"name":"God Emperor of Dune","rating":3.87,"ratingCount":76175,"reviewCount":2163},{"name":"Heretics of Dune","rating":3.88,"ratingCount":60721,"reviewCount":1255},{"name":"Chapterhouse: Dune","rating":3.92,"ratingCount":51656,"reviewCount":1098},{"name":"Hunters of Dune","rating":3.66,"ratingCount":13567,"reviewCount":453},{"name":"Sandworms of Dune","rating":3.65,"ratingCount":11436,"reviewCount":461}]
		// harry potter
		// const apiData = [{"name":"Harry Potter and the Sorcerer's Stone","rating":4.47,"ratingCount":7872268,"reviewCount":124125},{"name":"Harry Potter and the Sorcerer's Stone","rating":4.47,"ratingCount":7872268,"reviewCount":124125},{"name":"Harry Potter and the Chamber of Secrets","rating":4.43,"ratingCount":3041530,"reviewCount":59336},{"name":"Harry Potter and the Prisoner of Azkaban","rating":4.57,"ratingCount":3165404,"reviewCount":62416},{"name":"Harry Potter and the Goblet of Fire","rating":4.56,"ratingCount":2866755,"reviewCount":52121},{"name":"Harry Potter and the Order of the Phoenix","rating":4.5,"ratingCount":2763050,"reviewCount":47721},{"name":"Harry Potter and the Half-Blood Prince","rating":4.57,"ratingCount":2679214,"reviewCount":44009},{"name":"Harry Potter and the Deathly Hallows","rating":4.61,"ratingCount":3073172,"reviewCount":70693},{"name":"Harry Potter and the Cursed Child: Parts One and Two","rating":3.57,"ratingCount":800072,"reviewCount":67466}]
    data = apiData;
		loading = false;
  }
</script>

<main>
  {#if !data && !loading}
		<h1>Welcome to goodreads graphs!</h1>
		<p>Please enter the series you want to analyze</p>
		<input placeholder='https://www.goodreads.com/series/45935-dune' bind:value={url} />
		<button on:click={search}>Search</button>
  {/if}
	{#if loading}
		<h1>{serieTitle}</h1>
		<!-- <BookLoader /> -->
		<img src="/book-loader.svg" alt="loader" />
	{/if}
  {#if data}
		<h1>{serieTitle}</h1>
	  <Chart data={data} key='rating' />
	  <Chart data={data} key='ratingCount' />
	  <Chart data={data} key='reviewCount' />
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 1024px;
		margin: 0 auto;
	}

	h1 {
		color: rgb(126, 106, 57);
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	input {
		width: 600px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>