<script>
  import FusionCharts from 'fusioncharts';
  import Timeseries from 'fusioncharts/fusioncharts.timeseries';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts, Timeseries);

  const schema = [
    {
        'name': 'Time',
        'type': 'date',
        'format': '%d-%m-%y-%-I:%-M'
    },
    {
      'name': 'Waiting time (in minutes)',
      'type': 'number'
    }
  ]

  const getChartConfig = (data) => {
    const fusionDataStore = new FusionCharts.DataStore(),
      fusionTable = fusionDataStore.createDataTable(data, schema);

    return {
      type: 'timeseries',
      width: '100%',
      height: 450,
      renderAt: 'chart-container',
      dataSource: {
        data: fusionTable,
        caption: {
          text: coaster
        },
        navigator: {
          enabled: false,
        },
        tooltip: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        yAxis: [
          {
            plot: {
              value: 'Waiting time (in minutes)',
              type: 'line'
            },
            title: 'Waiting time (in minutes)'
          }
        ],
        extensions: {
          standardRangeSelector: {
            enabled: false
          },
          customRangeSelector: {
            enabled: false
          }
        }
      }
    };
  };

  export let data = [];
  export let coaster = '';
</script>

<div class='chart-container' >
  <SvelteFC
    { ...getChartConfig(data) }
  />
</div>