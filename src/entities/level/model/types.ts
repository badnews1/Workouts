export interface Level {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  isLocked: boolean;
  isCurrent?: boolean;
  progress?: number; // процент от 0 до 100
}