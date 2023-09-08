import { ContainerBox } from "../../styles/container";
import {
  PostCard,
  Posts,
  ProfileSection,
  SearchPostForm,
  ProfileCard,
  SearchInputForm,
} from "./styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { Loading } from "../../components/Loading";
import { UserContext } from "../../contexts/ProfileContext";

const BASE_PROFILE_GITHUB_URL = "https://api.github.com/users";
const BASE_ISSUE_GITHUB_URL = "https://api.github.com/search/issues?q=repo:";

interface ProfileInfoType {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  html_url: string;
  name: string;
  company: string;
  bio: string;
  followers: string;
}

interface IssueType {
  number: string;
  title: string;
  body: string;
}

export function Profile() {
  const { username, repository } = useParams();

  const [userDetails, setUserDetails] = useState<ProfileInfoType>();

  const [issues, setIssues] = useState<IssueType[]>([]);

  const [issuesAmount, setIssuesAmount] = useState(0);

  const { isLoading, showLoading, removeLoading } = useContext(UserContext);

  const { pathname } = useLocation();

  async function fetchUserDetails() {
    showLoading();

    try {
      const response = await axios.get(
        `${BASE_PROFILE_GITHUB_URL}/${username}`
      );
      setUserDetails(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      removeLoading();
    }
  }

  async function fetchIssues() {
    showLoading();

    try {
      const response = await axios.get(
        `${BASE_ISSUE_GITHUB_URL}${username}/${repository}`
      );

      const issuesData = response.data.items.map(
        ({ title, body, number }: IssueType) => {
          return {
            title,
            body,
            number,
          };
        }
      );

      setIssues(issuesData);
      setIssuesAmount(response.data.total_count);
    } catch (error) {
      console.log(error);
    } finally {
      removeLoading();
    }
  }

  useEffect(() => {
    fetchUserDetails();
    fetchIssues();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ProfileSection>
          <ContainerBox>
            {userDetails && (
              <ProfileCard>
                <img
                  src={userDetails.avatar_url}
                  alt="GitHub profile picture"
                />

                <div className="about">
                  <header>
                    <h1>{userDetails.name}</h1>

                    <a href={userDetails.html_url}>
                      <span>VER NO GITHUB</span>
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                  </header>

                  <p>{userDetails.bio}</p>

                  <footer>
                    <div className="github">
                      <FontAwesomeIcon icon={faGithub} />
                      <span>{userDetails.login}</span>
                    </div>
                    {userDetails.company && (
                      <div className="jobSite">
                        <FontAwesomeIcon icon={faBuilding} />
                        <span>{userDetails.company}</span>
                      </div>
                    )}

                    <div className="followers">
                      <FontAwesomeIcon icon={faUserGroup} />
                      <span>{userDetails.followers} seguidores</span>
                    </div>
                  </footer>
                </div>
              </ProfileCard>
            )}

            {issues && (
              <>
                <SearchPostForm>
                  <div className="top">
                    <label htmlFor="searchInput">Publicações</label>
                    <span>{issuesAmount} publicações</span>
                  </div>

                  <SearchInputForm
                    type="text"
                    name="searchInput"
                    id=""
                    placeholder="Buscar conteúdo"
                  />
                </SearchPostForm>

                <Posts>
                  {issues.map((issue) => {
                    const bodyPreview = issue.body
                      ? issue.body.slice(0, 160)
                      : "";

                    return (
                      <Link
                        to={pathname + `/${issue.number}`}
                        key={issue.number}
                      >
                        <PostCard>
                          <header>
                            <h3>{issue.title}</h3>
                            <span>Há 1 dia</span>
                          </header>

                          <p>{bodyPreview}...</p>
                        </PostCard>
                      </Link>
                    );
                  })}
                </Posts>
              </>
            )}
          </ContainerBox>
        </ProfileSection>
      )}
    </>
  );
}
