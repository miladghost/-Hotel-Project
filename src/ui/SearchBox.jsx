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
      const params = new URLSearchParams(searchParams);
      const timer = setTimeout(() => {
        const trimmed = value.trim();
        if (trimmed) {
          params.set("search", trimmed);
          params?.set("page", 1); //در هر فیلتر صفحه رو بزار 1 تا مشکل پیش نیاد
        } else params.delete("search");
        setSearchParams(params);
      }, 400);
      return () => clearTimeout(timer);
    },
    // eslint-disable-next-line
    [setSearchParams, value]
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
