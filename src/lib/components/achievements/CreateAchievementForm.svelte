<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import FormMessage from '$lib/components/ui/FormMessage.svelte';
    import Input from '$lib/components/ui/Input.svelte';
    import Textarea from '$lib/components/ui/Textarea.svelte';
    import type { Achievement } from '$lib/types/achievement';

    let {
        oncreated
    }: {
        oncreated: (achievement: Omit<Achievement, 'id' | 'status' | 'rarity'>) => void;
    } = $props();

    let title = $state('');
    let description = $state('');
    let condition = $state('');
    let icon = $state('/achievements/logo_6b.png');
    let dependenciesText = $state('');
    let message = $state('');

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        const normalizedTitle = title.trim();
        const normalizedDescription = description.trim();
        const normalizedCondition = condition.trim();

        if (!normalizedTitle) {
            message = 'Введите название достижения.';
            return;
        }

        if (!normalizedDescription) {
            message = 'Введите краткое описание достижения.';
            return;
        }

        if (!normalizedCondition) {
            message = 'Введите условие получения достижения.';
            return;
        }

        oncreated({
            title: normalizedTitle,
            description: normalizedDescription,
            condition: normalizedCondition,
            icon: icon.trim() || '/achievements/logo_6b.png',
            dependencies: dependenciesText
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean)
        });

        title = '';
        description = '';
        condition = '';
        icon = '/achievements/logo_6b.png';
        dependenciesText = '';
        message = '';
    }
</script>

<form class="create-achievement-form" onsubmit={handleSubmit}>
    <div class="form-field">
        <label for="achievement-title">Название достижения</label>
        <Input id="achievement-title" bind:value={title} placeholder="Например, Первый проект" />
    </div>

    <div class="form-field">
        <label for="achievement-description">Краткое описание</label>
        <Textarea
            id="achievement-description"
            bind:value={description}
            rows={3}
            placeholder="Кратко опишите, за что выдаётся достижение"
        />
    </div>

    <div class="form-field">
        <label for="achievement-condition">Условие получения</label>
        <Textarea
            id="achievement-condition"
            bind:value={condition}
            rows={3}
            placeholder="Например, подготовить и защитить мини-проект"
        />
    </div>

    <div class="form-field">
        <label for="achievement-icon">Путь к изображению</label>
        <Input
            id="achievement-icon"
            bind:value={icon}
            placeholder="/achievements/logo_6b.png"
            autocomplete="off"
        />
    </div>

    <div class="form-field">
        <label for="achievement-dependencies">Зависимости</label>
        <Input
            id="achievement-dependencies"
            bind:value={dependenciesText}
            placeholder="Например, Первый шаг, Уверенный старт"
            autocomplete="off"
        />
        <p class="form-field__hint">
            Укажите названия предшествующих достижений через запятую, если они есть.
        </p>
    </div>

    {#if message}
        <FormMessage type="error">
            {message}
        </FormMessage>
    {/if}

    <div class="create-achievement-form__actions">
        <Button type="submit">Создать достижение</Button>
    </div>
</form>

<style>
    .create-achievement-form {
        display: grid;
        gap: 18px;
        padding: 24px;
    }

    .form-field {
        display: grid;
        gap: 8px;
    }

    label {
        color: #d9def2;
        font-size: 14px;
        font-weight: 800;
    }

    .form-field__hint {
        margin: 0;
        color: #7e8499;
        font-size: 12px;
        line-height: 1.4;
    }

    .create-achievement-form__actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 4px;
    }
</style>
