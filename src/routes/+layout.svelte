<script lang="ts">
    import AppHeader from '$lib/components/layout/AppHeader.svelte';
    import '../app.css';

    let { children } = $props();
</script>

<AppHeader />

{@render children()}
