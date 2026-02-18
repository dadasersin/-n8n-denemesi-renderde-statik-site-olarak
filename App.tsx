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

  const renderYamlContent = `services:
  - type: static
    name: n8n-deployer-guide
    env: static
    buildCommand: npm install && npm run build
    publishPath: build`;

  return (
    <div className="min-h-screen pb-20 bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-500 p-2 rounded-xl text-white shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h1 className="font-black text-xl tracking-tight hidden sm:block">DEPLOYER <span className="text-blue-600">PRO</span></h1>
          </div>
          
          <nav className="flex gap-1 bg-slate-100 p-1 rounded-full">
            {[
              { id: TabType.Render, label: '🚀 Render Fix' },
              { id: TabType.Guide, label: '🤗 HF Guide' },
              { id: TabType.AIAssistant, label: '🤖 AI Help' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm scale-105' 
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
            {/* Error Message Box */}
            <div className="bg-red-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-red-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-4">Hatanın Çözümü Burada!</h2>
                <p className="text-red-100 text-lg font-medium leading-relaxed max-w-2xl">
                  Render projenizi "Statik Site" olarak kurduğunuzu ancak <strong>Build Command</strong> kısmını boş bıraktığınızı söylüyor. 
                  Bu yüzden <code>build</code> klasörü hiç oluşmuyor.
                </p>
              </div>
            </div>

            {/* Ultimate Fix Section */}
            <div className="bg-white border-2 border-indigo-100 rounded-[2.5rem] p-8 shadow-xl">
              <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white text-lg">1</span>
                Kesin Çözüm: render.yaml Dosyası
              </h3>
              <p className="text-slate-600 mb-6">
                Aşağıdaki içeriği <code>render.yaml</code> adında bir dosya oluşturup GitHub deponuzun ana dizinine (root) yükleyin. 
                Render bu dosyayı gördüğünde tüm ayarları otomatik yapacaktır.
              </p>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-slate-900 rounded-2xl p-6 overflow-hidden">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-4">
                    <span className="text-slate-400 text-xs font-mono">render.yaml</span>
                    <button 
                      onClick={() => copyToClipboard(renderYamlContent, 'yaml')}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                    >
                      {copiedId === 'yaml' ? 'KOPYALANDI!' : 'DOSYAYI KOPYALA'}
                    </button>
                  </div>
                  <pre className="text-indigo-300 font-mono text-sm leading-relaxed overflow-x-auto">
                    {renderYamlContent}
                  </pre>
                </div>
              </div>
            </div>

            {/* Manual Fix Section */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white text-lg">2</span>
                Alternatif: Manuel Ayarlar
              </h3>
              <p className="text-slate-600 mb-8">Eğer dosya eklemek istemiyorsanız, Render panelinden şunları düzeltin:</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    <label className="text-sm font-black text-slate-500 uppercase">Build Command</label>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 font-mono text-sm break-all">
                    npm install && npm run build
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    <label className="text-sm font-black text-slate-500 uppercase">Publish Directory</label>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 font-mono text-sm">
                    build
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-blue-50 rounded-3xl border border-blue-100">
                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                  Unutmayın!
                </h4>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Bu ayarları yaptıktan sonra Render dashboard'unda <strong>Manual Deploy &gt; Clear Cache and Deploy</strong> butonuna basmayı unutmayın.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === TabType.Guide && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Hugging Face n8n Kurulumu</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Ücretsiz 16GB RAM ile n8n çalıştırmak için en mantıklı yer Hugging Face Spaces'tir.
              </p>
            </div>
            {STEPS.map(step => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        )}

        {activeTab === TabType.AIAssistant && <AIAssistant />}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 py-4 z-40">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Auto-Fix Active</span>
          <span className="text-blue-600">Developed for n8n Community</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
