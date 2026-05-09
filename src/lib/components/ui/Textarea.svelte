<script lang="ts">
    let {
        id,
        value = $bindable(''),
        placeholder = '',
        rows = 4
    }: {
        id: string;
        value?: string;
        placeholder?: string;
        rows?: number;
    } = $props();
</script>

<textarea {id} bind:value {placeholder} {rows}></textarea>

<style>
    textarea {
        width: 100%;
        min-height: 112px;
        resize: vertical;
        border: 1px solid rgba(217, 222, 242, 0.12);
        border-radius: 10px;
        background: #1b1d36;
        color: #d9def2;
        padding: 12px 14px;
        outline: none;
    }

    textarea::placeholder {
        color: #7e8499;
    }

    textarea:focus {
        border-color: rgba(86, 188, 213, 0.72);
        box-shadow: 0 0 0 3px rgba(86, 188, 213, 0.12);
    }

    textarea:disabled {
        cursor: not-allowed;
        opacity: 0.55;
    }
</style>
