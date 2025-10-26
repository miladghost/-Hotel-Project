import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 35px;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 23px;
      font-weight: 500;
      letter-spacing: 1px;
      background-color: var(--color-grey-0);
      text-transform: capitalize;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 20px;
      color: var(--color-grey-800);
      font-weight: 300;
    `}
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 25px;
      color: var(--color-brand-800);
      font-weight: 600;
    `}
 
  border-radius: 6px;
`;
export default Heading;
