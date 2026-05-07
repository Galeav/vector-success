<script lang="ts">
    import PageShell from '$lib/components/layout/PageShell.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import FormMessage from '$lib/components/ui/FormMessage.svelte';
    import Input from '$lib/components/ui/Input.svelte';
    import AuthCard from '$lib/components/auth/AuthCard.svelte';
    import { saveCurrentUser } from '$lib/stores/user';

    let fullName = $state('');
    let email = $state('');
    let password = $state('');
    let role = $state<'student' | 'teacher'>('student');

    let message = $state('');
    let messageType = $state<'success' | 'error' | ''>('');

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        const normalizedFullName = fullName.trim();
        const normalizedEmail = email.trim();

        if (!normalizedFullName) {
            message = 'Введите ФИО пользователя.';
            messageType = 'error';
            return;
        }

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

        if (password.length < 6) {
            message = 'Пароль должен содержать не менее 6 символов.';
            messageType = 'error';
            return;
        }

    saveCurrentUser({
        fullName: normalizedFullName,
        email: normalizedEmail,
        role
    });

    message = `Пользователь «${normalizedFullName}» успешно зарегистрирован.`;
    messageType = 'success';

    fullName = '';
    email = '';
    password = '';
    role = 'student';
        }
</script>

<svelte:head>
    <title>Регистрация — Вектор успеха</title>
    <meta name="description" content="Регистрация пользователя в системе Вектор успеха" />
</svelte:head>

<PageShell>
    <AuthCard
        label="Создание учётной записи"
        title="Регистрация"
        description="Зарегистрируйтесь в системе, чтобы работать с когортами и учебными достижениями."
        footerText="Уже есть аккаунт? "
        footerHref="/login"
        footerLinkText="Войти в систему"
    >
        <form class="auth-form" onsubmit={handleSubmit}>
            <div class="form-field">
                <label for="full-name">ФИО</label>
                <Input id="full-name" bind:value={fullName} placeholder="Иванов Иван Иванович" />
            </div>

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
                    placeholder="Не менее 6 символов"
                    autocomplete="new-password"
                />
            </div>

            <div class="form-field">
                <span class="form-field__label">Роль пользователя</span>

                <div class="role-switcher">
                    <label>
                        <input type="radio" bind:group={role} value="student" />
                        <span>Обучающийся</span>
                    </label>

                    <label>
                        <input type="radio" bind:group={role} value="teacher" />
                        <span>Преподаватель</span>
                    </label>
                </div>
            </div>

            {#if message && messageType}
                <FormMessage type={messageType}>
                    {message}
                </FormMessage>
            {/if}

            <Button type="submit">Зарегистрироваться</Button>
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

    label,
    .form-field__label {
        color: #d9def2;
        font-size: 14px;
        font-weight: 800;
    }

    .role-switcher {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
    }

    .role-switcher label {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 44px;
        padding: 0 14px;
        border: 1px solid rgba(217, 222, 242, 0.12);
        border-radius: 10px;
        background: #1b1d36;
        color: #d9def2;
        cursor: pointer;
    }

    .role-switcher input {
        accent-color: #56bcd5;
    }

    @media (max-width: 640px) {
        .role-switcher {
            grid-template-columns: 1fr;
        }
    }
</style>