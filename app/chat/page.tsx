'use client';

import { useState, useRef, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Send, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function renderMessageContent(text: string) {
  const lines = text.split('\n');

  return lines.map((line, lineIndex) => {
    const parts = line.split('**');

    return (
      <span key={lineIndex}>
        {parts.map((part, partIndex) =>
          partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part,
        )}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    );
  });
}

const suggestedQuestions = [
  'Tôi thích thể thao, nên tham gia câu lạc bộ nào?',
  'Tôi muốn cải thiện kỹ năng lập trình, có câu lạc bộ nào phù hợp?',
  'Tôi muốn giúp đỡ cộng đồng, có câu lạc bộ tình nguyện nào?',
  'Tôi yêu âm nhạc, câu lạc bộ nào để cải thiện kỹ năng?',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Xin chào! 👋 Tôi là AI tư vấn của FPT Clubs. Tôi sẽ giúp bạn tìm câu lạc bộ phù hợp với đam mê và sở thích của bạn. Bạn muốn tìm hiểu về câu lạc bộ nào hoặc bạn có câu hỏi gì?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error('Failed to get AI response');
      }

      const data: { reply?: string } = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content:
          data.reply ??
          'Xin lỗi, hiện không nhận được câu trả lời từ AI. Vui lòng thử lại sau.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content:
          'Xin lỗi, hiện không kết nối được tới AI. Vui lòng kiểm tra lại cấu hình và thử lại sau.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <Navigation />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="w-full px-3 sm:px-4 py-3 sm:py-6 flex flex-col gap-3 sm:gap-4">
            {messages.length === 1 && (
              <div className="text-center py-4 sm:py-8 max-w-2xl mx-auto">
                <Sparkles className="w-12 sm:w-16 h-12 sm:h-16 text-primary mx-auto mb-3 sm:mb-4" />
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Chat AI Tư vấn
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-8 px-2">
                  Hãy cho tôi biết về sở thích của bạn, tôi sẽ giới thiệu những câu lạc bộ phù hợp nhất.
                </p>

                {/* Suggested Questions */}
                <div className="grid grid-cols-1 gap-2 sm:gap-3 px-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question)}
                      className="text-left p-3 sm:p-4 bg-card border border-border rounded-lg hover:border-primary hover:bg-secondary transition-all duration-200 active:scale-95 flex items-start gap-3"
                    >
                      <ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-foreground font-medium text-xs sm:text-sm leading-relaxed">
                        {question}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex px-2 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs sm:max-w-md rounded-lg px-3 sm:px-4 py-2 sm:py-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-foreground'
                  }`}
                >
                  <p className="text-sm leading-relaxed">
                    {renderMessageContent(message.content)}
                  </p>
                  <p
                    className={`text-xs mt-1 sm:mt-2 ${
                      message.type === 'user'
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-lg px-4 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-background">
          <div className="w-full px-3 sm:px-4 py-3 sm:py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex gap-2 mb-2 sm:mb-3"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập câu hỏi..."
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-card border border-input focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground text-sm sm:text-base"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-3 sm:px-4 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0"
              >
                <Send size={18} />
              </button>
            </form>

            <p className="text-xs text-muted-foreground text-center">
              💡 Hãy chi tiết về sở thích để nhận đề xuất tốt hơn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
