import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
const Aside = styled.aside`
  background-color: var(--color-grey-50);
  padding: 1.6rem 2rem 3rem;
  border-right: 1px solid var(--color-grey-200);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function SideBar() {
  return (
    <Aside>
      <Logo />
      <MainNav />
    </Aside>
  );
}

export default SideBar;
