import type { ApiCohort } from '$lib/types/api/cohort';
import type { Cohort } from '$lib/types/cohort';

export function mapApiCohortToCohort(apiCohort: ApiCohort): Cohort {
    return {
        id: apiCohort.id,
        name: apiCohort.name,
        description: 'Когорта для учёта и демонстрации учебных достижений.',
        membersCount: 0,
        achievementsCount: 0,
        progress: 0,
        inviteKey: `${apiCohort.id.toUpperCase()}-2026`
    };
}
