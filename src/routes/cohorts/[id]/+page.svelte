<script lang="ts">
    import {
        createAchievement,
        getAchievementsByCohort,
        getIssuedAchievementsByCohort,
        issueAchievement
    } from '$lib/api/achievements';
    import AchievementCard from '$lib/components/achievements/AchievementCard.svelte';
    import AchievementDetails from '$lib/components/achievements/AchievementDetails.svelte';
    import CreateAchievementForm from '$lib/components/achievements/CreateAchievementForm.svelte';
    import MemberAchievementsPanel from '$lib/components/achievements/MemberAchievementsPanel.svelte';
    import InviteKeyPanel from '$lib/components/cohorts/InviteKeyPanel.svelte';
    import MemberCard from '$lib/components/cohorts/MemberCard.svelte';
    import PageShell from '$lib/components/layout/PageShell.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import EmptyState from '$lib/components/ui/EmptyState.svelte';
    import FormMessage from '$lib/components/ui/FormMessage.svelte';
    import Modal from '$lib/components/ui/Modal.svelte';
    import { getCohortMembers } from '$lib/api/members';
    import { getCurrentUserRole } from '$lib/stores/user';
    import type { Achievement } from '$lib/types/achievement';
    import type { IssuedAchievement } from '$lib/types/issued-achievement';
    import type { UserRole } from '$lib/types/user';
    import type { Member } from '$lib/types/member';
    import { getCohortById, regenerateCohortInviteKey } from '$lib/api/cohorts';
    import type { Cohort } from '$lib/types/cohort';
    import AuthGuard from '$lib/components/auth/AuthGuard.svelte';

    let { params } = $props();

    let cohort = $state<Cohort | null>(null);

    let visibleAchievements = $state<Achievement[]>([]);
    let visibleIssuedAchievements = $state<IssuedAchievement[]>([]);
    let visibleMembers = $state<Member[]>([]);

    let selectedAchievementId = $state<number | null>(null);
    let selectedMemberId = $state<string | null>(null);

    let isCreateAchievementModalOpen = $state(false);
    let createAchievementMessage = $state('');
    let issueAchievementMessage = $state('');
    let inviteKey = $state('');
    let currentRole = $state<UserRole>('student');

    $effect(() => {
        getCohortById(params.id).then((loadedCohort) => {
            cohort = loadedCohort;
            inviteKey = loadedCohort?.inviteKey ?? '';
        });
    });

    let selectedMember = $derived(
        visibleMembers.find((member) => member.id === selectedMemberId) ?? visibleMembers[0] ?? null
    );

    let currentStudent = $derived(visibleMembers[0] ?? null);

    let achievementsForCurrentRole = $derived(
        currentRole === 'student' && currentStudent
            ? visibleAchievements.map(
                  (achievement): Achievement => ({
                      ...achievement,
                      status: isAchievementIssued(currentStudent.id, achievement.id)
                          ? 'received'
                          : 'locked'
                  })
              )
            : visibleAchievements
    );

    let selectedAchievement = $derived(
        achievementsForCurrentRole.find(
            (achievement) => achievement.id === selectedAchievementId
        ) ??
            achievementsForCurrentRole[0] ??
            null
    );

    let membersCount = $derived(visibleMembers.length);

    let achievementsCount = $derived(visibleAchievements.length);

    let cohortProgress = $derived(
        membersCount > 0 && achievementsCount > 0
            ? Math.round(
                  (visibleIssuedAchievements.length / (membersCount * achievementsCount)) * 100
              )
            : 0
    );

    $effect(() => {
        currentRole = getCurrentUserRole();
    });

    $effect(() => {
        if (!cohort) {
            return;
        }

        getAchievementsByCohort(cohort.id).then((loadedAchievements) => {
            visibleAchievements = loadedAchievements;
            selectedAchievementId = loadedAchievements[0]?.id ?? null;
        });

        getIssuedAchievementsByCohort(cohort.id).then((loadedIssuedAchievements) => {
            visibleIssuedAchievements = loadedIssuedAchievements;
        });

        getCohortMembers(cohort.id).then((loadedMembers) => {
            visibleMembers = loadedMembers;
            selectedMemberId = loadedMembers[0]?.id ?? null;
        });
    });

    function getMemberReceivedCount(memberId: string) {
        return visibleIssuedAchievements.filter((item) => item.memberId === memberId).length;
    }

    function isAchievementIssued(memberId: string, achievementId: number) {
        return visibleIssuedAchievements.some(
            (item) => item.memberId === memberId && item.achievementId === achievementId
        );
    }

    async function regenerateInviteKey() {
        if (!cohort) {
            return;
        }

        inviteKey = await regenerateCohortInviteKey(cohort.id);
    }

    async function handleCreateAchievement(
        achievementData: Omit<Achievement, 'id' | 'status' | 'rarity'>
    ) {
        if (!cohort) {
            return;
        }

        const newAchievement = await createAchievement(cohort.id, achievementData);

        visibleAchievements = [newAchievement, ...visibleAchievements];
        selectedAchievementId = newAchievement.id;
        createAchievementMessage = `Достижение «${newAchievement.title}» создано.`;
        isCreateAchievementModalOpen = false;
    }

    async function handleIssueAchievement(memberId: string, achievementId: number) {
        if (isAchievementIssued(memberId, achievementId)) {
            return;
        }

        const member = visibleMembers.find((item) => item.id === memberId);
        const achievement = visibleAchievements.find((item) => item.id === achievementId);

        if (!member || !achievement) {
            return;
        }

        const issuedAchievement = await issueAchievement(memberId, achievementId);

        visibleIssuedAchievements = [...visibleIssuedAchievements, issuedAchievement];

        issueAchievementMessage = `Достижение «${achievement.title}» выдано обучающемуся ${member.fullName}.`;
    }
