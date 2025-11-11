import styled from "styled-components";
import { useDark } from "../contexts/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 11.4rem;
  width: auto;
  border-radius: 30px;
`;

function Logo() {
  const { isDark } = useDark();
  const src = isDark ? "img/dark.png" : "img/light.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
