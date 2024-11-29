import Input from "../Input";
import Suggestion from "../Suggestion";
import useAutocomplete from "../../hooks/useAutocomplete";
import styles from "./Autocomplete.module.scss";
import Title from "../Title";
import Loader from "../Loader";

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
            <Suggestion
              key={country.name}
              name={country.name}
              flag={country.flag}
              searchValue={inputValue}
              isSelected={index === selectedIndex}
              onClickHandler={() => handleSuggestionClick(country.name)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
