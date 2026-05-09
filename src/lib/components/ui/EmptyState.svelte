<script lang="ts">
    let {
        title,
        text
    }: {
        title: string;
        text: string;
    } = $props();
</script>

<div class="empty-state">
    <div class="empty-state__icon" aria-hidden="true">∅</div>
    <h3>{title}</h3>
    <p>{text}</p>
</div>

<style>
    .empty-state {
        display: grid;
        justify-items: center;
        gap: 10px;
        padding: 32px;
        border: 1px dashed rgba(217, 222, 242, 0.18);
        border-radius: 18px;
        background: rgba(217, 222, 242, 0.04);
        text-align: center;
    }

    .empty-state__icon {
        display: grid;
        place-items: center;
        width: 48px;
        height: 48px;
        border-radius: 14px;
        background: rgba(86, 188, 213, 0.12);
        color: #56bcd5;
        font-size: 24px;
        font-weight: 900;
    }

    h3 {
        margin: 0;
        color: #d9def2;
        font-size: 18px;
        line-height: 1.3;
    }

    p {
        max-width: 460px;
        margin: 0;
        color: #9e9ec2;
        font-size: 14px;
        line-height: 1.45;
    }
</style>
