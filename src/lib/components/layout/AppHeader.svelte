<script lang="ts">
    import { page } from '$app/state';

    const isActive = (path: string) => {
        if (path === '/') {
            return page.url.pathname === '/';
        }

        return page.url.pathname.startsWith(path);
    };
</script>

<header class="app-header">
    <a class="app-header__brand" href="/">
        <span class="app-header__logo">ВУ</span>
        <span>Вектор успеха</span>
    </a>

    <nav class="app-header__nav" aria-label="Основная навигация">
        <a class:active={isActive('/')} href="/">Главная</a>
        <a class:active={isActive('/cohorts')} href="/cohorts">Когорты</a>
    </nav>

    <div class="app-header__user">
        <span>Иванов Иван Иванович</span>
    </div>
</header>

<style>
    .app-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        min-height: 72px;
        padding: 0 48px;
        border-bottom: 1px solid rgba(217, 222, 242, 0.08);
        background: #080c15;
    }

    .app-header__brand {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        color: #d9def2;
        font-size: 16px;
        font-weight: 800;
    }

    .app-header__logo {
        display: grid;
        place-items: center;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background: linear-gradient(135deg, #7b54eb, #4baee9);
        color: #ffffff;
        font-size: 13px;
        font-weight: 800;
    }

    .app-header__nav {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .app-header__nav a {
        padding: 10px 12px;
        border-radius: 10px;
        color: #9e9ec2;
        font-size: 14px;
        font-weight: 700;
        transition:
            background 0.16s ease,
            color 0.16s ease;
    }

    .app-header__nav a:hover {
        background: rgba(217, 222, 242, 0.06);
        color: #d9def2;
    }

    .app-header__nav a.active {
        background: rgba(86, 188, 213, 0.12);
        color: #56bcd5;
    }

    .app-header__nav a:focus-visible,
    .app-header__brand:focus-visible {
        outline: 3px solid rgba(86, 188, 213, 0.45);
        outline-offset: 3px;
    }

    .app-header__user {
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(217, 222, 242, 0.06);
        color: #9e9ec2;
        font-size: 13px;
        font-weight: 700;
    }

    @media (max-width: 720px) {
        .app-header {
            align-items: flex-start;
            flex-direction: column;
            padding: 20px 24px;
        }

        .app-header__nav {
            width: 100%;
        }

        .app-header__user {
            display: none;
        }
    }
</style>
