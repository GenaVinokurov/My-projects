import { images } from '../assets/images.js';
import Categories from '../components/categories'
class Quiz {
  constructor() {
    this.itemArr = document.querySelectorAll('.categories-item');
    this.quizPage = document.querySelector('.quiz');
    this.closeBtn = document.querySelector('.btn-close');
    this.mainScreen = document.querySelector('.main-screen');
    this.categoriesArt = document.querySelector('.categories-art');
    this.categoriesPic = document.querySelector('.categories-pic');
    this.id = 0;
    this.numberQuestion = 0;
    this.currentImg = 0;
    this.popup = document.querySelector('.popup-quiz');
    this.iconResult = document.querySelector('.icon-result');
    this.popupImage = document.querySelector('.popup-img');
    this.popupName = document.getElementById('#popupName');
    this.popupAuthor = document.getElementById('#popupAuthor');
    this.popupYear = document.getElementById('#popupYear');
    this.btnNext = document.querySelector('.btn-next');
    this.popupResult = document.querySelector('.popup-result');
    this.popupIndicator = document.getElementById('popupIndicator');
    this.btnBack = document.querySelector('.btn-back');
    this.quizQuestion = document.getElementById('quizQuestion');
    this.btnBack.addEventListener('click', this.toResult.bind(this));
    this.quizPic = document.getElementById('quizPic');
    this.answerPicArray = document.querySelectorAll('.quiz-pic__answer');
    this.quizAuthor = document.querySelector('.quiz-author');
    this.category = '';
    this.categoryNum = 0;
    this.localAnswers = {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      11: null,
      12: null,
      13: null,
      14: null,
      15: null,
      16: null,
      17: null,
      18: null,
      19: null,
      20: null,
      21: null,
      22: null,
      23: null,
    };
    this.newArrayLocal = [];
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
      document.getElementById('13'),
      document.getElementById('14'),
      document.getElementById('15'),
      document.getElementById('16'),
      document.getElementById('17'),
      document.getElementById('18'),
      document.getElementById('19'),
      document.getElementById('20'),
      document.getElementById('21'),
      document.getElementById('22'),
      document.getElementById('23'),
      document.getElementById('24'),
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
  }
  toResult() {
    this.localAnswers[this.id] = this.newArrayLocal;
    localStorage.setItem('answers', JSON.stringify(this.localAnswers));
    if (this.categoryNum >= 12) {
      this.categoriesPic.classList.remove('hide');
    } else this.categoriesArt.classList.remove('hide');
    this.quizPage.classList.add('hide');
    this.categoryNum = 0;
  }

  render() {
    this.localAnswers = localStorage.getItem('answers');
    this.localAnswers = JSON.parse(this.localAnswers);
    this.quizPage.classList.remove('hide');
    this.mainScreen.classList.add('hide');
    this.categoriesArt.classList.add('hide');
    this.categoriesPic.classList.add('hide');
    this.quizAuthor.classList.add('hide');
    this.quizPic.classList.add('hide');
    const questionByAuthor = [];
    const questionByName = [];
    images.forEach((item, index) => {
      if (index < images.length / 2) {
        questionByAuthor.push({
          ...item,
          type: 'author'
        })
      }
      else {
        questionByName.push({
          ...item,
          type: 'name'
        })
      }
    });

    const uniqAnswerByAuthor = [... new Set(questionByAuthor.map(item => item.author))];
    const uniqAnswerByName = [... new Set(questionByName.map(item => item.author))];
    console.log(uniqAnswerByName)
    const newQuestionByAuthor = [];
    const newQuestionByName = [];
    const splitArr = (array, subarray, size) => {
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice((i * size), (i * size) + size);
      }
    }
    splitArr(questionByAuthor, newQuestionByAuthor, 10);
    splitArr(questionByName, newQuestionByName, 10)
    const answers = {
      uniqAnswerByAuthor,
      uniqAnswerByName,
    }

    const question = {
      questionByAuthor: newQuestionByAuthor,
      questionByName: newQuestionByName,
    }