</script>

<svelte:head>
    <title>{cohort ? cohort.name : 'Когорта не найдена'} — Вектор успеха</title>
    <meta name="description" content="Страница когорты и учебных достижений" />
</svelte:head>
<AuthGuard>
    <PageShell>
        <a class="back-link" href="/cohorts">← К списку когорт</a>

        {#if cohort}
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

                <div class:stats={true} class:stats--teacher={currentRole === 'teacher'}>
                    <div class="stats__item">
                        <span>{membersCount}</span>
                        <p>участников</p>
                    </div>

                    <div class="stats__item">
                        <span>{achievementsCount}</span>
                        <p>достижений</p>
                    </div>

                    {#if currentRole === 'student'}
                        <div class="stats__item">
                            <span>{cohortProgress}%</span>
                            <p>прогресс</p>
                        </div>
                    {/if}
                </div>

                {#if currentRole === 'teacher'}
                    <InviteKeyPanel {inviteKey} onregenerate={regenerateInviteKey} />
                {/if}
                <!--
                <div class="role-info">
                    {#if currentRole === 'teacher'}
                        <p>
                            Преподаватель может создавать достижения и управлять
                            учебным прогрессом обучающихся.
                        </p>
                    {:else}
                        <p>
                            Обучающийся может просматривать доступные и полученные достижения, 
                            условия их получения и собственный прогресс в целом.
                        </p>
                    {/if}
                </div>
                -->

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

                    {#if achievementsForCurrentRole.length > 0}
                        <div class="achievements-grid">
                            {#each achievementsForCurrentRole as achievement}
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
                    <CreateAchievementForm
                        achievements={visibleAchievements}
                        oncreated={handleCreateAchievement}
                    />
                </Modal>
            {/if}
        {:else}
            <EmptyState
                title="Когорта не найдена"
                text="Проверьте ссылку или вернитесь к списку доступных когорт."
            />
        {/if}
    </PageShell>
</AuthGuard>

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

    .stats--teacher {
        grid-template-columns: repeat(2, minmax(0, 1fr));
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
    /*
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
    */
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
