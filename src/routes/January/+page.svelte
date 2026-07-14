<script lang="ts">
    // import { Modal } from '../../modal.svelte';
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

    import { LineChart, defaultChartPadding,Tooltip } from 'layerchart';
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
    <LineChart 
        data={data?.data ?? undefined} 
        x="date" 
        y="value" 
        padding={defaultChartPadding({ right: 10 })}
        height={300}
    >
        {#snippet tooltip()}
            <Tooltip.Root>
                {#snippet children({data })}
                    <Hover {data} bind:value={hoveredData} />
                    <Tooltip.Header value={data.date} />
                    <Tooltip.List>
                        <Tooltip.Item label="Value" value={data.value} />
                    </Tooltip.List>
                {/snippet}
            </Tooltip.Root>
        {/snippet}
    </LineChart>
</div>
