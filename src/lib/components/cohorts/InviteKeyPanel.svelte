<script lang="ts">
    let {
        inviteKey,
        onregenerate
    }: {
        inviteKey: string;
        onregenerate: () => void;
    } = $props();

    let message = $state('');

    async function copyInviteKey() {
        await navigator.clipboard.writeText(inviteKey);
        message = 'Ключ приглашения скопирован.';
    }
</script>

<section class="invite-panel">
    <div>
        <p class="invite-panel__label">Ключ приглашения</p>
        <h2>Доступ обучающихся к когорте</h2>
        <p class="invite-panel__text">
            Передайте этот ключ обучающимся, чтобы они могли присоединиться к когорте.
        </p>
    </div>

    <div class="invite-panel__key">
        <code>{inviteKey}</code>
    </div>

    <div class="invite-panel__actions">
        <button type="button" onclick={copyInviteKey}>Скопировать</button>
        <button type="button" onclick={onregenerate}>Обновить ключ</button>
    </div>

    {#if message}
        <p class="invite-panel__message">{message}</p>
    {/if}
</section>

<style>
    .invite-panel {
        display: grid;
        gap: 16px;
        max-width: 760px;
        margin-bottom: 24px;
        padding: 20px;
        border: 1px solid rgba(86, 188, 213, 0.18);
        border-radius: 18px;
        background: rgba(86, 188, 213, 0.08);
    }

    .invite-panel__label {
        margin: 0 0 8px;
        color: #56bcd5;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    h2 {
        margin: 0;
        color: #d9def2;
        font-size: 22px;
        line-height: 1.2;
    }

    .invite-panel__text {
        max-width: 680px;
        margin: 10px 0 0;
        color: #9e9ec2;
        font-size: 14px;
        line-height: 1.45;
    }

    .invite-panel__key {
        padding: 14px 16px;
        border: 1px solid rgba(217, 222, 242, 0.1);
        border-radius: 12px;
        background: #1b1d36;
    }

    code {
        color: #d9def2;
        font-family: 'Courier New', monospace;
        font-size: 16px;
        font-weight: 800;
        letter-spacing: 0.04em;
    }

    .invite-panel__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    button {
        min-height: 40px;
        padding: 0 14px;
        border: 1px solid rgba(217, 222, 242, 0.12);
        border-radius: 10px;
        background: #1d1f36;
        color: #d9def2;
        font-size: 13px;
        font-weight: 800;
        cursor: pointer;
    }

    button:hover {
        border-color: rgba(86, 188, 213, 0.32);
    }

    button:focus-visible {
        outline: 3px solid rgba(86, 188, 213, 0.45);
        outline-offset: 3px;
    }

    .invite-panel__message {
        margin: 0;
        color: #56bcd5;
        font-size: 13px;
        font-weight: 800;
    }
</style>
