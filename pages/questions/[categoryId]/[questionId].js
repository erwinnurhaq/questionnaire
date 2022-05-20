import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconButton } from 'rsuite';
import SortDownIcon from '@rsuite/icons/SortDown';
import SortUp from '@rsuite/icons/SortUp';

import Questionlayout from '~/layouts/QuestionLayout';
import { CATEGORIES } from '~/constants';

export default function ProficiencyQuestion() {
  const router = useRouter();
  const { categoryId, questionId } = router.query;
  const currentCategoryId = Number(categoryId);
  const currentQuestionId = Number(questionId);
  const isFirstCategory = CATEGORIES.findIndex((item) => item.id === currentCategoryId) === 0;
  const isFirstQuestion = currentQuestionId === 1;

  return (
    <div>
      {categoryId} {questionId}
      <Link
        href={
          isFirstQuestion
            ? isFirstCategory
              ? '/'
              : `/questions/${categoryId - 1}`
            : `/questions/${categoryId}/${currentQuestionId - 1}`
        }
        passHref
      >
        <IconButton
          as="a"
          icon={<SortUp style={{ fontSize: '1.8rem' }} />}
          color="cyan"
          appearance="primary"
          circle
        />
      </Link>
      <Link href={`/questions/proficiency_1/${currentQuestionId + 1}`} passHref>
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
