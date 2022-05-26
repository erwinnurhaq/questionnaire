import { useState } from 'react';
import { IconButton } from 'rsuite';
import Menu from '@rsuite/icons/Menu';

import Footer from '~/components/Footer';
import Sidebar from '~/components/Sidebar';
import Drawer from '~/components/Drawer';
import styles from '~/styles/components/Layout.module.css';

export default function MainLayout({ children }) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <main className={styles.main}>
      <IconButton className={styles.drawertrigger} icon={<Menu />} onClick={() => setIsOpenDrawer(true)} />
      <Sidebar />
      <Drawer isOpenDrawer={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer} />
      <section className={styles.content}>
        {children}
        <Footer />
      </section>
    </main>
  );
}
