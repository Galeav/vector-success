import type { CurrentUser, UserRole } from '$lib/types/user';

const USER_STORAGE_KEY = 'vector-success-user';
const USER_CHANGED_EVENT = 'vector-success-user-changed';

function notifyUserChanged() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(USER_CHANGED_EVENT));
    }
}

export function saveCurrentUser(user: CurrentUser) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    notifyUserChanged();
}

export function getCurrentUser(): CurrentUser | null {
    if (typeof localStorage === 'undefined') {
        return null;
    }

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
    notifyUserChanged();
}

export { USER_CHANGED_EVENT };
