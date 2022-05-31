import Head from 'next/head';
import { useRouter } from 'next/router';
import { IconButton } from 'rsuite';
import SortDown from '@rsuite/icons/SortDown';
import SortUp from '@rsuite/icons/SortUp';
import { AnimatePresence, motion } from 'framer-motion';

import ProficiencyLayout from '~/layouts/ProficiencyLayout';
import { questions } from '~/constants/questions';
import styles from '~/styles/Proficiencies.module.css';

export async function getServerSideProps({ query }) {
  const proficiencyNumber = Number(query.proficiencyNumber);
  const proficiency = questions.find((p) => p.no === proficiencyNumber);
  const previousProficiency = questions.find((p) => p.no === proficiencyNumber - 1) || null;
  return !proficiency
    ? { redirect: { destination: '/404', permanent: false } }
    : { props: { proficiency, previousProficiency } };
}

export default function Proficiency({ proficiency, previousProficiency }) {
  const router = useRouter();

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

  return (
    <ProficiencyLayout number={proficiency.no}>
      <Head>
        <title>{proficiency.name} | Questionnaire</title>
      </Head>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.asPath}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            enter: { opacity: 1},
            exit: { opacity: 0 },
          }}
          transition={{ duration: 0.4, type: 'tween', ease: 'easeOut' }}
        >
          <div className={styles.container}>
            <h2 className={styles.title}>
              {proficiency.no}. {proficiency.name}
            </h2>
            <div>
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
                onClick={handleNext}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </ProficiencyLayout>
  );
}
