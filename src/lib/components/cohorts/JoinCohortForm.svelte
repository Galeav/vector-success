<script lang="ts">
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
        <input
            id="invite-key"
            bind:value={inviteKey}
            placeholder="Например, CLASS-6B-2026"
            autocomplete="off"
        />

        <button type="submit">Присоединиться</button>
    </div>

    {#if message}
        <p class:success={messageType === 'success'} class:error={messageType === 'error'}>
            {message}
        </p>
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

    button {
        min-height: 44px;
        padding: 0 20px;
        border: none;
        border-radius: 10px;
        background: linear-gradient(90deg, #7b54eb, #4baee9);
        color: #ffffff;
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
    }

    button:focus-visible {
        outline: 3px solid rgba(86, 188, 213, 0.45);
        outline-offset: 3px;
    }

    .success,
    .error {
        margin: 0;
        padding: 12px 14px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 700;
    }

    .success {
        background: #0a2224;
        color: #56bcd5;
    }

    .error {
        background: rgba(255, 91, 91, 0.12);
        color: #ff8b8b;
    }

    @media (max-width: 720px) {
        .join-form__row {
            grid-template-columns: 1fr;
        }
    }
</style>
