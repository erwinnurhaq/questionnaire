import Image from 'next/image';
import styles from '~/styles/components/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.supporter}>
        <p>Supported by:</p>
        <div className={styles.supporterImages}>
          <div>
            <Image
              src="/images/upi.png"
              alt="image-upi"
              width={40}
              height={40}
            />
          </div>
          <div>
            <Image
              src="/images/kgb.png"
              alt="image-kgb"
              width={160}
              height={40}
            />
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
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
      </div>
    </footer>
  );
}
