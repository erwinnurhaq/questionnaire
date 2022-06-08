import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Loader, Radio, toaster } from 'rsuite';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { setExpectation2 } from '~/store/slices/expectationSlice';
import { setAdditionalAnswers } from '~/store/slices/additionalSlice';
import { setScores } from '~/store/slices/proficiencySlice';
import { setCurrentStep, setLatestStep } from '~/store/slices/stepSlice';

import { MODAL } from '~/constants/modals';
import { STEPS } from '~/constants/steps';
import { questions, additionals } from '~/constants/questions';
import formatPayloadSubmit from '~/helpers/formatPayloadSubmit';
import ConfirmSubmit from '~/components/ConfirmSubmit';
import GradeExpectation from '~/components/GradeExpectation';
import ToastMessage from '~/components/ToastMessage';
import Animate from '~/components/Animate';
import PaginationButtons from '~/components/PaginationButtons';
import styles from '~/styles/Additional.module.css';

export default function Additional() {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const lastProficiency = questions[questions.length - 1];

  const dispatch = useDispatch();
  const { latest } = useSelector((state) => state.step);
  const biodata = useSelector((state) => state.biodata.biodata);
  const expectation = useSelector((state) => state.expectation);
  const proficienciesAnswers = useSelector((state) => state.proficiency.answers);
  const additionalsAnswers = useSelector((state) => state.additional.answers);

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
      ) || !expectation.ekspektasi_grade_2
    );
  }

  function handlePrev() {
    const lastProficiencyNo = lastProficiency.no;
    const lastQuestionNo = lastProficiency.questions[lastProficiency.questions.length - 1].no;
    router.push(`/proficiencies/${lastProficiencyNo}/${lastQuestionNo}`);
  }

  async function handleSubmit() {
    if (!executeRecaptcha) {
      toaster.push(ToastMessage({ message: 'Execute recaptcha not yet available' }));
      return;
    }

    setModal('');
    setLoading(true);
    try {
      // execute recaptcha
      const token = await executeRecaptcha('questionnaire_submit');

      // check existing user again
      let response = await fetch(`/api/check_user_exist?email=${biodata.email}`);
      let result = await response.json();
      if (response.status >= 400) {
        throw new Error(result.message);
      }

      // submit answers
      const data = formatPayloadSubmit({
        biodata,
        expectation,
        proficienciesAnswers,
        additionalsAnswers,
        token,
      });
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
    <div className="confined-container">
      {loading && <Loader backdrop content="loading..." vertical />}
      <Head>
        <title>Additional | Questionnaire</title>
      </Head>
      <Animate.Fade keyMotion={router.asPath}>
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
                        onFocus={() => handleCheckRadio(additional.no, question.no, choice.value)}
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
        <PaginationButtons
          alignment="center"
          isDisableNext={handleIsSubmitDisabled()}
          onClickPrev={handlePrev}
          onClickNext={() => setModal(MODAL.CONFIRM_SUBMIT)}
          options={{ labelNext: 'Selesai dan Lihat Hasil' }}
        />
      </Animate.Fade>
      <ConfirmSubmit
        open={modal === MODAL.CONFIRM_SUBMIT}
        handleSubmit={handleSubmit}
        handleClose={() => setModal('')}
      />
    </div>
  );
}
