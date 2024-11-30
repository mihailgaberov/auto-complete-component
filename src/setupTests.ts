import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: readonly number[] = [];

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    // Constructor implementation not needed for mock
  }

  observe(target: Element): void {
    // Mock implementation
  }

  unobserve(target: Element): void {
    // Mock implementation
  }

  disconnect(): void {
    // Mock implementation
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

window.IntersectionObserver = MockIntersectionObserver;

beforeEach(() => {
  vi.clearAllMocks();
});
