
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

  const stabilityVars = [
    { key: 'N8N_EXECUTIONS_PROCESS', value: 'main', desc: 'RAM kullanımını %30 azaltır (Yeni process açmaz).' },
    { key: 'N8N_PAYLOAD_SIZE_MAX', value: '16', desc: 'Büyük veri transferlerinde bağlantının kopmasını engeller.' },
    { key: 'WEBHOOK_TIMEOUT', value: '25000', desc: 'Render proxy zaman aşımı hatalarını minimize eder.' },
    { key: 'N8N_DISABLE_UI_BETA_FEATURES', value: 'true', desc: 'Arayüzü hafifletir, tarayıcı-sunucu yükünü azaltır.' }
  ];

  const keepAliveWorkflow = `{
  "nodes": [
    {
      "parameters": { "rule": { "interval": [ { "field": "minutes", "minutesInterval": 10 } ] } },
      "name": "Uyanık Tut (10dk)",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1,
      "position": [ 400, 300 ]
    },
    {
      "parameters": { "url": "https://PROJE-ADINIZ.onrender.com/healthz" },
      "name": "Kendi Kendine Ping At",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [ 620, 300 ]
    }
  ]
}`;

  return (
    <div className="min-h-screen pb-20 bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-red-600 to-amber-600 p-2 rounded-xl text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h1 className="font-black text-xl tracking-tight uppercase">n8n <span className="text-red-600">Fixer</span></h1>
          </div>
          
          <nav className="flex gap-1 bg-slate-100 p-1 rounded-full">
            <button onClick={() => setActiveTab(TabType.GithubSync)} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === TabType.GithubSync ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'}`}>🚨 Hata Çözümü</button>
            <button onClick={() => setActiveTab(TabType.Render)} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === TabType.Render ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>🛠 Render Ayar</button>
            <button onClick={() => setActiveTab(TabType.Guide)} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === TabType.Guide ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>🚀 16GB RAM Yolu</button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {activeTab === TabType.GithubSync && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* WHY THE DISCONNECT? */}
            <div className="bg-white border-2 border-red-100 rounded-[2.5rem] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <span className="text-red-600 underline decoration-red-200">Bağlantı Neden Kopuyor?</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-red-600 font-bold text-xs uppercase">Nedeni 1</div>
                  <h4 className="font-bold">RAM OOM (Out of Memory)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">n8n işlem yaparken 512MB RAM'i aşarsa Render servisi anında kapatır. Bu sırada siz "Bağlantı Kesildi" görürsünüz.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-orange-600 font-bold text-xs uppercase">Nedeni 2</div>
                  <h4 className="font-bold">Idle Sleep (Uyku Modu)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Render Free Tier, 15 dk trafik almazsa uyur. n8n uyanmaya çalışırken WebSocket bağlantısı kopar.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-amber-600 font-bold text-xs uppercase">Nedeni 3</div>
                  <h4 className="font-bold">Proxy Timeout</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Çok uzun süren (30sn+) işlemler Render'ın proxy katmanı tarafından kesilir.</p>
                </div>
              </div>
            </div>

            {/* KEEP ALIVE WORKFLOW */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
                Çözüm 1: Keep-Alive Workflow
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Render'ın uyumasını engellemek için n8n içinde her 10 dakikada bir kendi URL'ine ping atan bu workflowu kurun.
              </p>
              <div className="relative">
                <pre className="bg-black/50 border border-white/10 rounded-2xl p-6 text-[10px] font-mono text-green-400 overflow-x-auto">
                  {keepAliveWorkflow}
                </pre>
                <button 
                  onClick={() => copyToClipboard(keepAliveWorkflow, 'keep-alive')}
                  className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-xl text-[10px] font-bold hover:bg-slate-200 transition-all"
                >
                  {copiedId === 'keep-alive' ? 'KOPYALANDI' : 'KODU KOPYALA'}
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-4 italic">* URL kısmındaki "PROJE-ADINIZ" yerini kendi Render URL'iniz ile değiştirmeyi unutmayın.</p>
            </div>

            {/* STABILITY ENVS */}
            <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-xl font-black mb-6">Çözüm 2: Stabilite Değişkenleri</h3>
              <div className="space-y-4">
                {stabilityVars.map(v => (
                  <div key={v.key} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{v.key}</code>
                        <span className="text-xs font-black text-slate-800">=</span>
                        <code className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{v.value}</code>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">{v.desc}</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(`${v.key}=${v.value}`, v.key)}
                      className="text-[10px] font-bold text-slate-400 hover:text-slate-800 transition-colors"
                    >
                      {copiedId === v.key ? 'KOPYALANDI' : 'DEĞERİ KOPYALA'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-[2.5rem] p-8 flex items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="font-black text-red-900 mb-1">Hala mı kopuyor?</h3>
                <p className="text-xs text-red-700 leading-relaxed">
                  Eğer bu ayarlar da kurtarmıyorsa, yaptığınız otomasyon 512MB RAM için çok ağırdır. Kesintisiz bir n8n deneyimi için Hugging Face'e (16GB RAM) geçmelisiniz.
                </p>
              </div>
              <button onClick={() => setActiveTab(TabType.Guide)} className="bg-red-600 text-white px-6 py-3 rounded-2xl font-black text-xs shadow-lg shadow-red-200 shrink-0">16GB RAM'E GEÇ</button>
            </div>
          </div>
        )}

        {/* ... TabType.Render and TabType.Guide sections remain largely the same but benefit from the new layout ... */}
        {activeTab === TabType.Render && (
          <div className="animate-in fade-in duration-500">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200">
              <h2 className="text-3xl font-black mb-4">Render Manuel Kurulum</h2>
              <div className="p-6 bg-slate-50 rounded-3xl border space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400">Build Command</label>
                  <div className="bg-white p-3 rounded-xl border mt-1 font-mono text-sm">npm install && npm run build</div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400">Publish Directory</label>
                  <div className="bg-white p-3 rounded-xl border mt-1 font-mono text-sm">build</div>
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
          <span className="text-red-600 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
            ANTI-DISCONNECT MODE
          </span>
          <span>Render 512MB RAM Optimization</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
