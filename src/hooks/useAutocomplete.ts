import { useState, useEffect, KeyboardEvent } from "react";
import { Country } from "@/types";
import useFetch from "./useFetch";
import useThrowAsyncError from "./useAsyncError";
import { useDebounce } from "./useDebounce";

export default function useAutocomplete() {
  const { fetchData, data, loading: isLoading, error: fetchError } = useFetch();

  const [filteredData, setFilteredData] = useState<Country[]>([]);
  const [message, setMessage] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const throwAsyncError = useThrowAsyncError();

  useEffect(() => {
    setSelectedIndex(-1);
  }, [filteredData]);

  // move the filtering to the debounced fetch call
  const filterData = async (searchValue: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    setFilteredData(
      data.filter((country) =>
        country.name.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    );
  };

  const debouncedRequest = useDebounce(async () => {
    await fetchData();
    setFilteredData(data);

    filterData(inputValue);
    console.log(`Debounced request for: ${inputValue}`);
  });

  const handleInputChange = async (value: string) => {
    debouncedRequest();
    setInputValue(value);
    setSelectedCountry(null);
    setIsFiltering(true);
    setShowSuggestions(true);

    if (!value) {
      setFilteredData(data);
      setMessage("");
      setIsFiltering(false);
      return;
    }

    try {
      if (filteredData.length === 0) {
        setMessage("No countries found.");
        setFilteredData([]);
      } else {
        setFilteredData(filteredData);
        setMessage("");
      }
    } catch (err) {
      setMessage("Error filtering countries.");
      setFilteredData([]);
      throwAsyncError(err);
    } finally {
      setIsFiltering(false);
    }
  };

  const handleInputFocus = () => {
    setFilteredData(data);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (name: string) => {
    setSelectedCountry(name);
    setFilteredData([]);
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!filteredData.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredData.length - 1 ? prev + 1 : prev
        );
        break;

      case "Tab":
        if (e.shiftKey) {
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredData.length - 1 ? prev + 1 : prev
          );
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(filteredData[selectedIndex].name);
        }
        break;

      case "Escape":
        e.preventDefault();
        setShowSuggestions(false);
        setFilteredData([]);
        break;

      default:
        break;
    }
  };

  return {
    filteredData,
    message,
    selectedCountry,
    inputValue,
    isFiltering,
    isLoading,
    fetchError,
    selectedIndex,
    showSuggestions,
    handleInputChange,
    handleInputFocus,
    handleSuggestionClick,
    handleKeyDown,
  };
}
