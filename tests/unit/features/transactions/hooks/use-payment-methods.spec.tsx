import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePaymentMethods } from '@/features/transactions/hooks/use-payment-methods'

// Mock the API hooks
vi.mock('@/api', () => ({
  useFetchPaymentMethods: vi.fn()
}))

// Import the mocked functions
import { useFetchPaymentMethods } from '@/api'

// Test data
const mockPaymentMethods = [
  { value: 'link', label: 'Link de pago' },
  { value: 'qr', label: 'Código QR' },
  { value: 'transfer', label: 'Transferencia' }
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

describe('usePaymentMethods', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return loading state when data is loading', () => {
    const mockUseFetchPaymentMethods = useFetchPaymentMethods as vi.MockedFunction<typeof useFetchPaymentMethods>

    mockUseFetchPaymentMethods.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null
    } as any)

    const { result } = renderHook(() => usePaymentMethods(), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('loading')
    expect(result.current.paymentMethods).toBeUndefined()
  })

  it('should return error state when API fails', () => {
    const mockUseFetchPaymentMethods = useFetchPaymentMethods as vi.MockedFunction<typeof useFetchPaymentMethods>

    mockUseFetchPaymentMethods.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('API Error')
    } as any)

    const { result } = renderHook(() => usePaymentMethods(), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('error')
    expect(result.current.paymentMethods).toBeUndefined()
  })

  it('should return empty state when no payment methods', () => {
    const mockUseFetchPaymentMethods = useFetchPaymentMethods as vi.MockedFunction<typeof useFetchPaymentMethods>

    mockUseFetchPaymentMethods.mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => usePaymentMethods(), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('empty')
    expect(result.current.paymentMethods).toBeUndefined()
  })

  it('should return empty state when data is null', () => {
    const mockUseFetchPaymentMethods = useFetchPaymentMethods as vi.MockedFunction<typeof useFetchPaymentMethods>

    mockUseFetchPaymentMethods.mockReturnValue({
      data: null,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => usePaymentMethods(), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('empty')
    expect(result.current.paymentMethods).toBeUndefined()
  })

  it('should return success state with payment methods data', () => {
    const mockUseFetchPaymentMethods = useFetchPaymentMethods as vi.MockedFunction<typeof useFetchPaymentMethods>

    mockUseFetchPaymentMethods.mockReturnValue({
      data: mockPaymentMethods,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => usePaymentMethods(), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('success')
    expect(result.current.paymentMethods).toEqual(mockPaymentMethods)
    expect(result.current.paymentMethods).toHaveLength(3)
  })

  it('should return success state with single payment method', () => {
    const mockUseFetchPaymentMethods = useFetchPaymentMethods as vi.MockedFunction<typeof useFetchPaymentMethods>

    mockUseFetchPaymentMethods.mockReturnValue({
      data: [mockPaymentMethods[0]],
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => usePaymentMethods(), {
      wrapper: createWrapper()
    })

    expect(result.current.state).toBe('success')
    expect(result.current.paymentMethods).toEqual([mockPaymentMethods[0]])
    expect(result.current.paymentMethods).toHaveLength(1)
  })
})
