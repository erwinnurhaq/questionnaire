import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ProficiencyLayout({ number, children }) {
  const router = useRouter();
  const { latest } = useSelector((state) => state.step);

  useEffect(() => {
    if (latest.step < number + 1) {
      if (number === 1) {
        router.push('/biodata');
      } else {
        router.push(`/proficiencies/${number - 1}`);
      }
    }
  }, []); // eslint-disable-line

  return <div>{children}</div>;
}
