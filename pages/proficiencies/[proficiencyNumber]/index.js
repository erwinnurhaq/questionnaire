import Head from 'next/head';
import { useRouter } from 'next/router';

import ProficiencyLayout from '~/layouts/ProficiencyLayout';
import { questions } from '~/constants/questions';
import styles from '~/styles/Proficiencies.module.css';
import Animate from '~/components/Animate';
import PageTitle from '~/components/PageTitle';
import PaginationButtons from '~/components/PaginationButtons';

export async function getServerSideProps({ query }) {
  return { props: { proficiencyNumber: Number(query.proficiencyNumber) } };
}

export default function Proficiency({ proficiencyNumber }) {
  const router = useRouter();

  const proficiency = questions.find((p) => p.no === proficiencyNumber);
  const previousProficiency = questions.find((p) => p.no === proficiencyNumber - 1);

  function handlePrev() {
    if (previousProficiency) {
      router.push(`/proficiencies/${previousProficiency.no}`);
    } else {
      router.push(`/biodata`);
    }
  }

  function handleNext() {
    router.push(`/proficiencies/${proficiency.no}/questions`);
  }

  if (!proficiency) {
    router.push('/404');
    return null;
  }

  return (
    <ProficiencyLayout number={proficiency.no}>
      <Head>
        <title>{proficiency.name} | Questionnaire</title>
      </Head>
      <Animate.Fade keyMotion={router.asPath}>
        <div className={styles.container}>
          <h2 className={styles.title}>
            {proficiency.no}. {proficiency.name}
          </h2>
          <PaginationButtons alignment="center" onClickPrev={handlePrev} onClickNext={handleNext} />
        </div>
      </Animate.Fade>
    </ProficiencyLayout>
  );
}
