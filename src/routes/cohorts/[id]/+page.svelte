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

    let visibleAchievements = $state<Achievement[]>([...achievements]);
    let isCreateAchievementModalOpen = $state(false);
    let createAchievementMessage = $state('');

    let { params } = $props();

    const cohort = cohorts.find((item) => item.id === params.id) ?? cohorts[0];

    let selectedAchievementId = $state(visibleAchievements[0].id);

    let selectedAchievement = $derived(
        visibleAchievements.find((achievement) => achievement.id === selectedAchievementId) ??
            visibleAchievements[0]
    );

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

            <Button
                onclick={() => {
                    isCreateAchievementModalOpen = true;
                }}
            >
                Создать достижение
            </Button>
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
        </section>

        <AchievementDetails achievement={selectedAchievement} />
    </section>

    {#if isCreateAchievementModalOpen}
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
