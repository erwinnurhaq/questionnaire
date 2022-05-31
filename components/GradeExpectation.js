/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { GRADES } from '~/constants/forms';
import styles from '~/styles/components/GradeExpectation.module.css';

export default function GradeExpectation({ sublabel, value, onChange }) {
  return (
    <div className={styles.expectationContainer}>
      <h5 className={styles.expectationtitle}>Ekspektasi Grade</h5>
      <p  className={styles.expectationsubtitle}>{sublabel}</p>
      <div className={styles.expectationwrapper}>
        {GRADES.map((grade) => (
          <button
            key={grade.id}
            type="button"
            className={
              value === grade.id ? styles.expectationactive : styles.expectationinactive
            }
            onClick={() => onChange(grade.id)}
          >
            <Image src={grade.iconPath} alt={`${grade.id}_image`} width={64} height={64}/>
            <p className={styles.expectationlabel}>{grade.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
