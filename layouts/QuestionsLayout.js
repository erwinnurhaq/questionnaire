import { Progress } from 'rsuite';
import styles from '~/styles/components/QuestionsLayout.module.css';

export default function QuestionsLayout({ questionNo, totalNo, isAnswered, children }) {
  return (
    <div className={styles.container}>
      <div className={styles.progresscontainer}>
        <div className={styles.progresswrapper}>
          <Progress.Line
            className={styles.progressbarcomplete}
            percent={((questionNo - (isAnswered ? 0 : 1)) / totalNo) * 100}
            showInfo={false}
            strokeColor="#ffc107"
          />
          <span className={styles.progressinfo}>
            {questionNo} / {totalNo}
          </span>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
