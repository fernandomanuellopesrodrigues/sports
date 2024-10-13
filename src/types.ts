export interface Bet {
  id: string;
  sport: string;
  event: string;
  amount: number;
  odds: number;
  result: 'win' | 'loss' | 'pending';
}