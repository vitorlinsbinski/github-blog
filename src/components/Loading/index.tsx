import logoImg from "../../assets/logo-githublog.svg";
import { ImgBox, LoadingContainer, Overlay } from "./styles";

export function Loading() {
  return (
    <LoadingContainer>
      <Overlay></Overlay>

      <ImgBox>
        <img src={logoImg} alt="" />
      </ImgBox>
    </LoadingContainer>
  );
}
