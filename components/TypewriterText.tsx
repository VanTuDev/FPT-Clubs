'use client';

import { useEffect, useState, useRef } from 'react';

interface TypewriterTextProps {
  texts: string[];          // Array of phrases to cycle through
  className?: string;
  speed?: number;           // ms per character
  deleteSpeed?: number;     // ms per delete
  pauseDuration?: number;   // ms pause at full text
  cursor?: boolean;
}

export function TypewriterText({
  texts,
  className = '',
  speed = 60,
  deleteSpeed = 30,
  pauseDuration = 2000,
  cursor = true,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'paused' | 'deleting'>('typing');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const current = texts[textIndex];

    if (phase === 'typing') {
      if (charIndex < current.length) {
        const id = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, speed);
        return () => clearTimeout(id);
      } else {
        const id = setTimeout(() => setPhase('paused'), pauseDuration);
        return () => clearTimeout(id);
      }
    }

    if (phase === 'paused') {
      setPhase('deleting');
    }

    if (phase === 'deleting') {
      if (charIndex > 0) {
        const id = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, deleteSpeed);
        return () => clearTimeout(id);
      } else {
        setTextIndex((i) => (i + 1) % texts.length);
        setPhase('typing');
      }
    }
  }, [phase, charIndex, textIndex, texts, speed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayed}
      {cursor && (
        <span
          className={`inline-block w-0.5 h-[1em] ml-0.5 align-middle bg-current transition-opacity duration-100 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </span>
  );
}
