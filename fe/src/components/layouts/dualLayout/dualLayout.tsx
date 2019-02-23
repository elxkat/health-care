import React from "react";
import styles from './dualLayout.module.scss';
import classNames from 'classnames';

export const DualLayout: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const children = React.Children.toArray(props.children);
  const { className, ...otherProps } = props;
  // TODO - warning about discarding of children in case of > 2
  return (
    <div className={classNames(styles.dualLayout, className)} {...otherProps}>
      <div className={styles.child}>
        {children[0]}
      </div>
      <div className={styles.child}>
        {children[1]}
      </div>
    </div>
  );
};