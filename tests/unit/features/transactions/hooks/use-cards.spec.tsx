import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCards } from '@/features/transactions/hooks/use-cards'

// Mock the API hooks
vi.mock('@/api', () => ({
  useFetchCards: vi.fn()
}))

// Import the mocked functions
import { useFetchCards } from '@/api'

// Test data
const mockCards = [
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' },
  { value: 'amex', label: 'American Express' }
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

describe('useCards', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return loading state when data is loading', () => {
    const mockUseFetchCards = useFetchCards as vi.MockedFunction<typeof useFetchCards>

    mockUseFetchCards.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null
    } as any)

    const { result } = renderHook(() => useCards(), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('loading')
    expect(result.current.cards).toBeUndefined()
  })

  it('should return error state when API fails', () => {
    const mockUseFetchCards = useFetchCards as vi.MockedFunction<typeof useFetchCards>

    mockUseFetchCards.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('API Error')
    } as any)

    const { result } = renderHook(() => useCards(), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('error')
    expect(result.current.cards).toBeUndefined()
  })

  it('should return empty state when no cards', () => {
    const mockUseFetchCards = useFetchCards as vi.MockedFunction<typeof useFetchCards>

    mockUseFetchCards.mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useCards(), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('empty')
    expect(result.current.cards).toBeUndefined()
  })

  it('should return empty state when data is null', () => {
    const mockUseFetchCards = useFetchCards as vi.MockedFunction<typeof useFetchCards>

    mockUseFetchCards.mockReturnValue({
      data: null,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useCards(), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('empty')
    expect(result.current.cards).toBeUndefined()
  })

  it('should return success state with cards data', () => {
    const mockUseFetchCards = useFetchCards as vi.MockedFunction<typeof useFetchCards>

    mockUseFetchCards.mockReturnValue({
      data: mockCards,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useCards(), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('success')
    expect(result.current.cards).toEqual(mockCards)
    expect(result.current.cards).toHaveLength(3)
  })

  it('should return success state with single card', () => {
    const mockUseFetchCards = useFetchCards as vi.MockedFunction<typeof useFetchCards>

    mockUseFetchCards.mockReturnValue({
      data: [mockCards[0]],
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => useCards(), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('success')
    expect(result.current.cards).toEqual([mockCards[0]])
    expect(result.current.cards).toHaveLength(1)
  })
})
