'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setTranscription('');
    }
  };

  const handleTranscribe = async () => {
    if (!file) {
      setError('Please select an audio file first');
      return;
    }

    if (!apiKey.trim()) {
      setError('Please enter your OpenAI API key');
      return;
    }

    setIsTranscribing(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apiKey', apiKey.trim());

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setTranscription(result.text);
      } else {
        setError(result.error || 'Transcription failed');
      }
    } catch (error) {
      setError('Network error, please try again later');
    } finally {
      setIsTranscribing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900">
      <main className="w-full max-w-2xl p-8">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-4 text-zinc-900 dark:text-zinc-100">
            English Audio to Text Tool
          </h1>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mb-8">
            Convert English speech to text using OpenAI Whisper API
          </p>

          <div className="space-y-6">
            {/* API Key 輸入區域 */}
            <div className="space-y-2">
              <label htmlFor="apiKey" className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                OpenAI API Key
              </label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your OpenAI API key (sk-...)"
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
              />
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Your API key is only used for this request and is not stored anywhere
              </p>
            </div>

            {/* 文件上傳區域 */}
            <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg p-6">
              <div className="text-center">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="audioFile"
                />
                <label
                  htmlFor="audioFile"
                  className="cursor-pointer inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Choose Audio File
                </label>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  Supported formats: MP3, MP4, WAV, M4A, WEBM (Max 25MB)
                </p>
                <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                  ⚠️ English audio only
                </p>

                {file && (
                  <div className="mt-4 p-3 bg-zinc-100 dark:bg-zinc-700 rounded text-sm">
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{file.name}</p>
                    <p className="text-zinc-600 dark:text-zinc-300">{formatFileSize(file.size)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 轉換按鈕 */}
            <button
              onClick={handleTranscribe}
              disabled={!file || !apiKey.trim() || isTranscribing}
              className="w-full py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors"
            >
              {isTranscribing ? 'Converting...' : 'Start Conversion'}
            </button>

            {/* 錯誤訊息 */}
            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg">
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* 轉換結果 */}
            {transcription && (
              <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">Transcription Result:</h3>
                <p className="text-green-700 dark:text-green-300 whitespace-pre-wrap">{transcription}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(transcription)}
                  className="mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                >
                  Copy Text
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-zinc-400 text-sm">
        Copyright © 2025 All rights reserved. Pin-yu | Developer
      </footer>
    </div>
  );
}
