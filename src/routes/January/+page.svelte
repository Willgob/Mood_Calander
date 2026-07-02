<script lang="ts">
    // import { Modal } from '../../modal.svelte';
    import { useMutation, useQuery } from 'convex-svelte';
    import { api } from '../../convex/_generated/api';
    import { useAuth } from '@mmailaender/convex-better-auth-svelte/svelte';
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';

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

    onMount(() => {
        const data = {
            labels: Array.from({ length: getDaysInMonth(month, year) }, (_, i) => (i + 1).toString()),
            datasets: [{
                label: 'January',
                data: [65, 59, 80, 81, 56, 55, 41]
            }],
        }
        const options = {}
        const ctx = document.getElementById('chart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        })
    })

</script>

<button onclick={addEntry}>Add Journal Entry</button>

<div>
  <canvas id="chart"></canvas>
</div>
