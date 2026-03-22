import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  // eslint-disable-next-line no-console
  console.error('Missing GEMINI_API_KEY in environment variables');
}

const ai = new GoogleGenAI({
  apiKey,
});

const clubsFilePath = path.join(
  process.cwd(),
  'public',
  'data',
  'clubs.json',
);

async function getClubs() {
  const file = await fs.readFile(clubsFilePath, 'utf-8');
  return JSON.parse(file) as unknown;
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 },
      );
    }

    const clubs = await getClubs();

    const prompt = `
Bạn là trợ lý tư vấn câu lạc bộ cho sinh viên Đại học FPT.

Dưới đây là dữ liệu các câu lạc bộ ở dạng JSON:
${JSON.stringify(clubs, null, 2)}

Dựa trên dữ liệu trên, hãy tư vấn cho sinh viên những câu lạc bộ phù hợp với sở thích, mục tiêu và nhu cầu của họ.
Luôn trả lời bằng tiếng Việt, giải thích rõ lý do đề xuất, có thể gợi ý nhiều câu lạc bộ nếu phù hợp.

Câu hỏi của sinh viên: "${message}"
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const reply = response.text;

    if (!reply) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in /api/chat:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

