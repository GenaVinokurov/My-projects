import React, { useContext, useEffect, useState, MouseEvent } from 'react';
import style from './SprintGame.module.css';
import PopupLevel from '../popupLevel/PopupLevel';
import { LevelContext, WordsContext } from '../../../components/LevelProvider';
import { getCards } from '../../../services/dataAPI';
import { ICard } from '../../../services/types';
import { isCorrect } from './SprintGameUtils';

const SprintGame: any = () => {
  const { level, setLevel } = useContext(LevelContext);
  const [words, setWords] = useState<ICard[]>([]);
  const [question, setQuestion] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [resultArray, setResultArray] = useState([]);
  useEffect(() => {
    getCards(1, 1).then((result) => setWords(result));
  }, []);
  const eventCorrect = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.target as HTMLButtonElement;
    const attribute = btn.dataset.correct;
    return (attribute === 'correct')
      ? isCorrect(words, question, answer, resultArray, setQuestion, setAnswer, true)
      : isCorrect(words, question, answer, resultArray, setQuestion, setAnswer, false);
  }
  return (
    (words.length !== 0) &&
    <div className={style.container}>
      < div className={style.game}>
        <h3 className={style.result}>Текущий результат: 1</h3>
        <div className={style.game__wrapper}>
          <div className={style.timer}>
            60
          </div>
          <div className={style.counter}>
            <div className={`${style.dot} active-dot`}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
          </div>
          <p className={style.question}>{words[question].word}</p>
          <p className={style.answer}>{words[answer].wordTranslate}</p>
          <div className={style.button__wrapper}>
            <button type='button' className={`${style.correct} ${style.btn}`} data-correct='correct' onClick={(e) => eventCorrect(e)}>Верно</button>
            <button type='button' className={`${style.wrong} ${style.btn}`} data-correct='wrong' onClick={(e) => eventCorrect(e)}>Неверно</button>
          </div>
        </div>
      </div>
    </div >
  )
};

export default SprintGame;
