import React, { useState } from 'react';
import { TabType } from './types';
import { STEPS } from './constants';
import { StepCard } from './components/StepCard';
import { AIAssistant } from './components/AIAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.Render);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h1 className="font-black text-xl tracking-tight">DEPLOYER <span className="text-blue-600">PRO</span></h1>
          </div>
          
          <nav className="flex gap-1 bg-slate-100 p-1 rounded-full">
            {[
              { id: TabType.Render, label: 'Render Fix' },
              { id: TabType.Guide, label: 'HF n8n Guide' },
              { id: TabType.AIAssistant, label: 'AI Help' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {activeTab === TabType.Render && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-red-500 text-white p-3 rounded-2xl shadow-lg shadow-red-200">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-red-800">Render "Publish directory build does not exist" Hatası</h2>
                  <p className="text-red-700/80 font-medium">Bu hata, Render'ın dosyalarınızı build etmeyi unutmasından kaynaklanır.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">1. Build Command (Render Ayarları)</label>
                  <p className="text-xs text-slate-500 mb-3">Render Panelinde "Build Command" kısmına bunu yazın:</p>
                  <div className="relative group">
                    <code className="block bg-slate-900 text-green-400 p-4 rounded-xl text-sm font-mono break-all">
                      npm install && npm run build
                    </code>
                    <button 
                      onClick={() => copyToClipboard('npm install && npm run build', 'build-cmd')}
                      className="absolute right-2 top-2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors"
                    >
                      {copiedId === 'build-cmd' ? '✓' : '❐'}
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">2. Publish Directory (Render Ayarları)</label>
                  <p className="text-xs text-slate-500 mb-3">"Publish Directory" kısmına sadece bunu yazın:</p>
                  <div className="relative group">
                    <code className="block bg-slate-900 text-green-400 p-4 rounded-xl text-sm font-mono">
                      build
                    </code>
                    <button 
                      onClick={() => copyToClipboard('build', 'publish-dir')}
                      className="absolute right-2 top-2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors"
                    >
                      {copiedId === 'publish-dir' ? '✓' : '❐'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white/50 border border-red-100 p-6 rounded-2xl">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <span className="bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">!</span>
                  Neden Build Almıyor?
                </h3>
                <p className="text-sm text-red-700/80 leading-relaxed">
                  Loglarınızda <strong>"Empty build command; skipping build"</strong> yazıyor. Yani Render'a projenin nasıl derleneceğini söylememişsiniz. 
                  Yukarıdaki komutları Render dashboard'unda <strong>Settings > Build & Deploy</strong> kısmına yapıştırıp kaydedin ve manuel olarak <strong>"Clear cache & deploy"</strong> yapın.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </span>
                Proje Dosyaları (GitHub'a Yüklenecekler)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: 'App.tsx', type: 'React Code' },
                  { name: 'package.json', type: 'Config' },
                  { name: 'vite.config.ts', type: 'Build Settings' },
                  { name: 'index.html', type: 'Entry' },
                  { name: 'server.js', type: 'Backend (Optional)' },
                  { name: 'Dockerfile', type: 'Docker (Optional)' },
                  { name: 'constants.ts', type: 'Data' },
                  { name: 'types.ts', type: 'Types' }
                ].map((file, i) => (
                  <div key={i} className="group p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all cursor-default">
                    <p className="font-bold text-sm text-slate-800 mb-1">{file.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{file.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === TabType.Guide && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Hugging Face n8n Deployment</h2>
              <p className="text-slate-500">Render ile uğraşmak istemiyorsanız n8n'i Hugging Face'e kurun.</p>
            </div>
            {STEPS.map(step => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        )}

        {activeTab === TabType.AIAssistant && <AIAssistant />}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 py-4 z-40">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Deployer Pro v1.2</span>
          <span className="text-green-500 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Ready to Help
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
