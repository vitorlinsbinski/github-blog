import { ContainerBox } from "../../styles/container";

import logoGithubBlog from "../../assets/logo-githublog.svg";

import { HeaderComponent } from "./styles";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <HeaderComponent>
      <ContainerBox>
        <Link to="/">
          <img src={logoGithubBlog} alt="" />
        </Link>
      </ContainerBox>
    </HeaderComponent>
  );
}
