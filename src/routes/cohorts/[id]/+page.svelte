<script lang="ts">
    import AchievementCard from '$lib/components/achievements/AchievementCard.svelte';
    import AchievementDetails from '$lib/components/achievements/AchievementDetails.svelte';
    import PageShell from '$lib/components/layout/PageShell.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import { achievements } from '$lib/data/achievements';
    import { cohorts } from '$lib/data/cohorts';
    import CreateAchievementForm from '$lib/components/achievements/CreateAchievementForm.svelte';
    import Modal from '$lib/components/ui/Modal.svelte';
    import FormMessage from '$lib/components/ui/FormMessage.svelte';
    import type { Achievement } from '$lib/types/achievement';
    import { getCurrentUserRole } from '$lib/stores/user';
    import type { UserRole } from '$lib/types/user';
    import InviteKeyPanel from '$lib/components/cohorts/InviteKeyPanel.svelte';
    import MemberCard from '$lib/components/cohorts/MemberCard.svelte';
    import { members } from '$lib/data/members';
    import { issuedAchievements } from '$lib/data/issued-achievements';
    import type { IssuedAchievement } from '$lib/types/issued-achievement';
    import MemberAchievementsPanel from '$lib/components/achievements/MemberAchievementsPanel.svelte';
    import EmptyState from '$lib/components/ui/EmptyState.svelte';

    let visibleIssuedAchievements = $state<IssuedAchievement[]>([...issuedAchievements]);
    let selectedMemberId = $state(members[0]?.id ?? null);
    let visibleAchievements = $state<Achievement[]>([...achievements]);
    let isCreateAchievementModalOpen = $state(false);
    let createAchievementMessage = $state('');

    let { params } = $props();

    const cohort = cohorts.find((item) => item.id === params.id) ?? cohorts[0];

    let inviteKey = $state(cohort.inviteKey);

    function getMemberReceivedCount(memberId: string) {
        return visibleIssuedAchievements.filter((item) => item.memberId === memberId).length;
    }

    function isAchievementIssued(memberId: string, achievementId: number) {
        return visibleIssuedAchievements.some(
            (item) => item.memberId === memberId && item.achievementId === achievementId
        );
    }

    function issueAchievementToMember(memberId: string, achievementId: number) {
        if (isAchievementIssued(memberId, achievementId)) {
            return;
        }

        visibleIssuedAchievements = [
            ...visibleIssuedAchievements,
            {
                memberId,
                achievementId
            }
        ];

        const member = members.find((item) => item.id === memberId);
        const achievement = visibleAchievements.find((item) => item.id === achievementId);

        if (member && achievement) {
            issueAchievementMessage = `Достижение «${achievement.title}» выдано обучающемуся ${member.fullName}.`;
        }
    }

    function regenerateInviteKey() {
        inviteKey = `${cohort.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    let selectedAchievementId = $state<number | null>(achievements[0]?.id ?? null);

    let selectedAchievement = $derived(
        visibleAchievements.find((achievement) => achievement.id === selectedAchievementId) ??
            visibleAchievements[0] ??
            null
    );

    let currentRole = $state<UserRole>('student');

    $effect(() => {
        currentRole = getCurrentUserRole();
    });

    let issueAchievementMessage = $state('');
    let visibleMembers = $state([...members]);

    function handleCreateAchievement(
    achievementData: Omit<Achievement, 'id' | 'status' | 'rarity'>
    ) {
    const newAchievement: Achievement = {
        id: Date.now(),
        ...achievementData,
        status: 'available',
        rarity: 0
    };

    visibleAchievements = [newAchievement, ...visibleAchievements];
    selectedAchievementId = newAchievement.id;
    createAchievementMessage = `Достижение «${newAchievement.title}» создано.`;
    isCreateAchievementModalOpen = false;
    }

    let selectedMember = $derived(
        visibleMembers.find((member) => member.id === selectedMemberId) ?? visibleMembers[0] ?? null
    );

    function handleIssueAchievement(memberId: string, achievementId: number) {
        if (isAchievementIssued(memberId, achievementId)) {
            return;
        }

        const member = visibleMembers.find((item) => item.id === memberId);
        const achievement = visibleAchievements.find((item) => item.id === achievementId);

        if (!member || !achievement) {
            return;
        }

        visibleIssuedAchievements = [
            ...visibleIssuedAchievements,
            {
                memberId,
                achievementId
            }
        ];

        issueAchievementMessage = `Достижение «${achievement.title}» выдано обучающемуся ${member.fullName}.`;
    }
</script>

<svelte:head>
    <title>{cohort.name} — Вектор успеха</title>
    <meta name="description" content="Страница когорты и учебных достижений" />
</svelte:head>

<PageShell>
    <a class="back-link" href="/cohorts">← К списку когорт</a>

    <section class="cohort-page">
        <div class="page-heading">
            <div>
                <p class="page-heading__label">Когорта</p>
                <h1>{cohort.name}</h1>
                <p class="page-heading__text">{cohort.description}</p>
            </div>

            {#if currentRole === 'teacher'}
                <div class="page-heading__actions">
                    <Button
                        onclick={() => {
                            isCreateAchievementModalOpen = true;
                        }}
                    >
                        Создать достижение
                    </Button>
                </div>
            {/if}
        </div>

        <div class="stats">
            <div class="stats__item">
                <span>{cohort.membersCount}</span>
                <p>участников</p>
            </div>

            <div class="stats__item">
                <span>{cohort.achievementsCount}</span>
                <p>достижений</p>
            </div>

            <div class="stats__item">
                <span>{cohort.progress}%</span>
                <p>прогресс</p>
            </div>
        </div>

        {#if currentRole === 'teacher'}
            <InviteKeyPanel inviteKey={inviteKey} onregenerate={regenerateInviteKey} />
        {/if}

        <div class="role-info">
            {#if currentRole === 'teacher'}
                <p>
                    Вы работаете в режиме преподавателя: можете создавать достижения и управлять
                    учебным прогрессом обучающихся.
                </p>
            {:else}
                <p>
                    Вы работаете в режиме обучающегося: можете просматривать доступные и полученные
                    достижения, условия их получения и собственный прогресс.
                </p>
            {/if}
        </div>

        {#if issueAchievementMessage}
            <div class="cohort-page__message">
                <FormMessage type="success">
                    {issueAchievementMessage}
                </FormMessage>
            </div>
        {/if}

        {#if currentRole === 'teacher'}
            <section class="members-section">
                <div class="section-heading">
                    <p>Состав когорты</p>
                    <h2>Участники</h2>
                </div>

                {#if visibleMembers.length > 0}
                    <div class="members-grid">
                        {#each visibleMembers as member}
                            <MemberCard
                                {member}
                                receivedCount={getMemberReceivedCount(member.id)}
                                totalCount={visibleAchievements.length}
                                selected={member.id === selectedMemberId}
                                onclick={() => {
                                    selectedMemberId = member.id;
                                }}
                            />
                        {/each}
                    </div>

                    {#if selectedMember}
                        <MemberAchievementsPanel
                            member={selectedMember}
                            achievements={visibleAchievements}
                            isIssued={isAchievementIssued}
                            onissue={handleIssueAchievement}
                        />
                    {/if}
                {:else}
                    <EmptyState
                        title="В когорте пока нет участников"
                        text="После передачи ключа приглашения обучающиеся смогут присоединиться к когорте."
                    />
                {/if}

                {#if selectedMember}
                    <MemberAchievementsPanel
                        member={selectedMember}
                        achievements={visibleAchievements}
                        isIssued={isAchievementIssued}
                        onissue={handleIssueAchievement}
                    />
                {/if}
            </section>
        {/if}

        {#if createAchievementMessage}
            <div class="cohort-page__message">
                <FormMessage type="success">
                    {createAchievementMessage}
                </FormMessage>
            </div>
        {/if}

        <section class="achievements-section">
            <div class="section-heading">
                <p>Учебный прогресс</p>
                <h2>Достижения когорты</h2>
            </div>

            {#if visibleAchievements.length > 0}
                <div class="achievements-grid">
                    {#each visibleAchievements as achievement}
                        <AchievementCard
                            {achievement}
                            selected={achievement.id === selectedAchievementId}
                            onclick={() => {
                                selectedAchievementId = achievement.id;
                            }}
                        />
                    {/each}
                </div>

                {#if selectedAchievement}
                    <AchievementDetails achievement={selectedAchievement} />
                {/if}
            {:else}
                <EmptyState
                    title="Достижения ещё не созданы"
                    text="Преподаватель может создать первое достижение для этой когорты."
                />
                {#if selectedAchievement}
                    <AchievementDetails achievement={selectedAchievement} />
                {/if}
            {/if}
        </section>

    </section>

    {#if isCreateAchievementModalOpen && currentRole === 'teacher'}
        <Modal
            title="Создание достижения"
            onclose={() => {
                isCreateAchievementModalOpen = false;
            }}
        >
            <CreateAchievementForm oncreated={handleCreateAchievement} />
        </Modal>
    {/if}

</PageShell>

<style>
    .back-link {
        display: inline-flex;
        margin-bottom: 24px;
        color: #56bcd5;
        font-size: 14px;
        font-weight: 700;
    }

    .cohort-page {
        max-width: 1100px;
    }

    .page-heading {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
        margin-bottom: 24px;
    }

    .page-heading__label {
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

    .page-heading__text {
        max-width: 620px;
        margin: 14px 0 0;
        color: #9e9ec2;
        font-size: 16px;
        line-height: 1.5;
    }

    .stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
        margin-bottom: 32px;
    }

    .stats__item {
        padding: 20px;
        border: 1px solid rgba(217, 222, 242, 0.08);
        border-radius: 18px;
        background: #1d1f36;
    }

    .stats__item span {
        color: #d9def2;
        font-size: 28px;
        font-weight: 800;
    }

    .stats__item p {
        margin: 8px 0 0;
        color: #7e8499;
        font-size: 13px;
    }

    .achievements-section {
        margin-top: 32px;
    }

    .section-heading {
        margin-bottom: 18px;
    }

    .section-heading p {
        margin: 0 0 8px;
        color: #56bcd5;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .section-heading h2 {
        margin: 0;
        color: #d9def2;
        font-size: 28px;
    }

    .achievements-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 360px));
        gap: 16px;
    }

    .cohort-page__message {
        max-width: 720px;
        margin-bottom: 24px;
    }

    .role-info {
        max-width: 760px;
        margin-bottom: 24px;
        padding: 14px 16px;
        border: 1px solid rgba(86, 188, 213, 0.18);
        border-radius: 14px;
        background: rgba(86, 188, 213, 0.08);
    }

    .role-info p {
        margin: 0;
        color: #d9def2;
        font-size: 14px;
        line-height: 1.45;
    }

    .members-section {
        margin-top: 32px;
    }

    .members-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
    }

    .page-heading__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    @media (max-width: 720px) {
        .page-heading {
            flex-direction: column;
        }

        .stats {
            grid-template-columns: 1fr;
        }

        h1 {
            font-size: 32px;
        }
    }
</style>
