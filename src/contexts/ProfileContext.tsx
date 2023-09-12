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
  user: string;
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

      console.log(
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

      console.log("DATAAAA", data);
    } catch (error) {
      console.log(error);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
