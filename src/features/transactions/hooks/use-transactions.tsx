import { useEffect, useState } from "react"
import type { Transaction } from "../types"

type StateType = "empty" | "loading" | "error" | "success"

interface UseTransactionsReturn {
  state: StateType,
  transactions: Transaction[]
  error: string | null
}

// Function to get the appropriate URL based on environment
function getTransactionsUrl(): string {
  const baseUrl = "https://uala-dev-challenge.s3.us-east-1.amazonaws.com/transactions.json"
  
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(baseUrl)}`

  // // In development, use a CORS proxy
  // if (import.meta.env.DEV) {
  //   return `https://api.allorigins.win/raw?url=${encodeURIComponent(baseUrl)}`
  // }
  
  // // In production, use the direct URL
  // return baseUrl
}

export function useTransactions(): UseTransactionsReturn {

  const [state, setState] = useState<StateType>("success")
  const [transactions, setTransactions] = useState<Transaction[]>([{
    id: "1",
    amount: 100,
    date: "2021-01-01",
    method: "credit_card",
    type: "credit"
  }])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function process() {
      setState("loading")
      setTransactions([])
      setError(null)
      try {
        const response = await fetch(getTransactionsUrl())
        const data = await response.json()
        setTransactions(data.transactions.map((transaction: any) => ({
          id: transaction.id,
          amount: transaction.amount,
          date: transaction.createdAt,
          method: transaction.paymentMethod,
          type: 'credit'
        })))
        setState("success")
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("An unknown error occurred")
        }
        setState("error")
      }
    }
    process()
  }, [])

  const returnValue: UseTransactionsReturn = {
    transactions,
    state,
    error,
  }

  return returnValue
}