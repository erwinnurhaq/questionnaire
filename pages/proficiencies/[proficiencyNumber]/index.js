import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'rsuite';

import ProficiencyLayout from '~/layouts/ProficiencyLayout';

export default function Proficiency() {
  const router = useRouter();
  const proficiencyNumber = Number(router.query.proficiencyNumber);

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

Proficiency.getLayout = (page) => <ProficiencyLayout>{page}</ProficiencyLayout>;
