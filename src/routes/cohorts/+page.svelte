<script lang="ts">
    import CohortCard from '$lib/components/cohorts/CohortCard.svelte';
    import PageShell from '$lib/components/layout/PageShell.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import { cohorts } from '$lib/data/cohorts';
    import JoinCohortForm from '$lib/components/cohorts/JoinCohortForm.svelte';
    import CreateCohortForm from '$lib/components/cohorts/CreateCohortForm.svelte';
    import Modal from '$lib/components/ui/Modal.svelte';
    import FormMessage from '$lib/components/ui/FormMessage.svelte';
    import type { Cohort } from '$lib/types/cohort';

    let isCreateModalOpen = $state(false);
    let createMessage = $state('');

    let visibleCohorts = $state<Cohort[]>([...cohorts]);

    function handleCreateCohort(name: string) {
        const newCohort: Cohort = {
            id: createCohortId(name),
            name,
            description: 'Новая когорта для учёта и демонстрации учебных достижений.',
            membersCount: 0,
            achievementsCount: 0,
            progress: 0
        };

        visibleCohorts = [newCohort, ...visibleCohorts];
        createMessage = `Когорта «${name}» создана.`;
        isCreateModalOpen = false;
    }
    /*Это я для проверки, пока бекэнд не подключен*/
    function createCohortId(name: string) {
    return name
        .trim()
        .toLowerCase()
        .replaceAll(' ', '-')
        .replaceAll('ё', 'e')
        .replaceAll('й', 'i')
        .replaceAll('ц', 'c')
        .replaceAll('у', 'u')
        .replaceAll('к', 'k')
        .replaceAll('е', 'e')
        .replaceAll('н', 'n')
        .replaceAll('г', 'g')
        .replaceAll('ш', 'sh')
        .replaceAll('щ', 'shch')
        .replaceAll('з', 'z')
        .replaceAll('х', 'h')
        .replaceAll('ъ', '')
        .replaceAll('ф', 'f')
        .replaceAll('ы', 'y')
        .replaceAll('в', 'v')
        .replaceAll('а', 'a')
        .replaceAll('п', 'p')
        .replaceAll('р', 'r')
        .replaceAll('о', 'o')
        .replaceAll('л', 'l')
        .replaceAll('д', 'd')
        .replaceAll('ж', 'zh')
        .replaceAll('э', 'e')
        .replaceAll('я', 'ya')
        .replaceAll('ч', 'ch')
        .replaceAll('с', 's')
        .replaceAll('м', 'm')
        .replaceAll('и', 'i')
        .replaceAll('т', 't')
        .replaceAll('ь', '')
        .replaceAll('б', 'b')
        .replaceAll('ю', 'yu')
        .replace(/[^a-z0-9-]/g, '');
    }

</script>

<svelte:head>
    <title>Мои когорты — Вектор успеха</title>
    <meta name="description" content="Список когорт в системе учёта учебных достижений" />
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

            <Button
                onclick={() => {
                    isCreateModalOpen = true;
                }}
            >
                Создать когорту
            </Button>
        </div>

        {#if createMessage}
            <div class="cohorts-page__message">
                <FormMessage type="success">
                    {createMessage}
                </FormMessage>
            </div>
        {/if}        

        <JoinCohortForm />

        <div class="cohorts-grid">
            {#each visibleCohorts as cohort}
                <CohortCard {cohort} />
            {/each}
        </div>
    </section>

    {#if isCreateModalOpen}
        <Modal
            title="Создание когорты"
            onclose={() => {
                isCreateModalOpen = false;
            }}
        >
            <CreateCohortForm oncreated={handleCreateCohort} />
        </Modal>
    {/if}

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

    .cohorts-page__message {
        max-width: 720px;
        margin-bottom: 16px;
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
