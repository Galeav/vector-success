import { getCurrentUser, saveCurrentUser } from '$lib/stores/user';
import type { CurrentUser, UserRole } from '$lib/types/user';

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

export async function registerUser(data: RegisterUserData): Promise<CurrentUser> {
    const user: CurrentUser = {
        fullName: data.fullName,
        email: data.email,
        role: data.role
    };

    saveCurrentUser(user);

    return user;
}

export async function loginUser(data: LoginUserData): Promise<CurrentUser> {
    const existingUser = getCurrentUser();

    const user: CurrentUser = {
        fullName: existingUser?.fullName ?? 'Иванов Иван Иванович',
        email: data.email,
        role: existingUser?.role ?? 'student'
    };

    saveCurrentUser(user);

    return user;
}
