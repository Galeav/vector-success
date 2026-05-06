<script lang="ts">
  import CohortCard from '$lib/components/cohorts/CohortCard.svelte';
  import PageShell from '$lib/components/layout/PageShell.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { cohorts } from '$lib/data/cohorts';
</script>

<svelte:head>
  <title>Мои когорты — Вектор успеха</title>
  <meta
    name="description"
    content="Список когорт в системе учёта учебных достижений"
  />
</svelte:head>

<PageShell>
  <section class="cohorts-page">
    <div class="page-heading">
      <div>
        <p class="page-heading__label">Рабочие группы</p>
        <h1>Мои когорты</h1>
        <p class="page-heading__text">
          Когорты объединяют обучающихся с общими условиями получения учебных достижений.
        </p>
      </div>

      <Button>Создать когорту</Button>
    </div>

    <div class="cohorts-grid">
      {#each cohorts as cohort}
        <CohortCard {cohort} />
      {/each}
    </div>
  </section>
</PageShell>

<style>
  .cohorts-page {
    max-width: 1100px;
  }

  .page-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 28px;
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

  .cohorts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }

  @media (max-width: 720px) {
    .page-heading {
      flex-direction: column;
    }

    h1 {
      font-size: 32px;
    }
  }
</style>