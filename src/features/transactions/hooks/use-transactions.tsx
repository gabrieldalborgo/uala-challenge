import { useMemo } from "react"
import { useFetchTransactions, useFetchPaymentMethods, useFetchCards } from "@/api"
import type { Transaction } from "../types"

function formatAmount(amount: number) {
  return amount >= 0 ? `+$${amount.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `-$${Math.abs(amount).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatDate(date: string) {
  try {
    return new Date(date).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  } catch {
    return '00/00/0000'
  }
}

type StateType = "empty" | "loading" | "error" | "success"

interface UseTransactionsReturn {
  state: StateType,
  transactions: Transaction[]
  error: string | null
}

export function useTransactions(): UseTransactionsReturn {

  const { data: transactions, isLoading: isLoadingTransactions, error: errorFromApi } = useFetchTransactions()
  const { data: paymentMethods, isLoading: isLoadingPaymentMethods, error: errorFromPaymentMethods } = useFetchPaymentMethods()
  const { data: cards, isLoading: isLoadingCards, error: errorFromCards } = useFetchCards()

  const isLoading = useMemo(() => isLoadingTransactions || isLoadingPaymentMethods || isLoadingCards, [isLoadingTransactions, isLoadingPaymentMethods, isLoadingCards])
  const error = useMemo(() => errorFromApi || errorFromPaymentMethods || errorFromCards, [errorFromApi, errorFromPaymentMethods, errorFromCards])

  if (isLoading) {
    return {
      state: "loading",
      transactions: [],
      error: null
    }
  }

  if (error) {
    return {
      state: "error",
      transactions: [],
      error: error.message
    }
  }

  if (!transactions || transactions.length === 0) {
    return {
      state: "empty",
      transactions: [],
      error: null
    }
  }

  return {
    state: "success",
    error: null,
    transactions: transactions.map((transaction) => ({
      id: transaction.id,
      amount: formatAmount(transaction.amount),
      date: formatDate(transaction.createdAt),
      method: paymentMethods?.find((paymentMethod) => paymentMethod.value === transaction.paymentMethod)?.label ?? "unknown",
      type: cards?.find((card) => card.value === transaction.card)?.label ?? "unknown", 
    })) ?? []
  }
}