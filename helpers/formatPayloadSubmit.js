import { GRADES } from '~/constants/forms';
import { additionals } from '~/constants/questions';

export default function formatPayloadSubmit({
  biodata,
  expectation,
  proficienciesAnswers,
  additionalsAnswers,
}) {
  const reduceAnswers = (arr) =>
    arr.reduce((prev, curr, idx) => {
      prev[`question_${idx + 1}`] = curr;
      return prev;
    }, {});

  const data = {};
  // biodata with expectations
  data.user = { ...biodata };
  // expectations
  Object.keys(expectation).forEach((key) => {
    data.user[key] = GRADES.find((grade) => grade.id === expectation[key]).name;
  });
  // proficiencies
  Object.keys(proficienciesAnswers).forEach((proficiencyNo) => {
    data[`answers_part_${proficiencyNo}`] = reduceAnswers(proficienciesAnswers[proficiencyNo]);
  });
  // additionals
  additionals.forEach((additional, index) => {
    data[`answers_misc_${index + 1}`] = reduceAnswers(additionalsAnswers[additional.no]);
  });
  return data;
}
