
export interface Step {
  id: number;
  title: string;
  description: string;
  code?: string;
  fileName?: string;
  tips?: string[];
}

export enum TabType {
  Guide = 'guide',
  Render = 'render',
  AIAssistant = 'ai-assistant',
  GithubSync = 'github-sync'
}
