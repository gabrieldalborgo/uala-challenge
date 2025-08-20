import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-2 py-1', 'bg-red-500', 'text-white');
    expect(result).toBe('px-2 py-1 bg-red-500 text-white');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const result = cn(
      'base-class',
      isActive && 'active-class',
      !isActive && 'inactive-class'
    );
    expect(result).toBe('base-class active-class');
  });

  it('should handle undefined and null values', () => {
    const result = cn('base-class', undefined, null, 'valid-class');
    expect(result).toBe('base-class valid-class');
  });

  it('should handle empty strings', () => {
    const result = cn('base-class', '', 'valid-class');
    expect(result).toBe('base-class valid-class');
  });

  it('should merge Tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4'); // px-4 should override px-2
    expect(result).toBe('py-1 px-4');
  });

  it('should handle complex conditional logic', () => {
    const isPrimary = true;
    const isLarge = false;
    const result = cn(
      'base-button',
      isPrimary ? 'bg-blue-500 text-white' : 'bg-gray-500 text-black',
      isLarge ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-sm'
    );
    expect(result).toBe('base-button bg-blue-500 text-white px-4 py-2 text-sm');
  });

  it('should handle arrays of classes', () => {
    const result = cn(['px-2', 'py-1'], 'bg-red-500', [
      'text-white',
      'font-bold',
    ]);
    expect(result).toBe('px-2 py-1 bg-red-500 text-white font-bold');
  });

  it('should handle objects with conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', {
      'active-class': isActive,
      'inactive-class': !isActive,
    });
    expect(result).toBe('base-class active-class');
  });

  it('should handle mixed input types', () => {
    const isVisible = true;
    const result = cn(
      'base-class',
      isVisible && 'visible-class',
      ['array-class-1', 'array-class-2'],
      { 'object-class': true, 'false-class': false },
      'string-class'
    );
    expect(result).toBe(
      'base-class visible-class array-class-1 array-class-2 object-class string-class'
    );
  });
});
