export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  license: {
    key: string;
    name: string;
  } | null;
}

export interface RepoAnalysisContext {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updated_at: string;
  topics: string[];
}

export interface ProfileAnalysisContext {
  username: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  top_repos: {
    name: string;
    description: string | null;
    language: string | null;
    stars: number;
  }[];
}