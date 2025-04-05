import React, { useEffect, useState } from 'react';

interface SplitFlapDisplayProps {
  fromWord: string;
  toWord: string;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function SplitFlapDisplay({ fromWord, toWord }: SplitFlapDisplayProps) {
  const [currentDisplay, setCurrentDisplay] = useState(fromWord);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (fromWord === toWord) return;
    setIsAnimating(true);

    const animateLetters = async () => {
      const newWord = [...fromWord];
      
      for (let i = 0; i < fromWord.length; i++) {
        if (fromWord[i] === toWord[i]) continue;
        
        let currentChar = fromWord[i];
        while (currentChar !== toWord[i]) {
          const currentIndex = ALPHABET.indexOf(currentChar);
          currentChar = ALPHABET[(currentIndex + 1) % ALPHABET.length];
          newWord[i] = currentChar;
          setCurrentDisplay(newWord.join(''));
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
      
      setIsAnimating(false);
    };

    animateLetters();
  }, [fromWord, toWord]);

  return (
    <div className="flex justify-center gap-2">
      {currentDisplay.split('').map((letter, index) => (
        <div
          key={index}
          className={`
            w-16 h-24 
            flex items-center justify-center 
            bg-slate-800 
            rounded-md 
            border-t-2 border-slate-700
            shadow-inner
            ${isAnimating ? 'animate-pulse' : ''}
          `}
        >
          <span className="font-mono text-4xl font-bold text-amber-500">
            {letter}
          </span>
        </div>
      ))}
    </div>
  );
}