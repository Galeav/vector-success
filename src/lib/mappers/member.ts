import type { ApiMember } from '$lib/types/api/member';
import type { Member } from '$lib/types/member';

export function mapApiMemberToMember(apiMember: ApiMember): Member {
    return {
        id: apiMember.id,
        fullName: apiMember.full_name,
        email: apiMember.email
    };
}

export function mapMemberToApiMember(member: Member): ApiMember {
    return {
        id: member.id,
        full_name: member.fullName,
        email: member.email
    };
}
