import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParam, setSearchParam] = useSearchParams();

  function handleChange(e) {
    searchParam.set("sortBy", e.target.value);
    setSearchParam(searchParam);
  }
  const sortBy = searchParam.get("sortBy") || "";
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    >
      select
    </Select>
  );
}

export default SortBy;
