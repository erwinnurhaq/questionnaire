import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Loader, Radio, toaster } from 'rsuite';
import { AnimatePresence, motion } from 'framer-motion';

import { setExpectation2 } from '~/store/slices/expectationSlice';
import { setAdditionalAnswers } from '~/store/slices/additionalSlice';
import { setScores } from '~/store/slices/proficiencySlice';
import { setCurrentStep, setLatestStep } from '~/store/slices/stepSlice';

import ConfirmSubmit from '~/components/ConfirmSubmit';
import GradeExpectation from '~/components/GradeExpectation';
import ToastMessage from '~/components/ToastMessage';
import { questions, additionals } from '~/constants/questions';
import { MODAL } from '~/constants/modals';
import { STEPS } from '~/constants/steps';
import formatPayloadSubmit from '~/helpers/formatPayloadSubmit';
import styles from '~/styles/Additional.module.css';

export default function Additional() {
  const router = useRouter();
  
  const lastProficiency = questions[questions.length - 1];
  
  const dispatch = useDispatch();
  const { latest } = useSelector((state) => state.step);
  const biodata = useSelector((state) => state.biodata.biodata);
  const expectation = useSelector((state) => state.expectation);
  const proficienciesAnswers = useSelector((state) => state.proficiency.answers);
  const additionalsAnswers = useSelector((state) => state.additional.answers);
  const scores = useSelector((state) => state.proficiency.scores);

  const [modal, setModal] = useState('');
  const [loading, setLoading] = useState(false);

  function handleGetAnswer(additionalNo, questionNo) {
    const savedAnswers = additionalsAnswers[additionalNo] || [];
    const savedAnswer = savedAnswers[questionNo - 1];
    return savedAnswer;
  }

  function handleCheckRadio(additionalNo, questionNo, value) {
    dispatch(setAdditionalAnswers({ additionalNo, questionNo, value }));
  }

  function handleIsRadioChecked(additionalNo, questionNo, value) {
    return handleGetAnswer(additionalNo, questionNo) === value;
  }

  function handleIsSubmitDisabled() {
    return (
      additionals.some((additional) =>
        additional.questions.some((question) => handleGetAnswer(additional.no, question.no) === undefined)
      ) ||
      !expectation.ekspektasi_grade_2 ||
      !!scores.grade
    );
  }

  function handlePrev() {
    const lastProficiencyNo = lastProficiency.no;
    const lastQuestionNo = lastProficiency.questions[lastProficiency.questions.length - 1].no;
    router.push(`/proficiencies/${lastProficiencyNo}/${lastQuestionNo}`);
  }

  async function handleSubmit() {
    setModal('');
    setLoading(true);
    try {
      // check existing user again
      let response = await fetch(`/api/check_user_exist?email=${biodata.email}`);
      let result = await response.json();
      if (response.status >= 400) {
        throw new Error(result.message);
      }

      // submit answers
      const data = formatPayloadSubmit({ biodata, expectation, proficienciesAnswers, additionalsAnswers });
      response = await fetch('/api/questionnaire/send', {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data),
      });
      result = await response.json();
      if (response.status >= 400) {
        throw new Error(result.message);
      }

      dispatch(setScores(result.data));
      dispatch(setLatestStep(STEPS[9]));
      dispatch(setCurrentStep(STEPS[9]));
      router.push(`/result`);
    } catch (err) {
      toaster.push(ToastMessage({ message: err.message }));
      setLoading(false);
    }
  }

  useEffect(() => {
    if (latest.step < 8) {
      router.push(`/proficiencies/${lastProficiency.no}`);
    }
  }, []); // eslint-disable-line

  return (
    <div className={styles.container}>
      {loading && <Loader backdrop content="loading..." vertical />}
      <Head>
        <title>Additional | Questionnaire</title>
      </Head>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.asPath}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={{
            hidden: { opacity: 0, x: 0, y: -100 },
            enter: { opacity: 1, x: 0, y: 0 },
            exit: { opacity: 0, x: 0, y: 50 },
          }}
          transition={{ duration: 0.4, type: 'tween', ease: 'easeOut' }}
        >
          {additionals.map((additional) => (
            <div key={additional.id} className={styles.additionalcontainer}>
              <h4 className={styles.subtitle}>
                {additional.no}. {additional.name}
              </h4>
              <div className={styles.questionscontainer}>
                {additional.questions.map((question) => (
                  <div key={question.id}>
                    <p>
                      <b>
                        {additional.no}.{question.no}.
                      </b>{' '}
                      <span dangerouslySetInnerHTML={{ __html: question.question }}></span>
                    </p>
                    <div className={styles.questionradiowrapper}>
                      {additional.choices.map((choice) => (
                        <Radio
                          key={choice.id}
                          className={styles.questionradio}
                          value={choice.value}
                          checked={handleIsRadioChecked(additional.no, question.no, choice.value)}
                          onClick={() => handleCheckRadio(additional.no, question.no, choice.value)}
                        >
                          <span dangerouslySetInnerHTML={{ __html: choice.text }}></span>
                        </Radio>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <GradeExpectation
            sublabel="Setelah mengisi asesmen ini, bagaimana Anda mendeskripsikan kompetensi / kecakapan digital Anda saat ini?"
            value={expectation.ekspektasi_grade_2}
            onChange={(value) => dispatch(setExpectation2(value))}
          />
          <div className={styles.buttonwrapper}>
            <Button className="pagination-button" onClick={handlePrev}>
              Kembali
            </Button>
            <Button
              className="pagination-button"
              appearance="primary"
              disabled={handleIsSubmitDisabled()}
              onClick={() => setModal(MODAL.CONFIRM_SUBMIT)}
            >
              Selesai dan Lihat Hasil
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
      <ConfirmSubmit
        open={modal === MODAL.CONFIRM_SUBMIT}
        handleSubmit={handleSubmit}
        handleClose={() => setModal('')}
      />
    </div>
  );
}
