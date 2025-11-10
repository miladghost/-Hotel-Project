import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSearchBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 1.4rem;
`;
const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  border-radius: 50%;
  background-color: var(--color-brand-500);
  padding: 11px 25px;
  color: var(--color-grey-50);
  font-size: 1.4rem;
  width: 4rem;
  transition: all 0.3s;
  &:focus {
    width: 20rem;
    border-radius: 3rem;
  }
  &::placeholder {
    color: var(--color-grey-300);
  }
`;
const StyledBsSearch = styled(BsSearch)`
  position: absolute;
  top: 30%;
  left: 2rem;
  pointer-events: none;
  color: var(--color-grey-50);
  font-size: 2rem;
`;
function SearchBox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");
  useEffect(
    function () {
      const timer = setTimeout(() => {
        if (value) searchParams.set("search", value);
        else searchParams.delete("search");
        setSearchParams(searchParams);
      }, 400);
      return () => clearTimeout(timer);
    },

    [searchParams, setSearchParams, value]
  );
  console.log(value);
  return (
    <StyledSearchBox>
      <span>{<StyledBsSearch />}</span>
      <StyledSearchInput
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by..."
      />
    </StyledSearchBox>
  );
}

export default SearchBox;
