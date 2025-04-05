import React from 'react';

interface WordHistoryProps {
  words: string[];
}

export function WordHistory({ words }: WordHistoryProps) {
  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      {words.map((word, index) => (
        <div
          key={`${word}-${index}`}
          className="flex justify-center gap-2"
          style={{
            opacity: 1 - (index * 0.2), // Fade out progressively
            transform: `scale(${1 - (index * 0.05)})`, // Slightly decrease size
          }}
        >
          {word.split('').map((letter, letterIndex) => (
            <div
              key={letterIndex}
              className="w-8 h-12 flex items-center justify-center bg-slate-800/60 rounded-sm border-t border-slate-700/50"
            >
              <span className="font-mono text-lg font-bold text-amber-500/80">
                {letter}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}