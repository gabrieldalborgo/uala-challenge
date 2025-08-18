import { DateTime } from "luxon"
import { useFetchTransactions } from "@/api"
import type { CollectionSummary, Periodicity } from "../types"

function formatAmount(amount: number) {
  return amount >= 0 ? `+$${amount.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `-$${Math.abs(amount).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

type StateType = "empty" | "loading" | "error" | "success"

interface UseCollectionsReturn {
  summary: CollectionSummary
  state: StateType
}

function getMinDate(periodicity: Periodicity): string {
  const now = DateTime.now()
  switch (periodicity) {
    case "daily":
      return now.startOf('day').toISO()
    case "weekly":
      return now.startOf('week').toISO()
    case "monthly":
      return now.startOf('month').toISO()
  }
  throw new Error("Invalid periodicity")
}

export function useCollections({ periodicity }: { periodicity: Periodicity }): UseCollectionsReturn {

  const { data, isLoading, error } = useFetchTransactions({
    minDate: getMinDate(periodicity),
    maxDate: DateTime.now().endOf('day').toISO()
  })

  if (isLoading) {
    return {
      state: "loading",
      summary: {
        periodicity: periodicity,
        amount: ""
      }
    }
  }

  if (error) {
    return {
      state: "error",
      summary: {
        periodicity: periodicity,
        amount: ""
      }
    }
  }

  if (!data || data.length === 0) {
    return {
      state: "empty",
      summary: {
        periodicity: periodicity,
        amount: formatAmount(0)
      }
    }
  }

  return {
    state: "success",
    summary: {
      periodicity: periodicity,
      amount: formatAmount(data.reduce((acc, curr) => acc + curr.amount, 0))
    }
  }
}