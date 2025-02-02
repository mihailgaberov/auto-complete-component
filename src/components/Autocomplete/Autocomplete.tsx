import Input from "@/components/Input";
import Suggestion from "@/components/Suggestion";
import useAutocomplete from "@/hooks/useAutocomplete";
import Title from "@/components/Title";
import Loader from "@/components/Loader";

import styles from "./Autocomplete.module.scss";

export default function Autocomplete() {
  const {
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
    handleInputFocusOut,
    handleSuggestionClick,
    handleKeyDown,
  } = useAutocomplete();

  if (isLoading) {
    return <Loader />;
  }

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  return (
    <div className={styles.container}>
      <Title content="Select your country" size="small" position="left" />
      <Input
        onChangeHandler={handleInputChange}
        onFocus={handleInputFocus}
        onFocusOut={handleInputFocusOut}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      {isFiltering && <p>Filtering...</p>}

      {!isFiltering && message !== "" && <p>{message}</p>}

      {selectedCountry && (
        <p>
          Selected country: <strong>{selectedCountry}</strong>
        </p>
      )}

      {showSuggestions && (
        <ul>
          {filteredData.map((country, index) => (
            <li
              onClick={() => handleSuggestionClick(country.name)}
              key={country.name}
            >
              <Suggestion
                key={country.name}
                name={country.name}
                flag={country.flag}
                searchValue={inputValue}
                isSelected={index === selectedIndex}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
