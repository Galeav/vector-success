<script lang="ts">
    let {
        id,
        value = $bindable(''),
        type = 'text',
        placeholder = '',
        autocomplete = 'off'
    }: {
        id: string;
        value?: string;
        type?: 'text' | 'password' | 'email';
        placeholder?: string;
        autocomplete?: string;
    } = $props();
</script>

<input {id} bind:value {type} {placeholder} {autocomplete} />

<style>
    input {
        min-height: 44px;
        width: 100%;
        border: 1px solid rgba(217, 222, 242, 0.12);
        border-radius: 10px;
        background: #1b1d36;
        color: #d9def2;
        padding: 0 14px;
        outline: none;
    }

    input::placeholder {
        color: #7e8499;
    }

    input:focus {
        border-color: rgba(86, 188, 213, 0.72);
        box-shadow: 0 0 0 3px rgba(86, 188, 213, 0.12);
    }

    input:disabled {
        cursor: not-allowed;
        opacity: 0.55;
    }
</style>