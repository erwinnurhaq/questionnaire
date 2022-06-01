import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { IconButton, Form, Input, SelectPicker, Loader, toaster } from 'rsuite';
import SortDown from '@rsuite/icons/SortDown';
import SortUp from '@rsuite/icons/SortUp';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import {
  MAPEL,
  PENGALAMAN_MENGAJAR,
  PENGALAMAN_DIGITAL,
  TINGKAT_SEKOLAH,
  MODEL_BIODATA,
} from '~/constants/forms';
import { STEPS } from '~/constants/steps';
import formatSelectOption from '~/helpers/formatSelectOption';
import Field from '~/components/Field';
import { setBiodata, setBiodataError } from '~/store/slices/biodataSlice';
import { setCurrentStep, setLatestStep } from '~/store/slices/stepSlice';
import styles from '~/styles/Biodata.module.css';
import ToastMessage from '~/components/ToastMessage';

export default function Biodata() {
  const router = useRouter();
  
  const dispatch = useDispatch();
  const { latest } = useSelector((state) => state.step);
  const { biodata, biodata_error } = useSelector((state) => state.biodata);

  const [loading, setLoading] = useState(false);

  function handlePrev() {
    router.push('/');
  }

  async function handleSubmit(isValid, ev) {
    ev.preventDefault();
    if (!isValid) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/check_user_exist?email=${biodata.email}`);
      const result = await response.json();
      if (response.status >= 400) {
        throw new Error(result.message);
      }
      dispatch(setLatestStep(STEPS[2]));
      dispatch(setCurrentStep(STEPS[2]));
      router.push(`/proficiencies/1`);
    } catch (err) {
      toaster.push(ToastMessage({ message: err.message }));
      setLoading(false);
    }
  }

  useEffect(() => {
    if (latest.step < 1) {
      router.push('/');
    }
  }, []); // eslint-disable-line

  return (
    <div className={styles.container}>
      {loading && <Loader backdrop content="loading..." vertical />}
      <Head>
        <title>Biodata | Questionnaire</title>
      </Head>
      <h2 className={styles.title}>Biodata</h2>
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
          <Form
            className={styles.form}
            fluid
            model={MODEL_BIODATA}
            formValue={biodata}
            onChange={(values) => dispatch(setBiodata(values))}
            onCheck={(error) => dispatch(setBiodataError(error))}
            onSubmit={handleSubmit}
          >
            <Field
              name="nama"
              label="Nama"
              placeholder="Masukkan nama anda"
              accepter={Input}
              error={biodata_error.nama}
              required
            />
            <Field
              name="email"
              label="Email"
              placeholder="Masukkan email anda"
              type="email"
              accepter={Input}
              error={biodata_error.email}
              required
            />
            <Field
              name="nomor_telepon"
              label="No. Telepon"
              placeholder="08xxx..."
              type="number"
              accepter={Input}
              error={biodata_error.nomor_telepon}
              required
            />
            <Field
              name="tingkat_sekolah"
              label="Tingkat Sekolah"
              placeholder="Pilih salah satu"
              accepter={SelectPicker}
              error={biodata_error.tingkat_sekolah}
              data={formatSelectOption(TINGKAT_SEKOLAH)}
              searchable={false}
              block
              required
            />
            <Field
              name="mata_pelajaran"
              label="Mata Pelajaran"
              placeholder="Pilih salah satu"
              accepter={SelectPicker}
              error={biodata_error.mata_pelajaran}
              data={formatSelectOption(MAPEL)}
              searchable={false}
              block
              required
            />
            <Field
              name="pengalaman_mengajar"
              label="Pengalaman Mengajar"
              placeholder="Pilih salah satu"
              accepter={SelectPicker}
              error={biodata_error.pengalaman_mengajar}
              data={formatSelectOption(PENGALAMAN_MENGAJAR)}
              searchable={false}
              block
              required
            />
            <Field
              name="pengalaman_digital"
              label="Pengalaman Menggunakan Teknologi Digital"
              placeholder="Pilih salah satu"
              accepter={SelectPicker}
              error={biodata_error.pengalaman_digital}
              data={formatSelectOption(PENGALAMAN_DIGITAL)}
              searchable={false}
              block
              required
            />
            <Form.Group className={styles.button}>
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
                type="submit"
                appearance="primary"
                circle
              />
            </Form.Group>
          </Form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
