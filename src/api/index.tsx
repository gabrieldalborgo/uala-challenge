import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import type { CardDto, PaymentMethodDto, ResponseDto, TransactionDto } from "./types"

// Function to get the appropriate URL based on environment
function getApiUrl(): string {
  const baseUrl = "https://uala-dev-challenge.s3.us-east-1.amazonaws.com/transactions.json"
  
  // In development, use a CORS proxy
  if (import.meta.env.DEV) {
    return `https://api.allorigins.win/raw?url=${encodeURIComponent(baseUrl)}`
  }
  
  // In production, use the direct URL
  return baseUrl
}

function useFetchApi<T>({ select }: { select: (data: ResponseDto) => T }): UseQueryResult<T> {
  return useQuery<ResponseDto, Error, T>({
    queryKey: ["single-endpoint-api"],
    queryFn: () => fetch(getApiUrl()).then(res => res.json()),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    select
  })
}

export function useFetchTransactions(): UseQueryResult<TransactionDto[]> {
  return useFetchApi({
    select: (data) => data.transactions
  })
}

export function useFetchPaymentMethods(): UseQueryResult<PaymentMethodDto[]> {
  return useFetchApi({
    select: (data) => data.metadata.paymentMethods
  })
}

export function useFetchCards(): UseQueryResult<CardDto[]> {
  return useFetchApi({
    select: (data) => data.metadata.cards
  })
}