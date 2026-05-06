<script lang="ts">
  import type { Achievement } from '$lib/types/achievement';

  let { achievement }: { achievement: Achievement } = $props();

  const statusLabels: Record<Achievement['status'], string> = {
    received: 'Получено',
    available: 'Доступно',
    locked: 'Заблокировано'
  };
</script>

<section class="achievement-details">
  <div class="achievement-details__icon" aria-hidden="true">
    <img src={achievement.icon} alt="" />
  </div>

  <div class="achievement-details__content">
    <p class="achievement-details__label">Детальная карточка достижения</p>
    <h2>{achievement.title}</h2>
    <p class="achievement-details__description">{achievement.description}</p>

    <dl class="achievement-details__list">
      <div>
        <dt>Статус</dt>
        <dd>{statusLabels[achievement.status]}</dd>
      </div>

      <div>
        <dt>Условие получения</dt>
        <dd>{achievement.condition}</dd>
      </div>

      <div>
        <dt>Редкость</dt>
        <dd>{achievement.rarity}% участников когорты получили это достижение</dd>
      </div>

      <div>
        <dt>Зависимости</dt>
        <dd>
          {#if achievement.dependencies.length > 0}
            {achievement.dependencies.join(', ')}
          {:else}
            Нет зависимостей
          {/if}
        </dd>
      </div>
    </dl>
  </div>
</section>

<style>
  .achievement-details {
    display: grid;
    grid-template-columns: 112px 1fr;
    gap: 24px;
    max-width: 900px;
    margin-top: 32px;
    padding: 24px;
    border: 1px solid rgba(217, 222, 242, 0.08);
    border-radius: 20px;
    background: #1d1f36;
  }

  .achievement-details__icon {
    display: grid;
    place-items: center;
    width: 112px;
    height: 112px;
    border-radius: 24px;
    background: #1b1d36;
    font-size: 56px;
  }

  .achievement-details__content {
    min-width: 0;
  }

  .achievement-details__label {
    margin: 0 0 8px;
    color: #56bcd5;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h2 {
    margin: 0;
    color: #d9def2;
    font-size: 28px;
    line-height: 1.2;
  }

  .achievement-details__description {
    max-width: 620px;
    margin: 12px 0 0;
    color: #9e9ec2;
    font-size: 15px;
    line-height: 1.5;
  }

  .achievement-details__list {
    display: grid;
    gap: 14px;
    margin: 24px 0 0;
  }

  .achievement-details__list div {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 16px;
    padding-top: 14px;
    border-top: 1px solid rgba(217, 222, 242, 0.08);
  }

  dt {
    color: #7e8499;
    font-size: 13px;
  }

  dd {
    margin: 0;
    color: #d9def2;
    font-size: 14px;
    line-height: 1.45;
  }
  .achievement-details__icon img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }

  @media (max-width: 720px) {
    .achievement-details {
      grid-template-columns: 1fr;
    }

    .achievement-details__list div {
      grid-template-columns: 1fr;
      gap: 6px;
    }
  }
</style>