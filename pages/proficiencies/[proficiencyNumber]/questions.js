import { useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Radio } from 'rsuite';
import SortDown from '@rsuite/icons/SortDown';
import SortUp from '@rsuite/icons/SortUp';
import { AnimatePresence, motion } from 'framer-motion';

import ProficiencyLayout from '~/layouts/ProficiencyLayout';
import { setCurrentStep, setLatestStep } from '~/store/slices/stepSlice';
import { setAnswers } from '~/store/slices/proficiencySlice';
import { questions } from '~/constants/questions';
import { STEPS } from '~/constants/steps';
import styles from '~/styles/ProficienciesQuestions.module.css';
import QuestionsLayout from '~/layouts/QuestionsLayout';

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
        <div className={styles.container}>
          <h4 className={styles.title}>
            {proficiency.no}. {proficiency.name}
          </h4>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={question.no}
              initial="hidden"
              animate="enter"
              exit="exit"
              variants={{
                hidden: { opacity: 0, x: 0, y: isPrevClicked ? 20 : -30 },
                enter: { opacity: 1, x: 0, y: 0 },
                exit: { opacity: 0, x: 0, y: isPrevClicked ? -30 : 20 },
              }}
              transition={{ duration: 0.4, type: 'tween', ease: 'easeOut' }}
            >
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
            </motion.div>
          </AnimatePresence>
        </div>
      </QuestionsLayout>
    </ProficiencyLayout>
  );
}
