import { Step } from './types';

export const STEPS: Step[] = [
  {
    id: 1,
    title: "Hugging Face Space Oluştur",
    description: "Hugging Face panelinde yeni bir Space oluşturun. 'Docker' seçeneğini işaretleyin.",
    tips: ["Boş şablon seçin", "Görünürlüğü Public yapın"]
  },
  {
    id: 2,
    title: "n8n Dockerfile",
    description: "Aşağıdaki kodu Dockerfile dosyanıza yapıştırın. Bu kod n8n'i 7860 portunda (HF standardı) çalıştıracaktır.",
    fileName: "Dockerfile",
    code: "FROM n8nio/n8n:latest\nUSER root\nENV N8N_PORT=7860\nEXPOSE 7860\nCMD [\"n8n\", \"start\"]"
  },
  {
    id: 3,
    title: "Render Statik Site Ayarları",
    description: "Eğer bu uygulamayı Render'da statik site olarak kullanacaksanız:",
    tips: [
      "Build Command: npm install && npm run build",
      "Publish Directory: build"
    ]
  }
];