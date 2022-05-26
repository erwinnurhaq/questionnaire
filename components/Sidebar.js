import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Steps } from 'rsuite';

import { STEPS } from '~/constants/steps';
import { setCurrentStep } from '~/store/slices/stepSlice';
import styles from '~/styles/components/Sidebar.module.css';
import StepIcons from './StepIcons';

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { latest } = useSelector((state) => state.step);

  function handleOnClickStep(step) {
    if (step.step <= latest.step) {
      dispatch(setCurrentStep(step))
      router.push(step.path);
    }
  }

  return (
    <aside className={styles.container}>
      <div className={styles.firstbar}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </div>
      </div>
      <div className={styles.secondbar}>
        <Steps current={latest.step} vertical>
          {STEPS.map((step) => (
            <Steps.Item
              key={step.step}
              title={step.name}
              icon={<StepIcons step={step.step} />}
              onClick={() => handleOnClickStep(step)}
            />
          ))}
        </Steps>
      </div>
    </aside>
  );
}
