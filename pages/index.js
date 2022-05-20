// import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input, SelectPicker, Schema } from 'rsuite';

import styles from '~/styles/Home.module.css';
import { MAPEL, PENGALAMAN, CATEGORIES, STORAGE_KEY, TINGKAT_SEKOLAH } from '~/constants';
import { GlobalContext, GlobalDispatch } from '~/context';
import Field from '~/components/Field';

const { StringType } = Schema.Types;
const model = Schema.Model({
  nama: StringType().isRequired('This field is required.'),
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.'),
  tingkatan_pengajaran: StringType().isRequired('This field is required.'),
  mata_pelajaran: StringType().isRequired('This field is required.'),
  pengalaman_mengajar: StringType().isRequired('This field is required.'),
});

export default function Home() {
  // const { executeRecaptcha } = useGoogleReCaptcha();

  // async function handleSubmit(ev) {
  //   ev.preventDefault();
  //   const { name, email } = ev.currentTarget.elements;

  //   try {
  //     if (!executeRecaptcha) {
  //       throw new Errow('Execute recaptcha not yet available');
  //     }
  //     const token = await executeRecaptcha('submit_questionnaire');
  //     if (!token) {
  //       throw new Errow('Fail reCaptcha')
  //     }
  //     const response = await fetch("/api/questionnaire/send", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ name: name.value, email: email.value }),
  //     });
  //     const result = await response.json();
  //     console.log(result)
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }
  const router = useRouter();
  const state = useContext(GlobalContext);
  const actions = useContext(GlobalDispatch);
  const { biodata, biodata_error } = state;
  const { setActiveCategory, setBiodata, setBiodataError } = actions;

  const isMapelLain = biodata.mata_pelajaran === MAPEL[MAPEL.length - 1].name;

  const optionTingkatSekolah = TINGKAT_SEKOLAH.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  const optionMataPelajaran = MAPEL.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  const optionPengalaman = PENGALAMAN.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  function handleSubmit(_, ev) {
    ev.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    router.push(`/questions/${CATEGORIES[0].id}`);
  }

  useEffect(() => {
    setActiveCategory(0);
  }, []); // eslint-disable-line

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Biodata</h2>
      <Form
        className={styles.form}
        fluid
        onChange={(values) => setBiodata(values)}
        onCheck={(error) => setBiodataError(error)}
        model={model}
        formValue={biodata}
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
          name="tingkatan_pengajaran"
          label="Tingkat Sekolah"
          placeholder="Pilih salah satu"
          accepter={SelectPicker}
          error={biodata_error.tingkatan_pengajaran}
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
          block
          required
        />
        {isMapelLain && (
          <Field
            name="mata_pelajaran_lainnya"
            placeholder="Masukkan nama pelajaran"
            accepter={Input}
            error={biodata_error.mata_pelajaran_lainnya}
            required={isMapelLain}
          />
        )}
        <Field
          name="pengalaman_mengajar"
          label="Pengalaman Mengajar"
          placeholder="Pilih salah satu"
          accepter={SelectPicker}
          error={biodata_error.pengalaman_mengajar}
          data={optionPengalaman}
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
