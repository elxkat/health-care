import React from "react";
import styles from './dualLayout.module.scss';
import classNames from 'classnames';

export interface DualLayoutProps {
  // spec for dual layout
}

export const DualLayout: React.FunctionComponent<DualLayoutProps> = (props) => {
  const children = React.Children.toArray(props.children);

  // TODO - warning about discarding of children in case of > 2
  return (
    <div className={styles.dualLayout}>
      <div className={styles.child}>
        {children[0]}
      </div>
      <div className={styles.child}>
        {children[1]}
      </div>
    </div>
  );
};