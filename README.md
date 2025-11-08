# Audio Whisper - Speech-to-Text Tool

An audio transcription application built with Next.js 16, powered by OpenAI Whisper API, supporting multiple audio formats for high-quality speech-to-text conversion.

## Features

- 🎤 Multi-format support: MP3, MP4, WAV, M4A, WEBM
- 📝 High-accuracy English speech recognition
- 🌙 Dark mode support
- 📱 Responsive design for all devices
- 📋 One-click copy transcription results
- ⚡ Fast transcription processing
- 🔒 Secure file handling (25MB limit)

## Tech Stack

- **Frontend**: Next.js 16.0.1 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **API**: OpenAI Whisper API
- **Package Manager**: pnpm

## Quick Start

### Requirements

- Node.js 18+
- pnpm (recommended) or npm
- OpenAI API Key

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd audio-whisper
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Environment setup**
Create `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Start development server**
```bash
pnpm dev
```

5. **Open application**
Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Upload audio**: Click "Choose Audio File" button to upload your audio file
2. **File validation**: System automatically checks file format and size
3. **Start transcription**: Click "Start Conversion" button to begin speech-to-text
4. **Copy results**: One-click copy the transcribed text content

## API Reference

### POST `/api/transcribe`

**Request format**: multipart/form-data

**Parameters**:
- `file`: Audio file (required)

**Response format**:
```json
{
  "success": true,
  "text": "Transcribed text content",
  "fileName": "audio.mp3",
  "fileSize": 1048576
}
```

**Error response**:
```json
{
  "error": "Error message"
}
```

## File Limitations

- **File size**: Maximum 25MB (OpenAI Whisper API limit)
- **Supported formats**: 
  - Audio types: mp3, mp4, mpeg, mpga, m4a, wav, webm
  - MIME types: audio/mp3, audio/mp4, audio/mpeg, audio/mpga, audio/m4a, audio/x-m4a, audio/wav, audio/webm

## Development Commands

```bash
# Development mode
pnpm dev

# Build project
pnpm build

# Start production
pnpm start

# Lint code
pnpm lint
```

## Project Structure

```
audio-whisper/
├── app/
│   ├── api/
│   │   └── transcribe/
│   │       └── route.ts          # Whisper API route
│   ├── layout.tsx                # Global layout
│   └── page.tsx                  # Main page
├── package.json                  # Project config
├── tsconfig.json                 # TypeScript config
└── README.md                     # Project documentation
```

## Core Files

- `app/page.tsx`: Main user interface with file upload and transcription features
- `app/api/transcribe/route.ts`: Backend API route handling Whisper API calls
- `package.json`: Project dependencies and script configurations

## Error Handling

The application includes comprehensive error handling:

- File size limit warnings
- Unsupported format alerts
- API key error notifications
- Network connection error handling
- Transcription failure retry suggestions

## Deployment

### Vercel Deployment

1. Connect GitHub repository to Vercel
2. Set environment variable `OPENAI_API_KEY` in Vercel dashboard
3. Automatic deployment complete

### Other Platforms

Ensure to set the following environment variables:
- `OPENAI_API_KEY`: OpenAI API key

## Important Notes

- Whisper API has strict file size limits (25MB)
- Some users report issues with files larger than 10MB
- Consider splitting large audio files for better processing
- API calls incur charges, monitor OpenAI billing

## License

This project is a personal portfolio project for learning and demonstration purposes.

## Contact

Feel free to open Issues or Pull Requests for questions or suggestions.

---

# Audio Whisper - 音檔轉文字工具

基於 OpenAI Whisper API 的音檔轉錄應用程式，使用 Next.js 16 開發，支援多種音檔格式的語音轉文字功能。

## 功能特色

- 🎤 支援多種音檔格式：MP3, MP4, WAV, M4A, WEBM
- 📝 高精度英文語音識別
- 🌙 支援深色模式
- 📱 響應式設計，適配各種裝置
- 📋 一鍵複製轉錄結果
- ⚡ 快速轉錄處理
- 🔒 安全的檔案處理（最大25MB限制）

## 技術架構

- **前端框架**: Next.js 16.0.1 with React 19
- **語言**: TypeScript
- **樣式**: Tailwind CSS 4
- **API**: OpenAI Whisper API
- **包管理器**: pnpm

## 快速開始

### 環境需求

- Node.js 18+ 
- pnpm (推薦) 或 npm
- OpenAI API Key

### 安裝步驟

1. **克隆專案**
```bash
git clone <your-repo-url>
cd audio-whisper
```

2. **安裝依賴**
```bash
pnpm install
```

3. **環境變數設置**
在專案根目錄建立 `.env.local` 檔案：
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. **啟動開發伺服器**
```bash
pnpm dev
```

5. **訪問應用**
開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

## 使用說明

1. **上傳音檔**: 點擊「選擇音檔文件」按鈕上傳音檔
2. **檔案檢查**: 系統會自動檢查檔案格式和大小
3. **開始轉錄**: 點擊「開始轉換」按鈕進行語音轉文字
4. **複製結果**: 轉錄完成後可一鍵複製文字內容

## API 規格

### POST `/api/transcribe`

**請求格式**: multipart/form-data

**參數**:
- `file`: 音檔文件 (必需)

**響應格式**:
```json
{
  "success": true,
  "text": "轉錄文字內容",
  "fileName": "audio.mp3",
  "fileSize": 1048576
}
```

**錯誤響應**:
```json
{
  "error": "錯誤訊息"
}
```

## 檔案限制

- **檔案大小**: 最大 25MB (OpenAI Whisper API 限制)
- **支援格式**: 
  - 音檔類型: mp3, mp4, mpeg, mpga, m4a, wav, webm
  - MIME types: audio/mp3, audio/mp4, audio/mpeg, audio/mpga, audio/m4a, audio/x-m4a, audio/wav, audio/webm

## 開發指令

```bash
# 開發模式
pnpm dev

# 建構專案
pnpm build

# 啟動正式環境
pnpm start

# 程式碼檢查
pnpm lint
```

## 專案結構

```
audio-whisper/
├── app/
│   ├── api/
│   │   └── transcribe/
│   │       └── route.ts          # Whisper API 路由
│   ├── layout.tsx                # 全域佈局
│   └── page.tsx                  # 主頁面
├── package.json                  # 專案配置
├── tsconfig.json                 # TypeScript 配置
└── README.md                     # 專案說明
```

## 核心檔案說明

- `app/page.tsx`: 主要使用者介面，包含檔案上傳和轉錄功能
- `app/api/transcribe/route.ts`: 後端 API 路由，處理 Whisper API 調用
- `package.json`: 專案依賴和腳本配置

## 錯誤處理

應用程式包含完善的錯誤處理機制：

- 檔案大小超限提醒
- 不支援檔案格式警告  
- API 金鑰錯誤提示
- 網路連線異常處理
- 轉錄失敗重試建議

## 部署建議

### Vercel 部署

1. 連接 GitHub 專案到 Vercel
2. 在 Vercel 儀表板設置環境變數 `OPENAI_API_KEY`
3. 自動部署完成

### 其他平台

確保在部署平台設置以下環境變數：
- `OPENAI_API_KEY`: OpenAI API 金鑰
