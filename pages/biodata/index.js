import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Form, Input, SelectPicker, Loader, toaster } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';

import { setExpectation1 } from '~/store/slices/expectationSlice';
import { setBiodata, setBiodataError } from '~/store/slices/biodataSlice';
import { setCurrentStep, setLatestStep } from '~/store/slices/stepSlice';
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
import ToastMessage from '~/components/ToastMessage';
import GradeExpectation from '~/components/GradeExpectation';
import PaginationButtons from '~/components/PaginationButtons';
import PageTitle from '~/components/PageTitle';
import Animate from '~/components/Animate';
import styles from '~/styles/Biodata.module.css';

export default function Biodata() {
  const router = useRouter();

  const dispatch = useDispatch();
  const { latest } = useSelector((state) => state.step);
  const { biodata, biodata_error } = useSelector((state) => state.biodata);
  const ekspektasiGrade = useSelector((state) => state.expectation.ekspektasi_grade_1);

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
    <div className="confined-container">
      {loading && <Loader backdrop content="loading..." vertical />}
      <Head>
        <title>Biodata | Questionnaire</title>
      </Head>
      <Animate.Fade keyMotion={router.route}>
        <Form
          id="biodata-form"
          className={styles.form}
          fluid
          model={MODEL_BIODATA}
          formValue={biodata}
          onChange={(values) => dispatch(setBiodata(values))}
          onCheck={(error) => dispatch(setBiodataError(error))}
          onSubmit={handleSubmit}
        >
          <PageTitle>Biodata</PageTitle>
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
        </Form>
        <GradeExpectation
          sublabel="Sebelum memulai asesmen ini, bagaimana Anda mendeskripsikan kompetensi / kecakapan digital Anda saat ini?"
          value={ekspektasiGrade}
          onChange={(value) => dispatch(setExpectation1(value))}
        />
        <PaginationButtons alignment="center" onClickPrev={handlePrev} isSubmit form="biodata-form" />
      </Animate.Fade>
    </div>
  );
}
