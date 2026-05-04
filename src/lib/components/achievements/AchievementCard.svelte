<script lang="ts">
  import type { Achievement } from '$lib/types/achievement';

  let { achievement }: { achievement: Achievement } = $props();
</script>

<article class="achievement-card achievement-card--{achievement.status}">
  <div class="achievement-card__icon" aria-hidden="true">
    {achievement.icon}
  </div>

  <div class="achievement-card__content">
    <div class="achievement-card__top">
      <h2>{achievement.title}</h2>
    </div>

    <p>{achievement.description}</p>

    <div class="achievement-card__meta">
      <span>Редкость: {achievement.rarity}%</span>
      <span>
        {achievement.status === 'received'
          ? 'Получено'
          : achievement.status === 'available'
            ? 'Доступно'
            : 'Заблокировано'}
      </span>
    </div>
  </div>
</article>

<style>
  .achievement-card {
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 18px;
    padding: 18px;
    border: 1px solid rgba(217, 222, 242, 0.08);
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

  .achievement-card__level {
    flex: 0 0 auto;
    padding: 4px 8px;
    border-radius: 999px;
    background: rgba(86, 188, 213, 0.12);
    color: #56bcd5;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
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

  @media (max-width: 640px) {
    .achievement-card {
      grid-template-columns: 1fr;
    }
  }
</style>