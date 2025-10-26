import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  height: 100vh;
  grid-template-rows: auto 1fr;
`;
const StyledMenu = styled.menu`
  background-color: var(--color-grey-100);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  width: 100%;
`;
function AppLayout() {
  return (
    <StyledApp>
      <Header />
      <SideBar />
      <StyledMenu>
        <Container>
          <Outlet />
        </Container>
      </StyledMenu>
    </StyledApp>
  );
}

export default AppLayout;
