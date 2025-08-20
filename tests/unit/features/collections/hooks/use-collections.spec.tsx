import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCollections } from '@/features/collections/hooks/use-collections'

// Mock the API hooks
vi.mock('@/api', () => ({
  useFetchTransactions: vi.fn()
}))

// Import the mocked functions
import { useFetchTransactions } from '@/api'

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
  },
  {
    id: '3',
    amount: 3000.00,
    card: 'amex',
    installments: 1,
    createdAt: '2024-01-13T12:00:00Z',
    updatedAt: '2024-01-13T12:00:00Z',
    paymentMethod: 'transfer'
  }
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

describe('useCollections', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return loading state when data is loading', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>

    mockUseFetchTransactions.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null
    } as any)

    const { result } = renderHook(() => useCollections({ periodicity: 'daily' }), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('loading')
    expect(result.current.summary.periodicity).toBe('daily')
    expect(result.current.summary.amount).toBe('')
  })

  it('should return error state when API fails', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>

    mockUseFetchTransactions.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('API Error')
    } as any)

    const { result } = renderHook(() => useCollections({ periodicity: 'weekly' }), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('error')
    expect(result.current.summary.periodicity).toBe('weekly')
    expect(result.current.summary.amount).toBe('')
  })

  it('should return empty state when no transactions', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>

    mockUseFetchTransactions.mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useCollections({ periodicity: 'monthly' }), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('empty')
    expect(result.current.summary.periodicity).toBe('monthly')
    expect(result.current.summary.amount).toBe('+$0,00')
  })

  it('should return empty state when data is null', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>

    mockUseFetchTransactions.mockReturnValue({
      data: null,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useCollections({ periodicity: 'daily' }), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('empty')
    expect(result.current.summary.periodicity).toBe('daily')
    expect(result.current.summary.amount).toBe('+$0,00')
  })

  it('should return success state with positive total amount', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>

    const positiveTransactions = [
      { ...mockTransactions[0] },
      { ...mockTransactions[2] }
    ]

    mockUseFetchTransactions.mockReturnValue({
      data: positiveTransactions,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useCollections({ periodicity: 'weekly' }), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('success')
    expect(result.current.summary.periodicity).toBe('weekly')
    expect(result.current.summary.amount).toBe('+$4.500,50')
  })

  it('should return success state with negative total amount', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>

    const negativeTransactions = [
      { ...mockTransactions[1] },
      { ...mockTransactions[2] }
    ]

    mockUseFetchTransactions.mockReturnValue({
      data: negativeTransactions,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useCollections({ periodicity: 'monthly' }), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('success')
    expect(result.current.summary.periodicity).toBe('monthly')
    expect(result.current.summary.amount).toBe('+$499,25')
  })

  it('should return success state with zero total amount', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>

    const zeroSumTransactions = [
      { ...mockTransactions[0] },
      { ...mockTransactions[1] }
    ]

    mockUseFetchTransactions.mockReturnValue({
      data: zeroSumTransactions,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useCollections({ periodicity: 'daily' }), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('success')
    expect(result.current.summary.periodicity).toBe('daily')
    expect(result.current.summary.amount).toBe('-$1.000,25')
  })

  it('should call useFetchTransactions with correct date filters for daily periodicity', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>

    mockUseFetchTransactions.mockReturnValue({
      data: mockTransactions,
      isLoading: false,
      error: null
    } as any)

    renderHook(() => useCollections({ periodicity: 'daily' }), {
      wrapper: createWrapper()
    })

    expect(mockUseFetchTransactions).toHaveBeenCalledWith({
      minDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/),
      maxDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })
  })

  it('should call useFetchTransactions with correct date filters for weekly periodicity', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>

    mockUseFetchTransactions.mockReturnValue({
      data: mockTransactions,
      isLoading: false,
      error: null
    } as any)

    renderHook(() => useCollections({ periodicity: 'weekly' }), {
      wrapper: createWrapper()
    })

    expect(mockUseFetchTransactions).toHaveBeenCalledWith({
      minDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/),
      maxDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })
  })

  it('should call useFetchTransactions with correct date filters for monthly periodicity', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>

    mockUseFetchTransactions.mockReturnValue({
      data: mockTransactions,
      isLoading: false,
      error: null
    } as any)

    renderHook(() => useCollections({ periodicity: 'monthly' }), {
      wrapper: createWrapper()
    })

    expect(mockUseFetchTransactions).toHaveBeenCalledWith({
      minDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/),
      maxDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })
  })

  it('should format amounts correctly with Argentine locale', () => {
    const mockUseFetchTransactions = useFetchTransactions as vi.MockedFunction<typeof useFetchTransactions>

    const testTransactions = [
      {
        id: '1',
        amount: 1234.56,
        card: 'visa',
        installments: 1,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        paymentMethod: 'link'
      },
      {
        id: '2',
        amount: -567.89,
        card: 'mastercard',
        installments: 1,
        createdAt: '2024-01-14T15:45:00Z',
        updatedAt: '2024-01-14T15:45:00Z',
        paymentMethod: 'qr'
      }
    ]

    mockUseFetchTransactions.mockReturnValue({
      data: testTransactions,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useCollections({ periodicity: 'daily' }), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('success')
    expect(result.current.summary.amount).toBe('+$666,67')
  })
})
