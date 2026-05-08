<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import FormMessage from '$lib/components/ui/FormMessage.svelte';
    import type { Achievement } from '$lib/types/achievement';
    import type { Member } from '$lib/types/member';

    let {
        members,
        achievements,
        onissued
    }: {
        members: Member[];
        achievements: Achievement[];
        onissued: (memberId: string, achievementId: number) => void;
    } = $props();

    let selectedMemberId = $state('');
    let selectedAchievementId = $state('');
    let message = $state('');

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        if (!selectedMemberId) {
            message = 'Выберите обучающегося.';
            return;
        }

        if (!selectedAchievementId) {
            message = 'Выберите достижение.';
            return;
        }

        onissued(selectedMemberId, Number(selectedAchievementId));

        selectedMemberId = '';
        selectedAchievementId = '';
        message = '';
    }
</script>

<form class="issue-form" onsubmit={handleSubmit}>
    <div class="form-field">
        <label for="member">Обучающийся</label>
        <select id="member" bind:value={selectedMemberId}>
            <option value="">Выберите обучающегося</option>
            {#each members as member}
                <option value={member.id}>{member.fullName}</option>
            {/each}
        </select>
    </div>

    <div class="form-field">
        <label for="achievement">Достижение</label>
        <select id="achievement" bind:value={selectedAchievementId}>
            <option value="">Выберите достижение</option>
            {#each achievements as achievement}
                <option value={achievement.id}>{achievement.title}</option>
            {/each}
        </select>
    </div>

    {#if message}
        <FormMessage type="error">
            {message}
        </FormMessage>
    {/if}

    <div class="issue-form__actions">
        <Button type="submit">Выдать достижение</Button>
    </div>
</form>

<style>
    .issue-form {
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

    select {
        min-height: 44px;
        width: 100%;
        border: 1px solid rgba(217, 222, 242, 0.12);
        border-radius: 10px;
        background: #1b1d36;
        color: #d9def2;
        padding: 0 14px;
        outline: none;
    }

    select:focus {
        border-color: rgba(86, 188, 213, 0.72);
        box-shadow: 0 0 0 3px rgba(86, 188, 213, 0.12);
    }

    option {
        background: #1b1d36;
        color: #d9def2;
    }

    .issue-form__actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 4px;
    }
</style>