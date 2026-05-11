import { achievements } from '$lib/data/achievements';
import { issuedAchievements } from '$lib/data/issued-achievements';
import {
    mapApiAchievementToAchievement,
    mapAchievementToApiAchievement
} from '$lib/mappers/achievement';
import type { Achievement } from '$lib/types/achievement';
import type { ApiAchievement } from '$lib/types/api/achievement';
import type { IssuedAchievement } from '$lib/types/issued-achievement';

export async function getAchievementsByCohort(cohortId: string): Promise<Achievement[]> {
    const apiAchievements: ApiAchievement[] = achievements.map((achievement) => ({
        id: achievement.id,
        name: achievement.title,
        description: achievement.description,
        icon_link: achievement.icon,
        cohort_id: cohortId,
        issuance_kind: 'manual',
        condition_type: 'text',
        condition_payload: {
            condition: achievement.condition,
            dependencies: achievement.dependencies
        }
    }));

    return apiAchievements.map(mapApiAchievementToAchievement);
}

export async function createAchievement(
    cohortId: string,
    achievementData: Omit<Achievement, 'id' | 'status' | 'rarity'>
): Promise<Achievement> {
    const apiAchievementData = mapAchievementToApiAchievement(achievementData, cohortId);

    const apiAchievement: ApiAchievement = {
        id: Date.now(),
        ...apiAchievementData
    };

    return mapApiAchievementToAchievement(apiAchievement);
}

export async function getIssuedAchievementsByCohort(
    _cohortId: string
): Promise<IssuedAchievement[]> {
    return [...issuedAchievements];
}

export async function issueAchievement(
    memberId: string,
    achievementId: number
): Promise<IssuedAchievement> {
    return {
        memberId,
        achievementId
    };
}
