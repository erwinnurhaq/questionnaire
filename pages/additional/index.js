import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Radio } from 'rsuite';
import { AnimatePresence, motion } from 'framer-motion';

import ConfirmSubmit from '~/components/ConfirmSubmit';
import { questions, additional1, additional2 } from '~/constants/questions';
import { MODAL } from '~/constants/modals';
import { setAdditionalAnswers } from '~/store/slices/additionalSlice';
import styles from '~/styles/Additional.module.css';

export async function getServerSideProps() {
  const lastProficiency = questions[questions.length - 1];
  const additionals = [additional1, additional2];
  return { props: { additionals, lastProficiency } };
}

export default function Additional({ additionals, lastProficiency }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { latest } = useSelector((state) => state.step);
  const answers = useSelector((state) => state.additional.answers);

  const [modal, setModal] = useState('');

  function handleGetAnswer(additionalNo, questionNo) {
    const savedAnswers = answers[additionalNo] || [];
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
    return additionals.some((additional) =>
      additional.questions.some((question) => handleGetAnswer(additional.no, question.no) === undefined)
    );
  }

  function handlePrev() {
    const lastProficiencyNo = lastProficiency.no;
    const lastQuestionNo = lastProficiency.questions[lastProficiency.questions.length - 1].no;
    router.push(`/proficiencies/${lastProficiencyNo}/${lastQuestionNo}`);
  }

  function handleSubmit() {}

  useEffect(() => {
    if (latest.step < 8) {
      router.push(`/proficiencies/${lastProficiency.no}`);
    }
  }, []); // eslint-disable-line

  return (
    <div className={styles.container}>
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
              <h3 className={styles.title}>{additional.name}</h3>
              <p className={styles.subtitle}>
                {additional.no}. {additional.title}
              </p>
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
          <div className={styles.buttonwrapper}>
            <Button className="pagination-button" onClick={handlePrev}>
              Kembali
            </Button>
            <Button
              className="pagination-button"
              color="cyan"
              appearance="primary"
              disabled={handleIsSubmitDisabled()}
              onClick={() => setModal(MODAL.CONFIRM_SUBMIT)}
            >
              Selesai dan Lihat Hasil
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
      <ConfirmSubmit open={modal === MODAL.CONFIRM_SUBMIT} handleClose={() => setModal('')} />
    </div>
  );
}
