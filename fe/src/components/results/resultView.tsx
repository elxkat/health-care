import * as React from "react";
import {Card, Elevation, H5} from "@blueprintjs/core";
import {ResultItem} from "../../redux/healthCareReducer";
import {DualLayout} from "../layouts/dualLayout/dualLayout";
import styles from './resultView.module.scss';

export interface ResultViewProps {
  item: ResultItem;
}
export const ResultView: React.FunctionComponent<ResultViewProps> = (props) => {
  const { item } = props;
  return (
    <Card interactive={false} elevation={Elevation.THREE}>
      <H5 className={styles.title}>{item["Provider Name"]}</H5>
      <DualLayout className={styles.resultItem}>
        <div>Provider City:</div>
        <div>{item["Provider City"]}</div>
      </DualLayout>
      <DualLayout className={styles.resultItem}>
        <div>Provider State:</div>
        <div>{item["Provider State"]}</div>
      </DualLayout>
      <DualLayout className={styles.resultItem}>
        <div>Provider Street Address:</div>
        <div>{item["Provider Street Address"]}</div>
      </DualLayout>
      <DualLayout className={styles.resultItem}>
        <div>Total Discharges:</div>
        <div>{item["Total Discharges"]}</div>
      </DualLayout>
      <DualLayout className={styles.resultItem}>
        <div>Average Covered Charges:</div>
        <div>{item["Average Covered Charges"]}</div>
      </DualLayout>
      <DualLayout className={styles.resultItem}>
        <div>Average Medicare Payments:</div>
        <div>{item["Average Medicare Payments"]}</div>
      </DualLayout>
      <DualLayout className={styles.resultItem}>
        <div>Average Total Payments:</div>
        <div>{item["Average Total Payments"]}</div>
      </DualLayout>
      <DualLayout className={styles.resultItem}>
        <div>Hospital Referral Region:</div>
        <div>{item["Hospital Referral Region Description"]}</div>
      </DualLayout>
    </Card>
  );
};