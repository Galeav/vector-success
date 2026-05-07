<script lang="ts">
    type MessageType = 'success' | 'error';

    let {
        children,
        type
    }: {
        children: import('svelte').Snippet;
        type: MessageType;
    } = $props();
</script>

<p class="form-message form-message--{type}">
    {@render children()}
</p>

<style>
    .form-message {
        margin: 0;
        padding: 12px 14px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 700;
    }

    .form-message--success {
        background: #0a2224;
        color: #56bcd5;
    }

    .form-message--error {
        background: rgba(255, 91, 91, 0.12);
        color: #ff8b8b;
    }
</style>