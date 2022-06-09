import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { setCurrentStep, setLatestStep } from '~/store/slices/stepSlice';
import { STEPS } from '~/constants/steps';
import Introduction from '~/components/pages/Home/Introduction';
import PaginationButtons from '~/components/PaginationButtons';
import Animate from '~/components/Animate';
import PageTitle from '~/components/PageTitle';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  function handleNext() {
    dispatch(setLatestStep(STEPS[1]));
    dispatch(setCurrentStep(STEPS[1]));
    router.push(`/biodata`);
  }

  return (
    <div className="confined-container">
      <Head>
        <title>Introduction | Questionnaire</title>
      </Head>
      <Animate.Fade keyMotion={router.route}>
        <PageTitle alignment="center">ASESMEN KOMPETENSI DIGITAL</PageTitle>
        <Introduction />
        <PaginationButtons isShowPrev={false} onClickNext={handleNext} />
      </Animate.Fade>
    </div>
  );
}
