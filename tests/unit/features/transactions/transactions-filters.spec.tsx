import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TransactionsFilters, TransactionsFiltersSheet } from '@/features/transactions/transactions-filters'
import type { Filters } from '@/features/transactions/types'

// Mock the filter components
vi.mock('@/features/transactions/components/card-filter', () => ({
  CardFilter: ({ value, onChange }: { value?: string[], onChange: (value: string[]) => void }) => (
    <div data-testid="card-filter">
      <button onClick={() => onChange(['visa'])} data-testid="card-filter-button">
        Card Filter
      </button>
      <span data-testid="card-filter-value">{value?.join(',') || 'none'}</span>
    </div>
  )
}))

vi.mock('@/features/transactions/components/payment-method-filter', () => ({
  PaymentMethodFilter: ({ value, onChange }: { value?: string[], onChange: (value: string[]) => void }) => (
    <div data-testid="payment-method-filter">
      <button onClick={() => onChange(['qr'])} data-testid="payment-method-filter-button">
        Payment Method Filter
      </button>
      <span data-testid="payment-method-filter-value">{value?.join(',') || 'none'}</span>
    </div>
  )
}))

vi.mock('@/features/transactions/components/installment-filter', () => ({
  InstallmentFilter: ({ value, onChange }: { value?: string[], onChange: (value: string[]) => void }) => (
    <div data-testid="installment-filter">
      <button onClick={() => onChange(['1'])} data-testid="installment-filter-button">
        Installment Filter
      </button>
      <span data-testid="installment-filter-value">{value?.join(',') || 'none'}</span>
    </div>
  )
}))

vi.mock('@/features/transactions/components/date-filter', () => ({
  DateFilter: ({ minDate, maxDate }: { minDate?: string, maxDate?: string }) => (
    <div data-testid="date-filter">
      <span data-testid="date-filter-min">{minDate || 'none'}</span>
      <span data-testid="date-filter-max">{maxDate || 'none'}</span>
    </div>
  )
}))

vi.mock('@/features/transactions/components/amount-filter', () => ({
  AmountFilter: ({ minAmount, maxAmount, onChange }: { 
    minAmount?: number, 
    maxAmount?: number, 
    onChange: (min: number, max: number) => void 
  }) => (
    <div data-testid="amount-filter">
      <button onClick={() => onChange(100, 500)} data-testid="amount-filter-button">
        Amount Filter
      </button>
      <span data-testid="amount-filter-min">{minAmount || 'none'}</span>
      <span data-testid="amount-filter-max">{maxAmount || 'none'}</span>
    </div>
  )
}))

// Mock UI components
vi.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children, open }: { children: React.ReactNode, open: boolean }) => 
    open ? <div data-testid="sheet">{children}</div> : null,
  SheetContent: ({ children }: { children: React.ReactNode }) => 
    <div data-testid="sheet-content">{children}</div>
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, disabled, className, ...props }: any) => (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={className}
      data-testid={props['data-testid'] || 'button'}
      {...props}
    >
      {children}
    </button>
  )
}))

