<script lang="ts">
    import PageShell from '$lib/components/layout/PageShell.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import FormMessage from '$lib/components/ui/FormMessage.svelte';
    import Input from '$lib/components/ui/Input.svelte';
    import AuthCard from '$lib/components/auth/AuthCard.svelte';
    import { loginUser } from '$lib/api/auth';
    import { goto } from '$app/navigation';

    let email = $state('');
    let password = $state('');

    let message = $state('');
    let messageType = $state<'success' | 'error' | ''>('');

    async function handleSubmit(event: SubmitEvent) {
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

        try {
            await loginUser({
                email: normalizedEmail,
                password
            });

            message = 'Вход выполнен успешно. Сейчас откроется список когорт.';
            messageType = 'success';

            email = '';
            password = '';

            setTimeout(() => {
                goto('/cohorts');
            }, 600);
        } catch (error) {
            message = error instanceof Error ? error.message : 'Не удалось выполнить вход.';
            messageType = 'error';
        }
    }
</script>

<svelte:head>
    <title>Вход — Вектор успеха</title>
    <meta name="description" content="Авторизация пользователя в системе Вектор успеха" />
</svelte:head>

<PageShell>
    <AuthCard
        label="Доступ к системе"
        title="Вход"
        description="Войдите в систему, чтобы перейти к когортам, учебным достижениям и индивидуальному прогрессу."
        footerText="Нет аккаунта? "
        footerHref="/register"
        footerLinkText="Зарегистрироваться"
    >
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
    </AuthCard>
</PageShell>

<style>
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
</style>
