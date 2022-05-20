import { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Steps } from 'rsuite';
import PageIcon from '@rsuite/icons/Page';
import CharacterAuthorizeIcon from '@rsuite/icons/CharacterAuthorize';
import PieChartIcon from '@rsuite/icons/PieChart';

import styles from '~/styles/components/Sidebar.module.css';
import { CATEGORIES } from '~/constants';
import { GlobalContext } from '~/context';

const iconSize = { fontSize: '1.2rem' };

export default function Sidebar() {
  const { active_category } = useContext(GlobalContext);

  return (
    <aside className={styles.container}>
      <div className={styles.firstbar}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </div>
      </div>
      <div className={styles.secondbar}>
        <Steps current={active_category} vertical>
          <Steps.Item
            title="Biodata"
            className="asdf"
            icon={<CharacterAuthorizeIcon style={iconSize} />}
          />
          {CATEGORIES.map((category) => (
            <Steps.Item
              key={category.id}
              title={category.name}
              icon={<PageIcon style={iconSize} />}
            />
          ))}
          <Steps.Item title="Result" icon={<PieChartIcon style={iconSize} />} />
        </Steps>
      </div>
    </aside>
  );
}
