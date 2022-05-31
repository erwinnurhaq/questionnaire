import { GRADES } from '~/constants/forms';

/* this executed on server */
export default function formatScores(answers) {
  const score = { total_score: 0 };
  Object.keys(answers).forEach((answer) => {
    const partScore = Object.values(answers[answer]).reduce((prev, curr) => prev + curr, 0);
    score[answer] = partScore;
    score.total_score += partScore;
  });
  const grade = GRADES.find((grade) => grade.min <= score.total_score && grade.max >= score.total_score);
  score.grade = grade?.name;
  return score;
}
