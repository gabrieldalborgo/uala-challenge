import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { MockedFunction } from 'vitest'
import { TransactionsRecord } from '@/features/transactions/transactions-record'
import type { Filters } from '@/features/transactions/types'

// Mock the useTransactions hook
vi.mock('@/features/transactions/hooks/use-transactions', () => ({
  useTransactions: vi.fn()
}))

// Import the mocked hook
import { useTransactions } from '@/features/transactions/hooks/use-transactions'

// Mock the child components
vi.mock('@/features/transactions/components/header', () => ({
  Header: ({ title, onFilter, onExport }: { title: string, onFilter: () => void, onExport: () => void }) => (
    <div data-testid="header">
      <span data-testid="header-title">{title}</span>
      <button onClick={onFilter} data-testid="filter-button">Filter</button>
      <button onClick={onExport} data-testid="export-button">Export</button>
    </div>
  )
}))

vi.mock('@/features/transactions/components/list', () => ({
  List: ({ items }: { items: any[] }) => (
    <div data-testid="transactions-list">
      {items.map((item, index) => (
        <div key={index} data-testid={`transaction-item-${index}`}>
          {item.id}
        </div>
      ))}
    </div>
  ),
  ListSkeleton: ({ count }: { count: number }) => (
    <div data-testid="list-skeleton">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} data-testid={`skeleton-item-${index}`}>Loading...</div>
      ))}
    </div>
  )
}))

vi.mock('@/features/transactions/components/empty-state', () => ({
  EmptyState: () => <div data-testid="empty-state">No transactions found</div>
}))

vi.mock('@/features/transactions/components/error-state', () => ({
  ErrorState: () => <div data-testid="error-state">Error loading transactions</div>
}))

