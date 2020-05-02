<template>
  <div>
    <h1>Request online presentation</h1>

    <v-progress-linear color="#D4AF37" height="60" value="78" striped>
      <strong>$156 / $200 Goal</strong>
    </v-progress-linear>
    <br />
    <v-btn color="#D4AF37">Add me ($1)</v-btn>

    <GChart
    type="PieChart"
    :data="chartData"
    :options="chartOptions"
  />


  </div>
</template>

<script>
export default {
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['User type', 'Votes'],
        ['PhD', 76],
        ['Profs', 5],
        ['Postdoc', 17],
        ['Other', 58]
      ],
      chartOptions: {
        chart: {
          title: 'Votes',
          subtitle: '-',
        }
      }
    }
  }
}
</script>

<style scoped></style>
