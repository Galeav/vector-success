import { members } from '$lib/data/members';
import { mapApiMemberToMember, mapMemberToApiMember } from '$lib/mappers/member';
import type { ApiMember } from '$lib/types/api/member';
import type { Member } from '$lib/types/member';

export async function getCohortMembers(cohortId: string): Promise<Member[]> {
    const apiMembers: ApiMember[] = members.map(mapMemberToApiMember);

    return apiMembers.map(mapApiMemberToMember);
}
