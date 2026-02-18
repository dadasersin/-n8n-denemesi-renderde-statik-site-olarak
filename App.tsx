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
            <div className="bg-gradient-to-br from-red-600 to-rose-500 p-2 rounded-xl text-white shadow-lg shadow-rose-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h1 className="font-black text-xl tracking-tight">RENDER <span className="text-red-600">DASHBOARD FIX</span></h1>
          </div>
          
          <nav className="flex gap-1 bg-slate-100 p-1 rounded-full">
            <button 
              onClick={() => setActiveTab(TabType.Render)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === TabType.Render ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'}`}
            >
              🛠 ADIM ADIM ÇÖZÜM
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
            {/* The "Why" Section */}
            <div className="bg-red-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl font-black mb-6">Hata GitHub'da Değil!</h2>
                <p className="text-red-100 text-xl font-medium leading-relaxed max-w-2xl mb-6">
                  Loglarda <strong>"Empty build command; skipping build"</strong> yazıyor. Yani Render senin dosyalarını görüyor ama "Bunları nasıl çalıştıracağımı bana söylemedin" diyor.
                </p>
                <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-2xl border border-white/30 backdrop-blur-sm">
                  <span className="animate-pulse w-3 h-3 bg-white rounded-full"></span>
                  <span className="font-bold text-sm tracking-wide">Çözüm: Render Dashboard'una 2 kelime yazmak.</span>
                </div>
              </div>
            </div>

            {/* Steps with Dashboard Simulator */}
            <div className="space-y-6">
              <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex items-start gap-4 mb-8">
                  <div className="bg-slate-900 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-black flex-shrink-0 shadow-lg">1</div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">Render Ayarlarını Açın</h3>
                    <p className="text-slate-500 font-medium">Render Dashboard'da projenize girin ve sol menüden <strong>Settings</strong> düğmesine basın.</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-8 space-y-10">
                  {/* Dashboard Input Simulator 1 */}
                  <div className="group">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Build Command Alanını Bul</span>
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded">BOŞ KALMAMALI</span>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('npm install && npm run build', 'cmd-1')}
                        className="text-blue-600 text-xs font-black hover:bg-blue-50 px-3 py-1 rounded-lg transition-all"
                      >
                        {copiedId === 'cmd-1' ? '✓ KOPYALANDI' : 'KOPYALA'}
                      </button>
                    </div>
                    <div className="bg-slate-50 border-2 border-slate-200 p-6 rounded-3xl font-mono text-lg text-indigo-600 shadow-inner group-hover:border-indigo-200 transition-colors">
                      npm install && npm run build
                    </div>
                  </div>

                  {/* Dashboard Input Simulator 2 */}
                  <div className="group">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Publish Directory Alanını Bul</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">build YAZILMALI</span>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('build', 'dir-1')}
                        className="text-blue-600 text-xs font-black hover:bg-blue-50 px-3 py-1 rounded-lg transition-all"
                      >
                        {copiedId === 'dir-1' ? '✓ KOPYALANDI' : 'KOPYALA'}
                      </button>
                    </div>
                    <div className="bg-slate-50 border-2 border-slate-200 p-6 rounded-3xl font-mono text-lg text-indigo-600 shadow-inner group-hover:border-indigo-200 transition-colors">
                      build
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Step */}
              <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-xl shadow-indigo-100">
                <div className="flex items-start gap-4">
                  <div className="bg-white text-indigo-600 w-10 h-10 rounded-2xl flex items-center justify-center font-black flex-shrink-0 shadow-lg">2</div>
                  <div>
                    <h3 className="text-2xl font-black mb-4">Kaydedin ve Deploy Edin</h3>
                    <p className="text-indigo-100 mb-8 leading-relaxed">
                      Sayfanın en altındaki <strong>Save Changes</strong> butonuna basın. Ardından sağ üstteki <strong>Manual Deploy</strong> butonuna basıp <strong>Clear Cache and Deploy</strong> seçeneğini seçin.
                    </p>
                    <div className="bg-white/10 border border-white/20 p-6 rounded-3xl backdrop-blur-md">
                      <p className="text-sm font-bold flex items-center gap-2">
                        <svg className="w-5 h-5 text-indigo-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                        Neden render.yaml çalışmadı?
                      </p>
                      <p className="mt-2 text-xs text-indigo-200 leading-normal">
                        Mevcut bir servise sonradan <code>render.yaml</code> eklerseniz Render bunu görmezden gelebilir. En garantisi "Settings" içinden yukarıdaki değerleri manuel girmektir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Log Comparison */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-slate-400 overflow-hidden relative">
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest opacity-50">Önceki Hata Logu (Kırmızı)</h4>
              <div className="font-mono text-xs space-y-1 mb-8">
                <p className="text-red-400">==&gt; Empty build command; skipping build</p>
                <p className="text-red-400">==&gt; Publish directory build does not exist!</p>
              </div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest opacity-50">Düzeldikten Sonraki Log (Yeşil)</h4>
              <div className="font-mono text-xs space-y-1">
                <p className="text-green-400">==&gt; Running build command 'npm install &amp;&amp; npm run build'...</p>
                <p className="text-green-400">==&gt; Uploading build...</p>
                <p className="text-green-400">==&gt; Build successful 🎉</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === TabType.Guide && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 mb-10">
              <h2 className="text-3xl font-black mb-4">Hugging Face n8n Rehberi</h2>
              <p className="text-slate-500 leading-relaxed">Render ile uğraşmak istemeyenler için alternatif yol. 16GB RAM ile n8n keyfi!</p>
            </div>
            {STEPS.map(step => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 py-4 z-40">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Final Diagnostic</span>
          <span className="text-red-500 flex items-center gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            MANUAL ACTION REQUIRED
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
