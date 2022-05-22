import { useContext } from 'react';
import Image from 'next/image';
import { Steps } from 'rsuite';
import { STEPS } from '~/constants';
import { GlobalContext } from '~/context';
import styles from '~/styles/components/Sidebar.module.css';

export default function Sidebar() {
  const { active_step } = useContext(GlobalContext);

  return (
    <aside className={styles.container}>
      <div className={styles.firstbar}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </div>
      </div>
      <div className={styles.secondbar}>
        <Steps current={active_step} vertical>
          {STEPS.map((step) => (
            <Steps.Item key={step.id} title={step.name} icon={step.icon} />
          ))}
        </Steps>
      </div>
    </aside>
  );
}