    let currentAnswer;
    let wrongAnswers;
    let currentAnswerPic;
    let wrongAnswersPic;
    const pagination = document.querySelector('.pagination');
    const answersUl = document.querySelector('.quiz-answers');
    let answersLi = [];
    let answersImg = [];
    this.id = event.currentTarget.id - 1;
    this.numberQuestion = 0;
    this.currentImg = this.id * 10;
    this.categoryNum = event.currentTarget.id - 1;
    //choose category
    if (this.categoryNum < 12) {
      this.category = question.questionByAuthor;
      this.quizQuestion.innerHTML = 'Кто автор этой картины?'
    } else {
      this.id = this.id - 12
      this.category = question.questionByName;
      this.quizQuestion.innerHTML = `Какаю из этих картин написал ${this.category[this.id][this.numberQuestion].author}?`
    };
    const renderAnswer = () => {

      this.popup.classList.add('hide');
      this.popupResult.classList.add('hide');
      //---pagination
      // const dotsArray = [];
      // for (let i = 0; i < this.category[this.id].length; i++) {
      //   dotsArray.push(`<li class="pagination__dot" id="dot-${i}"></li>`)
      // }
      // pagination.innerHTML = dotsArray.join(' ')
      if (this.categoryNum < 12) {
        let imgQuestion = document.getElementById('question');
        imgQuestion.style.backgroundImage = `url(./assets/img/${this.currentImg}.jpg)`;
        let answerArr = [];
        currentAnswer = this.category[this.id][this.numberQuestion].author;
        wrongAnswers = answers.uniqAnswerByAuthor;
        this.quizAuthor.classList.remove('hide');
        for (let i = 1; i <= 3; i++) {
          answerArr.push(wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)])
        }
        function shuffle(array) {
          return array.sort(() => Math.random() - 0.5);
        }
        if (answerArr.some(el => el == currentAnswer)) {
          wrongAnswers = [];
          currentAnswer = this.category[this.id][this.numberQuestion].author;
          wrongAnswers = answers.uniqAnswerByAuthor;
          for (let i = 1; i <= 3; i++) {
            answerArr.push(wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)])
          }
          answerArr.push(currentAnswer);
          answerArr = shuffle(answerArr);
        } else {
          answerArr.push(currentAnswer);
          answerArr = shuffle(answerArr);
        }
        answersUl.innerHTML = `
        <li class="quiz-answers__li" id="a1">${answerArr[0]}</li>
        <li class="quiz-answers__li" id="a2">${answerArr[1]}</li>
        <li class="quiz-answers__li" id="a3">${answerArr[2]}</li>
        <li class="quiz-answers__li" id="a4">${answerArr[3]}</li>
        `;
        answersLi = document.querySelectorAll('.quiz-answers__li');
      } else {
        this.quizPic.classList.remove('hide');
        let answerArrPic = [];
        currentAnswerPic = this.category[this.id][this.numberQuestion].imageNum;
        for (let i = 1; i <= 3; i++) {
          answerArrPic.push((Math.floor(Math.random() * 239)).toString())
        }
        console.log(currentAnswerPic, answerArrPic)
        function shuffle(array) {
          return array.sort(() => Math.random() - 0.5);
        }
        if (answerArrPic.some(el => el == currentAnswerPic)) {
          currentAnswerPic = this.category[this.id][this.numberQuestion].imageNum;
          for (let i = 1; i <= 3; i++) {
            answerArrPic.push((Math.floor(Math.random() * 239)).toString())
          }
          answerArrPic.push(currentAnswerPic);
          answerArrPic = shuffle(answerArrPic);
        } else {
          answerArrPic.push(currentAnswerPic);
          answerArrPic = shuffle(answerArrPic);
        }
        console.log(answerArrPic)
        this.quizPic.innerHTML = `
          <img src="./assets/img/${answerArrPic[0]}.jpg" alt="answer" class="quiz-pic__answer" data-answer="${answerArrPic[0]}">
          <img src="./assets/img/${answerArrPic[1]}.jpg" alt="answer" class="quiz-pic__answer" data-answer="${answerArrPic[1]}">
          <img src="./assets/img/${answerArrPic[2]}.jpg" alt="answer" class="quiz-pic__answer" data-answer="${answerArrPic[2]}">
          <img src="./assets/img/${answerArrPic[3]}.jpg" alt="answer" class="quiz-pic__answer" data-answer="${answerArrPic[3]}">
        `
        answersImg = document.querySelectorAll('.quiz-pic__answer');
      }
      function answerFun() {
        this.popup.classList.remove('hide');
        this.popupImage.src = `./assets/img/${this.currentImg}.jpg`;
        popupName.innerText = `${this.category[this.id][this.numberQuestion].name}`;
        popupAuthor.innerText = `${this.category[this.id][this.numberQuestion].author}`;
        popupYear.innerText = `${this.category[this.id][this.numberQuestion].year}`;
        if (this.categoryNum < 12) {
          if (event.currentTarget.innerHTML == this.category[this.id][this.numberQuestion].author) {
            // pagination.children[this.numberQuestion].classList.add('pagination__dot-correct')
            this.iconResult.src = `./assets/svg/icon-correct.svg`;
            this.newArrayLocal.push('correct');

          } else {
            this.iconResult.src = `./assets/svg/icon-wrong.svg`;
            this.newArrayLocal.push('wrong');
          }
        } else {
          console.log(event.currentTarget.dataset.answer)
          if (event.currentTarget.dataset.answer == this.category[this.id][this.numberQuestion].imageNum) {
            // pagination.children[this.numberQuestion].classList.add('pagination__dot-correct')
            this.iconResult.src = `./assets/svg/icon-correct.svg`;
            this.newArrayLocal.push('correct');
          } else {
            this.iconResult.src = `./assets/svg/icon-wrong.svg`;
            this.newArrayLocal.push('wrong');
          }
        }
        this.currentImg = this.currentImg + 1;
        this.numberQuestion = this.numberQuestion + 1;
        if (this.numberQuestion < this.category[this.id].length) {
          this.btnNext.addEventListener('click', renderAnswer);
        } else {
          if (this.categoryNum >= 12) {
            this.id = this.id + 12;
          }
          this.popup.classList.add('hide');
          this.popupResult.classList.remove('hide');
          let result = this.newArrayLocal.filter(answer => answer == 'correct');
          this.popupIndicator.innerHTML = `${result.length} / 10`;
        }
      }
      answersLi.forEach(el => {
        el.addEventListener('click', answerFun.bind(this))
      })
      answersImg.forEach(el => {
        el.addEventListener('click', answerFun.bind(this))
      })
    }
    renderAnswer();

  }
}

new Quiz()
export default Quiz