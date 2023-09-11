import styled from "styled-components";

export const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2022;
  top: 0;
  left: 0;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 0;
  background-color: ${(props) => props.theme["base-background"]};
  top: 0;
  left: 0;
`;

export const ImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  animation: LoadingAnimation 0.2s ease infinite;

  @keyframes LoadingAnimation {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
`;
