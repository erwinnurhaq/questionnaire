import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconButton } from 'rsuite';
import SortDownIcon from '@rsuite/icons/SortDown';
import SortUp from '@rsuite/icons/SortUp';

import ProficiencyLayout from '~/layouts/ProficiencyLayout';
import { questions } from '~/constants/questions';

export default function ProficiencyQuestion() {
  const router = useRouter();
  const { proficiencyNumber, questionNumber } = router.query;

  const currentProficiency = questions.find((proficiency) => proficiency.no === Number(proficiencyNumber));

  function handleUp(p, q) {
    return Number(q) === 1 ? `/proficiencies/${p}` : `/proficiencies/${p}/${Number(q) - 1}`;
  }

  function handleDown(p, q) {
    const last = currentProficiency?.questions[currentProficiency?.questions.length - 1]?.no;
    return Number(q) === last ? `/proficiencies/${Number(p) + 1}` : `/proficiencies/${p}/${Number(q) + 1}`;
  }

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

ProficiencyQuestion.getLayout = (page) => <ProficiencyLayout>{page}</ProficiencyLayout>;
