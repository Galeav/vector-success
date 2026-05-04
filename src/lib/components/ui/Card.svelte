<script lang="ts">
  type CardPadding = 'sm' | 'md' | 'lg';

  let {
    children,
    padding = 'md'
  }: {
    children: import('svelte').Snippet;
    padding?: CardPadding;
  } = $props();
</script>

<div class="card card--{padding}">
  {@render children()}
</div>

<style>
  .card {
    border: 1px solid rgba(217, 222, 242, 0.08);
    border-radius: 16px;
    background: #1d1f36;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  }

  .card--sm {
    padding: 16px;
  }

  .card--md {
    padding: 24px;
  }

  .card--lg {
    padding: 32px;
  }
</style>