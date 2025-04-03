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
const initialWordList = (() => {
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
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordHistory, setWordHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem('wordHistory');
    return savedHistory ? JSON.parse(savedHistory) : [wordList[0]];
  });
  const [notification, setNotification] = useState<string | null>(null);

  const addWordToList = (word: string) => {
    const upperCaseWord = word.toUpperCase();
    if (word.length === 4) {
      if (!wordList.includes(upperCaseWord)) {
        const updatedWordList = [...wordList, upperCaseWord];
        setWordList(updatedWordList);
        localStorage.setItem('wordList', JSON.stringify(updatedWordList));
        setNotification(`Word added successfully! (${upperCaseWord})`);
      } else {
        setNotification(`This word is already in the list. (${upperCaseWord})`);
      }
    } else {
      setNotification('Please enter a 4-letter word.');
    }
    setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds
  };

  const resetWordListToDefaults = () => {
    setWordList(defaultWordList);
    localStorage.setItem('wordList', JSON.stringify(defaultWordList));
    setNotification('Word list reset to defaults.');
    setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        const nextIndex = (prev + 1) % wordList.length;
        setWordHistory(history => {
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
    <div className="min-h-screen bg-slate-900 flex">
      <WordListSidebar words={wordList} onReset={resetWordListToDefaults} />
      <div className="flex-1 flex flex-col items-center justify-center p-4 ml-64">
        <div className="text-center mb-8">
          <Timer className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Split-Flap Display</h1>
          <p className="text-slate-400">Watch as words transform letter by letter</p>
        </div>

        <div className="bg-black/50 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
          <SplitFlapDisplay 
            fromWord={wordList[currentWordIndex]} 
            toWord={wordList[(currentWordIndex + 1) % wordList.length]}
          />
          <WordHistory words={wordHistory} />
        </div>

        <WordInputForm addWordToList={addWordToList} />

        <Notification message={notification} />
      </div>
    </div>
  );
}

export default App