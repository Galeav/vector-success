<script lang="ts">
    let {
        children,
        title,
        onclose
    }: {
        children: import('svelte').Snippet;
        title: string;
        onclose: () => void;
    } = $props();

    function handleBackdropClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            onclose();
        }
    }
</script>

<div
    class="modal-backdrop"
    role="presentation"
    onclick={handleBackdropClick}
>
    <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
        <div class="modal__header">
            <h2 id="modal-title">{title}</h2>

            <button
                class="modal__close"
                type="button"
                aria-label="Закрыть модальное окно"
                onclick={onclose}
            >
                ×
            </button>
        </div>

        {@render children()}
    </div>
</div>

<style>
    .modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 20;
        display: grid;
        place-items: center;
        padding: 24px;
        background: rgba(8, 12, 21, 0.72);
        backdrop-filter: blur(8px);
    }

    .modal {
        width: min(100%, 560px);
        border: 1px solid rgba(217, 222, 242, 0.1);
        border-radius: 20px;
        background: #1d1f36;
        box-shadow: 0 28px 90px rgba(0, 0, 0, 0.42);
    }

    .modal__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 24px 24px 0;
    }

    h2 {
        margin: 0;
        color: #d9def2;
        font-size: 24px;
        line-height: 1.2;
    }

    .modal__close {
        display: grid;
        place-items: center;
        width: 36px;
        height: 36px;
        border: 1px solid rgba(217, 222, 242, 0.1);
        border-radius: 10px;
        background: #1b1d36;
        color: #d9def2;
        font-size: 24px;
        line-height: 1;
        cursor: pointer;
    }

    .modal__close:hover {
        border-color: rgba(86, 188, 213, 0.32);
    }

    .modal__close:focus-visible {
        outline: 3px solid rgba(86, 188, 213, 0.45);
        outline-offset: 3px;
    }
</style>