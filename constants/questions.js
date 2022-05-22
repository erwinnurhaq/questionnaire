const generateQuestions = (number, totalQuestion, name) => ({
  id: number,
  no: number,
  name: name,
  questions: new Array(totalQuestion).fill({}).map((_, index) => ({
    id: index + 1,
    no: index + 1,
    question:
      'Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing <i>elit</i>. Aliquam quis massa tempus ligula semper tempus vel a mi. Nunc non.',
    choices: new Array(7).fill({}).map((_, index2) => ({
      id: index2 + 1,
      value: index2 + 1 === 7 ? 0 : index2 + 1,
      text: 'Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing <i>elit</i>. Aliquam quis massa tempus ligula semper tempus vel a mi. Nunc non.',
    })),
  })),
});

export const questions = [
  generateQuestions(1, 9, 'Professional Engagement'),
  generateQuestions(2, 9, 'Digital Resources'),
  generateQuestions(3, 9, 'Teaching and Learning'),
  generateQuestions(4, 3, 'Assessment'),
  generateQuestions(5, 4, 'Empowering Learners'),
  generateQuestions(6, 6, `Facilitating Learners' Digital Competence`),
];

export const additional1 = {
  id: 7,
  no: 7,
  name: 'Additional 1',
  title: 'Title Additional 1',
  choices: new Array(5).fill({}).map((_, index2) => ({
    id: index2 + 1,
    value: index2 + 1,
    text: 'something agree',
  })),
  questions: new Array(4).fill({}).map((_, index) => ({
    id: index + 1,
    no: index + 1,
    question:
      'Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing <i>elit</i>. Aliquam quis massa tempus ligula semper tempus vel a mi. Nunc non.',
  })),
};

export const additional2 = {
  id: 8,
  no: 8,
  name: 'Additional 2',
  title: 'Title Additional 2',
  choices: new Array(5).fill({}).map((_, index2) => ({
    id: index2 + 1,
    value: index2 + 1,
    text: 'something agree',
  })),
  questions: new Array(7).fill({}).map((_, index) => ({
    id: index + 1,
    no: index + 1,
    question:
      'Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing <i>elit</i>. Aliquam quis massa tempus ligula semper tempus vel a mi. Nunc non.',
  })),
};
