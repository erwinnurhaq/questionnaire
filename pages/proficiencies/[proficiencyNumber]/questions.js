import { useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from 'rsuite';

import { setCurrentStep, setLatestStep } from '~/store/slices/stepSlice';
import { setAnswers } from '~/store/slices/proficiencySlice';
import { questions } from '~/constants/questions';
import { STEPS } from '~/constants/steps';
import ProficiencyLayout from '~/layouts/ProficiencyLayout';
import QuestionsLayout from '~/layouts/QuestionsLayout';
import Animate from '~/components/Animate';
import PaginationButtons from '~/components/PaginationButtons';
import styles from '~/styles/ProficienciesQuestions.module.css';

export async function getServerSideProps({ query }) {
  return { props: { proficiencyNumber: Number(query.proficiencyNumber) } };
}

export default function ProficiencyQuestions({ proficiencyNumber }) {
  const router = useRouter();

  const proficiency = questions.find((p) => p.no === proficiencyNumber);
  const nextProficiency = questions.find((p) => p.no === proficiencyNumber + 1);

  const dispatch = useDispatch();
  const answers = useSelector((state) => state.proficiency.answers);
  const [question, setQuestion] = useState(handleFindQuestion(1));
  const [isPrevClicked, setIsPrevClicked] = useState(false);

  const answer = useMemo(
    () => (!proficiency || !question ? undefined : (answers[proficiency.no] || [])[question.no - 1]),
    [answers, question, proficiency]
  );

  function handleFindQuestion(no) {
    return proficiency?.questions.find((item) => item.no === no);
  }

  function handleCheckRadio(value) {
    const data = {
      partNo: proficiency.no,
      questionNo: question.no,
      value,
    };
    dispatch(setAnswers(data));
  }

  function handleScrollTop() {
    window.scrollTo(0, 0);
  }

  function handlePrev() {
    setIsPrevClicked(true);
    if (question.no > 1) {
      setQuestion(handleFindQuestion(question.no - 1));
      handleScrollTop();
    } else {
      router.push(`/proficiencies/${proficiency.no}`);
    }
  }

  function handleNext() {
    setIsPrevClicked(false);
    if (question.no < proficiency.questions.length) {
      setQuestion(handleFindQuestion(question.no + 1));
      handleScrollTop();
      return;
    }
    dispatch(setLatestStep(STEPS[proficiency.no + 2]));
    dispatch(setCurrentStep(STEPS[proficiency.no + 2]));
    if (nextProficiency) {
      router.push(`/proficiencies/${nextProficiency.no}`);
    } else {
      router.push('/additional');
    }
  }

  if (!proficiency || !question) {
    router.push('/404');
    return null;
  }

  return (
    <ProficiencyLayout number={proficiency.no}>
      <QuestionsLayout
        questionNo={question.no}
        totalNo={proficiency.questions.length}
        isAnswered={answer !== undefined}
        isAllAnswered={answers[proficiency.no]?.length === proficiency.questions.length}
      >
        <Head>
          <title>{proficiency.name} | Questionnaire</title>
        </Head>
        <h4 className={styles.title}>
          {proficiency.no}. {proficiency.name}
        </h4>
        <Animate.Slide keyMotion={question.no} isReversed={isPrevClicked}>
          <div className={styles.questioncard}>
            <div className={styles.question}>
              <p
                dangerouslySetInnerHTML={{ __html: `${proficiency.no}.${question.no}. ${question.name}` }}
              ></p>
              <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
            </div>
            <div>
              {question.choices.map((choice) => (
                <Radio
                  key={choice.id}
                  className={styles.questionradio}
                  value={choice.value}
                  checked={answer === choice.value}
                  onFocus={() => handleCheckRadio(choice.value)}
                >
                  <span dangerouslySetInnerHTML={{ __html: choice.text }}></span>
                </Radio>
              ))}
            </div>
          </div>
        </Animate.Slide>
        <PaginationButtons
          isDisableNext={answer === undefined}
          onClickPrev={handlePrev}
          onClickNext={handleNext}
        />
      </QuestionsLayout>
    </ProficiencyLayout>
  );
}
