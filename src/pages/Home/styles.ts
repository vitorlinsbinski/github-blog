import styled from "styled-components";

import { titleS } from "../../styles/typography";

export const FormArea = styled.form`
  margin-top: -6.5rem;
  z-index: 1;
  position: relative;
  & > div {
    label {
      ${titleS}
    }

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1.2rem;
    }
  }
`;

export const InputArea = styled.input`
  background-color: ${(props) => props.theme["base-input"]};
  border: none;
  width: 100%;
  height: 5rem;
  padding: 0 1.6rem;
  border-radius: 6px;
  margin-right: 1rem;
  color: ${(props) => props.theme["base-text"]};

  &::placeholder {
    color: ${(props) => props.theme["base-label"]};
  }
`;

export const ButtonSubmit = styled.button`
  height: 5rem;
  border: 1px solid ${(props) => props.theme.blue};
  background-color: transparent;
  border-radius: 6px;
  width: 9rem;
  color: ${(props) => props.theme.blue};
  cursor: pointer;

  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.white};
  }
`;
