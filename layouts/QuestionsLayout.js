import { Progress } from 'rsuite';
import styles from '~/styles/components/QuestionsLayout.module.css';

export default function QuestionsLayout({ questionNo, totalNo, isAnswered, isAllAnswered, children }) {
  return (
    <div className="confined-container">
      <div className={styles.progresscontainer}>
        <div className={styles.progresswrapper}>
          <Progress.Line
            className={isAllAnswered ? styles.progressbarcomplete : ''}
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
