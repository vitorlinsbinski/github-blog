import { ContainerBox } from "../../styles/container";

import logoGithubBlog from "../../assets/logo-githublog.svg";

import { HeaderComp } from "./styles";
import { Link } from "react-router-dom";

import { memo } from "react";

function HeaderComponent() {
  return (
    <HeaderComp>
      <ContainerBox>
        <Link to="/">
          <img src={logoGithubBlog} alt="" />
        </Link>
      </ContainerBox>
    </HeaderComp>
  );
}

export const Header = memo(HeaderComponent);
