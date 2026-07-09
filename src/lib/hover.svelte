<script lang="ts">
	let { data, value = $bindable() } = $props();

	$effect(() => {
		value = data;
	});
</script>