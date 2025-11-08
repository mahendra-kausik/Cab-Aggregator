/**
 * Unit Tests - LoadingSpinner Component
 * Tests loading spinner component rendering and props
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

describe('LoadingSpinner - Unit Tests', () => {
    it('should render with default props', () => {
        render(<LoadingSpinner />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
        expect(document.querySelector('.spinner')).toBeInTheDocument();
    });

    it('should render with custom message', () => {
        render(<LoadingSpinner message="Please wait..." />);

        expect(screen.getByText('Please wait...')).toBeInTheDocument();
    });

    it('should render without message when message is empty', () => {
        render(<LoadingSpinner message="" />);

        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('should apply correct size class', () => {
        const { container, rerender } = render(<LoadingSpinner size="small" />);

        expect(container.querySelector('.loading-spinner.small')).toBeInTheDocument();

        rerender(<LoadingSpinner size="large" />);
        expect(container.querySelector('.loading-spinner.large')).toBeInTheDocument();
    });

    it('should render spinner element', () => {
        const { container } = render(<LoadingSpinner />);

        expect(container.querySelector('.spinner')).toBeInTheDocument();
    });
});
