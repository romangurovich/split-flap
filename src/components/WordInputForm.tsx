// src/components/WordInputForm.tsx
import React, { useState } from 'react';
import MaskedInput from 'react-text-mask';

interface WordInputFormProps {
  addWordToList: (word: string) => void;
}

const WordInputForm: React.FC<WordInputFormProps> = ({ addWordToList }) => {
  const [newWord, setNewWord] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWordToList(newWord);
    setNewWord('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex justify-center">
      <MaskedInput
        mask={[/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/]}
        placeholder="Enter a 4-letter word"
        value={newWord}
        onChange={(e) => setNewWord(e.target.value)}
        className="w-64 p-2 rounded text-lg tracking-widest"
      />
      <button 
        type="submit"
        className="ml-2 p-2 bg-amber-500 text-white rounded"
      >
        Add Word
      </button>
    </form>
  );
};

export default WordInputForm;