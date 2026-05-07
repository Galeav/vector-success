<script lang="ts">
    import type { Cohort } from '$lib/types/cohort';

    let { cohort }: { cohort: Cohort } = $props();
</script>

<a class="cohort-card" href={`/cohorts/${cohort.id}`}>
    <div class="cohort-card__top">
        <div>
            <p class="cohort-card__label">Когорта</p>
            <h3>{cohort.name}</h3>
        </div>

        <span class="cohort-card__progress">{cohort.progress}%</span>
    </div>

    <p class="cohort-card__description">{cohort.description}</p>

    <div class="cohort-card__bar" aria-hidden="true">
        <span style:width={`${cohort.progress}%`}></span>
    </div>

    <div class="cohort-card__meta">
        <span>{cohort.membersCount} участников</span>
        <span>{cohort.achievementsCount} достижений</span>
    </div>
</a>

<style>
    .cohort-card {
        padding: 20px;
        border: 1px solid rgba(217, 222, 242, 0.08);
        border-radius: 18px;
        background: #1d1f36;
        display: block;
        color: inherit;
        text-decoration: none;
        transition:
            transform 0.16s ease,
            border-color 0.16s ease;
    }

    .cohort-card:hover {
        transform: translateY(-2px);
        border-color: rgba(86, 188, 213, 0.32);
    }

    .cohort-card:focus-visible {
        outline: 3px solid rgba(86, 188, 213, 0.45);
        outline-offset: 3px;
    }

    .cohort-card__top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
    }

    .cohort-card__label {
        margin: 0 0 8px;
        color: #56bcd5;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    h3 {
        margin: 0;
        color: #d9def2;
        font-size: 20px;
        line-height: 1.25;
    }

    .cohort-card__progress {
        flex: 0 0 auto;
        padding: 6px 10px;
        border-radius: 999px;
        background: rgba(86, 188, 213, 0.12);
        color: #56bcd5;
        font-size: 13px;
        font-weight: 700;
    }

    .cohort-card__description {
        margin: 14px 0 0;
        color: #9e9ec2;
        font-size: 14px;
        line-height: 1.45;
    }

    .cohort-card__bar {
        height: 8px;
        margin-top: 18px;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(217, 222, 242, 0.08);
    }

    .cohort-card__bar span {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, #7b54eb, #4baee9);
    }

    .cohort-card__meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 16px;
        color: #7e8499;
        font-size: 12px;
    }

    .cohort-card__meta span {
        padding: 6px 8px;
        border-radius: 999px;
        background: rgba(217, 222, 242, 0.06);
    }
</style>