describe('TransactionsRecord', () => {
  const mockUseTransactions = useTransactions as MockedFunction<typeof useTransactions>
  const mockOnFilter = vi.fn()
  const mockOnExport = vi.fn()

  const defaultProps = {
    filters: {} as Filters,
    onFilter: mockOnFilter,
    onExport: mockOnExport
  }

  const mockTransactions = [
    { id: '1', amount: 100, card: 'visa' },
    { id: '2', amount: 200, card: 'mastercard' },
    { id: '3', amount: 300, card: 'amex' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render header with correct title and callbacks', () => {
    mockUseTransactions.mockReturnValue({
      transactions: [],
      state: 'empty'
    } as any)

    render(<TransactionsRecord {...defaultProps} />)

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('header-title')).toHaveTextContent('Historial de transacciones')
    expect(screen.getByTestId('filter-button')).toBeInTheDocument()
    expect(screen.getByTestId('export-button')).toBeInTheDocument()
  })

  it('should call onFilter when filter button is clicked', () => {
    mockUseTransactions.mockReturnValue({
      transactions: [],
      state: 'empty'
    } as any)

    render(<TransactionsRecord {...defaultProps} />)

    const filterButton = screen.getByTestId('filter-button')
    filterButton.click()

    expect(mockOnFilter).toHaveBeenCalledTimes(1)
  })

  it('should call onExport when export button is clicked', () => {
    mockUseTransactions.mockReturnValue({
      transactions: [],
      state: 'empty'
    } as any)

    render(<TransactionsRecord {...defaultProps} />)

    const exportButton = screen.getByTestId('export-button')
    exportButton.click()

    expect(mockOnExport).toHaveBeenCalledTimes(1)
  })

  it('should render loading skeleton when state is loading', () => {
    mockUseTransactions.mockReturnValue({
      transactions: [],
      state: 'loading'
    } as any)

    render(<TransactionsRecord {...defaultProps} />)

    expect(screen.getByTestId('list-skeleton')).toBeInTheDocument()
    expect(screen.getAllByTestId(/skeleton-item-/)).toHaveLength(10)
    
    // Verify other states are not rendered
    expect(screen.queryByTestId('transactions-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error-state')).not.toBeInTheDocument()
  })

  it('should render error state when state is error', () => {
    mockUseTransactions.mockReturnValue({
      transactions: [],
      state: 'error'
    } as any)

    render(<TransactionsRecord {...defaultProps} />)

    expect(screen.getByTestId('error-state')).toBeInTheDocument()
    expect(screen.getByText('Error loading transactions')).toBeInTheDocument()
    
    // Verify other states are not rendered
    expect(screen.queryByTestId('list-skeleton')).not.toBeInTheDocument()
    expect(screen.queryByTestId('transactions-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument()
  })

  it('should render empty state when state is empty', () => {
    mockUseTransactions.mockReturnValue({
      transactions: [],
      state: 'empty'
    } as any)

    render(<TransactionsRecord {...defaultProps} />)

    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.getByText('No transactions found')).toBeInTheDocument()
    
    // Verify other states are not rendered
    expect(screen.queryByTestId('list-skeleton')).not.toBeInTheDocument()
    expect(screen.queryByTestId('transactions-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error-state')).not.toBeInTheDocument()
  })

  it('should render transactions list when state is success', () => {
    mockUseTransactions.mockReturnValue({
      transactions: mockTransactions,
      state: 'success'
    } as any)

    render(<TransactionsRecord {...defaultProps} />)

    expect(screen.getByTestId('transactions-list')).toBeInTheDocument()
    expect(screen.getByTestId('transaction-item-0')).toHaveTextContent('1')
    expect(screen.getByTestId('transaction-item-1')).toHaveTextContent('2')
    expect(screen.getByTestId('transaction-item-2')).toHaveTextContent('3')
    
    // Verify other states are not rendered
    expect(screen.queryByTestId('list-skeleton')).not.toBeInTheDocument()
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error-state')).not.toBeInTheDocument()
  })

  it('should pass filters to useTransactions hook', () => {
    const filters: Filters = {
      card: ['visa'],
      minAmount: 100,
      maxAmount: 500
    }

    mockUseTransactions.mockReturnValue({
      transactions: [],
      state: 'empty'
    } as any)

    render(<TransactionsRecord {...defaultProps} filters={filters} />)

    expect(mockUseTransactions).toHaveBeenCalledWith({ filters })
  })

  it('should handle empty transactions array in success state', () => {
    mockUseTransactions.mockReturnValue({
      transactions: [],
      state: 'success'
    } as any)

    render(<TransactionsRecord {...defaultProps} />)

    const transactionsList = screen.getByTestId('transactions-list')
    expect(transactionsList).toBeInTheDocument()
    expect(transactionsList.children).toHaveLength(0)
  })

  it('should handle single transaction in success state', () => {
    const singleTransaction = [mockTransactions[0]]
    
    mockUseTransactions.mockReturnValue({
      transactions: singleTransaction,
      state: 'success'
    } as any)

    render(<TransactionsRecord {...defaultProps} />)

    expect(screen.getByTestId('transactions-list')).toBeInTheDocument()
    expect(screen.getByTestId('transaction-item-0')).toHaveTextContent('1')
    expect(screen.queryByTestId('transaction-item-1')).not.toBeInTheDocument()
  })

  it('should render with correct CSS classes', () => {
    mockUseTransactions.mockReturnValue({
      transactions: [],
      state: 'empty'
    } as any)

    const { container } = render(<TransactionsRecord {...defaultProps} />)
    const mainDiv = container.firstChild as HTMLElement

    expect(mainDiv.tagName).toBe('DIV')
    expect(mainDiv).toHaveClass('pr-2', 'pl-2')
  })

  it('should re-render when filters change', () => {
    const { rerender } = render(<TransactionsRecord {...defaultProps} />)

    expect(mockUseTransactions).toHaveBeenCalledWith({ filters: {} })

    const newFilters: Filters = { card: ['visa'] }
    rerender(<TransactionsRecord {...defaultProps} filters={newFilters} />)

    expect(mockUseTransactions).toHaveBeenCalledWith({ filters: newFilters })
  })

  it('should re-render when state changes from loading to success', () => {
    // First render with loading state
    mockUseTransactions.mockReturnValue({
      transactions: [],
      state: 'loading'
    } as any)

    const { rerender } = render(<TransactionsRecord {...defaultProps} />)
    expect(screen.getByTestId('list-skeleton')).toBeInTheDocument()

    // Re-render with success state
    mockUseTransactions.mockReturnValue({
      transactions: mockTransactions,
      state: 'success'
    } as any)

    rerender(<TransactionsRecord {...defaultProps} />)
    expect(screen.getByTestId('transactions-list')).toBeInTheDocument()
    expect(screen.queryByTestId('list-skeleton')).not.toBeInTheDocument()
  })
})
