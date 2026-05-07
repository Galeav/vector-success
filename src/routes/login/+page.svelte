<script lang="ts">
    import PageShell from '$lib/components/layout/PageShell.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import FormMessage from '$lib/components/ui/FormMessage.svelte';
    import Input from '$lib/components/ui/Input.svelte';

    let email = $state('');
    let password = $state('');

    let message = $state('');
    let messageType = $state<'success' | 'error' | ''>('');

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        const normalizedEmail = email.trim();

        if (!normalizedEmail) {
            message = 'Введите адрес электронной почты.';
            messageType = 'error';
            return;
        }

        if (!normalizedEmail.includes('@')) {
            message = 'Введите корректный адрес электронной почты.';
            messageType = 'error';
            return;
        }

        if (!password) {
            message = 'Введите пароль.';
            messageType = 'error';
            return;
        }

        message = 'Вход выполнен успешно.';
        messageType = 'success';

        email = '';
        password = '';
    }
</script>

<svelte:head>
    <title>Вход — Вектор успеха</title>
    <meta name="description" content="Авторизация пользователя в системе Вектор успеха" />
</svelte:head>

<PageShell>
    <section class="auth-page">
        <div class="auth-card">
            <div class="auth-card__heading">
                <p>Доступ к системе</p>
                <h1>Вход</h1>
                <span>
                    Войдите в систему, чтобы перейти к когортам, учебным достижениям и
                    индивидуальному прогрессу.
                </span>
            </div>

            <form class="auth-form" onsubmit={handleSubmit}>
                <div class="form-field">
                    <label for="email">Электронная почта</label>
                    <Input
                        id="email"
                        type="email"
                        bind:value={email}
                        placeholder="example@mail.ru"
                        autocomplete="email"
                    />
                </div>

                <div class="form-field">
                    <label for="password">Пароль</label>
                    <Input
                        id="password"
                        type="password"
                        bind:value={password}
                        placeholder="Введите пароль"
                        autocomplete="current-password"
                    />
                </div>

                {#if message && messageType}
                    <FormMessage type={messageType}>
                        {message}
                    </FormMessage>
                {/if}

                <Button type="submit">Войти</Button>
            </form>

            <p class="auth-card__footer">
                Нет аккаунта?
                <a href="/register">Зарегистрироваться</a>
            </p>
        </div>
    </section>
</PageShell>

<style>
    .auth-page {
        display: grid;
        place-items: start center;
    }

    .auth-card {
        width: min(100%, 520px);
        padding: 32px;
        border: 1px solid rgba(217, 222, 242, 0.08);
        border-radius: 24px;
        background: #1d1f36;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
    }

    .auth-card__heading {
        margin-bottom: 28px;
    }

    .auth-card__heading p {
        margin: 0 0 8px;
        color: #56bcd5;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    h1 {
        margin: 0;
        color: #d9def2;
        font-size: 40px;
        line-height: 1.1;
    }

    .auth-card__heading span {
        display: block;
        margin-top: 14px;
        color: #9e9ec2;
        font-size: 15px;
        line-height: 1.5;
    }

    .auth-form {
        display: grid;
        gap: 18px;
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

    .auth-card__footer {
        margin: 24px 0 0;
        color: #9e9ec2;
        font-size: 14px;
        text-align: center;
    }

    .auth-card__footer a {
        color: #56bcd5;
        font-weight: 800;
    }

    @media (max-width: 640px) {
        .auth-card {
            padding: 24px;
        }

        h1 {
            font-size: 32px;
        }
    }
</style>