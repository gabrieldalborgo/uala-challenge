import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFetchTransactions, useFetchPaymentMethods, useFetchCards } from '@/api'
import type { ResponseDto } from '@/api/types'

// Mock fetch globally
global.fetch = vi.fn()

// Mock environment variable
vi.mock('import.meta.env', () => ({
  VITE_API_URL: '/api/data'
}))

// Test data
const mockResponse: ResponseDto = {
  transactions: [
    {
      id: '1',
      amount: 1500.50,
      card: 'visa',
      installments: 1,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      paymentMethod: 'link'
    },
    {
      id: '2',
      amount: 2500.75,
      card: 'mastercard',
      installments: 3,
      createdAt: '2024-01-14T15:45:00Z',
      updatedAt: '2024-01-14T15:45:00Z',
      paymentMethod: 'qr'
    },
    {
      id: '3',
      amount: 800.25,
      card: 'visa',
      installments: 1,
      createdAt: '2024-01-13T09:20:00Z',
      updatedAt: '2024-01-13T09:20:00Z',
      paymentMethod: 'mpos'
    }
  ],
  metadata: {
    paymentMethods: [
      { value: 'link', label: 'Link de pago' },
      { value: 'qr', label: 'Código QR' },
      { value: 'mpos', label: 'mPOS' }
    ],
    cards: [
      { value: 'visa', label: 'Visa' },
      { value: 'mastercard', label: 'Mastercard' },
      { value: 'amex', label: 'Amex' }
    ]
  }
}

// Wrapper component for testing hooks
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        retryOnMount: false,
      },
    },
  })
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('API Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useFetchTransactions', () => {
    it('should fetch transactions without filters', async () => {
      const mockFetch = fetch as any
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response)

      const { result } = renderHook(() => useFetchTransactions(), {
        wrapper: createWrapper()
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(mockResponse.transactions)
      expect(mockFetch).toHaveBeenCalledWith('/api/data')
    })

    it('should filter transactions by card type', async () => {
      const mockFetch = fetch as any
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response)

      const { result } = renderHook(() => useFetchTransactions({ card: ['visa'] }), {
        wrapper: createWrapper()
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Should only return Visa transactions
      expect(result.current.data).toHaveLength(2)
      expect(result.current.data?.every(t => t.card === 'visa')).toBe(true)
    })

    it('should filter transactions by payment method', async () => {
      const mockFetch = fetch as any
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response)

      const { result } = renderHook(() => useFetchTransactions({ paymentMethod: ['link'] }), {
        wrapper: createWrapper()
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Should only return Link transactions
      expect(result.current.data).toHaveLength(1)
      expect(result.current.data?.[0].paymentMethod).toBe('link')
    })

    it('should filter transactions by date range', async () => {
      const mockFetch = fetch as any
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response)

      const { result } = renderHook(() => useFetchTransactions({ 
        minDate: '2024-01-14T00:00:00Z',
        maxDate: '2024-01-15T23:59:59Z'
      }), {
        wrapper: createWrapper()
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })
      
      expect(result.current.data).toHaveLength(2)
      expect(result.current.data?.[0].id).toBe('1')
      expect(result.current.data?.[1].id).toBe('2')
    })

    it('should filter transactions by amount range', async () => {
      const mockFetch = fetch as any
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response)

      const { result } = renderHook(() => useFetchTransactions({ 
        minAmount: 1000,
        maxAmount: 2000
      }), {
        wrapper: createWrapper()
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Should only return transactions between 1000-2000 (only transaction 1: 1500.50)
      expect(result.current.data).toHaveLength(1)
      expect(result.current.data?.[0].amount).toBe(1500.50)
      expect(result.current.data?.every(t => t.amount >= 1000 && t.amount <= 2000)).toBe(true)
    })

    it('should sort transactions by date (newest first)', async () => {
      const mockFetch = fetch as any
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response)

      const { result } = renderHook(() => useFetchTransactions(), {
        wrapper: createWrapper()
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Should be sorted by date descending
      const dates = result.current.data?.map(t => new Date(t.createdAt).getTime()) || []
      expect(dates).toEqual([...dates].sort((a, b) => b - a))
    })

    it('should handle HTTP errors', async () => {
      const mockFetch = fetch as any
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      } as Response)

      const { result } = renderHook(() => useFetchTransactions(), {
        wrapper: createWrapper()
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toBeDefined()
      expect(result.current.error?.message).toContain('HTTP error! status: 500')
    })
  })

  describe('useFetchPaymentMethods', () => {
    it('should fetch payment methods', async () => {
      const mockFetch = fetch as any
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response)

      const { result } = renderHook(() => useFetchPaymentMethods(), {
        wrapper: createWrapper()
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(mockResponse.metadata.paymentMethods)
    })
  })

  describe('useFetchCards', () => {
    it('should fetch cards', async () => {
      const mockFetch = fetch as any
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response)

      const { result } = renderHook(() => useFetchCards(), {
        wrapper: createWrapper()
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(mockResponse.metadata.cards)
    })
  })
})