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
import { Link, useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";
//import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import hightlightStyle from "../../hightlightStyle";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/ProfileContext";
import { Loading } from "../../components/Loading";

const BASE_ISSUE_DETAILS_URL = "https://api.github.com";

interface IssueDetailedType {
  comments: number;
  createdAt: string;
  url: string;
  id: number;
  number: number;
  title: string;
  updated_at: string;
  body: string;
  user: string;
}

export function Post() {
  const { username, repository, issue } = useParams();

  const [issueDetailed, setIssueDetailed] = useState<IssueDetailedType>();

  async function fetchIssueDetails() {
    showLoading();

    try {
      const { data } = await axios.get(
        `${BASE_ISSUE_DETAILS_URL}/repos/${username}/${repository}/issues/${issue}`
      );

      const issueDetailedData = {
        comments: data.comments,
        createdAt: data.createdAt,
        url: data.html_url,
        id: data.id,
        number: data.number,
        title: data.title,
        updated_at: data.updated_at,
        body: data.body,
        user: data.user.login,
      };

      setIssueDetailed(issueDetailedData);

      console.log(issueDetailedData);
    } catch (error) {
      console.log(error);
    } finally {
      removeLoading();
    }
  }

  const { isLoading, removeLoading, showLoading } = useContext(UserContext);

  useEffect(() => {
    fetchIssueDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <PostSection>
          <ContainerBox>
            {issueDetailed && (
              <>
                <PostHeader>
                  <nav>
                    <Link to={`/${username}/${repository}`}>
                      <a
                        href={`${BASE_ISSUE_DETAILS_URL}/repos/${username}/${repository}`}
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                        VOLTAR
                      </a>
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
                      <span>{issueDetailed.user}</span>
                    </div>
                    <div className="icon">
                      <FontAwesomeIcon icon={faCalendarDay} />{" "}
                      <span>Há 1 dia</span>
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
                            style={hightlightStyle}
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
            )}
          </ContainerBox>
        </PostSection>
      )}
    </>
  );
}
