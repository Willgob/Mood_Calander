import type { Actions } from './$types';
import { useMutation } from 'convex-svelte';
import { api } from '../../convex/_generated/api';

export const actions = {
    addData: async(event) => {
        const createTask = useMutation(api.tasks.createTask);
        return await createTask({"text": "Cheeset complete"});
    }
} satisfies Actions;
