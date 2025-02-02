import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Autocomplete from "./Autocomplete";
import * as useFetchHook from "@/hooks/useFetch";

// Mock data
const mockCountries = [
  { name: "Albania", flag: "🇦🇱" },
  { name: "Algeria", flag: "🇩🇿" },
  { name: "Afghanistan", flag: "🇦🇫" },
];

// Mock the useFetch hook
vi.mock("../../hooks/useFetch", () => ({
  default: vi.fn(),
}));

describe("Autocomplete Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show loading state initially", () => {
    vi.mocked(useFetchHook.default).mockReturnValue({
      data: [],
      loading: true,
      error: null,
      fetchData: Promise.resolve,
    });

    render(<Autocomplete />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should show error state when fetch fails", () => {
    const errorMessage = "Failed to fetch countries";
    vi.mocked(useFetchHook.default).mockReturnValue({
      data: [],
      loading: false,
      error: errorMessage,
      fetchData: Promise.reject,
    });

    render(<Autocomplete />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it("should render input field and title", () => {
    vi.mocked(useFetchHook.default).mockReturnValue({
      data: mockCountries,
      loading: false,
      error: null,
      fetchData: Promise.resolve,
    });

    render(<Autocomplete />);
    expect(screen.getByText("Select your country")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should filter countries based on input", async () => {
    vi.mocked(useFetchHook.default).mockReturnValue({
      data: mockCountries,
      loading: false,
      error: null,
      fetchData: Promise.resolve,
    });

    render(<Autocomplete />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "al" } });

    // Wait for filtering message to appear and disappear
    await waitFor(() => {
      expect(screen.queryByText("Filtering...")).not.toBeInTheDocument();
    });

    // Check if filtered countries are displayed
    expect(screen.getAllByText("Al")).toHaveLength(2);
    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "span" &&
          content.startsWith("bania")
        );
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "span" &&
          content.startsWith("geria")
        );
      })
    ).toBeInTheDocument();

    expect(screen.queryByText("Afghanistan")).not.toBeInTheDocument();
  });

  it("should select country when clicking suggestion", async () => {
    vi.mocked(useFetchHook.default).mockReturnValue({
      data: mockCountries,
      loading: false,
      error: null,
      fetchData: Promise.resolve,
    });

    render(<Autocomplete />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "al" } });

    await waitFor(() => {
      expect(screen.queryByText("Filtering...")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("bania", { selector: "span" }));

    expect(screen.getByText("Selected country:")).toBeInTheDocument();
    expect(screen.getByText("Albania")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("should handle keyboard navigation", async () => {
    vi.mocked(useFetchHook.default).mockReturnValue({
      data: mockCountries,
      loading: false,
      error: null,
      fetchData: Promise.resolve,
    });

    render(<Autocomplete />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "al" } });

    await waitFor(() => {
      expect(screen.queryByText("Filtering...")).not.toBeInTheDocument();
    });

    // Press arrow down to select first item
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(screen.getByText("bania").parentElement).toHaveClass("selected");

    // Press enter to select
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("Selected country:")).toBeInTheDocument();
    expect(screen.getByText("Albania")).toBeInTheDocument();
  });

  it("should show no results message when no matches found", async () => {
    vi.mocked(useFetchHook.default).mockReturnValue({
      data: mockCountries,
      loading: false,
      error: null,
      fetchData: Promise.resolve,
    });

    render(<Autocomplete />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "xyz" } });

    await waitFor(() => {
      expect(screen.queryByText("Filtering...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("No countries found.")).toBeInTheDocument();
  });
});
