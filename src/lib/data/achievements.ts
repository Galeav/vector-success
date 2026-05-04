import type { Achievement } from '$lib/types/achievement';

export const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Первый шаг',
    description: 'Первое учебное достижение в выбранной когорте.',
    condition: 'Выполнить первое задание в рамках учебного модуля.',
    icon: '🚀',
    status: 'received',
    rarity: 86,
    dependencies: []
  },
  {
    id: 2,
    title: 'Уверенный старт',
    description: 'Достижение за стабильное выполнение учебных заданий.',
    condition: 'Выполнить три задания подряд без пропусков.',
    icon: '⭐',
    status: 'available',
    rarity: 42,
    dependencies: ['Первый шаг']
  },
  {
    id: 3,
    title: 'Исследователь',
    description: 'Достижение за выполнение проектного задания.',
    condition: 'Подготовить и защитить мини-проект.',
    icon: '🔬',
    status: 'locked',
    rarity: 18,
    dependencies: ['Первый шаг', 'Уверенный старт']
  }
];