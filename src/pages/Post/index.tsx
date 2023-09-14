import {
  faArrowUpRightFromSquare,
  faCalendarDay,
  faChevronLeft,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { ContainerBox } from "../../styles/container";
import { PostContent, PostHeader, PostSection } from "./styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams, useLocation } from "react-router-dom";

import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { useEffect } from "react";
import { UserContext } from "../../contexts/ProfileContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loading } from "../../components/Loading";

import { useContextSelector } from "use-context-selector";

import { customSyntaxHighlighterStyle } from "../../customStyles/customSyntaxHighlighterStyle";

export function Post() {
  const { username, repository, issue } = useParams();

  // const { issues, fetchIssueDetails, issueDetailed, isLoading } =
  //   useContext(UserContext);

  const { issues, fetchIssueDetails, issueDetailed, isLoading } =
    useContextSelector(UserContext, (context) => context);

  const issueNumber = issues.find(
    (issueItem) => issueItem.number == Number(issue)
  );

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!issueNumber && username && repository && issue) {
      fetchIssueDetails(username, repository, Number(issue));
    }
  }, [fetchIssueDetails, issueNumber, username, repository, issue]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <PostSection>
          <ContainerBox>
            {issueNumber ? (
              <>
                <PostHeader>
                  <nav>
                    <Link to={`/${username}/${repository}`}>
                      <FontAwesomeIcon icon={faChevronLeft} />
                      VOLTAR
                    </Link>

                    <a href={issueNumber.url}>
                      VER NO GITHUB{" "}
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                  </nav>

                  <h1>{issueNumber.title}</h1>

                  <footer>
                    <div className="icon">
                      <FontAwesomeIcon icon={faGithub} />{" "}
                      <span>{issueNumber.user.login}</span>
                    </div>
                    <div className="icon">
                      <FontAwesomeIcon icon={faCalendarDay} />{" "}
                      <span>
                        {formatDistanceToNow(issueNumber.updated_at, {
                          locale: ptBR,
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <div className="icon">
                      <FontAwesomeIcon icon={faComment} />{" "}
                      <span>{issueNumber.comments} comentários</span>
                    </div>
                  </footer>
                </PostHeader>

                <PostContent>
                  <ReactMarkdown
                    children={issueNumber.body}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            {...props}
                            children={String(children).replace(/\n$/, "")}
                            language={match[1]}
                            style={customSyntaxHighlighterStyle}
                          />
                        ) : (
                          <code {...props} className={className}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  />
                </PostContent>
              </>
            ) : (
              issueDetailed && (
                <>
                  <PostHeader>
                    <nav>
                      <Link to={`/${username}/${repository}`}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                        VOLTAR
                      </Link>

                      <a href={issueDetailed.url}>
                        VER NO GITHUB{" "}
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </a>
                    </nav>

                    <h1>{issueDetailed.title}</h1>

                    <footer>
                      <div className="icon">
                        <FontAwesomeIcon icon={faGithub} />{" "}
                        <span>{issueDetailed.user.login}</span>
                      </div>
                      <div className="icon">
                        <FontAwesomeIcon icon={faCalendarDay} />{" "}
                        <span>
                          {formatDistanceToNow(issueDetailed.updated_at, {
                            locale: ptBR,
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <div className="icon">
                        <FontAwesomeIcon icon={faComment} />{" "}
                        <span>{issueDetailed.comments} comentários</span>
                      </div>
                    </footer>
                  </PostHeader>

                  <PostContent>
                    <ReactMarkdown
                      children={issueDetailed.body}
                      components={{
                        code({ inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              {...props}
                              children={String(children).replace(/\n$/, "")}
                              style={customSyntaxHighlighterStyle}
                              language={match[1]}
                            />
                          ) : (
                            <code {...props} className={className}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    />
                  </PostContent>
                </>
              )
            )}
          </ContainerBox>
        </PostSection>
      )}
    </>
  );
}
