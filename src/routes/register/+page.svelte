<script lang="ts">
    import PageShell from '$lib/components/layout/PageShell.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import FormMessage from '$lib/components/ui/FormMessage.svelte';
    import Input from '$lib/components/ui/Input.svelte';

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
    <section class="auth-page">
        <div class="auth-card">
            <div class="auth-card__heading">
                <p>Создание учётной записи</p>
                <h1>Регистрация</h1>
                <span>
                    Зарегистрируйтесь в системе, чтобы работать с когортами и учебными
                    достижениями.
                </span>
            </div>

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

            <p class="auth-card__footer">
                Уже есть аккаунт?
                <a href="/login">Войти в систему</a>
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
        width: min(100%, 560px);
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

        .role-switcher {
            grid-template-columns: 1fr;
        }
    }
</style>