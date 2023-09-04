import styled from "styled-components";

import headerBg from "../../assets/header-bg.png";

export const HeaderComponent = styled.header`
  background-image: url(${headerBg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 29.6rem;
  position: relative;
  padding-top: 6.4rem;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
