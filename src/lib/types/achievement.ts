export type AchievementStatus = "received" | "available" | "locked";

export type Achievement = {
  id: number;
  title: string;
  description: string;
  condition: string;
  icon: string;
  status: AchievementStatus;
  rarity: number;
  dependencies: string[];
};
