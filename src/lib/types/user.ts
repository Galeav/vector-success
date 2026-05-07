export type UserRole = 'student' | 'teacher';

export type CurrentUser = {
    fullName: string;
    email: string;
    role: UserRole;
};