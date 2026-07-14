<script lang="ts">
    import { page} from '$app/state';
    import { monthNameToNumber } from '../../../utils/months';

    const monthName = $derived(page.params.month);
    const year = $derived(page.params.year);
    const month = $derived(monthName ? monthNameToNumber(monthName) : undefined);

    $effect(() => {
        console.log("yr", year);
        console.log("month", month)
        console.log("month text", monthName)
    });
</script>