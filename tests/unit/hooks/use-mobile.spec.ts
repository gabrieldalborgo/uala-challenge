import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock matchMedia
const mockMatchMedia = vi.fn();

// Mock window.innerWidth
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

// Mock addEventListener and removeEventListener
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

describe('useIsMobile', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Reset window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: mockMatchMedia,
    });

    // Mock addEventListener and removeEventListener
    Object.defineProperty(window, 'addEventListener', {
      writable: true,
      configurable: true,
      value: mockAddEventListener,
    });

    Object.defineProperty(window, 'removeEventListener', {
      writable: true,
      configurable: true,
      value: mockRemoveEventListener,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return false for desktop width', () => {
    // Set desktop width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const mockMediaQueryList = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    };

    mockMatchMedia.mockReturnValue(mockMediaQueryList);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)');
  });

  it('should return true for mobile width', () => {
    // Set mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    const mockMediaQueryList = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    };

    mockMatchMedia.mockReturnValue(mockMediaQueryList);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)');
  });

  it('should return true for tablet width (edge case)', () => {
    // Set tablet width (767px - edge case)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767,
    });

    const mockMediaQueryList = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    };

    mockMatchMedia.mockReturnValue(mockMediaQueryList);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it('should return false for desktop width (edge case)', () => {
    // Set desktop width (768px - edge case)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    const mockMediaQueryList = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    };

    mockMatchMedia.mockReturnValue(mockMediaQueryList);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('should add and remove event listeners', () => {
    const mockMediaQueryList = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    };

    mockMatchMedia.mockReturnValue(mockMediaQueryList);

    const { unmount } = renderHook(() => useIsMobile());

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );

    // Test cleanup
    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('should handle window resize events', () => {
    const mockMediaQueryList = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    };

    mockMatchMedia.mockReturnValue(mockMediaQueryList);

    // Start with desktop width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    // Get the change handler that was registered
    const changeHandler = mockAddEventListener.mock.calls[0][1];

    // Simulate resize to mobile and call the change handler
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      changeHandler();
    });

    // The hook should now return true for mobile
    expect(result.current).toBe(true);
  });
});
