import { DateTime } from "luxon"
import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import type { CardDto, TransactionsFilters, PaymentMethodDto, ResponseDto, TransactionDto } from "./types"

interface UseFetchApiProps<T> {
  select: (data: ResponseDto) => T
  transform?: (response: ResponseDto) => ResponseDto
  queryKey?: unknown[]
}

function useFetchApi<T>({ select, queryKey, transform = (r: ResponseDto) => r }: UseFetchApiProps<T>): UseQueryResult<T> {
  return useQuery<ResponseDto, Error, T>({
    queryKey: ["single-endpoint-api", ...(queryKey || [])],
    queryFn: () => fetch(import.meta.env.VITE_API_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(res => transform(res)),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    select
  })
}

export function useFetchTransactions(filters: TransactionsFilters = {}): UseQueryResult<TransactionDto[]> {
  return useFetchApi({
    queryKey: [filters.minDate, filters.maxDate, filters.card, filters.paymentMethod, filters.installment, filters.minAmount, filters.maxAmount],
    transform: (data) => {
      const response = { ...data }

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

      if (filters.card && filters.card.length > 0) {
        response.transactions = response.transactions.filter((transaction) => filters.card!.includes(transaction.card))
      }

      if (filters.paymentMethod && filters.paymentMethod.length > 0) {
        response.transactions = response.transactions.filter((transaction) => filters.paymentMethod!.includes(transaction.paymentMethod))
      }

      if (filters.installment && filters.installment.length > 0) {
        response.transactions = response.transactions.filter((transaction) => filters.installment!.includes(transaction.installments.toString()))
      }

      if (filters.minAmount) {
        response.transactions = response.transactions.filter((transaction) => transaction.amount >= filters.minAmount!)
      }

      if (filters.maxAmount) {
        response.transactions = response.transactions.filter((transaction) => transaction.amount <= filters.maxAmount!)
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