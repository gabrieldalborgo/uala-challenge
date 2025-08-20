import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTransactions } from '@/features/transactions/hooks/use-transactions'

// Mock the API hooks
vi.mock('@/api', () => ({
  useFetchTransactions: vi.fn(),
  useFetchPaymentMethods: vi.fn(),
  useFetchCards: vi.fn()
}))

// Import the mocked functions
import { useFetchTransactions, useFetchPaymentMethods, useFetchCards } from '@/api'

// Test data
const mockTransactions = [
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
    amount: -2500.75,
    card: 'mastercard',
    installments: 3,
    createdAt: '2024-01-14T15:45:00Z',
    updatedAt: '2024-01-14T15:45:00Z',
    paymentMethod: 'qr'
  }
]

const mockPaymentMethods = [
  { value: 'link', label: 'Link de pago' },
  { value: 'qr', label: 'Código QR' }
]

const mockCards = [
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' }
]

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

describe('useTransactions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return loading state when data is loading', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>
    const mockUseFetchPaymentMethods = useFetchPaymentMethods as vi.MockedFunction<typeof useFetchPaymentMethods>
    const mockUseFetchCards = useFetchCards as vi.MockedFunction<typeof useFetchCards>

    mockUseFetchTransactions.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null
    } as any)

    mockUseFetchPaymentMethods.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null
    } as any)

    mockUseFetchCards.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useTransactions({ filters: {} }), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('loading')
    expect(result.current.transactions).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('should return error state when API fails', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>
    const mockUseFetchPaymentMethods = useFetchPaymentMethods as vi.MockedFunction<typeof useFetchPaymentMethods>
    const mockUseFetchCards = useFetchCards as vi.MockedFunction<typeof useFetchCards>

    mockUseFetchTransactions.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('API Error')
    } as any)

    mockUseFetchPaymentMethods.mockReturnValue({
      data: mockPaymentMethods,
      isLoading: false,
      error: null
    } as any)

    mockUseFetchCards.mockReturnValue({
      data: mockCards,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useTransactions({ filters: {} }), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('error')
    expect(result.current.transactions).toEqual([])
    expect(result.current.error).toBe('API Error')
  })

  it('should return empty state when no transactions', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>
    const mockUseFetchPaymentMethods = useFetchPaymentMethods as vi.MockedFunction<typeof useFetchPaymentMethods>
    const mockUseFetchCards = useFetchCards as vi.MockedFunction<typeof useFetchCards>

    mockUseFetchTransactions.mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    } as any)

    mockUseFetchPaymentMethods.mockReturnValue({
      data: mockPaymentMethods,
      isLoading: false,
      error: null
    } as any)

    mockUseFetchCards.mockReturnValue({
      data: mockCards,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useTransactions({ filters: {} }), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('empty')
    expect(result.current.transactions).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('should return success state with formatted transactions', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>
    const mockUseFetchPaymentMethods = useFetchPaymentMethods as vi.MockedFunction<typeof useFetchPaymentMethods>
    const mockUseFetchCards = useFetchCards as vi.MockedFunction<typeof useFetchCards>

    mockUseFetchTransactions.mockReturnValue({
      data: mockTransactions,
      isLoading: false,
      error: null
    } as any)

    mockUseFetchPaymentMethods.mockReturnValue({
      data: mockPaymentMethods,
      isLoading: false,
      error: null
    } as any)

    mockUseFetchCards.mockReturnValue({
      data: mockCards,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useTransactions({ filters: {} }), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('success')
    expect(result.current.transactions).toHaveLength(2)
    expect(result.current.error).toBeNull()

    // Check first transaction formatting
    const firstTransaction = result.current.transactions[0]
    expect(firstTransaction.id).toBe('1')
    expect(firstTransaction.amount).toBe('+$1.500,50')
    expect(firstTransaction.method).toBe('Link de pago')
    expect(firstTransaction.type).toBe('Visa')

    // Check second transaction formatting (negative amount)
    const secondTransaction = result.current.transactions[1]
    expect(secondTransaction.id).toBe('2')
    expect(secondTransaction.amount).toBe('-$2.500,75')
    expect(secondTransaction.method).toBe('Código QR')
    expect(secondTransaction.type).toBe('Mastercard')
  })

  it('should handle unknown payment methods and card types', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>
    const mockUseFetchPaymentMethods = useFetchPaymentMethods as vi.MockedFunction<typeof useFetchPaymentMethods>
    const mockUseFetchCards = useFetchCards as vi.MockedFunction<typeof useFetchCards>

    const transactionWithUnknownTypes = [{
      id: '1',
      amount: 1000,
      card: 'unknown_card',
      installments: 1,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      paymentMethod: 'unknown_method'
    }]

    mockUseFetchTransactions.mockReturnValue({
      data: transactionWithUnknownTypes,
      isLoading: false,
      error: null
    } as any)

    mockUseFetchPaymentMethods.mockReturnValue({
      data: mockPaymentMethods,
      isLoading: false,
      error: null
    } as any)

    mockUseFetchCards.mockReturnValue({
      data: mockCards,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useTransactions({ filters: {} }), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('success')
    expect(result.current.transactions[0].method).toBe('unknown')
    expect(result.current.transactions[0].type).toBe('unknown')
  })

  it('should enhance filters with maxDate when not provided', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>
    const mockUseFetchPaymentMethods = useFetchPaymentMethods as vi.MockedFunction<typeof useFetchPaymentMethods>
    const mockUseFetchCards = useFetchCards as vi.MockedFunction<typeof useFetchCards>

    mockUseFetchTransactions.mockReturnValue({
      data: mockTransactions,
      isLoading: false,
      error: null
    } as any)

    mockUseFetchPaymentMethods.mockReturnValue({
      data: mockPaymentMethods,
      isLoading: false,
      error: null
    } as any)

    mockUseFetchCards.mockReturnValue({
      data: mockCards,
      isLoading: false,
      error: null
    } as any)

    renderHook(() => useTransactions({ filters: {} }), {
      wrapper: createWrapper()
    })

    // Check that useFetchTransactions was called with enhanced filters
    expect(mockUseFetchTransactions).toHaveBeenCalledWith(
      expect.objectContaining({
        maxDate: expect.any(String) // Should have a maxDate added
      })
    )
  })

  it('should preserve existing maxDate when provided', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>
    const mockUseFetchPaymentMethods = useFetchPaymentMethods as vi.MockedFunction<typeof useFetchPaymentMethods>
    const mockUseFetchCards = useFetchCards as vi.MockedFunction<typeof useFetchCards>

    mockUseFetchTransactions.mockReturnValue({
      data: mockTransactions,
      isLoading: false,
      error: null
    } as any)

    mockUseFetchPaymentMethods.mockReturnValue({
      data: mockPaymentMethods,
      isLoading: false,
      error: null
    } as any)

    mockUseFetchCards.mockReturnValue({
      data: mockCards,
      isLoading: false,
      error: null
    } as any)

    const customMaxDate = '2024-12-31T23:59:59Z'
    renderHook(() => useTransactions({ filters: { maxDate: customMaxDate } }), {
      wrapper: createWrapper()
    })

    // Check that useFetchTransactions was called with the custom maxDate
    expect(mockUseFetchTransactions).toHaveBeenCalledWith(
      expect.objectContaining({
        maxDate: customMaxDate
      })
    )
  })
})
