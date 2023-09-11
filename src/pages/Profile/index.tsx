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
import { useContext, useEffect } from "react";

import { Loading } from "../../components/Loading";
import { UserContext } from "../../contexts/ProfileContext";

import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const searchIssueFormSchema = zod.object({
  query: zod.string(),
});

type searchIssueFormInput = zod.infer<typeof searchIssueFormSchema>;

export function Profile() {
  const { username, repository } = useParams<{
    username: string;
    repository: string;
  }>();

  const { isLoading, fetchIssues, fetchIssueQuery } = useContext(UserContext);

  const { pathname } = useLocation();

  const { fetchUserDetails, userDetails, issues, issuesAmount } =
    useContext(UserContext);

  const { register, handleSubmit, reset } = useForm<searchIssueFormInput>({
    resolver: zodResolver(searchIssueFormSchema),
  });

  function handleSearchIssueForm(data: searchIssueFormInput) {
    if (username && repository) {
      fetchIssueQuery(username, repository, data.query);
    }
  }

  useEffect(() => {
    if (userDetails) {
      if (username && repository) {
        fetchUserDetails(username);
        fetchIssues(username, repository);
        console.log(userDetails);
      }
    } else {
      console.log("oi");
      return;
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ProfileSection>
          <ContainerBox>
            {userDetails.avatar_url ? (
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
            ) : (
              <div>Limite de requisições diárias esgotado...</div>
            )}

            {issues && (
              <>
                <SearchPostForm onSubmit={handleSubmit(handleSearchIssueForm)}>
                  <div className="top">
                    <label htmlFor="searchInput">Publicações</label>
                    <span>{issuesAmount} publicações</span>
                  </div>

                  <SearchInputForm
                    type="text"
                    name="searchInput"
                    id=""
                    placeholder="Buscar conteúdo"
                    {...register("query")}
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
