import { cohorts } from '$lib/data/cohorts';
import { mapApiCohortToCohort } from '$lib/mappers/cohort';
import type { Cohort } from '$lib/types/cohort';
import type { ApiCohort } from '$lib/types/api/cohort';

export async function getCohorts(): Promise<Cohort[]> {
    const apiCohorts: ApiCohort[] = cohorts.map((cohort) => ({
        id: cohort.id,
        name: cohort.name
    }));

    return apiCohorts.map(mapApiCohortToCohort);
}

export async function createCohort(name: string): Promise<Cohort> {
    const id = createCohortId(name);

    return {
        id,
        name,
        description: 'Новая когорта для учёта и демонстрации учебных достижений.',
        membersCount: 0,
        achievementsCount: 0,
        progress: 0,
        inviteKey: createInviteKey(id)
    };
}

export async function joinCohort(inviteKey: string): Promise<boolean> {
    return inviteKey.trim().toUpperCase() === 'CLASS-6B-2026';
}

export async function regenerateCohortInviteKey(cohortId: string): Promise<string> {
    return `${cohortId.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

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

function createInviteKey(cohortId: string) {
    return `${cohortId.toUpperCase()}-2026`;
}
