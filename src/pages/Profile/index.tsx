import { ContainerBox } from "../../styles/container";
import {
  PostCard,
  Posts,
  ProfileSection,
  SearchPostForm,
  ProfileCard,
} from "./styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export function Profile() {
  return (
    <ProfileSection>
      <ContainerBox>
        <ProfileCard>
          <img
            src="https://avatars.githubusercontent.com/u/69444717?v=4"
            alt="GitHub profile picture"
          />

          <div className="about">
            <header>
              <h1>Vitor Linsbinski</h1>

              <a href="">
                <span>VER NO GITHUB</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            </header>

            <p>
              Tristique volutpat pulvinar vel massa, pellentesque egestas. Eu
              viverra massa quam dignissim aenean malesuada suscipit. Nunc,
              volutpat pulvinar vel mass.
            </p>

            <footer>
              <div className="github">
                <FontAwesomeIcon icon={faGithub} />
                <span>cameronwll</span>
              </div>
              <div className="jobSite">
                <FontAwesomeIcon icon={faBuilding} />
                <span>Rocketseat</span>
              </div>
              <div className="followers">
                <FontAwesomeIcon icon={faUserGroup} />
                <span>32 seguidores</span>
              </div>
            </footer>
          </div>
        </ProfileCard>

        <SearchPostForm></SearchPostForm>

        <Posts>
          <PostCard></PostCard>
        </Posts>
      </ContainerBox>
    </ProfileSection>
  );
}
