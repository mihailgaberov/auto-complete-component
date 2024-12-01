import { act, renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import useFetch from "./useFetch";
import * as countriesApi from "@/api/countriesApi";

// Mock the API module
vi.mock("../api/countriesApi", () => ({
  fetchCountries: vi.fn(),
}));

describe("useFetch Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with loading state", async () => {
    const { result } = renderHook(() => useFetch());

    await act(async () => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toEqual([]);
      expect(result.current.error).toBeNull();
    });
  });

  it("should fetch data successfully", async () => {
    const mockData = [
      { name: "United States", flag: "🇺🇸" },
      { name: "Canada", flag: "🇨🇦" },
    ];

    vi.mocked(countriesApi.fetchCountries).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useFetch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(countriesApi.fetchCountries).toHaveBeenCalledTimes(1);
  });

  it("should handle fetch error", async () => {
    const errorMessage = "Failed to fetch countries";
    vi.mocked(countriesApi.fetchCountries).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useFetch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.data).toEqual([]);
  });

  it("should handle unknown fetch error", async () => {
    vi.mocked(countriesApi.fetchCountries).mockRejectedValueOnce(
      "Unknown error"
    );

    const { result } = renderHook(() => useFetch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      "An error occurred while fetching countries data."
    );
    expect(result.current.data).toEqual([]);
  });

  it("should allow manual refetch", async () => {
    const mockData1 = [{ name: "United States", flag: "🇺🇸" }];
    const mockData2 = [{ name: "Canada", flag: "🇨🇦" }];

    vi.mocked(countriesApi.fetchCountries)
      .mockResolvedValueOnce(mockData1)
      .mockResolvedValueOnce(mockData2);

    const { result } = renderHook(() => useFetch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData1);

    // Trigger manual refetch
    await act(async () => {
      await result.current.fetchData();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData2);
    });

    expect(countriesApi.fetchCountries).toHaveBeenCalledTimes(2);
  });
});
