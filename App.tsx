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
    <div className="min-h-screen pb-20 bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-red-600 to-orange-500 p-2 rounded-xl text-white shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h1 className="font-black text-xl tracking-tight">RENDER <span className="text-red-600">RESCUE</span></h1>
          </div>
          
          <nav className="flex gap-1 bg-slate-100 p-1 rounded-full">
            <button 
              onClick={() => setActiveTab(TabType.Render)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === TabType.Render ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'}`}
            >
              🛠 ÇÖZÜM ADIMLARI
            </button>
            <button 
              onClick={() => setActiveTab(TabType.Guide)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === TabType.Guide ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
              📖 n8n REHBERİ
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {activeTab === TabType.Render && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Critical Alert */}
            <div className="bg-white border-l-8 border-red-500 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-red-500">⚠</span> Hatayı Anlayalım
              </h2>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-red-400 mb-6">
                <p>==&gt; Empty build command; skipping build</p>
                <p>==&gt; Publish directory build does not exist!</p>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Bu log şunu söylüyor: Render'a projenin nasıl derleneceğini söylememişsiniz. 
                <strong>render.yaml</strong> dosyasını sadece "Blueprint" olarak eklediğinizde tanır. 
                Var olan bir "Static Site" projesinde ayarları <strong>manuel</strong> yapmalısınız.
              </p>
            </div>

            {/* Visual Step Guide */}
            <div className="grid gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                  <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  Dashboard'a Gidin
                </h3>
                <p className="text-slate-600 mb-4">
                  Render panelinde projenize tıklayın, ardından sol menüden <strong>Settings</strong> sekmesine girin.
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                  <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  Build & Deploy Kısmını Bulun
                </h3>
                <p className="text-slate-600 mb-6">Aşağıdaki alanları tam olarak böyle doldurun:</p>
                
                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Build Command</label>
                      <button 
                        onClick={() => copyToClipboard('npm install && npm run build', 'b-cmd')}
                        className="text-blue-600 text-[10px] font-bold hover:underline"
                      >
                        {copiedId === 'b-cmd' ? 'KOPYALANDI' : 'KOPYALA'}
                      </button>
                    </div>
                    <code className="text-indigo-600 font-bold">npm install && npm run build</code>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Publish Directory</label>
                      <button 
                        onClick={() => copyToClipboard('build', 'p-dir')}
                        className="text-blue-600 text-[10px] font-bold hover:underline"
                      >
                        {copiedId === 'p-dir' ? 'KOPYALANDI' : 'KOPYALA'}
                      </button>
                    </div>
                    <code className="text-indigo-600 font-bold">build</code>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100">
                <h3 className="text-xl font-black mb-4 flex items-center gap-3">
                  <span className="bg-white text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                  Yeniden Yayına Alın
                </h3>
                <p className="mb-6 opacity-90">Ayarları kaydettikten sonra en üste çıkın:</p>
                <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-sm">
                  <strong>Manual Deploy</strong> butonuna basın ve <strong>Clear Cache and Deploy</strong> seçeneğini seçin.
                </div>
              </div>
            </div>

            {/* Why it fails info */}
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 text-sm text-amber-800 italic">
              *Not: Loglarda gördüğünüz "Installing dependencies" kısmı Render'ın otomatik yaptığı bir işlemdir. 
              Asıl "Build Command" (npm run build) boş olduğu için Vite dosyaları derleyemiyor ve "build" klasörü oluşmuyor.
            </div>
          </div>
        )}

        {activeTab === TabType.Guide && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {STEPS.map(step => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 py-4 z-40">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Diagnostic Active</span>
          <span className="text-red-500">Check Your Build Settings</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
