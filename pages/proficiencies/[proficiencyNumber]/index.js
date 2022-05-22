import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Button } from 'rsuite';
import { GlobalDispatch } from '~/context';

import Questionlayout from '~/layouts/QuestionLayout';

export default function Proficiency() {
  const router = useRouter();
  const actions = useContext(GlobalDispatch);

  const { proficiencyNumber } = router.query;
  const { setActiveStep } = actions;

  useEffect(() => {
    setActiveStep(Number(proficiencyNumber) + 2);
  }, []); // eslint-disable-line

  return (
    <div>
      {proficiencyNumber}
      <Link href={`/proficiencies/${proficiencyNumber}/1`} passHref>
        <Button as="a" color="cyan" appearance="primary">
          Next
        </Button>
      </Link>
    </div>
  );
}

Proficiency.getLayout = (page) => <Questionlayout>{page}</Questionlayout>;
