import React from 'react';
import { IconButton } from 'rsuite';
import PageNextIcon from '@rsuite/icons/PageNext';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import styles from '~/styles/components/PaginationButtons.module.css';

function PaginationButtons({
  alignment = 'right',
  isShowPrev = true,
  isShowNext = true,
  isSubmit = false,
  isDisablePrev = false,
  isDisableNext = false,
  onClickPrev = () => {},
  onClickNext = () => {},
  form = undefined,
  options = {},
}) {
  const {
    titlePrev = 'Sebelumnya',
    titleNext = 'Berikutnya',
    labelPrev = 'Sebelumnya',
    labelNext = 'Berikutnya',
  } = options;

  function getAlignmentClassname(value) {
    switch (value) {
      case 'left':
        return styles.alignmentLeft;
      case 'right':
        return styles.alignmentRight;
      default:
        return styles.alignmentCenter;
    }
  }

  return (
    <div className={getAlignmentClassname(alignment)}>
      {isShowPrev && (
        <IconButton
          icon={<PagePreviousIcon />}
          placement="left"
          title={titlePrev}
          disabled={isDisablePrev}
          onClick={onClickPrev}
        >
          {labelPrev}
        </IconButton>
      )}
      {isShowNext && (
        <IconButton
          icon={<PageNextIcon />}
          placement="right"
          title={titleNext}
          appearance="primary"
          disabled={isDisableNext}
          type={isSubmit ? 'submit' : 'button'}
          onClick={isSubmit ? undefined : onClickNext}
          {...(form && { form })}
        >
          {labelNext}
        </IconButton>
      )}
    </div>
  );
}

export default PaginationButtons;
