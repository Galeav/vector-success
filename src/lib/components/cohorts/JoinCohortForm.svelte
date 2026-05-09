<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import FormMessage from '$lib/components/ui/FormMessage.svelte';
    import Input from '$lib/components/ui/Input.svelte';

    let inviteKey = $state('');
    let message = $state('');
    let messageType = $state<'success' | 'error' | ''>('');

    const DEMO_KEY = 'CLASS-6B-2026';

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        const normalizedKey = inviteKey.trim().toUpperCase();

        if (!normalizedKey) {
            message = 'Введите ключ приглашения.';
            messageType = 'error';
            return;
        }

        if (normalizedKey !== DEMO_KEY) {
            message = 'Когорта с таким ключом не найдена.';
            messageType = 'error';
            return;
        }

        message = 'Вы успешно присоединились к когорте.';
        messageType = 'success';
        inviteKey = '';
    }
</script>

<form class="join-form" onsubmit={handleSubmit}>
    <div>
        <label for="invite-key">Ключ приглашения</label>
        <p class="join-form__hint">Введите ключ, полученный от преподавателя.</p>
    </div>

    <div class="join-form__row">
        <Input
            id="invite-key"
            bind:value={inviteKey}
            placeholder="Например, CLASS-6B-2026"
            autocomplete="off"
        />

        <Button type="submit">Присоединиться</Button>
    </div>

    {#if message && messageType}
        <FormMessage type={messageType}>
            {message}
        </FormMessage>
    {/if}
</form>

<style>
    .join-form {
        display: grid;
        gap: 16px;
        max-width: 720px;
        margin-bottom: 32px;
        padding: 24px;
        border: 1px solid rgba(217, 222, 242, 0.08);
        border-radius: 18px;
        background: #1d1f36;
    }

    label {
        color: #d9def2;
        font-size: 18px;
        font-weight: 800;
    }

    .join-form__hint {
        margin: 8px 0 0;
        color: #9e9ec2;
        font-size: 14px;
        line-height: 1.45;
    }

    .join-form__row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
    }

    @media (max-width: 720px) {
        .join-form__row {
            grid-template-columns: 1fr;
        }
    }
</style>
