import styled from "styled-components";
import { useDark } from "../contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";

const StyledLogo = styled.div`
  text-align: center;
  margin-bottom: 6px;
`;

const Img = styled.img`
  height: 11.4rem;
  width: auto;
  border-radius: 30px;
  border: none;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    padding: 2px;
    box-shadow: 9px 9px 10px 1px var(--color-grey-300);
    translate: calc(-6px);
  }
`;

function Logo() {
  const navigate = useNavigate();
  const { isDark } = useDark();
  const src = isDark ? "img/dark-hotel-logo.png" : "img/light-hotel-logo.png";
  return (
    <StyledLogo>
      <Img
        src={src}
        alt="Logo"
        onClick={() => navigate("/dashboard", { replace: true })}
      />
    </StyledLogo>
  );
}

export default Logo;
