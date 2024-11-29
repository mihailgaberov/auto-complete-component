import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Country } from "../../types";
import Input from "../Input";
import Suggestion from "../Suggestion";

import styles from "./Autocomplete.module.scss";

export default function Autocomplete() {
  const { data, loading, error } = useFetch();
  const [filteredData, setFilteredData] = useState<Country[]>([]);
  const [message, setMessage] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isFiltering, setIsFiltering] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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

  return (
    <div className={styles.container}>
      <Input onChangeHandler={handleInputChange} value={inputValue} />
      {isFiltering && <p>Filtering...</p>}
      {!isFiltering && message !== "" && <p>{message}</p>}
      {selectedCountry && (
        <p>
          Selected country: <strong>{selectedCountry}</strong>
        </p>
      )}
      <ul>
        {filteredData.map((country) => (
          <Suggestion
            key={country.name}
            name={country.name}
            flag={country.flag}
            onClickHandler={() => handleSuggestionClick(country.name)}
          />
        ))}
      </ul>
    </div>
  );
}
