<script lang="ts">
  import PageShell from '$lib/components/layout/PageShell.svelte';
  import Button from '$lib/components/ui/Button.svelte';
</script>

<svelte:head>
  <title>Вектор успеха</title>
  <meta
    name="description"
    content="Система учёта и демонстрации учебных достижений обучающихся"
  />
</svelte:head>

<PageShell>
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
</PageShell>

<style>
  .hero {
    max-width: 760px;
    padding: 40px;
    border: 1px solid rgba(217, 222, 242, 0.08);
    border-radius: 24px;
    background: #1d1f36;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
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