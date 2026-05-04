<script lang="ts">
  type ButtonVariant = 'primary' | 'secondary';

  let {
    children,
    variant = 'primary',
    type = 'button',
    disabled = false
  }: {
    children: import('svelte').Snippet;
    variant?: ButtonVariant;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
  } = $props();
</script>

<button class="button button--{variant}" {type} {disabled}>
  {@render children()}
</button>

<style>
  .button {
    min-height: 44px;
    padding: 0 20px;
    border: none;
    border-radius: 10px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    transition:
      transform 0.16s ease,
      opacity 0.16s ease,
      background 0.16s ease;
  }

  .button:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  .button:active:not(:disabled) {
    transform: translateY(0);
  }

  .button:focus-visible {
    outline: 3px solid rgba(86, 188, 213, 0.45);
    outline-offset: 3px;
  }

  .button:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .button--primary {
    background: linear-gradient(90deg, #7b54eb, #4baee9);
  }

  .button--secondary {
    border: 1px solid rgba(217, 222, 242, 0.14);
    background: #1d1f36;
    color: #d9def2;
  }
</style>