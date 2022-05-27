import { useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Radio } from 'rsuite';
import SortDown from '@rsuite/icons/SortDown';
import SortUp from '@rsuite/icons/SortUp';

import ProficiencyLayout from '~/layouts/ProficiencyLayout';
import { setCurrentStep, setLatestStep } from '~/store/slices/stepSlice';
import { setAnswers } from '~/store/slices/proficiencySlice';
import { questions } from '~/constants/questions';
import { STEPS } from '~/constants/steps';
import styles from '~/styles/ProficienciesQuestions.module.css';
import QuestionsLayout from '~/layouts/QuestionsLayout';

export async function getServerSideProps({ query }) {
  const proficiencyNumber = Number(query.proficiencyNumber);
  const questionNumber = Number(query.questionNumber);
  const proficiency = questions.find((p) => p.no === proficiencyNumber);
  const question = proficiency.questions.find((q) => q.no === questionNumber);
  const nextProficiency = questions.find((p) => p.no === proficiencyNumber + 1) || null;
  return !proficiency || !question
    ? { redirect: { destination: '/404', permanent: false } }
    : { props: { proficiency, question, nextProficiency } };
}

export default function ProficiencyQuestion({ proficiency, question, nextProficiency }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.proficiency.answers);

  const answer = useMemo(() => {
    const currentAnswers = answers[proficiency.no] || [];
    return currentAnswers[question.no - 1];
  }, [answers, question.no, proficiency.no]);

  function handleCheckRadio(value) {
    const data = {
      partNo: proficiency.no,
      questionNo: question.no,
      value,
    };
    dispatch(setAnswers(data));
  }

  function handlePrev() {
    if (question.no > 1) {
      router.push(`/proficiencies/${proficiency.no}/${question.no - 1}`);
    } else {
      router.push(`/proficiencies/${proficiency.no}`);
    }
  }

  function handleNext() {
    if (question.no < proficiency.questions.length) {
      router.push(`/proficiencies/${proficiency.no}/${question.no + 1}`);
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

  return (
    <ProficiencyLayout number={proficiency.no}>
      <QuestionsLayout
        questionNo={question.no}
        totalNo={proficiency.questions.length}
        isAnswered={answer !== undefined}
        isAllAnswered={answers[proficiency.no].length === proficiency.questions.length}
      >
        <Head>
          <title>{proficiency.name} | Questionnaire</title>
        </Head>
        <div className={styles.container}>
          <h4 className={styles.title}>
            {proficiency.no}. {proficiency.name}
          </h4>
          <div className={styles.questioncard}>
            <p className={styles.question}>
              <b>
                {proficiency.no}.{question.no}.
              </b>{' '}
              <span dangerouslySetInnerHTML={{ __html: question.question }}></span>
            </p>
            <div>
              {question.choices.map((choice) => (
                <Radio
                  key={choice.id}
                  className={styles.questionradio}
                  value={choice.value}
                  checked={answer === choice.value}
                  onClick={() => handleCheckRadio(choice.value)}
                >
                  <span dangerouslySetInnerHTML={{ __html: choice.text }}></span>
                </Radio>
              ))}
            </div>
          </div>
          <div className={styles.buttonwrapper}>
            <IconButton
              className="pagination-button"
              title="Kembali"
              icon={<SortUp />}
              circle
              onClick={handlePrev}
            />
            <IconButton
              className="pagination-button"
              title="Berikutnya"
              icon={<SortDown />}
              color="cyan"
              appearance="primary"
              circle
              disabled={answer === undefined}
              onClick={handleNext}
            />
          </div>
        </div>
      </QuestionsLayout>
    </ProficiencyLayout>
  );
}