describe('TransactionsFilters', () => {
  const mockOnClose = vi.fn()
  const mockOnApply = vi.fn()

  const defaultProps = {
    filters: {} as Filters,
    onClose: mockOnClose,
    onApply: mockOnApply
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render all filter components', () => {
    render(<TransactionsFilters {...defaultProps} />)

    expect(screen.getByTestId('card-filter')).toBeInTheDocument()
    expect(screen.getByTestId('payment-method-filter')).toBeInTheDocument()
    expect(screen.getByTestId('installment-filter')).toBeInTheDocument()
    expect(screen.getByTestId('date-filter')).toBeInTheDocument()
    expect(screen.getByTestId('amount-filter')).toBeInTheDocument()
  })

  it('should render header with title and back button', () => {
    render(<TransactionsFilters {...defaultProps} />)

    expect(screen.getByText('Filtros')).toBeInTheDocument()
    expect(screen.getByText('Todos los filtros')).toBeInTheDocument()
    expect(screen.getByAltText('Back')).toBeInTheDocument()
  })

  it('should call onClose when back button is clicked', () => {
    render(<TransactionsFilters {...defaultProps} />)

    const backButton = screen.getByAltText('Back').closest('button')
    fireEvent.click(backButton!)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should render clear filters button', () => {
    render(<TransactionsFilters {...defaultProps} />)

    expect(screen.getByText('Limpiar')).toBeInTheDocument()
  })

  it('should clear all filters when clear button is clicked', () => {
    const initialFilters: Filters = {
      card: ['visa'],
      paymentMethod: ['qr'],
      minAmount: 100
    }

    render(<TransactionsFilters {...defaultProps} filters={initialFilters} />)

    const clearButton = screen.getByText('Limpiar')
    fireEvent.click(clearButton)

    // Verify that filter values are cleared (they should show 'none')
    expect(screen.getByTestId('card-filter-value')).toHaveTextContent('none')
    expect(screen.getByTestId('payment-method-filter-value')).toHaveTextContent('none')
  })

  it('should update filter values when filter components change', () => {
    render(<TransactionsFilters {...defaultProps} />)

    // Change card filter
    const cardFilterButton = screen.getByTestId('card-filter-button')
    fireEvent.click(cardFilterButton)

    expect(screen.getByTestId('card-filter-value')).toHaveTextContent('visa')
  })

  it('should render apply button and handle apply filters when enabled', () => {
    render(<TransactionsFilters {...defaultProps} />)

    const applyButton = screen.getByText('Aplicar filtros')
    expect(applyButton).toBeInTheDocument()

    // First change a filter to enable the apply button
    const cardFilterButton = screen.getByTestId('card-filter-button')
    fireEvent.click(cardFilterButton)

    // Now the apply button should be enabled
    expect(applyButton).not.toBeDisabled()

    fireEvent.click(applyButton)

    expect(mockOnApply).toHaveBeenCalledTimes(1)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should disable apply button when filters have not changed', () => {
    const filters: Filters = { card: ['visa'] }
    render(<TransactionsFilters {...defaultProps} filters={filters} />)

    const applyButton = screen.getByText('Aplicar filtros')
    expect(applyButton).toBeDisabled()
  })

  it('should enable apply button when filters change', () => {
    render(<TransactionsFilters {...defaultProps} />)

    const applyButton = screen.getByText('Aplicar filtros')
    expect(applyButton).toBeDisabled() // Initially disabled

    // Change a filter
    const cardFilterButton = screen.getByTestId('card-filter-button')
    fireEvent.click(cardFilterButton)

    expect(applyButton).not.toBeDisabled()
  })

  it('should handle multiple filter changes correctly', () => {
    render(<TransactionsFilters {...defaultProps} />)

    // Change multiple filters
    fireEvent.click(screen.getByTestId('card-filter-button'))
    fireEvent.click(screen.getByTestId('payment-method-filter-button'))
    fireEvent.click(screen.getByTestId('amount-filter-button'))

    // Verify all filters are updated
    expect(screen.getByTestId('card-filter-value')).toHaveTextContent('visa')
    expect(screen.getByTestId('payment-method-filter-value')).toHaveTextContent('qr')
    expect(screen.getByTestId('amount-filter-min')).toHaveTextContent('100')
    expect(screen.getByTestId('amount-filter-max')).toHaveTextContent('500')
  })

  it('should update current filters when props change', async () => {
    const { rerender } = render(<TransactionsFilters {...defaultProps} />)

    // Initially no filters
    expect(screen.getByTestId('card-filter-value')).toHaveTextContent('none')

    // Update props with new filters
    const newFilters: Filters = { card: ['mastercard'] }
    rerender(<TransactionsFilters {...defaultProps} filters={newFilters} />)

    await waitFor(() => {
      expect(screen.getByTestId('card-filter-value')).toHaveTextContent('mastercard')
    })
  })

  it('should pass current filter values to filter components', () => {
    const filters: Filters = {
      card: ['visa', 'mastercard'],
      paymentMethod: ['qr'],
      minAmount: 50,
      maxAmount: 200,
      minDate: '2024-01-01',
      maxDate: '2024-12-31'
    }

    render(<TransactionsFilters {...defaultProps} filters={filters} />)

    expect(screen.getByTestId('card-filter-value')).toHaveTextContent('visa,mastercard')
    expect(screen.getByTestId('payment-method-filter-value')).toHaveTextContent('qr')
    expect(screen.getByTestId('amount-filter-min')).toHaveTextContent('50')
    expect(screen.getByTestId('amount-filter-max')).toHaveTextContent('200')
    expect(screen.getByTestId('date-filter-min')).toHaveTextContent('2024-01-01')
    expect(screen.getByTestId('date-filter-max')).toHaveTextContent('2024-12-31')
  })
})

describe('TransactionsFiltersSheet', () => {
  const mockOnClose = vi.fn()
  const mockOnApply = vi.fn()

  const defaultProps = {
    open: false,
    onClose: mockOnClose,
    onApply: mockOnApply,
    filters: {} as Filters
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should not render when closed', () => {
    render(<TransactionsFiltersSheet {...defaultProps} />)

    expect(screen.queryByTestId('sheet')).not.toBeInTheDocument()
  })

  it('should render when open', () => {
    render(<TransactionsFiltersSheet {...defaultProps} open={true} />)

    expect(screen.getByTestId('sheet')).toBeInTheDocument()
    expect(screen.getByTestId('sheet-content')).toBeInTheDocument()
    expect(screen.getByText('Filtros')).toBeInTheDocument()
  })

  it('should render TransactionsFilters component inside sheet', () => {
    render(<TransactionsFiltersSheet {...defaultProps} open={true} />)

    // Verify that the filter components are rendered inside the sheet
    expect(screen.getByTestId('card-filter')).toBeInTheDocument()
    expect(screen.getByTestId('payment-method-filter')).toBeInTheDocument()
    expect(screen.getByText('Aplicar filtros')).toBeInTheDocument()
  })

  it('should pass correct props to TransactionsFilters', () => {
    const filters: Filters = { card: ['visa'] }
    render(<TransactionsFiltersSheet {...defaultProps} open={true} filters={filters} />)

    // Verify that the filters are passed correctly
    expect(screen.getByTestId('card-filter-value')).toHaveTextContent('visa')
  })
})
