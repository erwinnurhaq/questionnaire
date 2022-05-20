import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'rsuite';

import Questionlayout from '~/layouts/QuestionLayout';

export default function CategoryQuestion() {
  const router = useRouter();
  const { categoryId } = router.query;

  return (
    <div>
      {categoryId}
      <Link href={`/questions/${categoryId}/1`} passHref>
        <Button as="a" color="cyan" appearance="primary">
          Next
        </Button>
      </Link>
    </div>
  );
}

CategoryQuestion.getLayout = (page) => <Questionlayout>{page}</Questionlayout>;
