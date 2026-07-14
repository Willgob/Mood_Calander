<script lang="ts">
  import { getChartContext } from 'layerchart';

  let { onHover }: { onHover: (data: any) => void } = $props();

  const chart = getChartContext();

  console.log("Hover.svelte mounted, chart context:", chart);

  $effect(() => {
    console.log("tooltip.data changed:", chart.tooltip.data);
    if (chart.tooltip.data) {
      onHover(chart.tooltip.data);
    }
  });
</script>