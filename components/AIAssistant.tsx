import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

export const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  return (
    <div className="bg-white border rounded-2xl p-4">
      <p className="text-sm text-slate-500 italic">AI Asistanı projenin API_KEY ile çalışır.</p>
    </div>
  );
};