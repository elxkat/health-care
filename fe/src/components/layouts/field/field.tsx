import {Label} from "@blueprintjs/core";
import React from "react";
import styles from './field.module.scss';

export interface FieldProps<T> {
  title: string;
  component: React.ComponentType;
  value: T;
  onValueChange: (value: T) => void;
}

export class Field<T> extends React.PureComponent<FieldProps<T>> {

  public static ofType<T>() {
    return Field as new (props: FieldProps<T>) => Field<T>;
  }
  public render(): React.ReactNode {
    const { title, onValueChange, value, component } = this.props;

    return (
        <div className={styles.field}>
          <Label>{title}
            {React.createElement(component as any, { value, onValueChange })}
          </Label>
        </div>
    );
  }
}