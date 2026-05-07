import type { CurrentUser, UserRole } from '$lib/types/user';

const USER_STORAGE_KEY = 'vector-success-user';

export function saveCurrentUser(user: CurrentUser) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function getCurrentUser(): CurrentUser | null {
    const rawUser = localStorage.getItem(USER_STORAGE_KEY);

    if (!rawUser) {
        return null;
    }

    try {
        return JSON.parse(rawUser) as CurrentUser;
    } catch {
        return null;
    }
}

export function getCurrentUserRole(): UserRole {
    return getCurrentUser()?.role ?? 'student';
}

export function clearCurrentUser() {
    localStorage.removeItem(USER_STORAGE_KEY);
}