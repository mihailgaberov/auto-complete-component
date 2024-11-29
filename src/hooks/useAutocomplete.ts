import { useState } from "react";
import { Country } from "../types";
import useFetch from "./useFetch";

export default function useAutocomplete() {
  const { data, loading: isLoading, error: fetchError } = useFetch();
  const [filteredData, setFilteredData] = useState<Country[]>([]);
  const [message, setMessage] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isFiltering, setIsFiltering] = useState(false);

  const filterData = async (searchValue: string): Promise<Country[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return data.filter((country) =>
      country.name.toLowerCase().startsWith(searchValue.toLowerCase())
    );
  };

  const handleInputChange = async (value: string) => {
    setInputValue(value);
    setSelectedCountry(null);
    setIsFiltering(true);

    if (!value) {
      setFilteredData([]);
      setMessage("");
      setIsFiltering(false);
      return;
    }

    try {
      const filtered = await filterData(value);
      
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
    } finally {
      setIsFiltering(false);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setSelectedCountry(name);
    setFilteredData([]);
    setInputValue("");
  };

  return {
    filteredData,
    message,
    selectedCountry,
    inputValue,
    isFiltering,
    isLoading,
    fetchError,
    handleInputChange,
    handleSuggestionClick
  };
}