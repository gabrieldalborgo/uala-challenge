import { DateTime } from "luxon"
import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import type { CardDto, PaymentMethodDto, ResponseDto, TransactionDto } from "./types"

function getApiUrl(): string {
  const baseUrl = "https://uala-dev-challenge.s3.us-east-1.amazonaws.com/transactions.json"
  // CORS proxy to avoid CORS errors
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(baseUrl)}`
}

interface UseFetchApiProps<T> {
  select: (data: ResponseDto) => T
  transform?: (response: ResponseDto) => ResponseDto
  queryKey?: unknown[]
}

function useFetchApi<T>({ select, queryKey, transform = (r: ResponseDto) => r }: UseFetchApiProps<T>): UseQueryResult<T> {
  return useQuery<ResponseDto, Error, T>({
    queryKey: ["single-endpoint-api", ...(queryKey || [])],
    queryFn: () => fetch(getApiUrl()).then(res => res.json()).then(res => transform(res)),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    select
  })
}

interface UseFetchTransactionsProps {
  minDate?: string
  maxDate?: string
}

export function useFetchTransactions(filters: UseFetchTransactionsProps = {}): UseQueryResult<TransactionDto[]> {
  return useFetchApi({
    queryKey: [filters.minDate, filters.maxDate],
    transform: (response) => {

      if (filters.minDate) {
        const minDate = DateTime.fromISO(filters.minDate)
        response.transactions = response.transactions.filter((transaction) => {
          const transactionDate = DateTime.fromISO(transaction.createdAt)
          return transactionDate >= minDate
        })
      }
      
      if (filters.maxDate) {
        const maxDate = DateTime.fromISO(filters.maxDate)
        response.transactions = response.transactions.filter((transaction) => {
          const transactionDate = DateTime.fromISO(transaction.createdAt)
          return transactionDate <= maxDate
        })
      }

      // Sort transactions by createdAt date (newest first)
      response.transactions.sort((a, b) => {
        const dateA = DateTime.fromISO(a.createdAt)
        const dateB = DateTime.fromISO(b.createdAt)
        return dateB.toMillis() - dateA.toMillis()
      })
      
      return response
    },
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