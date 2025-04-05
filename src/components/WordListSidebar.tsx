import React, { useState } from 'react';
import { Menu } from 'lucide-react';

interface WordListSidebarProps {
  words: string[];
  onReset: () => void;
}

const WordListSidebar: React.FC<WordListSidebarProps> = ({ words, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[9999] p-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <div className={`fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 shadow-lg transform transition-transform duration-300 ease-in-out z-[9998]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <h2 className="text-xl font-bold mb-4 mt-12 lg:mt-0">Word List</h2>
        <button 
          onClick={onReset} 
          className="mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset to Defaults
        </button>
        <ul className="overflow-y-auto max-h-[calc(100vh-12rem)]">
          {words.map((word, index) => (
            <li key={index} className="mb-2 p-2 hover:bg-gray-700 rounded">
              {word}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WordListSidebar; 