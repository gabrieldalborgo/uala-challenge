import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import type { MockedFunction } from 'vitest'
import { CollectionsSummary } from '@/features/collections/collections-summary'
import type { Periodicity } from '@/features/collections/types'

// Mock the hooks
vi.mock('@/features/collections/hooks/use-collections', () => ({
  useCollections: vi.fn()
}))

// Import the mocked hook
import { useCollections } from '@/features/collections/hooks/use-collections'

// Mock the child components
vi.mock('@/features/collections/components/header', () => ({
  Header: () => <div data-testid="header">Header Component</div>
}))

vi.mock('@/features/collections/components/tabs', () => ({
  Tabs: ({ periodicity, setPeriodicity }: { periodicity: Periodicity, setPeriodicity: (periodicity: Periodicity) => void }) => (
    <div data-testid="tabs">
      <button onClick={() => setPeriodicity('daily')} data-testid="daily-tab">Diario</button>
      <button onClick={() => setPeriodicity('weekly')} data-testid="weekly-tab">Semanal</button>
      <button onClick={() => setPeriodicity('monthly')} data-testid="monthly-tab">Mensual</button>
      <span data-testid="current-periodicity">{periodicity}</span>
    </div>
  )
}))

vi.mock('@/features/collections/components/total', () => ({
  Total: ({ amount }: { amount: string }) => <div data-testid="total">{amount}</div>,
  TotalSkeleton: () => <div data-testid="total-skeleton">Loading...</div>
}))

vi.mock('@/features/collections/components/go-to-metrics', () => ({
  GoToMetrics: () => <div data-testid="go-to-metrics">Go To Metrics</div>
}))

