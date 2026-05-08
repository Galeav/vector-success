<script lang="ts">
    import type { Member } from '$lib/types/member';

    let {
        member,
        receivedCount,
        totalCount,
        selected = false,
        onclick
    }: {
        member: Member;
        receivedCount: number;
        totalCount: number;
        selected?: boolean;
        onclick?: () => void;
    } = $props();

    let progress = $derived(
        totalCount > 0 ? Math.round((receivedCount / totalCount) * 100) : 0
    );
</script>

<button
    class="member-card"
    class:member-card--selected={selected}
    type="button"
    {onclick}
>
    <div class="member-card__avatar" aria-hidden="true">
        {member.fullName.slice(0, 1)}
    </div>

    <div class="member-card__content">
        <div class="member-card__top">
            <div>
                <h3>{member.fullName}</h3>
                <p>{member.email}</p>
            </div>

            <span>{progress}%</span>
        </div>

        <div class="member-card__bar" aria-hidden="true">
            <span style:width={`${progress}%`}></span>
        </div>

        <div class="member-card__meta">
            <span>{receivedCount} из {totalCount} достижений получено</span>
        </div>
    </div>
</button>

<style>
    .member-card {
        display: grid;
        grid-template-columns: 48px 1fr;
        gap: 14px;
        width: 100%;
        padding: 16px;
        border: 1px solid rgba(217, 222, 242, 0.08);
        border-radius: 16px;
        background: #1d1f36;
        color: inherit;
        text-align: left;
        transition:
            transform 0.16s ease,
            border-color 0.16s ease,
            box-shadow 0.16s ease;
    }

    .member-card:hover {
        transform: translateY(-2px);
        border-color: rgba(86, 188, 213, 0.32);
    }

    .member-card:focus-visible {
        outline: 3px solid rgba(86, 188, 213, 0.45);
        outline-offset: 3px;
    }

    .member-card--selected {
        border-color: rgba(86, 188, 213, 0.72);
        box-shadow: 0 0 0 3px rgba(86, 188, 213, 0.12);
    }

    .member-card__avatar {
        display: grid;
        place-items: center;
        width: 48px;
        height: 48px;
        border-radius: 14px;
        background: linear-gradient(135deg, #7b54eb, #4baee9);
        color: #ffffff;
        font-size: 18px;
        font-weight: 900;
    }

    .member-card__content {
        min-width: 0;
    }

    .member-card__top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
    }

    h3 {
        margin: 0;
        color: #d9def2;
        font-size: 16px;
        line-height: 1.3;
    }

    p {
        margin: 6px 0 0;
        color: #9e9ec2;
        font-size: 13px;
    }

    .member-card__top span {
        flex: 0 0 auto;
        padding: 5px 9px;
        border-radius: 999px;
        background: rgba(86, 188, 213, 0.12);
        color: #56bcd5;
        font-size: 12px;
        font-weight: 800;
    }

    .member-card__bar {
        height: 7px;
        margin-top: 14px;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(217, 222, 242, 0.08);
    }

    .member-card__bar span {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, #7b54eb, #4baee9);
    }

    .member-card__meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 12px;
        color: #7e8499;
        font-size: 12px;
    }

    .member-card__meta span {
        padding: 6px 8px;
        border-radius: 999px;
        background: rgba(217, 222, 242, 0.06);
    }
</style>