<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import FormMessage from '$lib/components/ui/FormMessage.svelte';
    import Input from '$lib/components/ui/Input.svelte';
    import Textarea from '$lib/components/ui/Textarea.svelte';
    import type { Achievement } from '$lib/types/achievement';

    let {
        oncreated,
        achievements = []
    }: {
        oncreated: (achievement: Omit<Achievement, 'id' | 'status' | 'rarity'>) => void;
        achievements?: Achievement[];
    } = $props();

    let title = $state('');
    let description = $state('');
    let condition = $state('');
    let icon = $state('/achievements/logo_6b.png');
    let selectedDependencies = $state<string[]>([]);
    let message = $state('');

    let isDragging = $state(false);
    let selectedImageName = $state('');
    let fileInputElement: HTMLInputElement | null = null;

    function handleFileSelect(event: Event) {
        const input = event.currentTarget as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) {
            return;
        }

        prepareImageUpload(file);
    }

    function handleDragOver(event: DragEvent) {
        event.preventDefault();
        isDragging = true;
    }

    function handleDragLeave() {
        isDragging = false;
    }

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        isDragging = false;

        const file = event.dataTransfer?.files[0];

        if (!file) {
            return;
        }

        prepareImageUpload(file);
    }

    function prepareImageUpload(file: File) {
        if (!file.type.startsWith('image/')) {
            message = 'Выберите файл изображения.';
            return;
        }

        selectedImageName = file.name;
        message = 'Файл выбран. Загрузка изображения будет подключена после интеграции с backend.';
    }

    function openFileDialog() {
        fileInputElement?.click();
    }

    function toggleDependency(title: string) {
        selectedDependencies = selectedDependencies.includes(title)
            ? selectedDependencies.filter((dependency) => dependency !== title)
            : [...selectedDependencies, title];
    }

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
            dependencies: selectedDependencies
        });

        title = '';
        description = '';
        condition = '';
        icon = '/achievements/logo_6b.png';
        selectedDependencies = [];
        selectedImageName = '';
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
        <label for="achievement-icon">Изображение достижения</label>

        <Input
            id="achievement-icon"
            bind:value={icon}
            placeholder="/achievements/logo_6b.png или ссылка на изображение"
            autocomplete="off"
        />

        <div
            class="dropzone"
            class:dropzone--active={isDragging}
            role="button"
            tabindex="0"
            ondragover={handleDragOver}
            ondragleave={handleDragLeave}
            ondrop={handleDrop}
            onclick={openFileDialog}
            onkeydown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openFileDialog();
                }
            }}
        >
            <input
                bind:this={fileInputElement}
                type="file"
                accept="image/*"
                onchange={handleFileSelect}
                hidden
            />

            {#if selectedImageName}
                <span>Выбран файл: {selectedImageName}</span>
            {:else}
                <span>Перетащите изображение сюда или нажмите для выбора файла</span>
            {/if}
        </div>

        <p class="form-field__hint">Можете использовать изображения формата PNG или SVG</p>
    </div>

    <div class="form-field">
        <span class="form-field__label">Зависимости</span>

        {#if achievements.length > 0}
            <div class="dependencies-list">
                {#each achievements as achievement}
                    <button
                        class="dependency-chip"
                        class:dependency-chip--selected={selectedDependencies.includes(
                            achievement.title
                        )}
                        type="button"
                        onclick={() => {
                            toggleDependency(achievement.title);
                        }}
                    >
                        {achievement.title}
                    </button>
                {/each}
            </div>

            <p class="form-field__hint">
                Выберите достижения, которые должны быть получены перед открытием нового достижения.
            </p>
        {:else}
            <p class="form-field__hint">
                В когорте пока нет достижений, поэтому зависимости выбрать нельзя.
            </p>
        {/if}
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

    .dropzone {
        display: grid;
        place-items: center;
        min-height: 96px;
        padding: 16px;
        border: 1px dashed rgba(217, 222, 242, 0.22);
        border-radius: 14px;
        background: rgba(217, 222, 242, 0.04);
        color: #9e9ec2;
        font-size: 14px;
        line-height: 1.45;
        text-align: center;
        cursor: pointer;
        transition:
            border-color 0.16s ease,
            background 0.16s ease;
    }

    .dropzone:hover,
    .dropzone--active {
        border-color: rgba(86, 188, 213, 0.72);
        background: rgba(86, 188, 213, 0.08);
    }

    .dropzone:focus-visible {
        outline: 3px solid rgba(86, 188, 213, 0.45);
        outline-offset: 3px;
    }

    .form-field__label {
        color: #d9def2;
        font-size: 14px;
        font-weight: 800;
    }

    .dependencies-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .dependency-chip {
        min-height: 36px;
        padding: 0 12px;
        border: 1px solid rgba(217, 222, 242, 0.12);
        border-radius: 999px;
        background: #1b1d36;
        color: #9e9ec2;
        font-size: 13px;
        font-weight: 800;
        cursor: pointer;
        transition:
            border-color 0.16s ease,
            background 0.16s ease,
            color 0.16s ease;
    }

    .dependency-chip:hover {
        border-color: rgba(86, 188, 213, 0.32);
        color: #d9def2;
    }

    .dependency-chip--selected {
        border-color: rgba(86, 188, 213, 0.72);
        background: rgba(86, 188, 213, 0.12);
        color: #56bcd5;
    }

    .dependency-chip:focus-visible {
        outline: 3px solid rgba(86, 188, 213, 0.45);
        outline-offset: 3px;
    }
</style>
