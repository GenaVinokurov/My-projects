import { images } from '../assets/images.js';

// export const imageFun = () => {
//   const splitArr = (arr, chunks) => [
//     ...Array(chunks),
//   ].map((_, c) => arr.filter((n, index) => index % chunks == c));


//   const questionByAuthor = [];
//   const questionByName = [];
//   images.forEach((item, index) => {
//     if (index % 2 == 0) {
//       questionByAuthor.push({
//         ...item,
//         type: 'author'
//       })
//     }
//     if (index % 2 != 0) {
//       questionByName.push({
//         ...item,
//         type: 'name'
//       })
//     }
//   });

//   const uniqAnswerByAuthor = [... new Set(questionByAuthor.map(item => item.author))];
//   const uniqAnswerByName = [... new Set(questionByName.map(item => item.author))];

//   const newQuestionByAuthor = splitArr(questionByAuthor, 12);
//   const newQuestionByName = splitArr(questionByName, 12)

//   const answers = {
//     uniqAnswerByAuthor,
//     uniqAnswerByName,
//   }

//   const question = {
//     questionByAuthor: newQuestionByAuthor,
//     questionByName: newQuestionByName,
//   }
//   console.log(question, answers)
// }

// export default imageFun