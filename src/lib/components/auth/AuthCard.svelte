<script lang="ts">
    let {
        children,
        label,
        title,
        description,
        footerText,
        footerHref,
        footerLinkText
    }: {
        children: import('svelte').Snippet;
        label: string;
        title: string;
        description: string;
        footerText: string;
        footerHref: string;
        footerLinkText: string;
    } = $props();
</script>

<section class="auth-page">
    <div class="auth-card">
        <div class="auth-card__heading">
            <p>{label}</p>
            <h1>{title}</h1>
            <span>{description}</span>
        </div>

        {@render children()}

        <p class="auth-card__footer">
            {footerText}
            <a href={footerHref}>{footerLinkText}</a>
        </p>
    </div>
</section>

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