<script lang="ts">
    import PageShell from '$lib/components/layout/PageShell.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import Card from '$lib/components/ui/Card.svelte';
    import AchievementCard from '$lib/components/achievements/AchievementCard.svelte';
    import { achievements } from '$lib/data/achievements';
</script>

<svelte:head>
  <title>Вектор успеха</title>
  <meta
    name="description"
    content="Система учёта и демонстрации учебных достижений обучающихся"
  />
</svelte:head>

<PageShell>
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
    <section class="achievements-preview">
        <div class="section-heading">
            <p>Пример интерфейса</p>
            <h2>Учебные достижения</h2>
        </div>

        <div class="achievements-grid">
            {#each achievements as achievement}
            <AchievementCard {achievement} />
            {/each}
        </div>
    </section>
</PageShell>

<style>
    .hero {
        max-width: 680px;
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 1000px) {
  .achievements-grid {
    grid-template-columns: 1fr;
  }
}

  @media (max-width: 768px) {
    .hero {
        padding: 28px;
    }

    h1 {
        font-size: 40px;
    }

    .hero__text {
        font-size: 16px;
    }
    .hero__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 32px;
    }
  }

</style>