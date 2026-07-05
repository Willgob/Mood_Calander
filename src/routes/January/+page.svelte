<script lang="ts">
    // import { Modal } from '../../modal.svelte';
    import { useMutation, useQuery } from 'convex-svelte';
    import { api } from '../../convex/_generated/api';
    import { useAuth } from '@mmailaender/convex-better-auth-svelte/svelte';

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

    import { LineChart, defaultChartPadding } from 'layerchart';
    const dataQuery = useQuery(api.data.getData, () => (dataId ? { id: dataId } : 'skip'));
    const data = $derived(dataQuery.data);
    console.log ("data - ", dataQuery.data);

</script>

<button onclick={addEntry}>Add Journal Entry</button>

<div>
    <LineChart data={data?.data ?? undefined} x="date" y="value" padding={defaultChartPadding({ right: 10 })} height={300} />
</div>
