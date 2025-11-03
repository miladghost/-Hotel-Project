import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }
`;

function CheckboxV2({ register, id, name }) {
  return (
    <StyledCheckbox>
      <input type="checkbox" id={id} {...register(name)} />
    </StyledCheckbox>
  );
}

export default CheckboxV2;
