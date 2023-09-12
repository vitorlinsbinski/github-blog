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
  animation: LoadingAnimation 1s ease-in-out infinite;
  position: relative;
  width: 10rem;
  height: auto;

  &::before {
    content: "";
    width: 15rem;
    height: 15rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-top: 5px solid ${(props) => props.theme.blue};
    border-radius: 50%;
    z-index: -1;
    animation: Rotating 0.3s ease-in-out infinite;
  }

  @keyframes LoadingAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes Rotating {
    from {
      transform: translate(-50%, -50%) rotate(0deg); /* Rotate around its own axis */
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg); /* Rotate around its own axis */
    }
  }
`;
