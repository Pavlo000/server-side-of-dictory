import bodyParser from 'body-parser';
import express from 'express';

import {
  initWords,
  getWords,
  addWord,
  updateWord,
  removeWord,
} from './server/words.js';

const app = express();
const PORT = process.env.PORT || 5000;

initWords([
  { id: '1', origWord: 'Hello', translWord: 'Привіт' },
  { id: '2', origWord: 'Bye', translWord: 'Пака' },
  { id: '3', origWord: 'Sad', translWord: 'Сумний' },
  { id: '4', origWord: 'Happy', translWord: 'Щасливий' },
  { id: '5', origWord: 'Big', translWord: 'Великий' },
  { id: '6', origWord: 'Small', translWord: 'Маленький' },
  { id: '7', origWord: 'Dear', translWord: 'Дорогий' },
  { id: '8', origWord: 'Send', translWord: 'Надіслати' },
  { id: '9', origWord: 'Rich', translWord: 'Багатий' },
  { id: '10', origWord: 'Hobby', translWord: 'Xoбi' },
  { id: '11', origWord: 'Good', translWord: 'Добре' },
  { id: '12', origWord: 'Bad', translWord: 'Погано' },
]);

app.use((_req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'content-type');
  res.set('Access-Control-Allow-Methods', 'DELETE,PATCH');
  next();
});

app.get('/words', (_req, res) => {
  res.json(getWords());
});

app.post('/words', bodyParser.json(), (req, res) => {

  if (!req.body || (!req.body.origWord || !req.body.translWord)) {
    
    throw new Error('A original or translate of word was not sent');
  }

  addWord(req.body.origWord, req.body.translWord);
  const words = getWords();

  res.json(words[words.length - 1]);
});

app.delete('/words/:wordId', (req, res) => {
  removeWord(req.params.wordId);

  const words = getWords();
  const deletedWord = words.find(word => word.id === req.params.wordId);

  res.json(deletedWord);
});

app.patch('/words/:wordId', bodyParser.json(), (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    throw new Error('Data was not sent');
  }

  const { origWord, translWord } = req.body;
  const { wordId } = req.params;

  if (origWord) {
    updateWord(wordId, { origWord });
  }

  if (translWord) {
    updateWord(wordId, { translWord });
  }

  const words = getWords();
  const patchWord = words.find(word => word.id === wordId);

  res.json(patchWord);
});

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Todo API is running on port ${PORT}!`);
});
