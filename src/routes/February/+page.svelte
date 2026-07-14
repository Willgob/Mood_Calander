<script lang="ts">
  import { LineChart } from "layerchart";
  import { scaleUtc } from "d3-scale";
  import { curveNatural } from "d3-shape";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import * as Card from "$lib/components/ui/card/index.js";


  const chartConfig = {
    energy: { label: "Energy", color: "var(--chart-1)" },
    overall: { label: "Overall", color: "var(--chart-2)" },
  } satisfies Chart.ChartConfig;

    import { useMutation, useQuery } from 'convex-svelte';
    import { api } from '../../convex/_generated/api';
    import { useAuth } from '@mmailaender/convex-better-auth-svelte/svelte';
    import { goto } from '$app/navigation';

    const auth = useAuth();

    const isAuthenticated = $derived(auth.isAuthenticated);
    const currentUserResponse = useQuery(api.auth.getCurrentUser, () => (isAuthenticated ? {} : 'skip'));
	let user = $derived(currentUserResponse.data);

    const id = useQuery(api.data.getDataId, () =>
    user?._id
        ? { userId: user._id }
        : "skip"
    );
    const dataId = $derived(id.data);

    $effect(() => {
        console.log("id", dataId);
    });

    const addEntryMutation = useMutation(api.data.addEntry);

    function addEntry() {
        if (!dataId) return;
        addEntryMutation({ id: dataId });
    }


    // ------------------------------ Date ---------------------------------
    
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let leapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    console.log("date is : ", date, " year is : ", year, " leap year : ", leapYear);

    function getDaysInMonth(month: number, year: number){
        return new Date(year, month + 1, 0).getDate();
    }
    console.log("Date in month : ", getDaysInMonth(month, year));

    // ------------------------------ Chart ---------------------------------

    import { defaultChartPadding,Tooltip } from 'layerchart';
    import  Hover  from '../../lib/hover.svelte';
    let hoveredData = $state<any>(null);

    const dataQuery = useQuery(api.data.getData, () => (dataId ? { id: dataId } : 'skip'));
    const data = $derived(dataQuery.data);
    console.log ("data - ", dataQuery.data);
</script>

<button onclick={addEntry}>Add Journal Entry</button>
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div onclick={() => {
    if (!hoveredData) return;
    console.log("Hovered Data:", hoveredData);
    goto(`/January/${hoveredData.date}`);
}}>
    <Card.Root>
    <Card.Header>
        <Card.Title>February</Card.Title>
    </Card.Header>
    <Card.Content>
        <Chart.Container config={chartConfig}>
        <LineChart
            data={(data?.data ?? []).map((d: { date: string | Date }) => ({ ...d, date: new Date(d.date) }))}
            x="date"
            xScale={scaleUtc()}
            axis="x"
            series={[
            {
                key: "energy",
                label: "Energy",
                color: chartConfig.energy.color,
            },
            {
                key: "overall",
                label: "Overall",
                color: chartConfig.overall.color,
            },
            ]}
            props={{
            spline: { curve: curveNatural, motion: "tween", strokeWidth: 2 },
            xAxis: {
                format: (v: Date) => v.toLocaleDateString("en-US", { month: "short" }),
            },
            highlight: { points: { r: 4 } },
            }}
        >
            {#snippet tooltip()}
            <Chart.Tooltip />
            {/snippet}
        </LineChart>
        </Chart.Container>
    </Card.Content>
    <Card.Footer>
        <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
        </div>
        </div>
    </Card.Footer>
    </Card.Root>
</div>

