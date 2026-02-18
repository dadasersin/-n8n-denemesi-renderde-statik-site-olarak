import React from 'react';
import { Step } from '../types';

export const StepCard: React.FC<{ step: Step }> = ({ step }) => (
  <div className="bg-white p-6 rounded-2xl border mb-4 shadow-sm">
    <h3 className="font-bold text-lg mb-2">{step.id}. {step.title}</h3>
    <p className="text-slate-600 mb-4">{step.description}</p>
    {step.code && (
      <pre className="bg-slate-100 p-4 rounded-lg text-xs overflow-x-auto">
        {step.code}
      </pre>
    )}
  </div>
);