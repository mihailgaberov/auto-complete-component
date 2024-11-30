import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import useAutocomplete from "./useAutocomplete";
import * as useFetchHook from "./useFetch";

// Mock the useFetch hook
vi.mock("./useFetch", () => ({
  default: vi.fn(),
}));

describe("useAutocomplete Hook", () => {
  const mockCountries = [
    { name: "Afghanistan", flag: "🇦🇫" },
    { name: "Albania", flag: "🇦🇱" },
    { name: "Algeria", flag: "🇩🇿" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useFetchHook.default).mockReturnValue({
      data: mockCountries,
      loading: false,
      error: null,
      fetchData: vi.fn(),
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useAutocomplete());

    expect(result.current.filteredData).toEqual([]);
    expect(result.current.message).toBe("");
    expect(result.current.selectedCountry).toBeNull();
    expect(result.current.inputValue).toBe("");
    expect(result.current.isFiltering).toBe(false);
    expect(result.current.selectedIndex).toBe(-1);
    expect(result.current.showSuggestions).toBe(true);
  });

  it("should handle input change and filter data", async () => {
    const { result } = renderHook(() => useAutocomplete());

    await act(async () => {
      await result.current.handleInputChange("al");
    });

    expect(result.current.filteredData).toEqual([
      { name: "Albania", flag: "🇦🇱" },
      { name: "Algeria", flag: "🇩🇿" },
    ]);
    expect(result.current.message).toBe("");
    expect(result.current.isFiltering).toBe(false);
  });

  it("should handle no matches", async () => {
    const { result } = renderHook(() => useAutocomplete());

    await act(async () => {
      await result.current.handleInputChange("xyz");
    });

    expect(result.current.filteredData).toEqual([]);
    expect(result.current.message).toBe("No countries found.");
    expect(result.current.isFiltering).toBe(false);
  });

  it("should handle suggestion click", () => {
    const { result } = renderHook(() => useAutocomplete());

    act(() => {
      result.current.handleSuggestionClick("Albania");
    });

    expect(result.current.selectedCountry).toBe("Albania");
    expect(result.current.filteredData).toEqual([]);
    expect(result.current.inputValue).toBe("");
    expect(result.current.showSuggestions).toBe(false);
  });

  it("should handle keyboard navigation", async () => {
    const { result } = renderHook(() => useAutocomplete());

    // First filter some data
    await act(async () => {
      await result.current.handleInputChange("al");
    });

    // Test arrow down
    act(() => {
      result.current.handleKeyDown({
        key: "ArrowDown",
        preventDefault: vi.fn(),
      } as any);
    });

    expect(result.current.selectedIndex).toBe(0);

    // One more time arrow down
    act(() => {
      result.current.handleKeyDown({
        key: "ArrowDown",
        preventDefault: vi.fn(),
      } as any);
    });

    expect(result.current.selectedIndex).toBe(1);

    // Test arrow up
    act(() => {
      result.current.handleKeyDown({
        key: "ArrowUp",
        preventDefault: vi.fn(),
      } as any);
    });

    expect(result.current.selectedIndex).toBe(0);

    // Test ENTER key with valid selection
    act(() => {
      // First select an item
      result.current.handleKeyDown({
        key: "ArrowDown",
        preventDefault: vi.fn(),
      } as any);
    });

    act(() => {
      result.current.handleKeyDown({
        key: "Enter",
        preventDefault: vi.fn(),
      } as any);
    });

    expect(result.current.selectedCountry).toBe("Algeria");
  });

  it("should handle tab navigation", async () => {
    const { result } = renderHook(() => useAutocomplete());

    await act(async () => {
      await result.current.handleInputChange("al");
    });

    // Test tab forward
    act(() => {
      result.current.handleKeyDown({
        key: "Tab",
        preventDefault: vi.fn(),
        shiftKey: false,
      } as any);
    });
    expect(result.current.selectedIndex).toBe(0);

    // Test tab forward again
    act(() => {
      result.current.handleKeyDown({
        key: "Tab",
        preventDefault: vi.fn(),
        shiftKey: false,
      } as any);
    });
    expect(result.current.selectedIndex).toBe(1);

    // Test tab backward
    act(() => {
      result.current.handleKeyDown({
        key: "Tab",
        preventDefault: vi.fn(),
        shiftKey: true,
      } as any);
    });
    expect(result.current.selectedIndex).toBe(0);
  });

  it("should clear input and reset state when input is empty", async () => {
    const { result } = renderHook(() => useAutocomplete());

    await act(async () => {
      await result.current.handleInputChange("");
    });

    expect(result.current.filteredData).toEqual([]);
    expect(result.current.message).toBe("");
    expect(result.current.isFiltering).toBe(false);
  });
});
