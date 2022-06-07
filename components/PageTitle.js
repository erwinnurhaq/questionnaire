import styles from '~/styles/components/PageTitle.module.css';

function PageTitle({ alignment = 'left', children }) {
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

  return <h2 className={getAlignmentClassname(alignment)}>{children}</h2>;
}

export default PageTitle;
