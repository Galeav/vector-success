<script lang="ts">
    import PageShell from '$lib/components/layout/PageShell.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import Card from '$lib/components/ui/Card.svelte';
    import AchievementCard from '$lib/components/achievements/AchievementCard.svelte';
    import { achievements } from '$lib/data/achievements';
    import AchievementDetails from '$lib/components/achievements/AchievementDetails.svelte';
    import CohortCard from '$lib/components/cohorts/CohortCard.svelte';
    import { cohorts } from '$lib/data/cohorts';

    let selectedAchievementId = $state(achievements[0].id);
    let selectedAchievement = $derived(
      achievements.find((achievement) => achievement.id === selectedAchievementId) ?? achievements[0]
    );
</script>

<svelte:head>
  <title>Вектор успеха</title>
  <meta
    name="description"
    content="Система учёта и демонстрации учебных достижений обучающихся"
  />
</svelte:head>

<PageShell>
  <div class="hero-card">
    <Card padding="lg">
      <section class="hero">
        <p class="hero__label">Система учебных достижений</p>
        <h1>Вектор успеха</h1>
        <p class="hero__text">
          Веб-приложение для учёта, визуализации и демонстрации учебных достижений
          обучающихся.
        </p>
        <div class="hero__actions">
          <Button>Начать работу</Button>
          <Button variant="secondary">О системе</Button>
        </div>
      </section>
    </Card>
  </div>

  <section class="cohorts-preview">
  <div class="section-heading">
    <p>Рабочие группы</p>
    <h2>Мои когорты</h2>
  </div>

  <div class="cohorts-grid">
    {#each cohorts as cohort}
      <CohortCard {cohort} />
    {/each}
  </div>
</section>

  <section class="achievements-preview">
    <div class="section-heading">
      <p>Пример интерфейса</p>
      <h2>Учебные достижения</h2>
    </div>

    <div class="achievements-grid">
      {#each achievements as achievement}
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
</PageShell>

<style>
  .hero-card {
    max-width: 760px;
  }

  .hero {
    width: 100%;
  }

  .hero__label {
    margin: 0 0 16px;
    color: #56bcd5;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: 56px;
    line-height: 1.05;
    letter-spacing: -0.04em;
  }

  .hero__text {
    max-width: 560px;
    margin: 24px 0 0;
    color: #9e9ec2;
    font-size: 20px;
    line-height: 1.5;
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 32px;
  }

  .achievements-preview {
    max-width: 1100px;
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

  .cohorts-preview {
  max-width: 900px;
  margin-top: 32px;
}

.cohorts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

  @media (max-width: 768px) {
    h1 {
      font-size: 40px;
    }

    .hero__text {
      font-size: 16px;
    }
  }
</style>