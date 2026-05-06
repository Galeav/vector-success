import type { Cohort } from '$lib/types/cohort';

export const cohorts: Cohort[] = [
  {
    id: 'math-6b',
    name: 'Математика 6б',
    description: 'Достижения за успешное освоение модулей в программе и предметные олимпиады',
    membersCount: 28,
    achievementsCount: 4,
    progress: 25
  },
  {
    id: 'My-class',
    name: 'Весёлый 6б',
    description: 'Когорта для фиксации личного вклада в жизнь школы и класса',
    membersCount: 28,
    achievementsCount: 12,
    progress: 50
  }
];