import type { Cohort } from '$lib/types/cohort';

export const cohorts: Cohort[] = [
    {
        id: 'math-6b',
        name: 'Математика 6б',
        description: 'Достижения за успешное освоение модулей в программе и предметные олимпиады',
        membersCount: 3,
        achievementsCount: 4,
        progress: 25,
        inviteKey: 'MATH-6B-2026'
    },
    {
        id: 'My-class',
        name: 'Весёлый 6б',
        description: 'Когорта для фиксации личного вклада в жизнь школы и класса',
        membersCount: 0,
        achievementsCount: 0,
        progress: 0,
        inviteKey: 'MY-CLASS-9013'
    },
    {
        id: 'inform-11a',
        name: 'Информатика 11а',
        description: 'Учебные достижения по информатике',
        membersCount: 0,
        achievementsCount: 0,
        progress: 0,
        inviteKey: 'INFORM-11A-1573'
    }
];
