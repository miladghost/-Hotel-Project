import styled from "styled-components";

const Input = styled.input`
  border-radius: var(--border-radius-sm);
  padding: 10px;
  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-sm);
  & input[type="date"] {
    background-color: var(--color-grey-50);
  }
`;
export default Input;
