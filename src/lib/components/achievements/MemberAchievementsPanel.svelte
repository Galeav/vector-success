<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import type { Achievement } from '$lib/types/achievement';
    import type { Member } from '$lib/types/member';

    let {
        member,
        achievements,
        isIssued,
        onissue
    }: {
        member: Member;
        achievements: Achievement[];
        isIssued: (memberId: string, achievementId: number) => boolean;
        onissue: (memberId: string, achievementId: number) => void;
    } = $props();

    let receivedCount = $derived(
        achievements.filter((achievement) => isIssued(member.id, achievement.id)).length
    );

    let progress = $derived(
        achievements.length > 0 ? Math.round((receivedCount / achievements.length) * 100) : 0
    );
</script>

<section class="member-achievements">
    <div class="member-achievements__heading">
        <div>
            <p class="member-achievements__label">Достижения обучающегося</p>
            <h2>{member.fullName}</h2>
            <span>{receivedCount} из {achievements.length} достижений получено</span>
        </div>

        <strong>{progress}%</strong>
    </div>

    <div class="member-achievements__bar" aria-hidden="true">
        <span style:width={`${progress}%`}></span>
    </div>

    <div class="member-achievements__list">
        {#each achievements as achievement}
            <article
                class="achievement-row"
                class:achievement-row--not-issued={!isIssued(member.id, achievement.id)}
            >
                <div class="achievement-row__icon" aria-hidden="true">
                    <img src={achievement.icon} alt="" />
                </div>

                <div class="achievement-row__content">
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                </div>

                <div class="achievement-row__action">
                    {#if isIssued(member.id, achievement.id)}
                        <span class="achievement-row__status">Получено</span>
                    {:else}
                        <Button
                            variant="secondary"
                            onclick={() => {
                                onissue(member.id, achievement.id);
                            }}
                        >
                            Выдать
                        </Button>
                    {/if}
                </div>
            </article>
        {/each}
    </div>
</section>

<style>
    .member-achievements {
        display: grid;
        gap: 18px;
        margin-top: 24px;
        padding: 20px;
        border: 1px solid rgba(217, 222, 242, 0.08);
        border-radius: 18px;
        background: #1d1f36;
    }

    .member-achievements__heading {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
    }

    .member-achievements__label {
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
        font-size: 24px;
        line-height: 1.2;
    }

    .member-achievements__heading span {
        display: block;
        margin-top: 8px;
        color: #9e9ec2;
        font-size: 14px;
    }

    .member-achievements__heading strong {
        flex: 0 0 auto;
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(86, 188, 213, 0.12);
        color: #56bcd5;
        font-size: 16px;
    }

    .member-achievements__bar {
        height: 8px;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(217, 222, 242, 0.08);
    }

    .member-achievements__bar span {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, #7b54eb, #4baee9);
    }

    .member-achievements__list {
        display: grid;
        gap: 12px;
    }

    .achievement-row {
        display: grid;
        grid-template-columns: 52px 1fr auto;
        align-items: center;
        gap: 14px;
        padding: 14px;
        border: 1px solid rgba(217, 222, 242, 0.08);
        border-radius: 14px;
        background: #1b1d36;
    }

    .achievement-row--not-issued {
        border-color: rgba(217, 222, 242, 0.05);
        background: rgba(217, 222, 242, 0.035);
    }

    .achievement-row--not-issued .achievement-row__icon,
    .achievement-row--not-issued .achievement-row__content {
        opacity: 0.48;
        filter: grayscale(0.9);
    }

    .achievement-row__icon {
        display: grid;
        place-items: center;
        width: 52px;
        height: 52px;
        border-radius: 14px;
        background: #15182c;
    }

    .achievement-row__icon img {
        width: 38px;
        height: 38px;
        object-fit: contain;
    }

    .achievement-row__content {
        min-width: 0;
    }

    h3 {
        margin: 0;
        color: #d9def2;
        font-size: 15px;
        line-height: 1.3;
    }

    .achievement-row__content p {
        margin: 6px 0 0;
        color: #9e9ec2;
        font-size: 13px;
        line-height: 1.4;
    }

    .achievement-row__action {
        display: flex;
        justify-content: flex-end;
    }

    .achievement-row__status {
        padding: 8px 10px;
        border-radius: 999px;
        background: rgba(86, 188, 213, 0.12);
        color: #56bcd5;
        font-size: 13px;
        font-weight: 800;
    }

    @media (max-width: 720px) {
        .achievement-row {
            grid-template-columns: 52px 1fr;
        }

        .achievement-row__action {
            grid-column: 1 / -1;
            justify-content: flex-start;
        }
    }
</style>
