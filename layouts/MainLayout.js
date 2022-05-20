import Footer from '~/components/Footer';
import Sidebar from '~/components/Sidebar';
import styles from '~/styles/components/Layout.module.css';

export default function MainLayout({ children }) {
  return (
    <main className={styles.main}>
      <Sidebar />
      <section className={styles.content}>
        {children}
        <Footer />
      </section>
    </main>
  );
}
