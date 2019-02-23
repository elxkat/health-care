import React from "react";
import styles from './header.module.scss';
import {H1} from "@blueprintjs/core";

export const Header: React.FunctionComponent = () => {
  return (
    <H1 className={styles.header} onClick={() => location.reload()}>Health-Care Providers Search</H1>
  );
};