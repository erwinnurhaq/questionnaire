import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import styles from '~/styles/Result.module.css';
import { Button, Message, Progress } from 'rsuite';
import { GRADES } from '~/constants/forms';
import { questions } from '~/constants/questions';

export default function Result() {
  const router = useRouter();
  const scores = useSelector((state) => state.proficiency.scores);
  const grade = GRADES.find((g) => g.name === scores.grade);

  const LINK = {
    DIGCOMP:
      'https://publications.jrc.ec.europa.eu/repository/bitstream/JRC107466/pdf_digcomedu_a4_final.pdf',
    GFORM: 'https://bit.ly/interviewkompetensidigital',
  };

  function handleFormatPercentage(scorePart, scoreMax) {
    return Number(((scorePart / scoreMax) * 100).toFixed(2));
  }

  useEffect(() => {
    if (!scores.grade) {
      router.push('/');
    }
  }, []); // eslint-disable-line

  if (!scores.grade) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Biodata | Questionnaire</title>
      </Head>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.route}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
          transition={{ duration: 0.4, type: 'tween', ease: 'easeOut' }}
        >
          <h2 className={styles.title}>Result:</h2>
          <div className={styles.resultgrade}>
            <Image src={grade.iconPath} alt={`${grade.id}_image`} width={100} height={100} />
            <h4 className={styles.grade}>{scores.grade || '-'}</h4>
          </div>
          <p className={styles.resultexplanation}>
            Anda merupakan {scores.grade || '-'} dalam penggunaan Teknologi Digital untuk Pengajaran dan
            Pembelajaran. Hasil ini dapat menjadi acuan Anda untuk mengembangkan dan meningkatkan kemampuan
            penggunaan Teknologi Digital baik untuk keperluan Pengajaran dan Pembelajaran, maupun keperluan
            pribadi lainnya.
          </p>
          <div className={styles.resultgraph}>
            {questions.map((q) => (
              <div key={q.id} className={styles.resultgraphitem}>
                <Progress.Circle
                  percent={handleFormatPercentage(scores[`answers_part_${q.no}`], q.max_score)}
                  strokeColor="#ffc107"
                  strokeWidth={10}
                />
                <p className={styles.resultgraphitemtext}>{q.name}</p>
              </div>
            ))}
          </div>
          <div className={styles.thankyou}>
            <p>
              Terima kasih telah mengisi Asesmen Kompetensi Digital ini, Anda dapat mencari informasi lebih
              mendalam tentang Kompetensi Digital untuk Guru dengan mendownload Panduan dibawah ini.
            </p>
            <Message className={styles.note} type="info">
              <i>note:</i> Panduan menggunakan bahasa inggris, pastikan Anda memiliki kemampuan yang cukup
              agar dapat memahami secara utuh tentang Kompetensi Digital untuk Guru.
            </Message>
          </div>
          <div className={styles.buttoncontainer}>
            <Button as="a" href={LINK.DIGCOMP} target="_blank" color="cyan" appearance="primary">
              Download Panduan (PDF)
            </Button>
            <Button as="a" href={LINK.GFORM} target="_blank" color="cyan" appearance="primary">
              Form Interview Kompetensi Digital
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
