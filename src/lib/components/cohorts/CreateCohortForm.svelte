<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import FormMessage from '$lib/components/ui/FormMessage.svelte';
    import Input from '$lib/components/ui/Input.svelte';

    let {
        oncreated
    }: {
        oncreated: (name: string) => void;
    } = $props();

    let name = $state('');
    let message = $state('');

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        const normalizedName = name.trim();

        if (!normalizedName) {
            message = 'Введите название когорты.';
            return;
        }

        oncreated(normalizedName);
        name = '';
        message = '';
    }
</script>

<form class="create-cohort-form" onsubmit={handleSubmit}>
    <div>
        <label for="cohort-name">Название когорты</label>
        <p class="create-cohort-form__hint">
            Например: «6Б класс», «Проектная деятельность» или «Информатика».
        </p>
    </div>

    <Input
        id="cohort-name"
        bind:value={name}
        placeholder="Введите название"
        autocomplete="off"
    />

    {#if message}
        <FormMessage type="error">
            {message}
        </FormMessage>
    {/if}

    <div class="create-cohort-form__actions">
        <Button type="submit">Создать</Button>
    </div>
</form>

<style>
    .create-cohort-form {
        display: grid;
        gap: 16px;
        padding: 24px;
    }

    label {
        color: #d9def2;
        font-size: 16px;
        font-weight: 800;
    }

    .create-cohort-form__hint {
        margin: 8px 0 0;
        color: #9e9ec2;
        font-size: 14px;
        line-height: 1.45;
    }

    .create-cohort-form__actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 4px;
    }
</style>