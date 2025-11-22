import React, { useState, useCallback } from 'react';
import { GithubUser, GithubRepo } from './types';
import { fetchGithubUser, fetchUserRepos } from './services/githubService';
import { analyzeProfile, analyzeRepo } from './services/geminiService';
import { ProfileHeader } from './components/ProfileHeader';
import { RepoList } from './components/RepoList';
import { LoginScreen } from './components/LoginScreen';
import { LoadingSpinner } from './components/Icons';
import { Charts } from './components/Charts';

const App: React.FC = () => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');
  
  // Gemini Analysis State
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleLogin = useCallback(async (username: string, pat: string) => {
    setLoading(true);
    setError(null);
    setToken(pat);

    try {
      const userData = await fetchGithubUser(username, pat);
      const reposData = await fetchUserRepos(username, pat);
      setUser(userData);
      setRepos(reposData);
    } catch (err: any) {
      setError(err.message || 'Falha ao conectar ao GitHub');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAnalyzeProfile = useCallback(async () => {
    if (!user || repos.length === 0) return;
    
    setAnalyzing(true);
    setModalTitle('Análise de Perfil com IA');
    setModalOpen(true);
    setAnalysisResult(null);

    try {
      // Create a summary context for the AI
      const profileContext = {
        username: user.login,
        bio: user.bio,
        public_repos: user.public_repos,
        followers: user.followers,
        top_repos: repos
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5)
          .map(r => ({ name: r.name, description: r.description, language: r.language, stars: r.stargazers_count }))
      };

      const result = await analyzeProfile(JSON.stringify(profileContext));
      setAnalysisResult(result);
    } catch (err) {
      setAnalysisResult("Erro ao gerar análise. Tente novamente.");
    } finally {
      setAnalyzing(false);
    }
  }, [user, repos]);

  const handleAnalyzeRepo = useCallback(async (repo: GithubRepo) => {
    setAnalyzing(true);
    setModalTitle(`Análise do Repositório: ${repo.name}`);
    setModalOpen(true);
    setAnalysisResult(null);

    try {
      const repoContext = {
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated_at: repo.updated_at,
        topics: repo.topics
      };

      const result = await analyzeRepo(JSON.stringify(repoContext));
      setAnalysisResult(result);
    } catch (err) {
      setAnalysisResult("Erro ao analisar repositório. Tente novamente.");
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const closeModal = () => {
    setModalOpen(false);
    setAnalysisResult(null);
  };

  if (!user) {
    return <LoginScreen onConnect={handleLogin} loading={loading} error={error} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header & Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProfileHeader 
              user={user} 
              onAnalyze={handleAnalyzeProfile} 
              onLogout={() => setUser(null)}
            />
            <div className="mt-6 hidden lg:block">
              <Charts repos={repos} />
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
             {/* Mobile Chart View */}
             <div className="lg:hidden">
              <Charts repos={repos} />
            </div>

            {/* Repositories */}
            <RepoList repos={repos} onAnalyze={handleAnalyzeRepo} />
          </div>
        </div>

      </div>

      {/* Analysis Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50 rounded-t-xl">
              <h3 className="text-xl font-semibold text-emerald-400 flex items-center gap-2">
                 ✨ {modalTitle}
              </h3>
              <button 
                onClick={closeModal}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 prose prose-invert max-w-none">
              {analyzing ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <LoadingSpinner className="w-12 h-12 text-emerald-500 animate-spin" />
                  <p className="text-slate-300 animate-pulse">A IA Gemini está analisando os dados...</p>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
                  {analysisResult}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-700 bg-slate-800/50 rounded-b-xl flex justify-end">
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;