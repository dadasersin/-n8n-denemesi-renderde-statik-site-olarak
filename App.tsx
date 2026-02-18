
import React, { useState } from 'react';
import { TabType } from './types';
import { STEPS } from './constants';
import { StepCard } from './components/StepCard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.GithubSync);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const envVars = [
    { key: 'N8N_EXECUTIONS_PROCESS', value: 'main', desc: 'Ayrı süreç açmaz, RAM tasarrufu sağlar.' },
    { key: 'EXECUTIONS_DATA_SAVE_MAX_COUNT', value: '20', desc: 'Eski kayıtları siler, DB/RAM şişmesini önler.' },
    { key: 'EXECUTIONS_DATA_PRUNE', value: 'true', desc: 'Otomatik temizliği aktif eder.' },
    { key: 'N8N_METRICS', value: 'false', desc: 'Gereksiz izleme verilerini kapatır.' }
  ];

  return (
    <div className="min-h-screen pb-20 bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-2 rounded-xl text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h1 className="font-black text-xl tracking-tight">n8n <span className="text-green-600">STABLE</span></h1>
          </div>
          
          <nav className="flex gap-1 bg-slate-100 p-1 rounded-full">
            <button onClick={() => setActiveTab(TabType.GithubSync)} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === TabType.GithubSync ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>🔄 Hata Çözüm & Sync</button>
            <button onClick={() => setActiveTab(TabType.Render)} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === TabType.Render ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'}`}>🛠 Render Fix</button>
            <button onClick={() => setActiveTab(TabType.Guide)} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === TabType.Guide ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>📖 16GB RAM Yolu</button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {activeTab === TabType.GithubSync && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* STABILIZATION ALERT */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-[2.5rem] p-8 shadow-xl shadow-emerald-50">
              <h2 className="text-2xl font-black text-emerald-800 mb-2">Çökmeleri Durdurun: RAM Optimizasyonu</h2>
              <p className="text-emerald-700 text-sm mb-6 italic">Render Free Tier'da n8n'in "Bağlantı Kesildi" hatası vermemesi için bu ayarları yapmalısınız:</p>
              
              <div className="grid gap-4">
                {envVars.map((env) => (
                  <div key={env.key} className="bg-white/80 p-4 rounded-2xl border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <code className="text-emerald-600 font-bold text-sm bg-emerald-100 px-2 py-1 rounded">{env.key}</code>
                      <p className="text-[11px] text-slate-500 mt-1">{env.desc}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-slate-100 px-4 py-2 rounded-xl text-xs font-mono">{env.value}</code>
                      <button 
                        onClick={() => copyToClipboard(env.value, env.key)}
                        className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600 transition-colors"
                      >
                        {copiedId === env.key ? '✓' : '📋'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FLOW TIPS */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                İş Akışı Tasarımı (Anti-Crash)
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-indigo-500/20 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-indigo-300">"Split In Batches" Kullanın</h4>
                    <p className="text-xs text-slate-400 mt-1">Eğer 100+ workflow yedekleyecekseniz, hepsini bir kerede GitHub'a basmayın. 10'arlı paketler halinde gönderin. RAM ani yükselişten kurtulur.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-indigo-500/20 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-indigo-300">"Wait" Node'u Ekleyin</h4>
                    <p className="text-xs text-slate-400 mt-1">Döngüler arasına 1-2 saniyelik "Wait" node'ları koyarak sunucunun (Render) nefes almasını sağlayın.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-100 border-2 border-amber-200 rounded-[2.5rem] p-8 flex items-start gap-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h3 className="font-black text-amber-900">Son Çare</h3>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Eğer bu ayarlara rağmen hala "Bağlantı Kesildi" diyorsa, Render artık yetmiyor demektir. Hugging Face Spaces'e geçerseniz <strong>32 kat daha fazla RAM (16GB)</strong> elde edersiniz ve bu hataların tamamı tarih olur.
                </p>
                <button 
                  onClick={() => setActiveTab(TabType.Guide)}
                  className="mt-4 bg-amber-900 text-white px-6 py-2 rounded-xl font-bold text-xs hover:bg-amber-800 transition-colors"
                >
                  HF REHBERİNE GİT
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === TabType.Render && (
          <div className="animate-in fade-in duration-500">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200">
              <h2 className="text-3xl font-black mb-4 text-red-600">Render Manuel Kurulum</h2>
              <p className="text-slate-500 mb-8 italic">Statik site hatası alanlar için Dashboard ayarları.</p>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Build Command</p>
                  <code className="text-indigo-600 font-bold">npm install && npm run build</code>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Publish Directory</p>
                  <code className="text-indigo-600 font-bold">build</code>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === TabType.Guide && (
          <div className="space-y-6 animate-in fade-in duration-500">
             {STEPS.map(step => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 py-4 z-40">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            STABILIZATION ACTIVE
          </span>
          <span className="text-slate-400">OPTIMIZED FOR RENDER FREE TIER</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
