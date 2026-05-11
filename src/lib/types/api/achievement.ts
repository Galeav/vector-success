export type ApiAchievement = {
    id: number;
    name: string;
    description: string;
    icon_link: string;
    cohort_id: string;
    issuance_kind?: string;
    condition_type?: string;
    condition_payload?: Record<string, unknown>;
};
