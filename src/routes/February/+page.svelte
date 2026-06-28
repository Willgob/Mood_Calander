<script lang="ts">
    import { useMutation } from 'convex-svelte';
    import { api } from '../../convex/_generated/api';

    const createTaskMutation = useMutation(api.tasks.createTask);

    function createTask() {
        createTaskMutation({ text: 'New Task' });
    }

</script>

    <button onclick={createTask}>Add Data</button>
