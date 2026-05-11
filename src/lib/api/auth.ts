import { users } from '$lib/data/users';
import { saveCurrentUser } from '$lib/stores/user';
import type { CurrentUser, UserRole } from '$lib/types/user';

const REGISTERED_USERS_STORAGE_KEY = 'vector-success-registered-users';

export type RegisterUserData = {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
};

export type LoginUserData = {
    email: string;
    password: string;
};

type RegisteredUser = CurrentUser & {
    password: string;
};

export async function registerUser(data: RegisterUserData): Promise<CurrentUser> {
    const registeredUsers = getRegisteredUsers();

    const normalizedEmail = data.email.trim().toLowerCase();

    const userExists = [...users, ...registeredUsers].some(
        (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (userExists) {
        throw new Error('Пользователь с такой электронной почтой уже зарегистрирован.');
    }

    const registeredUser: RegisteredUser = {
        fullName: data.fullName.trim(),
        email: normalizedEmail,
        password: data.password,
        role: data.role
    };

    saveRegisteredUsers([...registeredUsers, registeredUser]);

    return {
        fullName: registeredUser.fullName,
        email: registeredUser.email,
        role: registeredUser.role
    };
}

export async function loginUser(data: LoginUserData): Promise<CurrentUser> {
    const registeredUsers = getRegisteredUsers();

    const normalizedEmail = data.email.trim().toLowerCase();

    const user = [...users, ...registeredUsers].find(
        (user) => user.email.toLowerCase() === normalizedEmail && user.password === data.password
    );

    if (!user) {
        throw new Error('Неверная электронная почта или пароль.');
    }

    const currentUser: CurrentUser = {
        fullName: user.fullName,
        email: user.email,
        role: user.role
    };

    saveCurrentUser(currentUser);

    return currentUser;
}

function getRegisteredUsers(): RegisteredUser[] {
    if (typeof localStorage === 'undefined') {
        return [];
    }

    const rawUsers = localStorage.getItem(REGISTERED_USERS_STORAGE_KEY);

    if (!rawUsers) {
        return [];
    }

    try {
        return JSON.parse(rawUsers) as RegisteredUser[];
    } catch {
        return [];
    }
}

function saveRegisteredUsers(users: RegisteredUser[]) {
    if (typeof localStorage === 'undefined') {
        return;
    }

    localStorage.setItem(REGISTERED_USERS_STORAGE_KEY, JSON.stringify(users));
}
