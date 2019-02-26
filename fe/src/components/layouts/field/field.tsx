import {Label} from "@blueprintjs/core";
import React from "react";
import styles from './field.module.scss';

export interface DefaultValueControlledProps<T> {
  value: T;
  onValueChange: (value: T, ...extra: any) => void;
}

export interface FieldProps<T, P extends DefaultValueControlledProps<T>> {
  title: string;
  component: React.ComponentType<any>;
}

export class Field<T, P extends DefaultValueControlledProps<T>> extends React.PureComponent<FieldProps<T, P> & P> {

  public static ofType<T, P extends DefaultValueControlledProps<T> = DefaultValueControlledProps<T>>() {
    return Field as new (props: FieldProps<T, P>) => Field<T, P>;
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