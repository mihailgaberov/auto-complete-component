import { useState, useEffect, KeyboardEvent } from "react";
import { Country } from "@/types";
import useFetch from "./useFetch";
import useThrowAsyncError from "./useAsyncError";
import useDebounce from "./useDebounce";

export default function useAutocomplete() {
  const { data, loading: isLoading, error: fetchError } = useFetch();
  const [filteredData, setFilteredData] = useState<Country[]>([]);
  const [message, setMessage] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const throwAsyncError = useThrowAsyncError();
  const debouncedInputValue = useDebounce(inputValue, 300);

  useEffect(() => {
    const filterData = async (searchValue: string): Promise<Country[]> => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      return data.filter((country) =>
        country.name.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    };

    const handleFiltering = async () => {
      setIsFiltering(true);
      setShowSuggestions(true);

      if (!debouncedInputValue) {
        setFilteredData(data);
        setMessage("");
        setIsFiltering(false);
        return;
      }

      try {
        const filtered = await filterData(debouncedInputValue);

        if (filtered.length === 0) {
          setMessage("No countries found.");
          setFilteredData([]);
        } else {
          setFilteredData(filtered);
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

    handleFiltering();
  }, [debouncedInputValue, data, throwAsyncError]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setSelectedCountry(null);
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
