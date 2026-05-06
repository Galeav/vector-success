<script lang="ts">
  import type { Achievement } from '$lib/types/achievement';

  let {
    achievement,
    selected = false,
    onclick
  }: {
    achievement: Achievement;
    selected?: boolean;
    onclick?: () => void;
  } = $props();

  const statusLabels: Record<Achievement['status'], string> = {
    received: 'Получено',
    available: 'Доступно',
    locked: 'Пока не доступно'/*Пока не знаю буду использовать или нет, но была идея с блокировкой зависимого достижения*/
  };
</script>

<button
  class="achievement-card achievement-card--{achievement.status}"
  class:achievement-card--selected={selected}
  type="button"
  {onclick}
>
  <div class="achievement-card__icon" aria-hidden="true">
    <img src={achievement.icon} alt="" />
  </div>

  <div class="achievement-card__content">
    <div class="achievement-card__top">
      <h2>{achievement.title}</h2>
    </div>

    <p>{achievement.description}</p>

    <div class="achievement-card__meta">
      <span>Редкость: {achievement.rarity}%</span>
      <span>{statusLabels[achievement.status]}</span>
    </div>
  </div>
</button>

<style>
  .achievement-card {
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 18px;
    padding: 18px;
    border: 1px solid rgba(217, 222, 242, 0.08);
    width: 100%;
    color: inherit;
    text-align: left;
    border-radius: 18px;
    background: #1d1f36;
    transition:
      transform 0.16s ease,
      border-color 0.16s ease,
      background 0.16s ease;
  }

  .achievement-card:hover {
    transform: translateY(-2px);
    border-color: rgba(86, 188, 213, 0.32);
  }

  .achievement-card__icon {
    display: grid;
    place-items: center;
    width: 72px;
    height: 72px;
    border-radius: 18px;
    background: #1b1d36;
    font-size: 36px;
  }

  .achievement-card__content {
    min-width: 0;
  }

  .achievement-card__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  h2 {
    margin: 0;
    color: #d9def2;
    font-size: 18px;
    line-height: 1.25;
  }

  p {
    margin: 8px 0 0;
    color: #9e9ec2;
    font-size: 14px;
    line-height: 1.45;
  }

  .achievement-card__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
    color: #7e8499;
    font-size: 12px;
  }

  .achievement-card__meta span {
    padding: 6px 8px;
    border-radius: 999px;
    background: rgba(217, 222, 242, 0.06);
  }

  .achievement-card--received {
    border-color: rgba(86, 188, 213, 0.34);
  }

  .achievement-card--available {
    border-color: rgba(217, 222, 242, 0.08);
  }

  .achievement-card--locked {
    opacity: 0.58;
    filter: grayscale(0.9);
  }

  .achievement-card--selected {
    border-color: rgba(86, 188, 213, 0.72);
    box-shadow: 0 0 0 3px rgba(86, 188, 213, 0.12);
  }

  .achievement-card:focus-visible {
    outline: 3px solid rgba(86, 188, 213, 0.45);
    outline-offset: 3px;
  }

  .achievement-card__icon img {
    width: 75px;
    height: 75px;
    object-fit: contain;
  }

  @media (max-width: 640px) {
    .achievement-card {
      grid-template-columns: 1fr;
    }
  }
</style>