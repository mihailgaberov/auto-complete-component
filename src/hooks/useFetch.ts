import { useEffect, useState } from "react";
import { fetchCountries } from "../api/countriesApi";
import { Country } from "../types";

export default function useFetch() {
  const [data, setData] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result: Country[] = await fetchCountries();
      setData(result);
    }catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred while fetching countries data.');
        }
      }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    fetchData,
  };
}
