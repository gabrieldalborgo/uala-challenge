import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CollectionsSummary } from '../collections-summary'

// Mock the Skeleton component
vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div data-testid="skeleton" className={className}>Skeleton</div>
  )
}))

// Mock the Tabs component
vi.mock('../components/tabs', () => ({
  Tabs: () => <div data-testid="tabs">Tabs Component</div>
}))

// Mock the pie icon
vi.mock('../../assets/pie-icon.svg', () => 'pie-icon.svg')

describe('CollectionsSummary', () => {
  it('renders the main title with correct styling', () => {
    render(<CollectionsSummary />)
    
    const title = screen.getByText('Tus cobros')
    expect(title).toBeInTheDocument()
    
    const computedStyle = window.getComputedStyle(title)
    expect(computedStyle.fontFamily).toContain('Public Sans')
    expect(computedStyle.fontWeight).toBe('600')
    expect(computedStyle.fontSize).toBe('22px')
    expect(computedStyle.lineHeight).toBe('120%')
  })

  it('applies correct text color class to title', () => {
    render(<CollectionsSummary />)
    
    const title = screen.getByText('Tus cobros')
    expect(title).toHaveClass('text-[#313643]')
  })

  it('renders the skeleton component with correct styling', () => {
    render(<CollectionsSummary />)
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass('w-52', 'h-10', 'rounded-2xl', 'bg-[#dee2ec]')
  })

  it('renders the tabs component', () => {
    render(<CollectionsSummary />)
    
    const tabs = screen.getByTestId('tabs')
    expect(tabs).toBeInTheDocument()
  })

  it('renders the metrics button with correct styling', () => {
    render(<CollectionsSummary />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('flex', 'items-center', 'gap-2')
  })

  it('displays the pie icon in the metrics button', () => {
    render(<CollectionsSummary />)
    
    const icon = screen.getByAltText('Filter')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('w-6', 'h-6')
    expect(icon).toHaveAttribute('src')
  })

  it('displays "Ver métricas" text with correct styling', () => {
    render(<CollectionsSummary />)
    
    const text = screen.getByText('Ver métricas')
    expect(text).toBeInTheDocument()
    
    const computedStyle = window.getComputedStyle(text)
    expect(computedStyle.fontFamily).toContain('Public Sans')
    expect(computedStyle.fontWeight).toBe('400')
    expect(computedStyle.fontSize).toBe('14px')
    expect(computedStyle.lineHeight).toBe('100%')
    expect(computedStyle.textAlign).toBe('right')
  })

  it('applies correct text color class to "Ver métricas"', () => {
    render(<CollectionsSummary />)
    
    const text = screen.getByText('Ver métricas')
    expect(text).toHaveClass('text-[#022A9A]')
  })

  it('has correct overall layout structure', () => {
    render(<CollectionsSummary />)
    
    const container = screen.getByText('Tus cobros').closest('.w-full')
    expect(container).toHaveClass('w-full', 'mt-10', 'flex', 'flex-col', 'gap-4')
  })

  it('centers content horizontally', () => {
    render(<CollectionsSummary />)
    
    const titleContainer = screen.getByText('Tus cobros').closest('.flex.justify-center')
    const skeletonContainer = screen.getByTestId('skeleton').closest('.flex.justify-center')
    const buttonContainer = screen.getByRole('button').closest('.flex.justify-center')
    
    expect(titleContainer).toBeInTheDocument()
    expect(skeletonContainer).toBeInTheDocument()
    expect(buttonContainer).toBeInTheDocument()
  })

  it('maintains correct spacing between elements', () => {
    render(<CollectionsSummary />)
    
    const mainContainer = screen.getByText('Tus cobros').closest('.gap-4')
    expect(mainContainer).toBeInTheDocument()
  })

  describe('Responsive Design', () => {
    it('uses flexbox for responsive layout', () => {
      render(<CollectionsSummary />)
      
      const flexContainers = document.querySelectorAll('.flex')
      expect(flexContainers.length).toBeGreaterThan(0)
    })

    it('maintains proper flex direction for stacking', () => {
      render(<CollectionsSummary />)
      
      const flexCol = document.querySelector('.flex.flex-col')
      expect(flexCol).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper alt text for images', () => {
      render(<CollectionsSummary />)
      
      const icon = screen.getByAltText('Filter')
      expect(icon).toBeInTheDocument()
    })

    it('has proper button semantics', () => {
      render(<CollectionsSummary />)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('has proper heading structure', () => {
      render(<CollectionsSummary />)
      
      const title = screen.getByText('Tus cobros')
      expect(title).toBeInTheDocument()
    })
  })
})
