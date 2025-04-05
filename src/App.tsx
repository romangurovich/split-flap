import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import { SplitFlapDisplay } from './components/SplitFlapDisplay';
import { WordHistory } from './components/WordHistory';
import WordListSidebar from './components/WordListSidebar';
import WordInputForm from './components/WordInputForm';
import Notification from './components/Notification';

const defaultWordList = [
  'TIME',
  'LIFE',
  'HOPE',
  'LOVE',
  'MIND',
  'SOUL',
  'STAR',
  'WAVE',
];

// Curated list of 4-letter words that make interesting transitions
const initialWordList = ((): string[] => {
  const savedWordList = localStorage.getItem('wordList');
  if (savedWordList) {
    return JSON.parse(savedWordList);
  } else {
    localStorage.setItem('wordList', JSON.stringify(defaultWordList));
    return defaultWordList;
  }
})();

function App() {
  const [wordList, setWordList] = useState<string[]>(initialWordList);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [wordHistory, setWordHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem('wordHistory');
    return savedHistory ? JSON.parse(savedHistory) : [wordList[0]];
  });
  const [notification, setNotification] = useState<{ message: string | null; type: 'success' | 'error' }>({ message: null, type: 'success' });

  const addWordToList = (word: string): void => {
    const upperCaseWord = word.toUpperCase();
    if (word.length === 4) {
      if (word.includes('_')) {
        setNotification({ message: 'Please enter a complete 4-letter word.', type: 'error' });
      } else if (!wordList.includes(upperCaseWord)) {
        const updatedWordList = [...wordList, upperCaseWord];
        setWordList(updatedWordList);
        localStorage.setItem('wordList', JSON.stringify(updatedWordList));
        setNotification({ message: `Word added successfully! (${upperCaseWord})`, type: 'success' });
      } else {
        setNotification({ message: `This word is already in the list. (${upperCaseWord})`, type: 'error' });
      }
    } else {
      setNotification({ message: 'Please enter a 4-letter word.', type: 'error' });
    }
    setTimeout(() => setNotification({ message: null, type: 'success' }), 3000); // Clear notification after 3 seconds
  };

  const resetWordListToDefaults = (): void => {
    setWordList(defaultWordList);
    localStorage.setItem('wordList', JSON.stringify(defaultWordList));
    setNotification({ message: 'Word list reset to defaults.', type: 'success' });
    setTimeout(() => setNotification({ message: null, type: 'success' }), 3000); // Clear notification after 3 seconds
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev: number) => {
        const nextIndex = (prev + 1) % wordList.length;
        setWordHistory((history: string[]) => {
          const newHistory = [wordList[nextIndex], ...history].slice(0, 5);
          localStorage.setItem('wordHistory', JSON.stringify(newHistory));
          return newHistory;
        });
        return nextIndex;
      });
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, [wordList]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row">
      <WordListSidebar words={wordList} onReset={resetWordListToDefaults} />
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:ml-64">
        <div className="text-center mb-8 max-w-2xl mx-auto px-4 mt-16 lg:mt-0">
          <Timer className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Split-Flap Display</h1>
          <p className="text-slate-400">Watch as words transform letter by letter</p>
        </div>

        <div className="w-full max-w-2xl bg-black/50 p-4 md:p-8 rounded-xl shadow-2xl backdrop-blur-sm mx-4">
          <SplitFlapDisplay 
            fromWord={wordList[currentWordIndex]} 
            toWord={wordList[(currentWordIndex + 1) % wordList.length]}
          />
          <WordHistory words={wordHistory} />
        </div>

        <div className="w-full max-w-2xl mt-4 lg-mt-8 px-4">
          <WordInputForm addWordToList={addWordToList} />
        </div>

        <Notification message={notification.message} type={notification.type} />
      </div>
    </div>
  );
}

export default App