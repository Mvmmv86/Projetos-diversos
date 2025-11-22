import React, { useState, useEffect } from 'react';
import { GithubIcon, LoadingSpinner, CpuIcon, ActivityIcon, ShieldCheckIcon, LockIcon } from './Icons';

interface LoginScreenProps {
  onConnect: (username: string, token: string) => void;
  loading: boolean;
  error: string | null;
}

// Animated typing component for the "AI" feel
const TypewriterEffect: React.FC<{ text: string; speed?: number }> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export const LoginScreen: React.FC<LoginScreenProps> = ({ onConnect, loading, error }) => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [isFocused, setIsFocused] = useState<'user' | 'token' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onConnect(username.trim(), token.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-900/50 rounded-full blur-3xl"></div>
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }}
        ></div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center">
        
        {/* Left Column: AI Persona / Welcome */}
        <div className="hidden lg:flex flex-col justify-center space-y-8">
            <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-lg blur opacity-25"></div>
                <div className="relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="ml-auto text-xs font-mono text-slate-500">AI_CORE_V2.5</div>
                    </div>
                    <div className="font-mono text-sm text-emerald-400 space-y-2">
                        <p>> Inicializando interface neural...</p>
                        <p>> Carregando módulos de análise...</p>
                        <p>> Aguardando input do desenvolvedor...</p>
                        <div className="h-px bg-slate-800 my-4"></div>
                        <p className="text-slate-300">
                           <TypewriterEffect text="Olá, Desenvolvedor. Eu sou a GitMind. Conecte seu repositório para que eu possa analisar seus padrões de código, sugerir otimizações e elevar seu perfil ao próximo nível." speed={30} />
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg flex items-center gap-4">
                    <div className="bg-indigo-500/20 p-3 rounded-lg">
                        <ActivityIcon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                        <div className="text-slate-400 text-xs uppercase tracking-wider">Status</div>
                        <div className="text-white font-medium">Online</div>
                    </div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg flex items-center gap-4">
                    <div className="bg-emerald-500/20 p-3 rounded-lg">
                        <ShieldCheckIcon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <div className="text-slate-400 text-xs uppercase tracking-wider">Segurança</div>
                        <div className="text-white font-medium">Encriptado</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="relative">
          {/* Card Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-b from-cyan-500 to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>
          
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
            
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

            <div className="flex flex-col items-center mb-8 text-center">
              <div className="w-20 h-20 bg-slate-800/50 border border-slate-600 rounded-full flex items-center justify-center mb-4 relative group">
                 <div className="absolute inset-0 rounded-full border border-cyan-500/30 scale-110 animate-ping opacity-20"></div>
                 <CpuIcon className="w-10 h-10 text-cyan-400 group-hover:text-white transition-colors" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2 tracking-tight">
                GitMind AI
              </h1>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Portal de Acesso</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-200 text-sm animate-fadeIn">
                <strong className="block font-bold mb-1">Erro de Conexão</strong>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1 group">
                <label className={`block text-xs font-bold uppercase tracking-wider transition-colors ${isFocused === 'user' ? 'text-cyan-400' : 'text-slate-500'}`}>
                  Identificação de Usuário (GitHub)
                </label>
                <div className="relative">
                    <div className="absolute left-3 top-3 text-slate-500">
                        <GithubIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      required
                      value={username}
                      onFocus={() => setIsFocused('user')}
                      onBlur={() => setIsFocused(null)}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-slate-950/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                      placeholder="ex: torvalds"
                    />
                </div>
              </div>

              <div className="space-y-1">
                <label className={`block text-xs font-bold uppercase tracking-wider transition-colors ${isFocused === 'token' ? 'text-cyan-400' : 'text-slate-500'}`}>
                  Chave de Acesso (Token) <span className="text-slate-600 font-normal normal-case ml-1">- Opcional</span>
                </label>
                <div className="relative">
                    <div className="absolute left-3 top-3 text-slate-500">
                        <LockIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="password"
                      value={token}
                      onFocus={() => setIsFocused('token')}
                      onBlur={() => setIsFocused(null)}
                      onChange={(e) => setToken(e.target.value)}
                      className="w-full bg-slate-950/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                      placeholder="ghp_..."
                    />
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] uppercase tracking-wide text-slate-500 font-mono">
                    <span>Rate Limit: {token ? '5000/h' : '60/h'}</span>
                    <span className="text-emerald-500/60">Secure Transmission</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !username}
                className="w-full relative overflow-hidden group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-cyan-900/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -translate-x-full skew-x-12"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <LoadingSpinner className="w-5 h-5 animate-spin" />
                      ESTABELECENDO LINK...
                    </>
                  ) : (
                    <>
                      INICIAR SISTEMA
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
                <p className="text-xs text-slate-500">
                    Powered by <span className="text-slate-300">Google Gemini 2.5 Flash</span> & GitHub API
                </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};