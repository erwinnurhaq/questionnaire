import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconButton } from 'rsuite';
import SortDownIcon from '@rsuite/icons/SortDown';
import SortUp from '@rsuite/icons/SortUp';

import Questionlayout from '~/layouts/QuestionLayout';
import { questions } from '~/constants/questions';
import { useContext, useEffect } from 'react';
import { GlobalDispatch } from '~/context';

export default function ProficiencyQuestion() {
  const router = useRouter();
  const actions = useContext(GlobalDispatch);
  const { proficiencyNumber, questionNumber } = router.query;
  const { setActiveStep } = actions;

  const currentProficiency = questions.find((proficiency) => proficiency.no === Number(proficiencyNumber));

  console.log({ currentProficiency, proficiencyNumber, questionNumber, questions })
  function handleUp(p, q) {
    return Number(q) === 1 ? `/proficiencies/${p}` : `/proficiencies/${p}/${Number(q) - 1}`;
  }

  function handleDown(p, q) {
    console.log(currentProficiency?.questions[currentProficiency?.questions.length - 1])
    const last = currentProficiency?.questions[currentProficiency?.questions.length - 1]?.no;
    return Number(q) === last ? `/proficiencies/${Number(p) + 1}` : `/proficiencies/${p}/${Number(q) + 1}`;
  }

  useEffect(() => {
    setActiveStep(Number(proficiencyNumber) + 2);
  }, []); // eslint-disable-line

  return (
    <div>
      {proficiencyNumber} {questionNumber}
      <Link href={handleUp(proficiencyNumber, questionNumber)} passHref>
        <IconButton
          as="a"
          icon={<SortUp style={{ fontSize: '1.8rem' }} />}
          color="cyan"
          appearance="primary"
          circle
        />
      </Link>
      <Link href={handleDown(proficiencyNumber, questionNumber)} passHref>
        <IconButton
          as="a"
          icon={<SortDownIcon style={{ fontSize: '1.8rem' }} />}
          color="cyan"
          appearance="primary"
          circle
        />
      </Link>
    </div>
  );
}

ProficiencyQuestion.getLayout = (page) => <Questionlayout>{page}</Questionlayout>;
