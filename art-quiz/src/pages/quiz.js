// export class Quiz {
//   constructor(item) {
//     this.item = item;
//   };
//   quiz() {
//     const item 
//   }
//   // async render () {
//   //   return CategoriesElement;
//   // }

//   // async after_render () {};
// }

import { mainScreen } from "../componets/settings";
import { categoriesArt } from "../componets/categories"
// import { imageFun } from '../componets/imageFun';
import { images } from '../assets/images.js';
export const quizFun = () => {

  const splitArr = (arr, chunks) => [
    ...Array(chunks),
  ].map((_, c) => arr.filter((n, index) => index % chunks == c));


  const questionByAuthor = [];
  const questionByName = [];
  images.forEach((item, index) => {
    if (index % 2 == 0) {
      questionByAuthor.push({
        ...item,
        type: 'author'
      })
    }
    if (index % 2 != 0) {
      questionByName.push({
        ...item,
        type: 'name'
      })
    }
  });

  const uniqAnswerByAuthor = [... new Set(questionByAuthor.map(item => item.author))];
  const uniqAnswerByName = [... new Set(questionByName.map(item => item.author))];

  const newQuestionByAuthor = splitArr(questionByAuthor, 12);
  const newQuestionByName = splitArr(questionByName, 12)

  const answers = {
    uniqAnswerByAuthor,
    uniqAnswerByName,
  }

  const question = {
    questionByAuthor: newQuestionByAuthor,
    questionByName: newQuestionByName,
  }
  console.log(question, answers)

  const itemArr = document.querySelectorAll('.categories-item');
  const quizPage = document.querySelector('.quiz');
  const closeBtn = document.querySelector('.btn-close');
  closeBtn.addEventListener('click', function () {
    quizPage.classList.add('hide');
    mainScreen.classList.remove('hide');
  })

  const catIcon1 = document.getElementById('1');
  const catIcon2 = document.getElementById('2');
  const catIcon3 = document.getElementById('3');
  const catIcon4 = document.getElementById('4');
  const catIcon5 = document.getElementById('5');
  const catIcon6 = document.getElementById('6');
  const catIcon7 = document.getElementById('7');
  const catIcon8 = document.getElementById('8');
  const catIcon9 = document.getElementById('9');
  const catIcon10 = document.getElementById('10');
  const catIcon11 = document.getElementById('11');
  const catIcon12 = document.getElementById('12');

  // let elId = 0;
  itemArr.forEach((el, index) => {
    el.addEventListener('click', function () {
      quizPage.classList.remove('hide');
      mainScreen.classList.add('hide');
      categoriesArt.classList.add('hide');
      // elId = event.target;
      // console.log(elId)
      // return elId = index

    });

  });
  const renderQuestions = () => {
    const answersUl = document.querySelector('.quiz-answers')
    const id = event.currentTarget.id - 1;
    let imgQuestion = document.getElementById('question');
    imgQuestion.style.backgroundImage = `url(./assets/img/${id}.jpg)`;
    const renderAnswer = () => {
      let answerArr = [];
      let currentAnswer = question.questionByAuthor[id][id].author;
      let wrongAnswers = answers.uniqAnswerByAuthor;

      for (let i = 1; i <= 3; i++) {
        answerArr.push(wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)])
      }
      function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
      }
      // console.log(answerArr.some(el => el == currentAnswer))
      answerArr.push(currentAnswer)
      answerArr = shuffle(answerArr)
      answersUl.innerHTML = `
      <li class="quiz-answers__li" id="a1">${answerArr[0]}</li>
      <li class="quiz-answers__li" id="a2">${answerArr[1]}</li>
      <li class="quiz-answers__li" id="a3">${answerArr[2]}</li>
      <li class="quiz-answers__li" id="a4">${answerArr[3]}</li>
      `;
    }
    renderAnswer()


  }
  catIcon1.addEventListener('click', renderQuestions)
};


export default quizFun;