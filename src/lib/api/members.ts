import { members } from '$lib/data/members';
import { mapApiMemberToMember, mapMemberToApiMember } from '$lib/mappers/member';
import { getCurrentUser } from '$lib/stores/user';
import type { ApiMember } from '$lib/types/api/member';
import type { Member } from '$lib/types/member';

const JOINED_MEMBERS_STORAGE_KEY = 'vector-success-joined-members';

type JoinedMember = {
    cohortId: string;
    member: Member;
};

const memberCohortIds: Record<string, string> = {
    'student-1': 'math-6b',
    'student-2': 'math-6b',
    'student-3': 'math-6b'
};

export async function getCohortMembers(cohortId: string): Promise<Member[]> {
    const baseMembers = members.filter((member) => memberCohortIds[member.id] === cohortId);
    const joinedMembers = getJoinedMembers()
        .filter((item) => item.cohortId === cohortId)
        .map((item) => item.member);

    const allMembers = [...baseMembers, ...joinedMembers];
    const uniqueMembers = getUniqueMembers(allMembers);

    const apiMembers: ApiMember[] = uniqueMembers.map(mapMemberToApiMember);

    return apiMembers.map(mapApiMemberToMember);
}

export async function addCurrentUserToCohort(cohortId: string): Promise<Member | null> {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        return null;
    }

    const member: Member = {
        id: createMemberId(currentUser.email),
        fullName: currentUser.fullName,
        email: currentUser.email
    };

    const joinedMembers = getJoinedMembers();

    const alreadyJoined = joinedMembers.some(
        (item) => item.cohortId === cohortId && item.member.email === member.email
    );

    if (!alreadyJoined) {
        saveJoinedMembers([
            ...joinedMembers,
            {
                cohortId,
                member
            }
        ]);
    }

    return member;
}

function getJoinedMembers(): JoinedMember[] {
    if (typeof localStorage === 'undefined') {
        return [];
    }

    const rawMembers = localStorage.getItem(JOINED_MEMBERS_STORAGE_KEY);

    if (!rawMembers) {
        return [];
    }

    try {
        return JSON.parse(rawMembers) as JoinedMember[];
    } catch {
        return [];
    }
}

function saveJoinedMembers(members: JoinedMember[]) {
    if (typeof localStorage === 'undefined') {
        return;
    }

    localStorage.setItem(JOINED_MEMBERS_STORAGE_KEY, JSON.stringify(members));
}

function getUniqueMembers(members: Member[]) {
    const membersByEmail = new Map<string, Member>();

    members.forEach((member) => {
        membersByEmail.set(member.email.toLowerCase(), member);
    });

    return Array.from(membersByEmail.values());
}

function createMemberId(email: string) {
    return `user-${email.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
}

export function getCurrentUserCohortIds(): string[] {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        return [];
    }

    const userEmail = currentUser.email.toLowerCase();

    const baseCohortIds = members
        .filter((member) => member.email.toLowerCase() === userEmail)
        .map((member) => memberCohortIds[member.id])
        .filter((cohortId): cohortId is string => Boolean(cohortId));

    const joinedCohortIds = getJoinedMembers()
        .filter((item) => item.member.email.toLowerCase() === userEmail)
        .map((item) => item.cohortId);

    return Array.from(new Set([...baseCohortIds, ...joinedCohortIds]));
}
