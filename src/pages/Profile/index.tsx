import { ContainerBox } from "../../styles/container";
import {
  PostCard,
  Posts,
  ProfileSection,
  SearchPostForm,
  ProfileCard,
  SearchInputForm,
  NoIssueFoundArea,
} from "./styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faFileExcel,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Loading } from "../../components/Loading";
import { UserContext } from "../../contexts/ProfileContext";

import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useContextSelector } from "use-context-selector";

const searchIssueFormSchema = zod.object({
  query: zod.string(),
});

type searchIssueFormInput = zod.infer<typeof searchIssueFormSchema>;

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Profile() {
  const { pathname } = useLocation();

  const { username, repository } = useParams<{
    username: string;
    repository: string;
  }>();

  // const {
  //   fetchUserDetails,
  //   userDetails,
  //   fetchIssues,
  //   fetchIssueQuery,
  //   issues,
  //   issuesAmount,
  //   isLoading,
  // } = useContext(UserContext);

  const {
    fetchUserDetails,
    userDetails,
    fetchIssues,
    issues,
    issuesAmount,
    fetchIssueQuery,
    isLoading,
  } = useContextSelector(UserContext, (context) => context);

  const { register, handleSubmit } = useForm<searchIssueFormInput>({
    resolver: zodResolver(searchIssueFormSchema),
  });

  function handleSearchIssueForm(data: searchIssueFormInput) {
    if (username && repository) {
      fetchIssueQuery(username, repository, data.query);
    }
  }

  useEffect(() => {
    if (userDetails && username && repository) {
      fetchUserDetails(username);
      fetchIssues(username, repository);
    }
  }, [fetchUserDetails, fetchIssues]);

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
              <ProfileCard>
                <p>Perfil não encontrado!</p>
              </ProfileCard>
            )}

            <SearchPostForm onSubmit={handleSubmit(handleSearchIssueForm)}>
              <div className="top">
                <label htmlFor="query">Publicações</label>
                <span>{issuesAmount} publicações</span>
              </div>

              <SearchInputForm
                type="text"
                id="query"
                placeholder="Buscar conteúdo"
                {...register("query")}
              />
            </SearchPostForm>

            {issues.length !== 0 ? (
              <>
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
                            <span>
                              {formatDistanceToNow(issue.updated_at, {
                                locale: ptBR,
                                addSuffix: true,
                              })}
                            </span>
                          </header>

                          <p>{bodyPreview}...</p>
                        </PostCard>
                      </Link>
                    );
                  })}
                </Posts>
              </>
            ) : (
              <NoIssueFoundArea>
                <FontAwesomeIcon icon={faFileExcel} />
                <span>
                  Não encontramos nenhuma issue para esse repositório ou
                  filtro...
                </span>
              </NoIssueFoundArea>
            )}
          </ContainerBox>
        </ProfileSection>
      )}
    </>
  );
}
