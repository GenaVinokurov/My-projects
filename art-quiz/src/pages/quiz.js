import { images } from '../assets/images.js';

class Quiz {
  constructor() {
    this.itemArr = document.querySelectorAll('.categories-item');
    this.quizPage = document.querySelector('.quiz');
    this.closeBtn = document.querySelector('.btn-close');
    this.mainScreen = document.querySelector('.main-screen');
    this.categoriesArt = document.querySelector('.categories-art');
    this.level = [
      document.getElementById('1'),
      document.getElementById('2'),
      document.getElementById('3'),
      document.getElementById('4'),
      document.getElementById('5'),
      document.getElementById('6'),
      document.getElementById('7'),
      document.getElementById('8'),
      document.getElementById('9'),
      document.getElementById('10'),
      document.getElementById('11'),
      document.getElementById('12'),
    ];
    this.closeBtn.addEventListener('click', this.closeQuiz.bind(this));
    this.eventQuizLevels();
  }
  eventQuizLevels() {
    this.level.forEach(el => {
      el.addEventListener('click', this.render.bind(this))
    })
  }
  closeQuiz() {
    this.quizPage.classList.add('hide');
    this.mainScreen.classList.remove('hide');
    console.log(this.closeBtn)
  }
  render() {
    this.quizPage.classList.remove('hide');
    this.mainScreen.classList.add('hide');
    this.categoriesArt.classList.add('hide');
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
}

new Quiz()
export default Quiz