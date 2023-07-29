import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { IconButton, Steps, Drawer as DrawerRSuite } from 'rsuite';
import ReloadIcon from '@rsuite/icons/Reload';

import { setCurrentStep } from '~/store/slices/stepSlice';
import { STEPS } from '~/constants/steps';
import styles from '~/styles/components/Drawer.module.css';
import StepIcons from './StepIcons';

export default function Drawer({ isOpenDrawer, setIsOpenDrawer }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { latest } = useSelector((state) => state.step);

  async function handleResetForm() {
    window.location.replace('/');
  }

  function handleOnClickStep(step) {
    if (step.step <= latest.step) {
      dispatch(setCurrentStep(step));
      router.push(step.path);
      setIsOpenDrawer(false);
    }
  }

  return (
    <DrawerRSuite
      className={styles.drawercontainer}
      size="xs"
      placement="left"
      open={isOpenDrawer}
      onClose={() => setIsOpenDrawer(false)}
    >
      <DrawerRSuite.Body className={styles.drawerbody}>
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
            {latest.step > 0 && (
              <IconButton icon={<ReloadIcon />} appearance="primary" onClick={handleResetForm}>
                Clear and Reset Form
              </IconButton>
            )}
          </div>
        </aside>
      </DrawerRSuite.Body>
    </DrawerRSuite>
  );
}
