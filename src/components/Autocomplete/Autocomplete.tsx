import Input from "../Input";
import Suggestion from "../Suggestion";
import useAutocomplete from "../../hooks/useAutocomplete";
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
    handleInputChange,
    handleSuggestionClick
  } = useAutocomplete();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

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
