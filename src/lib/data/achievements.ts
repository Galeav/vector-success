import type { Achievement } from "$lib/types/achievement";

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "Ученик 6б",
    description: "Ты один из лучших!",
    condition: "Вступить в когорту 6б класса",
    icon: "/achievements/logo_6b.svg",
    status: "received",
    rarity: 100,
    dependencies: [],
  },
  {
    id: 2,
    title: "Мегамозг",
    description:
      "Достижение за выполнение всех возможных заданий повышенной сложности из учебника",
    condition: "Решить все задания со звёздочкой из учебника",
    icon: "/achievements/brain.svg",
    status: "available",
    rarity: 10,
    dependencies: [],
  },
  {
    id: 3,
    title: "Читер!!!",
    description: "Пойман на уроке с мини-калькулятором",
    condition:
      "Попосться с поличным при использовании мини-калькулятора на уроке!",
    icon: "/achievements/calculator.svg",
    status: "available",
    rarity: 15,
    dependencies: [],
  },
  {
    id: 4,
    title: "Разносторонняя личность",
    description: "Получил(а) все возможные достижения",
    condition: "Получить абсолютно все достижения в рамках данной когорты",
    icon: "/achievements/atom.svg",
    status: "locked",
    rarity: 5,
    dependencies: ["Ученик 6б", "Мегамозг", "Читер!!!"],
  },
];
