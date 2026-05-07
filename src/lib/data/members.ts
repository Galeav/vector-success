import type { Member } from '$lib/types/member';

export const members: Member[] = [
    {
        id: 'student-1',
        fullName: 'Петров Артём Сергеевич',
        email: 'petrov@example.ru',
        achievementsReceived: 3,
        progress: 75
    },
    {
        id: 'student-2',
        fullName: 'Смирнова Анна Игоревна',
        email: 'smirnova@example.ru',
        achievementsReceived: 2,
        progress: 50
    },
    {
        id: 'student-3',
        fullName: 'Кузнецов Максим Олегович',
        email: 'kuznetsov@example.ru',
        achievementsReceived: 1,
        progress: 25
    }
];