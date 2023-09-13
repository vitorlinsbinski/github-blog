import { ReactNode, createContext, useState } from "react";

import { api } from "../lib/axios";

interface UserContextProviderProps {
  children: ReactNode;
}

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
  comments: number;
  created_at: Date;
  url: string;
  id: number;
  number: number;
  title: string;
  updated_at: Date;
  body: string;
  user: { login: string };
}

interface UserContextType {
  isLoading: boolean;
  showLoading: () => void;
  removeLoading: () => void;

  userDetails: ProfileInfoType;
  fetchUserDetails: (username: string) => Promise<void>;

  issues: IssueType[];
  fetchIssues: (username: string, repository: string) => Promise<void>;

  issuesAmount: number;

  fetchIssueQuery: (
    username: string,
    repository: string,
    query: string
  ) => Promise<void>;

  issueDetailed: IssueType;
  fetchIssueDetails: (
    username: string,
    repository: string,
    issue: number
  ) => Promise<void>;
}

export const UserContext = createContext({} as UserContextType);

export function UserProvider({ children }: UserContextProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  const [userDetails, setUserDetails] = useState<ProfileInfoType>({
    login: "",
    id: 0,
    avatar_url: "",
    url: "",
    html_url: "",
    name: "",
    company: "",
    bio: "",
    followers: "",
  });

  const [issues, setIssues] = useState<IssueType[]>([]);
  const [issuesAmount, setIssuesAmount] = useState(0);

  const [issueDetailed, setIssueDetailed] = useState<IssueType>({
    comments: 0,
    created_at: new Date(),
    body: "",
    id: 0,
    number: 0,
    title: "",
    updated_at: new Date(),
    url: "",
    user: { login: "" },
  });

  async function fetchUserDetails(username: string) {
    showLoading();

    try {
      const response = await api.get(`users/${username}`);
      setUserDetails(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      removeLoading();
    }
  }

  async function fetchIssues(username: string, repository: string) {
    showLoading();
    setIssues([]);
    try {
      const { data } = await api.get(
        `/search/issues?q=repo:${username}/${repository}`
      );

      const issuesData = data.items.map(
        ({
          comments,
          created_at,
          url,
          id,
          number,
          title,
          updated_at,
          body,
          user,
        }: IssueType) => {
          return {
            comments,
            created_at: new Date(created_at),
            url,
            id,
            number,
            title,
            updated_at: new Date(updated_at),
            body,
            user,
          };
        }
      );

      setIssues(issuesData);
      setIssuesAmount(data.total_count);

      console.log("issuesData", issuesData);
    } catch (error) {
      console.log(error);
    } finally {
      removeLoading();
    }
  }

  async function fetchIssueQuery(
    username: string,
    repository: string,
    query: string
  ) {
    try {
      const encodedQuery = encodeURIComponent(query);

      const { data } = await api.get(
        `/search/issues?q=${encodedQuery}%20repo:${username}/${repository}`
      );

      const issuesData = data.items.map(
        ({
          comments,
          created_at,
          url,
          id,
          number,
          title,
          updated_at,
          body,
          user: user,
        }: IssueType) => {
          return {
            comments,
            created_at: new Date(created_at),
            url,
            id,
            number,
            title,
            updated_at: new Date(updated_at),
            body,
            user,
          };
        }
      );

      setIssues(issuesData);
      setIssuesAmount(data.total_count);

      console.log("DATAAAA", data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchIssueDetails(
    username: string,
    repository: string,
    issue: number
  ) {
    showLoading();

    try {
      const { data } = await api.get(
        `/repos/${username}/${repository}/issues/${issue}`
      );

      const issueDetailedData = {
        comments: data.comments,
        created_at: new Date(data.createdAt),
        url: data.html_url,
        id: data.id,
        number: data.number,
        title: data.title,
        updated_at: new Date(data.updated_at),
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

  function showLoading() {
    setIsLoading(true);
  }

  function removeLoading() {
    setIsLoading(false);
  }

  return (
    <UserContext.Provider
      value={{
        isLoading,
        showLoading,
        removeLoading,
        userDetails,
        fetchUserDetails,
        issues,
        fetchIssues,
        issuesAmount,
        fetchIssueQuery,
        issueDetailed,
        fetchIssueDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
