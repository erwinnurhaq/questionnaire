import styles from '~/styles/components/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Copyright ©{new Date().getFullYear()}{' '}
        <a href="http://www.teacherincubator.com" target="_blank" rel="noreferrer">
          Teacher Incubator
        </a>
        . All Rights Reserved.
      </p>
      <p>
        Site by:{' '}
        <a href="https://github.com/erwinnurhaq" target="_blank" rel="noreferrer">
          @erwinnurhaq
        </a>
      </p>
    </footer>
  );
}
