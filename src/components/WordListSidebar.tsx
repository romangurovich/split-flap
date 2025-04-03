import React from 'react';

interface WordListSidebarProps {
  words: string[];
  onReset: () => void;
}

const WordListSidebar: React.FC<WordListSidebarProps> = ({ words, onReset }) => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Word List</h2>
      <button 
        onClick={onReset} 
        className="mb-4 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Set word list back to defaults
      </button>
      <ul>
        {words.map((word, index) => (
          <li key={index} className="mb-2">
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordListSidebar; 