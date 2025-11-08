'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
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
      setError('請先選擇音檔文件');
      return;
    }

    setIsTranscribing(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setTranscription(result.text);
      } else {
        setError(result.error || '轉換失敗');
      }
    } catch (err) {
      setError('網絡錯誤，請稍後再試');
    } finally {
      setIsTranscribing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900">
      <main className="w-full max-w-2xl p-8">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-zinc-900 dark:text-zinc-100">
            音檔轉文字工具
          </h1>
          
          <div className="space-y-6">
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
                  選擇音檔文件
                </label>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  支援格式：MP3, MP4, WAV, M4A, WEBM (最大25MB)
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
              disabled={!file || isTranscribing}
              className="w-full py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors"
            >
              {isTranscribing ? '轉換中...' : '開始轉換'}
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
                <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">轉換結果：</h3>
                <p className="text-green-700 dark:text-green-300 whitespace-pre-wrap">{transcription}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(transcription)}
                  className="mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                >
                  複製文字
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
