import { ContainerBox } from "../../styles/container";

import logoGithubBlog from "../../assets/logo-githublog.svg";

import { HeaderComponent } from "./styles";

export function Header() {
  return (
    <HeaderComponent>
      <ContainerBox>
        <img src={logoGithubBlog} alt="" />
      </ContainerBox>
    </HeaderComponent>
  );
}
