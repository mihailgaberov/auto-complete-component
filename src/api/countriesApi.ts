import { ApiCountry, Country } from "../types";

const COUNTRIES_API_URL = "https://restcountries.com/v3.1/region/europe/";
export async function fetchCountries() {
  const response = await fetch(COUNTRIES_API_URL);

  if (!response.ok) {
    throw new Error(`Countries API error: ${response.status}`);
  }

  const result = await response.json();
  const countries: Country[] = result.map((country: ApiCountry) => {
    return {
      name: country.name.common,
      flag: country.flag,
    };
  });

  countries.sort((a, b) => a.name.localeCompare(b.name));

  return countries;
}
