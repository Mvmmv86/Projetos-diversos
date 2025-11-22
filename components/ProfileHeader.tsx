import React from 'react';
import { GithubUser } from '../types';
import { MapPinIcon, LinkIcon, SparklesIcon, LogOutIcon } from './Icons';

interface ProfileHeaderProps {
  user: GithubUser;
  onAnalyze: () => void;
  onLogout: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onAnalyze, onLogout }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg relative">
      <button 
        onClick={onLogout}
        className="absolute top-4 right-4 text-slate-400 hover:text-red-400 transition-colors p-2"
        title="Sair"
      >
        <LogOutIcon className="w-5 h-5" />
      </button>

      <div className="flex flex-col items-center text-center md:items-start md:text-left">
        <img 
          src={user.avatar_url} 
          alt={user.login} 
          className="w-32 h-32 rounded-full border-4 border-slate-700 shadow-xl mb-4"
        />
        
        <h2 className="text-2xl font-bold text-white">{user.name || user.login}</h2>
        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-emerald-400 transition-colors mb-4"
        >
          @{user.login}
        </a>

        {user.bio && (
          <p className="text-slate-300 mb-6 leading-relaxed">
            {user.bio}
          </p>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-6 justify-center md:justify-start">
          {user.location && (
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              {user.location}
            </div>
          )}
          {user.blog && (
            <div className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noreferrer" className="hover:text-white truncate max-w-[150px]">
                Website
              </a>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 w-full mb-6">
          <div className="bg-slate-900/50 p-3 rounded-lg text-center">
            <div className="text-xl font-bold text-white">{user.public_repos}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Repos</div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-lg text-center">
            <div className="text-xl font-bold text-white">{user.followers}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Seguidores</div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-lg text-center">
            <div className="text-xl font-bold text-white">{user.following}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Seguindo</div>
          </div>
        </div>

        <button
          onClick={onAnalyze}
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium py-3 rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 group"
        >
          <SparklesIcon className="w-5 h-5 text-yellow-200 group-hover:animate-pulse" />
          Analisar Perfil com IA
        </button>
      </div>
    </div>
  );
};