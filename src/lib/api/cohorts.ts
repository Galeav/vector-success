import { cohorts as baseCohorts } from '$lib/data/cohorts';
import { addCurrentUserToCohort, getCurrentUserCohortIds } from '$lib/api/members';
import { getCurrentUser } from '$lib/stores/user';
import type { Cohort } from '$lib/types/cohort';

const CREATED_COHORTS_STORAGE_KEY = 'vector-success-created-cohorts';

type CreatedCohort = Cohort & {
    ownerEmail: string;
};

type CohortWithOwner = Cohort & {
    ownerEmail?: string;
};

const baseCohortOwnerEmails: Record<string, string> = {
    'math-6b': 'mifiria@yandex.ru',
    'My-class': 'mifiria@yandex.ru',
    'inform-11a': 'mifiria@yandex.ru'
};

export async function getCohorts(): Promise<CohortWithOwner[]> {
    return [...getCreatedCohorts(), ...baseCohorts];
}

export async function getCurrentUserCohorts(): Promise<Cohort[]> {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        return [];
    }

    const currentUserEmail = currentUser.email.toLowerCase();
    const cohorts = await getCohorts();

    if (currentUser.role === 'teacher') {
        return cohorts.filter((cohort) => {
            const isBaseCohortOwner = baseCohortOwnerEmails[cohort.id] === currentUserEmail;
            const isCreatedCohortOwner = cohort.ownerEmail?.toLowerCase() === currentUserEmail;

            return isBaseCohortOwner || isCreatedCohortOwner;
        });
    }

    const currentUserCohortIds = getCurrentUserCohortIds();

    return cohorts.filter((cohort) => currentUserCohortIds.includes(cohort.id));
}

export async function getCohortById(id: string): Promise<Cohort | null> {
    const cohorts = await getCurrentUserCohorts();

    return cohorts.find((cohort) => cohort.id === id) ?? null;
}

export async function createCohort(name: string): Promise<Cohort> {
    const currentUser = getCurrentUser();
    const id = createCohortId(name);

    const newCohort: CreatedCohort = {
        id,
        name,
        description: 'Когорта для учёта и демонстрации учебных достижений.',
        membersCount: 0,
        achievementsCount: 0,
        progress: 0,
        inviteKey: createInviteKey(id),
        ownerEmail: currentUser?.email.toLowerCase() ?? ''
    };

    const createdCohorts = getCreatedCohorts();

    saveCreatedCohorts([newCohort, ...createdCohorts]);

    return newCohort;
}

export async function joinCohort(inviteKey: string): Promise<Cohort | null> {
    const normalizedKey = inviteKey.trim().toUpperCase();
    const cohorts = await getCohorts();

    const cohort = cohorts.find((cohort) => cohort.inviteKey.toUpperCase() === normalizedKey);

    if (!cohort) {
        return null;
    }

    await addCurrentUserToCohort(cohort.id);

    return cohort;
}

export async function regenerateCohortInviteKey(cohortId: string): Promise<string> {
    return `${cohortId.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function getCreatedCohorts(): CreatedCohort[] {
    if (typeof localStorage === 'undefined') {
        return [];
    }

    const rawCohorts = localStorage.getItem(CREATED_COHORTS_STORAGE_KEY);

    if (!rawCohorts) {
        return [];
    }

    try {
        return JSON.parse(rawCohorts) as CreatedCohort[];
    } catch {
        return [];
    }
}

function saveCreatedCohorts(cohorts: CreatedCohort[]) {
    if (typeof localStorage === 'undefined') {
        return;
    }

    localStorage.setItem(CREATED_COHORTS_STORAGE_KEY, JSON.stringify(cohorts));
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
