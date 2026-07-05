<script lang="ts">
	import { LineChart, defaultChartPadding } from 'layerchart';
	// import { createDateSeries } from '../../lib/utils/data.js';

	const data = [
  {
    "date": new Date('2026-06-05T14:00:00.000Z'),
    "value": 78
  },
  {
    "date": new Date('2026-06-06T14:00:00.000Z'),
    "value": 88
  },
  {
    "date": new Date('2026-06-07T14:00:00.000Z'),
    "value": 61
  },
  {
    "date": new Date('2026-06-08T14:00:00.000Z'),
    "value": 76
  },
  {
    "date": new Date('2026-06-09T14:00:00.000Z'),
    "value": 77
  },
  {
    "date": new Date('2026-06-10T14:00:00.000Z'),
    "value": 77
  },
  {
    "date": new Date('2026-06-11T14:00:00.000Z'),
    "value": 50
  },
  {
    "date": new Date('2026-06-12T14:00:00.000Z'),
    "value": 100
  },
  {
    "date": new Date('2026-06-13T14:00:00.000Z'),
    "value": 77
  },
  {
    "date": new Date('2026-06-14T14:00:00.000Z'),
    "value": 68
  },
  {
    "date": new Date('2026-06-15T14:00:00.000Z'),
    "value": 56
  },
  {
    "date": new Date('2026-06-16T14:00:00.000Z'),
    "value": 60
  },
  {
    "date": new Date('2026-06-17T14:00:00.000Z'),
    "value": 55
  },
  {
    "date": new Date('2026-06-18T14:00:00.000Z'),
    "value": 80
  },
  {
    "date": new Date('2026-06-19T14:00:00.000Z'),
    "value": 51
  },
  {
    "date": new Date('2026-06-20T14:00:00.000Z'),
    "value": 97
  },
  {
    "date": new Date('2026-06-21T14:00:00.000Z'),
    "value": 97
  },
  {
    "date": new Date('2026-06-22T14:00:00.000Z'),
    "value": 70
  },
  {
    "date": new Date('2026-06-23T14:00:00.000Z'),
    "value": 53
  },
  {
    "date": new Date('2026-06-24T14:00:00.000Z'),
    "value": 67
  },
  {
    "date": new Date('2026-06-25T14:00:00.000Z'),
    "value": 76
  },
  {
    "date": new Date('2026-06-26T14:00:00.000Z'),
    "value": 53
  },
  {
    "date": new Date('2026-06-27T14:00:00.000Z'),
    "value": 53
  },
  {
    "date": new Date('2026-06-28T14:00:00.000Z'),
    "value": 73
  },
  {
    "date": new Date('2026-06-29T14:00:00.000Z'),
    "value": 53
  },
  {
    "date": new Date('2026-06-30T14:00:00.000Z'),
    "value": 90
  },
  {
    "date": new Date('2026-07-01T14:00:00.000Z'),
    "value": 96
  },
  {
    "date": new Date('2026-07-02T14:00:00.000Z'),
    "value": 61
  },
  {
    "date": new Date('2026-07-03T14:00:00.000Z'),
    "value": 87
  },
  {
    "date": new Date('2026-07-04T14:00:00.000Z'),
    "value": 87
  }
]
</script>

<LineChart {data} x="date" y="value" padding={defaultChartPadding({ right: 10 })} height={1980} />