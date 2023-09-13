import logoImg from "../../assets/logo-githublog.svg";
import { ImgBox, LoadingContainer, Overlay } from "./styles";

import { memo } from "react";

function LoadingComponent() {
  return (
    <LoadingContainer>
      <Overlay></Overlay>

      <ImgBox>
        <img src={logoImg} alt="" />
      </ImgBox>
    </LoadingContainer>
  );
}

export const Loading = memo(LoadingComponent);
