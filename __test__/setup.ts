import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeAll, vi } from 'vitest';
import { useOrdersStore } from '@/store/orders/orders.store';

beforeAll(() => {
  Object.defineProperty(window, 'scrollTo', {
    value: vi.fn(),
    writable: true,
  });
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  useOrdersStore.setState({
    error: null,
    hasHydrated: false,
    isLoading: false,
    isSubmitting: false,
    orders: [],
  });
  vi.restoreAllMocks();
});
