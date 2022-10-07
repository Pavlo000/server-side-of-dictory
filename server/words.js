'use strict';
import uuid from 'uuid';

let words = [];

export const initWords = (initialWords = []) => {
  words = initialWords;
};

export const getWords = () => {
  return words;
};

export const addWord = (
  origWord,
  translWord,
) => {
  const newWord = {
    id: uuid(),
    origWord,
    translWord
  };

  words = [...words, newWord];
};

export const removeWord = (wordId) => {
  words = words.filter(word => word.id !== wordId);
};

export const updateWord = (
  wordId, 
  params,
) => {
  words = words.map(todo => {
    return todo.id !== wordId
      ? todo
      : { ...todo, ...params };
  });
};
