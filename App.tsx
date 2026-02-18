
import React, { useState } from 'react';
import { TabType } from './types';
import { STEPS } from './constants';
import { StepCard } from './components/StepCard';
import { AIAssistant } from './components/AIAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.GithubSync);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const n8nWorkflowJson = `{
  "nodes": [
    {
      "parameters": { "rule": { "interval": [ { "field": "minutes", "minutesInterval": 2 } ] } },
      "name": "2 Dakikada Bir Çalış",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1,
      "position": [ 400, 300 ]
    },
    {
      "parameters": { "resource": "workflow", "operation": "getAll" },
      "name": "Tüm Workflows Çek",
      "type": "n8n-nodes-base.n8n",
      "typeVersion": 1,
      "position": [ 620, 300 ]
    },
    {
      "parameters": {
        "authentication": "oAuth2",
        "resource": "file",
        "operation": "edit",
        "owner": "GITHUB_KULLANICI_ADINIZ",
        "repository": "REPOSİTORY_ADINIZ",
        "filePath": "workflows/backup.json",
        "fileContent": "={{ JSON.stringify($json) }}",
        "commitMessage": "Otomatik n8n Yedeklemesi"
      },
      "name": "GitHub'a Gönder",
      "type": "n8n-nodes-base.github",
      "typeVersion": 1,
      "position": [ 840, 300 ]
    }
  ]
}`;

  return (
    <div className="min-h-screen pb-20 bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </div>
            <h1 className="font-black text-xl tracking-tight hidden sm:block">n8n <span className="text-blue-600">SYNC</span></h1>
          </div>
          
          <nav className="flex gap-1 bg-slate-100 p-1 rounded-full">
            <button 
              onClick={() => setActiveTab(TabType.GithubSync)}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === TabType.GithubSync ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              🔄 GitHub Sync
            </button>
            <button 
              onClick={() => setActiveTab(TabType.Render)}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === TabType.Render ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'}`}
            >
              🛠 Render Fix
            </button>
            <button 
              onClick={() => setActiveTab(TabType.Guide)}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === TabType.Guide ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
            >
              📖 HF Guide
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {activeTab === TabType.GithubSync && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* ERROR ALERT BOX */}
            <div className="bg-red-50 border-2 border-red-200 rounded-[2.5rem] p-8 shadow-xl shadow-red-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-red-800 mb-4">"Sunucuyla Bağlantı Kesildi" Hatası mı?</h2>
                <p className="text-red-700 font-medium mb-6">
                  Bu hata genellikle Render'ın <strong>Free Tier (Ücretsiz)</strong> limitlerinden kaynaklanır. İşte çözümleri:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/60 p-4 rounded-2xl border border-red-100">
                    <h4 className="font-bold text-red-900 text-sm mb-1">1. RAM Yetersizliği</h4>
                    <p className="text-[11px] text-red-700">n8n yedekleme yaparken tüm datayı RAM'e çeker. Render 512MB RAM'de bunu yaparken çöker. <strong>Hugging Face (16GB RAM)</strong>'e geçmeyi düşünün.</p>
                  </div>
                  <div className="bg-white/60 p-4 rounded-2xl border border-red-100">
                    <h4 className="font-bold text-red-900 text-sm mb-1">2. WebSocket Kopması</h4>
                    <p className="text-[11px] text-red-700">Render'ın ücretsiz planı bazen bağlantıları keser. Sayfayı yenileyip workflow'u manuel "Execute" etmeyi deneyin.</p>
                  </div>
                  <div className="bg-white/60 p-4 rounded-2xl border border-red-100">
                    <h4 className="font-bold text-red-900 text-sm mb-1">3. Render Logs</h4>
                    <p className="text-[11px] text-red-700">Render panelinde "Logs" kısmına bakın. <strong>"Out of Memory"</strong> veya <strong>"Exit status 1"</strong> yazıyorsa sunucu çökmüş demektir.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  <h3 className="text-xl font-black text-slate-800">İş Akışını İçe Aktar</h3>
                </div>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  İçe aktarırken bağlantı kopuyorsa, kodu kopyalayıp n8n tuvaline <strong>CTRL+V</strong> ile yapıştırmayı deneyin.
                </p>
                <div className="relative group">
                  <div className="bg-slate-900 rounded-2xl p-4 max-h-48 overflow-y-auto text-indigo-300 font-mono text-[10px]">
                    {n8nWorkflowJson}
                  </div>
                  <button 
                    onClick={() => copyToClipboard(n8nWorkflowJson, 'wf-json')}
                    className="absolute top-2 right-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-lg text-[10px] font-bold shadow-lg"
                  >
                    {copiedId === 'wf-json' ? 'KOPYALANDI!' : 'KOPYALA'}
                  </button>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  <h3 className="text-xl font-black text-slate-800">GitHub Ayarı</h3>
                </div>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  Bağlantı hatası almamak için GitHub Credential'larınızı önceden <strong>Credentials</strong> sekmesinden kurun.
                </p>
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-600 w-5 h-5 rounded-full flex items-center justify-center text-[10px]">✓</span>
                    "n8n node" ayarlarında "n8n connection" node'u yerine kendi instance URL'inizi yazın.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-600 w-5 h-5 rounded-full flex items-center justify-center text-[10px]">✓</span>
                    Render üzerinde çalışan n8n'in <strong>N8N_ENCRYPTION_KEY</strong> değerini kontrol edin.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-xl shadow-blue-100">
              <h3 className="text-2xl font-black mb-4">Kesin Çözüm: Hugging Face'e Taşın</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Render Ücretsiz planı (512MB RAM) n8n için <strong>yetersizdir</strong>. Yedekleme sırasında "Sunucuyla bağlantı kesildi" diyorsa muhtemelen RAM dolmuş ve Render süreci durdurmuştur.
              </p>
              <button 
                onClick={() => setActiveTab(TabType.Guide)}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-lg"
              >
                16GB RAM'Lİ HF KURULUMUNA GİT
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        )}

        {activeTab === TabType.Render && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-red-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <h2 className="text-4xl font-black mb-6 italic">RENDER "STATIC" ERROR?</h2>
              <p className="text-red-100 text-xl font-medium leading-relaxed max-w-2xl">
                Eğer projeniz hala "Static Site" olarak görünüyorsa ve loglarda "Empty build command" varsa ayarları manuel yapmanız şarttır.
              </p>
            </div>
            {/* ... Manuel Ayarlar Kısmı ... */}
          </div>
        )}

        {activeTab === TabType.Guide && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 mb-10">
              <h2 className="text-3xl font-black mb-4">Hugging Face n8n Rehberi</h2>
              <p className="text-slate-500 leading-relaxed italic">Neden HF? Çünkü Render çökerken HF 16GB RAM ile akmaya devam eder.</p>
            </div>
            {STEPS.map(step => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 py-4 z-40">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Troubleshooting: Connection Lost</span>
          <span className="text-indigo-600">RAM LIMITS DETECTED</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
