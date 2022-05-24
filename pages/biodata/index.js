import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Form, Input, SelectPicker } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';

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
import styles from '~/styles/Home.module.css';

export default function Biodata() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { latest } = useSelector((state) => state.step);
  const { biodata, biodata_error } = useSelector((state) => state.biodata);

  function handleSubmit(isValid, ev) {
    ev.preventDefault();
    if (!isValid) return;
    dispatch(setLatestStep(STEPS[2]))
    dispatch(setCurrentStep(STEPS[2]))
    router.push(`/proficiencies/1`);
  }

  useEffect(() => {
    if (latest.step < 1) {
      router.push('/');
    }
  }, []); // eslint-disable-line

  return (
    <div className={styles.container}>
      <Head>
        <title>Biodata | Questionnaire</title>
      </Head>
      <h2 className={styles.title}>Biodata</h2>
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
        <Form.Group>
          <Button type="submit" color="cyan" appearance="primary" className={styles.button}>
            Next
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
