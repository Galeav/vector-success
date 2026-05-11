import type { ApiAchievement } from '$lib/types/api/achievement';
import type { Achievement } from '$lib/types/achievement';

export function mapApiAchievementToAchievement(apiAchievement: ApiAchievement): Achievement {
    return {
        id: apiAchievement.id,
        title: apiAchievement.name,
        description: apiAchievement.description,
        condition: getConditionText(apiAchievement),
        icon: apiAchievement.icon_link,
        status: 'available',
        rarity: 0,
        dependencies: []
    };
}

export function mapAchievementToApiAchievement(
    achievement: Omit<Achievement, 'id' | 'status' | 'rarity'>,
    cohortId: string
): Omit<ApiAchievement, 'id'> {
    return {
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
    };
}

function getConditionText(apiAchievement: ApiAchievement) {
    const condition = apiAchievement.condition_payload?.condition;

    if (typeof condition === 'string' && condition.trim()) {
        return condition;
    }

    return 'Условие получения будет определено преподавателем.';
}
