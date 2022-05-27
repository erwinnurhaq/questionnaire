import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Form, IconButton, SelectPicker } from 'rsuite';
import SortDown from '@rsuite/icons/SortDown';
import PlusRound from '@rsuite/icons/PlusRound';

import { GRADES, MODEL_HOME } from '~/constants/forms';
import formatSelectOption from '~/helpers/formatSelectOption';
import Field from '~/components/Field';
import { setIntro, setIntroError } from '~/store/slices/introSlice';
import styles from '~/styles/Home.module.css';
import { setCurrentStep, setLatestStep } from '~/store/slices/stepSlice';
import { STEPS } from '~/constants/steps';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const intro = useSelector((state) => state.intro.intro);

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
      <h2 className={styles.title}>Questionnaire</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tortor sem, molestie sed neque ut,
        vulputate iaculis tortor. Aliquam vel enim placerat, tincidunt tortor at, mollis risus. Quisque ut
        massa dolor. Maecenas rhoncus augue risus, ut aliquam orci commodo quis. Aliquam pharetra tincidunt
        porttitor. Proin in tempor ligula, aliquam lobortis sapien. Sed ullamcorper, nulla ut aliquet laoreet,
        mauris dolor fermentum tellus, id pellentesque tellus elit in ex. Phasellus lectus metus, lobortis id
        lacinia pretium, rhoncus sed felis.
      </p>
      <h5 className={styles.subtitle}>Ekspektasi Grade:</h5>
      <div className={styles.expectationwrapper}>
        {formatSelectOption(GRADES).map((grade) => (
          <button
            key={grade.value}
            type="button"
            className={
              intro.ekspektasi_grade === grade.value ? styles.expectationactive : styles.expectationinactive
            }
            onClick={() => dispatch(setIntro({ ekspektasi_grade: grade.value }))}
          >
            <PlusRound className={styles.expectationicon} />
            <p>{grade.label}</p>
          </button>
        ))}
      </div>
      <div className={styles.buttonwrapper}>
        <IconButton
          className="pagination-button"
          title="Berikutnya"
          disabled={intro.ekspektasi_grade === ''}
          icon={<SortDown />}
          type="submit"
          color="cyan"
          appearance="primary"
          circle
          onClick={handleNext}
        />
      </div>
      {/* <Form
        fluid
        className={styles.form}
        formValue={intro}
        model={MODEL_HOME}
        onChange={(values) => dispatch(setIntro(values))}
        onCheck={(errors) => dispatch(setIntroError(errors))}
        onSubmit={handleSubmit}
      >
        <Field
          name="ekspektasi_grade"
          label="Ekspektasi Grade"
          placeholder="Masukkan ekspektasi grade anda"
          accepter={SelectPicker}
          error={introError.ekspektasi_grade}
          data={formatSelectOption(GRADES)}
          searchable={false}
          block
          required
        />
        <Form.Group className={styles.button}>
          <IconButton
            className="pagination-button"
            icon={<SortDown />}
            type="submit"
            color="cyan"
            appearance="primary"
            circle
          />
        </Form.Group>
      </Form> */}
    </div>
  );
}
