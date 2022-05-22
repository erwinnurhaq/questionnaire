import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input } from 'rsuite';

import { STORAGE_KEY } from '~/constants';
import { GlobalContext, GlobalDispatch } from '~/context';
import Field from '~/components/Field';
import styles from '~/styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const state = useContext(GlobalContext);
  const actions = useContext(GlobalDispatch);
  const { ekspektasi_grade } = state;
  const { setGradeExpectation, setActiveStep } = actions;

  function handleSubmit(_, ev) {
    ev.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    router.push(`/biodata`);
  }

  useEffect(() => {
    setActiveStep(0);
  }, []); // eslint-disable-line

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Biodata</h2>
      <Form
        fluid
        className={styles.form}
        formValue={{ ekspektasi_grade }}
        onChange={(values) => setGradeExpectation(values.ekspektasi_grade)}
        onSubmit={handleSubmit}
      >
        <Field
          name="ekspektasi_grade"
          label="Ekspektasi Grade"
          placeholder="Masukkan ekspektasi grade anda"
          accepter={Input}
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
