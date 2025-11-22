import React from 'react';
import { GithubRepo } from '../types';
import { StarIcon, GitForkIcon, SparklesIcon, ExternalLinkIcon } from './Icons';

interface RepoListProps {
  repos: GithubRepo[];
  onAnalyze: (repo: GithubRepo) => void;
}

export const RepoList: React.FC<RepoListProps> = ({ repos, onAnalyze }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
        Repositórios Recentes
        <span className="text-sm font-normal text-slate-500 ml-auto">
          Total: {repos.length}
        </span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <div 
            key={repo.id} 
            className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-all flex flex-col group"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-bold text-emerald-400 truncate pr-4" title={repo.name}>
                {repo.name}
              </h4>
              <span className="text-xs bg-slate-900 text-slate-400 px-2 py-1 rounded border border-slate-700 whitespace-nowrap">
                {repo.private ? 'Privado' : 'Público'}
              </span>
            </div>

            <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow h-10">
              {repo.description || "Sem descrição fornecida."}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {repo.language && (
                 <span className="text-xs font-medium text-slate-300 flex items-center gap-1">
                   <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                   {repo.language}
                 </span>
              )}
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <StarIcon className="w-3 h-3" /> {repo.stargazers_count}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <GitForkIcon className="w-3 h-3" /> {repo.forks_count}
              </span>
            </div>

            <div className="flex gap-3 mt-auto pt-4 border-t border-slate-700/50">
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 bg-slate-900 hover:bg-slate-700 text-slate-300 text-sm py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Ver Code <ExternalLinkIcon className="w-3 h-3" />
              </a>
              <button 
                onClick={() => onAnalyze(repo)}
                className="flex-1 bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-900/50 text-emerald-400 text-sm py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <SparklesIcon className="w-3 h-3" /> IA Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};