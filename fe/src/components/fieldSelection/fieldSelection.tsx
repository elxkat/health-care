import {resultItemFields, StateItem} from "../../redux/healthCareReducer";
import {Checkbox} from "@blueprintjs/core";
import * as React from "react";
import styles from './fieldSelection.module.scss';

export interface FieldSelectionProps {
  value?: string;
  onValueChange?: (state: string) => void;
}

export const FieldSelection: React.FunctionComponent<FieldSelectionProps> = (props) => {
  const fields = fieldsFromString(props.value);
  return (
    <div className={styles.container}>
      {resultItemFields.map((fieldName) =>
        <Checkbox
          className={styles.field}
          key={fieldName}
          checked={fields[fieldName]}
          label={fieldName}
          onChange={() => props.onValueChange!(fieldsToString(fields, fieldName))}
        />)}
    </div>
  );
};

const fieldsFromString = (fieldsStr: string | undefined): { [fieldName: string]: boolean } => {
  if (!fieldsStr) {
    return {};
  }
  return fieldsStr.split(",").reduce((obj: { [fieldName: string]: boolean }, fieldName) => {
    obj[fieldName] = true;
    return obj;
  }, {});
};

const fieldsToString = (fields: { [fieldName: string]: boolean }, fieldName: string): string => {
  fields[fieldName] = !fields[fieldName];
  const selectedFields = Object.keys(fields).reduce((str, currFieldName) => {
    str += fields[currFieldName] ? `${currFieldName},` : "";
    return str;
  }, "");

  return selectedFields.slice(0, selectedFields.length - 1);
};