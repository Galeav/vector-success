import type { CurrentUser } from '$lib/types/user';

export type MockUser = CurrentUser & {
    password: string;
};

export const users: MockUser[] = [
    {
        fullName: 'Мифирия Сергий Андреевич',
        email: 'mifiria@yandex.ru',
        password: '123456',
        role: 'teacher'
    },
    {
        fullName: 'Петров Артём Сергеевич',
        email: 'petrov@example.ru',
        password: '123456',
        role: 'student'
    },
    {
        fullName: 'Смирнова Анна Игоревна',
        email: 'smirnova@example.ru',
        password: '123456',
        role: 'student'
    },
    {
        fullName: 'Кузнецов Максим Олегович',
        email: 'kuznetsov@example.ru',
        password: '123456',
        role: 'student'
    }
];
