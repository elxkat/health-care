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
  const fieldsToDisplay = item as ResultItem & { [fieldName: string]: any };
  return (
    <Card interactive={false} elevation={Elevation.THREE}>
      <H5 className={styles.title}>{item["Provider Name"]}</H5>
      {Object.keys(item).map((fieldName) => {
        if (fieldsToDisplay[fieldName] === undefined || fieldName === "Provider Name") {
          return;
        }
        return (
          <DualLayout key={fieldName} className={styles.resultItem}>
          <div>{fieldName}:</div>
          <div>{fieldsToDisplay[fieldName]}</div>
        </DualLayout>);
      })}
    </Card>
  );
};