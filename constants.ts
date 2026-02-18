import { Step } from './types';

export const STEPS: Step[] = [
  {
    id: 1,
    title: "Hugging Face Space Oluştur",
    description: "Hugging Face panelinde 'New Space' butonuna basın. Docker SDK seçin ve projenize bir isim verin.",
    tips: ["Görünürlük: Public", "License: Apache 2.0"]
  },
  {
    id: 2,
    title: "Dockerfile Hazırla",
    description: "Hugging Face içindeki Dockerfile dosyasına bu kodu yazın. 7860 portu zorunludur.",
    fileName: "Dockerfile",
    code: "FROM n8nio/n8n:latest\nUSER root\nENV N8N_PORT=7860\nEXPOSE 7860\nCMD [\"n8n\", \"start\"]",
    tips: ["Save butonuna bastığınızda kurulum başlar"]
  },
  {
    id: 3,
    title: "Kalıcı Veri (Persistent Storage)",
    description: "n8n verilerinizin silinmemesi için Hugging Face'de 'Settings' kısmından bir 'Storage' bağlamanız önerilir.",
    tips: ["S3 veya HF Dataset kullanabilirsiniz"]
  }
];