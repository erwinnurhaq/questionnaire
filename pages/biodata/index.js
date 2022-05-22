import { useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Form, Input, SelectPicker } from 'rsuite';

import {
  MAPEL,
  PENGALAMAN_MENGAJAR,
  PENGALAMAN_DIGITAL,
  TINGKAT_SEKOLAH,
  STORAGE_KEY,
  MODEL_BIODATA,
} from '~/constants';
import { GlobalContext, GlobalDispatch } from '~/context';
import Field from '~/components/Field';
import styles from '~/styles/Home.module.css';

export default function Biodata() {
  const router = useRouter();
  const state = useContext(GlobalContext);
  const actions = useContext(GlobalDispatch);
  const { biodata, biodata_error } = state;
  const { setActiveStep, setBiodata, setBiodataError } = actions;

  const optionTingkatSekolah = TINGKAT_SEKOLAH.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  const optionMataPelajaran = MAPEL.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  const optionPengalamanMengajar = PENGALAMAN_MENGAJAR.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  const optionPengalamanDigital = PENGALAMAN_DIGITAL.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  function handleSubmit(_, ev) {
    ev.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    router.push(`/proficiencies/1`);
  }

  useEffect(() => {
    setActiveStep(1);
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
        onChange={(values) => setBiodata(values)}
        onCheck={(error) => setBiodataError(error)}
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
          data={optionTingkatSekolah}
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
          data={optionMataPelajaran}
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
          data={optionPengalamanMengajar}
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
          data={optionPengalamanDigital}
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
