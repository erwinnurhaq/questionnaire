import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { IconButton } from 'rsuite';
import SortDown from '@rsuite/icons/SortDown';
import { AnimatePresence, motion } from 'framer-motion';

import { setExpectation1 } from '~/store/slices/expectationSlice';
import styles from '~/styles/Home.module.css';
import { setCurrentStep, setLatestStep } from '~/store/slices/stepSlice';
import { STEPS } from '~/constants/steps';
import GradeExpectation from '~/components/GradeExpectation';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const ekspektasiGrade = useSelector((state) => state.expectation.ekspektasi_grade_1);

  function handleNext() {
    dispatch(setLatestStep(STEPS[1]));
    dispatch(setCurrentStep(STEPS[1]));
    router.push(`/biodata`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Introduction | Questionnaire</title>
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
          <h2 className={styles.title}>Assessment Kompetensi Digital</h2>
          <h4 className={styles.subtitle}>Instrusksi Pengisian Instrumen</h4>
          <p>
            Terima kasih telah meluangkan waktu bapak/ibu guru untuk mengisi instrumen Asesmen Kompetensi
            Digital untuk mengukur kemampuan penggunaan Teknologi Digital bapak/ibu guru dalam kapasitasnya
            sebagai seorang Guru. Untuk dapat mengisi asesmen ini dengan baik, mohon dapat membaca beberapa
            aturan dan hal-hal yang harus diperhatikan dalam asesmen ini agar data yang dihasilkan dapat valid
            dan reliabel.
          </p>
          <p className={styles.instruction}>Persiapan:</p>
          <ol className={styles.instructionitems}>
            <li>
              Instrumen Asesmen Digital ini memiliki 8 bagian yang teridiri dari Pengisian Biodata, 6
              tingkatan Kecakapan, dan informasi tambahan yang harus bapak/ibu isi seluruhnya
            </li>
            <li>Masing-masing bagian terdiri dari beberapa pertanyaan yang sudah disesuaikan</li>
            <li>Pengisian biodata khususnya email aktif, dan nomor handphone</li>
            <li>
              Kecakapan 1 sampai 6 di isi dengan cara memilih pernyataan yang PALING MEREPRESENTASIKAN KONDISI
              dan PENGALAMAN bapak/ibu guru saat ini, Mohon baca dengan seksama setiap pilihan pernyataan
            </li>
            <li>
              Pada bagian 7, bapak/ibu memilih opsi jawaban dengan skala likert, jawab sesuai dengan kondisi
              yang bapak/ibu guru rasakan dan alami
            </li>
            <li>
              Bapak/ibu Guru masih dapat memperbaiki jawaban setiap pertanyaan yang diberikan, tidak ada batas
              waktu yang diberikan selama pengisian Instrumen
            </li>
            <li>
              Pastikan jawaban tidak ada yang terlewat dan setiap pertanyaan sudah sesuai dengan kondisi dan
              pengalaman bapak/ibu saat ini, pop up konfirmasi submisi asesmen akan muncul untuk memastikan
              ulang pengisian instrumen
            </li>
            <li>
              Jika bapak/ibu sudah mengisi dan mengkonfirmasi submisi asesmen, bapak/ibu tidak bisa mengisi
              kembali dengan akun email yang sama, mohon tidak mengisi berulang kali agar tidak terjadi
              distorsi data
            </li>
            <li>Hasil Asesmen akan langsung keluar di akhir sesi</li>
            <li>
              PERINGATAN: Hasil Asesmen bukan merupakan judgment atau hal-hal terkait peringkat dll, TIDAK ADA
              HASIL BURUK/HASIL BAIK, semua hasil asesmen tersebut adalah modal bapak/ibu guru untuk
              mengembangkan potensi dan kemampuan/kecakapan digital bapak/ibu guru berikutnya
            </li>
          </ol>
          <GradeExpectation
            sublabel="Sebelum memulai asesmen ini, bagaimana Anda mendeskripsikan kompetensi / kecakapan digital Anda saat ini?"
            value={ekspektasiGrade}
            onChange={(value) => dispatch(setExpectation1(value))}
          />
          <div className={styles.buttonwrapper}>
            <IconButton
              className="pagination-button"
              title="Berikutnya"
              disabled={!ekspektasiGrade}
              icon={<SortDown />}
              type="submit"
              color="cyan"
              appearance="primary"
              circle
              onClick={handleNext}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
