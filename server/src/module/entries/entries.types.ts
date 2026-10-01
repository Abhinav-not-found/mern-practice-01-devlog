export interface IEntries {
  title: string;
  description: string;
  tags: string[];
  timeSpent: number;
  status: 'completed' | 'in-progress' | 'blocked';
}