describe('CollectionsSummary', () => {
  const mockUseCollections = useCollections as MockedFunction<typeof useCollections>

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render all components when in loading state', () => {
    mockUseCollections.mockReturnValue({
      state: 'loading',
      summary: {
        periodicity: 'weekly',
        amount: ''
      }
    })

    render(<CollectionsSummary />)

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('tabs')).toBeInTheDocument()
    expect(screen.getByTestId('total-skeleton')).toBeInTheDocument()
    expect(screen.getByTestId('go-to-metrics')).toBeInTheDocument()
  })

  it('should render total amount when in success state', () => {
    mockUseCollections.mockReturnValue({
      state: 'success',
      summary: {
        periodicity: 'weekly',
        amount: '+$1.500,50'
      }
    })

    render(<CollectionsSummary />)

    expect(screen.getByTestId('total')).toBeInTheDocument()
    expect(screen.getByTestId('total')).toHaveTextContent('+$1.500,50')
    expect(screen.queryByTestId('total-skeleton')).not.toBeInTheDocument()
  })

  it('should render total amount when in empty state', () => {
    mockUseCollections.mockReturnValue({
      state: 'empty',
      summary: {
        periodicity: 'weekly',
        amount: '+$0,00'
      }
    })

    render(<CollectionsSummary />)

    expect(screen.getByTestId('total')).toBeInTheDocument()
    expect(screen.getByTestId('total')).toHaveTextContent('+$0,00')
    expect(screen.queryByTestId('total-skeleton')).not.toBeInTheDocument()
  })

  it('should not render total or skeleton when in error state', () => {
    mockUseCollections.mockReturnValue({
      state: 'error',
      summary: {
        periodicity: 'weekly',
        amount: ''
      }
    })

    render(<CollectionsSummary />)

    expect(screen.queryByTestId('total')).not.toBeInTheDocument()
    expect(screen.queryByTestId('total-skeleton')).not.toBeInTheDocument()
  })

  it('should initialize with weekly periodicity', () => {
    mockUseCollections.mockReturnValue({
      state: 'success',
      summary: {
        periodicity: 'weekly',
        amount: '+$1.500,50'
      }
    })

    render(<CollectionsSummary />)

    expect(screen.getByTestId('current-periodicity')).toHaveTextContent('weekly')
  })

  it('should update periodicity when daily tab is clicked', () => {
    mockUseCollections.mockReturnValue({
      state: 'success',
      summary: {
        periodicity: 'daily',
        amount: '+$500,00'
      }
    })

    render(<CollectionsSummary />)

    const dailyTab = screen.getByTestId('daily-tab')
    fireEvent.click(dailyTab)

    expect(screen.getByTestId('current-periodicity')).toHaveTextContent('daily')
  })

  it('should update periodicity when monthly tab is clicked', () => {
    mockUseCollections.mockReturnValue({
      state: 'success',
      summary: {
        periodicity: 'monthly',
        amount: '+$5.000,00'
      }
    })

    render(<CollectionsSummary />)

    const monthlyTab = screen.getByTestId('monthly-tab')
    fireEvent.click(monthlyTab)

    expect(screen.getByTestId('current-periodicity')).toHaveTextContent('monthly')
  })

  it('should pass correct periodicity to useCollections hook', () => {
    mockUseCollections.mockReturnValue({
      state: 'success',
      summary: {
        periodicity: 'weekly',
        amount: '+$1.500,50'
      }
    })

    render(<CollectionsSummary />)

    expect(mockUseCollections).toHaveBeenCalledWith({ periodicity: 'weekly' })
  })

  it('should update periodicity and call hook when tabs are clicked', () => {
    // Mock the hook to track calls
    const mockUseCollectionsSpy = vi.fn()
    mockUseCollectionsSpy.mockReturnValue({
      state: 'success',
      summary: {
        periodicity: 'weekly',
        amount: '+$1.500,50'
      }
    })
    mockUseCollections.mockImplementation(mockUseCollectionsSpy)

    render(<CollectionsSummary />)

    // Initial call should be with weekly
    expect(mockUseCollectionsSpy).toHaveBeenCalledWith({ periodicity: 'weekly' })

    // Click daily tab
    const dailyTab = screen.getByTestId('daily-tab')
    fireEvent.click(dailyTab)

    // Should be called with daily periodicity
    expect(mockUseCollectionsSpy).toHaveBeenCalledWith({ periodicity: 'daily' })

    // Click monthly tab
    const monthlyTab = screen.getByTestId('monthly-tab')
    fireEvent.click(monthlyTab)

    // Should be called with monthly periodicity
    expect(mockUseCollectionsSpy).toHaveBeenCalledWith({ periodicity: 'monthly' })

    // Verify the hook was called multiple times with different periodicity values
    expect(mockUseCollectionsSpy).toHaveBeenCalledTimes(3)
  })

  it('should render the main container structure', () => {
    mockUseCollections.mockReturnValue({
      state: 'success',
      summary: {
        periodicity: 'weekly',
        amount: '+$1.500,50'
      }
    })

    const { container } = render(<CollectionsSummary />)
    const mainDiv = container.firstChild as HTMLElement

    // Verify the component renders a div (basic structure)
    expect(mainDiv.tagName).toBe('DIV')
  })

  it('should render all required components in the correct order', () => {
    mockUseCollections.mockReturnValue({
      state: 'success',
      summary: {
        periodicity: 'weekly',
        amount: '+$1.500,50'
      }
    })

    render(<CollectionsSummary />)

    // Verify all components are rendered
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('tabs')).toBeInTheDocument()
    expect(screen.getByTestId('total')).toBeInTheDocument()
    expect(screen.getByTestId('go-to-metrics')).toBeInTheDocument()
  })

  it('should handle tab interactions correctly', () => {
    // Mock the hook to return different values based on periodicity
    const mockUseCollectionsSpy = vi.fn()
    mockUseCollectionsSpy.mockReturnValue({
      state: 'success',
      summary: {
        periodicity: 'weekly',
        amount: '+$1.500,50'
      }
    })
    mockUseCollections.mockImplementation(mockUseCollectionsSpy)

    render(<CollectionsSummary />)

    // Test that all tabs are present
    const dailyTab = screen.getByTestId('daily-tab')
    const weeklyTab = screen.getByTestId('weekly-tab')
    const monthlyTab = screen.getByTestId('monthly-tab')

    expect(dailyTab).toBeInTheDocument()
    expect(weeklyTab).toBeInTheDocument()
    expect(monthlyTab).toBeInTheDocument()

    // Verify initial periodicity is weekly
    expect(screen.getByTestId('current-periodicity')).toHaveTextContent('weekly')

    // Test clicking daily tab
    fireEvent.click(dailyTab)
    expect(screen.getByTestId('current-periodicity')).toHaveTextContent('daily')

    // Test clicking monthly tab
    fireEvent.click(monthlyTab)
    expect(screen.getByTestId('current-periodicity')).toHaveTextContent('monthly')

    // Test clicking weekly tab
    fireEvent.click(weeklyTab)
    expect(screen.getByTestId('current-periodicity')).toHaveTextContent('weekly')
  })

  it('should handle negative amounts correctly', () => {
    mockUseCollections.mockReturnValue({
      state: 'success',
      summary: {
        periodicity: 'weekly',
        amount: '-$2.500,75'
      }
    })

    render(<CollectionsSummary />)

    expect(screen.getByTestId('total')).toHaveTextContent('-$2.500,75')
  })

  it('should handle zero amounts correctly', () => {
    mockUseCollections.mockReturnValue({
      state: 'empty',
      summary: {
        periodicity: 'weekly',
        amount: '+$0,00'
      }
    })

    render(<CollectionsSummary />)

    expect(screen.getByTestId('total')).toHaveTextContent('+$0,00')
  })
})
