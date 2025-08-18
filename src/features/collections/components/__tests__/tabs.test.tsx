import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Tabs } from '../tabs'

describe('Tabs', () => {
  it('renders all three tabs with correct labels', () => {
    render(<Tabs />)
    
    expect(screen.getByText('Diario')).toBeInTheDocument()
    expect(screen.getByText('Semanal')).toBeInTheDocument()
    expect(screen.getByText('Mensual')).toBeInTheDocument()
  })

  it('applies correct typography styles to tab labels', () => {
    render(<Tabs />)
    
    const diarioTab = screen.getByText('Diario')
    const semanalTab = screen.getByText('Semanal')
    const mensualTab = screen.getByText('Mensual')
    
    // Check that all tabs have the base typography styles
    expect(diarioTab).toHaveClass('text-[#565656]')
    expect(semanalTab).toHaveClass('text-[#565656]')
    expect(mensualTab).toHaveClass('text-[#565656]')
  })

  it('applies correct font styles to tab labels', () => {
    render(<Tabs />)
    
    const diarioTab = screen.getByText('Diario')
    const computedStyle = window.getComputedStyle(diarioTab)
    
    expect(computedStyle.fontFamily).toContain('Public Sans')
    expect(computedStyle.fontSize).toBe('14px')
    expect(computedStyle.lineHeight).toBe('18px')
    expect(computedStyle.textAlign).toBe('center')
  })

  it('shows selected tab with bold font weight', () => {
    render(<Tabs />)
    
    const semanalTab = screen.getByText('Semanal')
    const computedStyle = window.getComputedStyle(semanalTab)
    
    // The selected tab should have font-weight: 600
    expect(computedStyle.fontWeight).toBe('600')
  })

  it('shows non-selected tabs with normal font weight', () => {
    render(<Tabs />)
    
    const diarioTab = screen.getByText('Diario')
    const mensualTab = screen.getByText('Mensual')
    
    const diarioStyle = window.getComputedStyle(diarioTab)
    const mensualStyle = window.getComputedStyle(mensualTab)
    
    // Non-selected tabs should have font-weight: 400
    expect(diarioStyle.fontWeight).toBe('400')
    expect(mensualStyle.fontWeight).toBe('400')
  })

  it('displays dot indicator for selected tab', () => {
    render(<Tabs />)
    
    // The selected tab (Semanal) should have a dot
    const dot = document.querySelector('.w-2.h-2.rounded-full.bg-\\[\\#022A9A\\]')
    
    expect(dot).toBeInTheDocument()
  })

  it('does not display dot indicator for non-selected tabs', () => {
    render(<Tabs />)
    
    // There should be exactly one dot (for the selected tab)
    const dots = document.querySelectorAll('.w-2.h-2.rounded-full.bg-\\[\\#022A9A\\]')
    expect(dots.length).toBe(1)
  })

  it('has correct dot styling for selected tab', () => {
    render(<Tabs />)
    
    const dot = document.querySelector('.w-2.h-2.rounded-full.bg-\\[\\#022A9A\\]')
    
    expect(dot).toHaveClass('w-2', 'h-2', 'rounded-full', 'bg-[#022A9A]', 'mt-3')
  })

  it('maintains correct tab container height', () => {
    render(<Tabs />)
    
    const tabContainers = document.querySelectorAll('.h-12')
    expect(tabContainers.length).toBe(3) // One for each tab
    
    tabContainers.forEach(container => {
      expect(container).toHaveClass('h-12')
    })
  })

  it('centers text vertically within tab containers', () => {
    render(<Tabs />)
    
    const tabContainers = document.querySelectorAll('.h-12.flex.items-center')
    expect(tabContainers.length).toBe(3)
  })

  it('uses flex column layout for tab content', () => {
    render(<Tabs />)
    
    const flexColumns = document.querySelectorAll('.flex.flex-col.items-center')
    expect(flexColumns.length).toBe(3) // One for each tab
  })

  describe('Accessibility', () => {
    it('has proper text content for screen readers', () => {
      render(<Tabs />)
      
      expect(screen.getByText('Diario')).toBeInTheDocument()
      expect(screen.getByText('Semanal')).toBeInTheDocument()
      expect(screen.getByText('Mensual')).toBeInTheDocument()
    })

    it('maintains semantic structure', () => {
      render(<Tabs />)
      
      const tabElements = document.querySelectorAll('div[class*="h-12"]')
      expect(tabElements.length).toBe(3)
    })
  })
})
