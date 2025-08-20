import { useFetchPaymentMethods } from '@/api';
import type { PaymentMethodDto } from '@/api/types';

type StateType = 'empty' | 'loading' | 'error';

type UsePaymentMethodsReturn =
  | {
      state: StateType;
      paymentMethods?: undefined;
    }
  | {
      paymentMethods: PaymentMethodDto[];
      state: 'success';
    };

export function usePaymentMethods(): UsePaymentMethodsReturn {
  const { data, isLoading, error } = useFetchPaymentMethods();

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
    paymentMethods: data,
  };
}
