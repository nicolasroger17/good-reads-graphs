<script lang="ts">
  import Chart from 'svelte-frappe-charts';

  export let data: BookData[] = [];
  export let key: string = '';

  $: title = camelCaseToWords(key);

  function camelCaseToWords(text: string): string {
    return text.replace(/([A-Z])/g, " $1").toLowerCase();
  }

  let chartData = {
    labels: data.map(book => book.name),
    datasets: [
    {
        values: data.map(book => book[key] || 0)
    }
  ]};
</script>

<h2 class="title">{title}</h2>
<Chart data={chartData} type="line" />

<style>
  .title {
    text-align: left;
    text-transform: capitalize;
  }
</style>