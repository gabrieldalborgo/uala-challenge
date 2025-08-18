import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AppHeader } from '../app-header'
import { useIsMobile } from '@/hooks/use-mobile'

// Mock the useIsMobile hook
vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: vi.fn()
}))

// Mock the useSidebar hook
vi.mock('@/components/ui/sidebar', () => ({
  useSidebar: vi.fn(() => ({
    toggleSidebar: vi.fn()
  }))
}))

describe('AppHeader', () => {
  describe('Desktop Header', () => {
    beforeEach(() => {
      vi.mocked(useIsMobile).mockReturnValue(false)
    })

    it('renders desktop header with correct styling', () => {
      render(<AppHeader />)
      
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('h-20', 'w-full', 'bg-white', 'flex', 'items-center', 'px-6', 'sticky', 'top-0')
    })

    it('displays profile image with correct dimensions', () => {
      render(<AppHeader />)
      
      const profileImage = screen.getByAltText('Profile')
      expect(profileImage).toBeInTheDocument()
      expect(profileImage).toHaveClass('w-10', 'h-10')
    })

    it('displays name with correct typography', () => {
      render(<AppHeader />)
      
      const nameElement = screen.getByText('Name')
      expect(nameElement).toBeInTheDocument()
      expect(nameElement).toHaveClass("font-['Public_Sans']", 'font-semibold', 'text-base')
    })

    it('has correct layout structure', () => {
      render(<AppHeader />)
      
      const header = screen.getByRole('banner')
      const container = header.firstElementChild
      
      expect(container).toHaveClass('flex', 'items-center', 'gap-8')
    })
  })

  describe('Mobile Header', () => {
    beforeEach(() => {
      vi.mocked(useIsMobile).mockReturnValue(true)
    })

    it('renders mobile header with correct styling', () => {
      render(<AppHeader />)
      
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('h-14', 'w-full', 'bg-[#fafafa]', 'sticky', 'top-0')
    })

    it('displays menu button with correct styling', () => {
      render(<AppHeader />)
      
      const menuButton = screen.getByRole('button')
      expect(menuButton).toBeInTheDocument()
      expect(menuButton).toHaveClass('w-6', 'h-6', 'p-0', 'flex', 'items-center', 'cursor-pointer')
    })

    it('displays Uala logo with correct dimensions', () => {
      render(<AppHeader />)
      
      const logo = screen.getByAltText('Uala')
      expect(logo).toBeInTheDocument()
      expect(logo).toHaveClass('w-20', 'h-10')
    })

    it('has correct mobile layout structure', () => {
      render(<AppHeader />)
      
      const header = screen.getByRole('banner')
      const mainContainer = header.firstElementChild
      
      expect(mainContainer).toHaveClass('h-full', 'w-full', 'bg-background', 'flex', 'items-center', 'px-0', 'border-b', 'border-[#dee2ec]', 'rounded-bl-[32px]')
    })

    it('has balanced layout with empty div', () => {
      render(<AppHeader />)
      
      const header = screen.getByRole('banner')
      const containers = header.querySelectorAll('div')
      
      // Should have the main container and three sections (menu, logo, empty)
      expect(containers.length).toBeGreaterThan(3)
    })
  })

  describe('Responsive Behavior', () => {
    it('switches between desktop and mobile based on useIsMobile hook', () => {
      // Test desktop
      vi.mocked(useIsMobile).mockReturnValue(false)
      const { rerender } = render(<AppHeader />)
      expect(screen.getByAltText('Profile')).toBeInTheDocument()
      expect(screen.queryByAltText('Uala')).not.toBeInTheDocument()
      
      // Test mobile
      vi.mocked(useIsMobile).mockReturnValue(true)
      rerender(<AppHeader />)
      expect(screen.getByAltText('Uala')).toBeInTheDocument()
      expect(screen.queryByAltText('Profile')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper alt text for images', () => {
      // Test desktop
      vi.mocked(useIsMobile).mockReturnValue(false)
      const { rerender } = render(<AppHeader />)
      expect(screen.getByAltText('Profile')).toBeInTheDocument()
      
      // Test mobile
      vi.mocked(useIsMobile).mockReturnValue(true)
      rerender(<AppHeader />)
      expect(screen.getByAltText('Uala')).toBeInTheDocument()
      expect(screen.getByAltText('Menu')).toBeInTheDocument()
    })

    it('has proper button role for menu button', () => {
      vi.mocked(useIsMobile).mockReturnValue(true)
      
      render(<AppHeader />)
      const menuButton = screen.getByRole('button')
      expect(menuButton).toBeInTheDocument()
    })
  })
})
