import { useFetchCards } from '@/api';
import type { CardDto } from '@/api/types';

type StateType = 'empty' | 'loading' | 'error';

type UseCardsReturn =
  | {
      state: StateType;
      cards?: undefined;
    }
  | {
      cards: CardDto[];
      state: 'success';
    };

export function useCards(): UseCardsReturn {
  const { data, isLoading, error } = useFetchCards();

  if (isLoading) {
    return {
      state: 'loading',
    };
  }

  if (error) {
    return {
      state: 'error',
    };
  }

  if (!data || data.length === 0) {
    return {
      state: 'empty',
    };
  }

  return {
    state: 'success',
    cards: data,
  };
}
