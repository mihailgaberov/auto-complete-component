import useFetch from "../../hooks/useFetch";

export default function Autocomplete() {
  const { data, loading, error } = useFetch();

  console.log(">>> loading: ", loading);
  console.log(">>> error: ", error);
  console.log(">>> data: ", data);
  
  return <div>Autocomplete component here...</div>;
}
