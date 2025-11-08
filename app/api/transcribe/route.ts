import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: '未找到音檔文件' }, { status: 400 });
    }

    // 檢查文件大小 (API有25MB限制) whisper API可能超過10MB就會出現問題
    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: '文件大小不能超過25MB' }, { status: 400 });
    }

    // 檢查文件格式
    console.log('File type:', file.type, 'File name:', file.name);

    const allowedTypes = [
      'audio/mp3', 'audio/mp4', 'audio/mpeg', 'audio/mpga',
      'audio/m4a', 'audio/x-m4a', 'audio/wav', 'audio/webm'
    ];

    const allowedExtensions = ['mp3', 'mp4', 'mpeg', 'mpga', 'm4a', 'wav', 'webm'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    const isValidType = allowedTypes.includes(file.type);
    const isValidExtension = allowedExtensions.includes(fileExtension || '');

    if (!isValidType && !isValidExtension) {
      console.log('Rejected file - Type:', file.type, 'Extension:', fileExtension);
      return NextResponse.json({
        error: '不支援的音檔格式。支援格式：mp3, mp4, mpeg, mpga, m4a, wav, webm'
      }, { status: 400 });
    }

    // 轉換為FormData以送給OpenAI API
    const audioFormData = new FormData();
    audioFormData.append('file', file);
    audioFormData.append('model', 'whisper-1');
    audioFormData.append('language', 'zh'); // 設定為中文

    // 調用OpenAI Whisper API
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      language: 'zh',
    });

    return NextResponse.json({
      success: true,
      text: transcription.text,
      fileName: file.name,
      fileSize: file.size,
    });

  } catch (error) {
    console.error('Transcription error:', error);

    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json({
        error: 'OpenAI API密鑰未設置或無效'
      }, { status: 500 });
    }

    return NextResponse.json({
      error: '轉換過程中發生錯誤，請稍後再試'
    }, { status: 500 });
  }
}