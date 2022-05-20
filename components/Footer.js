import styles from '~/styles/components/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Questionnaire ©{new Date().getFullYear()} -{' '}
      <a href="https://github.com/erwinnurhaq">simkalastoforka</a>
    </footer>
  );
}
