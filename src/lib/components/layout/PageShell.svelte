<script lang="ts">
  let { children } = $props();
</script>

<main class="page-shell">
  {@render children()}
</main>

<style>
  .page-shell {
    min-height: 100vh;
    padding: 48px;
    background:
      radial-gradient(circle at top right, rgba(86, 157, 219, 0.22), transparent 32%),
      #0f1023;
  }

  @media (max-width: 768px) {
    .page-shell {
      padding: 24px;
    }
  }
</style>