import styled from "styled-components";
import { useDark } from "../contexts/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  border-radius: 50%;
  box-shadow: var(--shadow-md);
  margin: 20px 2px;
`;

function Logo() {
  const { isDark } = useDark();
  const src = isDark ? "img/hotel-Light.jpg" : "img/hotel-Dark.jpg";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
