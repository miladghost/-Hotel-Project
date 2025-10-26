import styled from "styled-components";

const StyledRowVertical = styled.div`
  margin: 2px 1px;
  padding: 1px;
  flex-direction: column;
  gap: 2px;
  display: flex;
`;
const Label = styled.label`
  font-weight: 300;
  font-size: 15px;
`;
function FormRowVertical({ label, error, children }) {
  return (
    <StyledRowVertical>
      {" "}
      {label && <Label>{children.props.id}</Label>}
      {children}
    </StyledRowVertical>
  );
}
export default FormRowVertical;
