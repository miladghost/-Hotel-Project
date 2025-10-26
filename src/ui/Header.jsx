import styled from "styled-components";

import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-50);
  padding: 1rem 2rem 1.6rem;
  border: 1px solid var(--color-grey-200);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3.4rem;
`;

function Header() {
  return (
    <StyledHeader>
      <HeaderMenu />
      <UserAvatar />
    </StyledHeader>
  );
}

export default Header;
