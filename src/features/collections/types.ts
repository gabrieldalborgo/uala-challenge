export type Periodicity = 'daily' | 'weekly' | 'monthly';

export interface CollectionSummary {
  periodicity: Periodicity;
  amount: string;
}
