<script lang="ts">
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    import { getCurrentUser } from '$lib/stores/user';

    let { children } = $props();

    let isChecking = $state(true);

    $effect(() => {
        if (!browser) {
            return;
        }

        const currentUser = getCurrentUser();

        if (!currentUser) {
            goto('/login');
            return;
        }

        isChecking = false;
    });
</script>

{#if !isChecking}
    {@render children()}
{/if}
