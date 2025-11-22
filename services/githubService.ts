import { GithubUser, GithubRepo } from '../types';

const BASE_URL = 'https://api.github.com';

const getHeaders = (token?: string) => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  return headers;
};

export const fetchGithubUser = async (username: string, token?: string): Promise<GithubUser> => {
  const response = await fetch(`${BASE_URL}/users/${username}`, {
    headers: getHeaders(token),
  });

  if (!response.ok) {
    if (response.status === 404) throw new Error('Usuário não encontrado');
    if (response.status === 401) throw new Error('Token inválido ou expirado');
    if (response.status === 403) throw new Error('Limite de requisições excedido. Use um token.');
    throw new Error(`GitHub API Error: ${response.statusText}`);
  }

  return response.json();
};

export const fetchUserRepos = async (username: string, token?: string): Promise<GithubRepo[]> => {
  // Fetching up to 100 repos sorted by updated time
  const response = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=updated&per_page=100`,
    { headers: getHeaders(token) }
  );

  if (!response.ok) {
    throw new Error('Falha ao buscar repositórios');
  }

  return response.json();
};