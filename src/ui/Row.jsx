import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 5px;
  ${(props) =>
    props.type === "userAccount" &&
    css`
      border-bottom: solid 1px;
      border-color: var(--color-brand-100);
      gap: 10px;
      margin-top: 4px;
      flex-direction: column;
    `}
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      gap: 2px;
      margin-bottom: 10px;
      margin-top: 10px;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      gap: 10px;
      margin-top: 4px;
      flex-direction: column;
    `}
`;
Row.defaultProps = {
  type: "vertical",
};
export default Row;
