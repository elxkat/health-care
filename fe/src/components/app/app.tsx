import React from 'react';
import styles from './app.module.scss';
import {Button, Checkbox, Collapse, Intent, Label, NumericInput, Spinner} from "@blueprintjs/core";
import {fieldNames, HealthCareStoreSlice, StateItem} from "../../redux/healthCareReducer";
import {DualLayout} from '../layouts/dualLayout/dualLayout';
import {StateCombo} from "../stateCombo/stateCombo";
import {Field} from "../layouts/field/field";
import {Header} from "../header/header";
import {Results} from "../results/results";
import {FieldSelection} from "../fieldSelection/fieldSelection";

export interface AppStateProps extends HealthCareStoreSlice {
}

export interface AppDispatchProps {
  setHealthCareField: (fieldName: string, value: unknown) => void;
  search: () => void;
}

const StateField = Field.ofType<StateItem | undefined>();
const NumericInputField = Field.ofType<number | undefined, { value: number | undefined, onValueChange: (value: number | undefined, valueAsStr: string) => void }>();
const StringField = Field.ofType<string | undefined>();

export class App extends React.Component<AppStateProps & AppDispatchProps> {

  constructor(props: AppStateProps & AppDispatchProps) {
    super(props);
    this.onNumericFieldValueChange = this.onNumericFieldValueChange.bind(this);
  }


  private onNumericFieldValueChange(fieldName: string, value: number| undefined, valueAsStr: string) {
    this.props.setHealthCareField(fieldName, valueAsStr === "" ? undefined : value);
  }

  private createNumericEventHandler(fieldName: string) {
    return (value: number| undefined, valueAsStr: string) => this.onNumericFieldValueChange(fieldName, value, valueAsStr);
  }

  public render() {
    const {
      min_discharges, max_discharges, isFiltersOpen,
      setHealthCareField, min_average_covered_charges, max_average_covered_charges,
      min_average_medicare_payments,
      max_average_medicare_payments,
      state,
      fields,
      search,
      results,
      isLoading,
    } = this.props;
    return (
      <div className={styles.app}>
        <Header />
        <Button icon="search" onClick={() => search()} intent={Intent.PRIMARY} large={true} className={styles.searchButton}>Search!</Button>
        <Button onClick={() => setHealthCareField(fieldNames.isFiltersOpen, !isFiltersOpen)}>{isFiltersOpen ? "Hide" : "Show"} Filters</Button>
        <Collapse className={styles.collapse} isOpen={isFiltersOpen} keepChildrenMounted={true}>
          <div className={styles.filtersRow}>
            <DualLayout>
              <NumericInputField
                title={"minimum # of discharges"}
                component={NumericInput}
                value={min_discharges}
                onValueChange={this.createNumericEventHandler(fieldNames.min_discharges)}
              />
              <NumericInputField
                title={"maximum # of discharges"}
                component={NumericInput}
                value={max_discharges}
                onValueChange={this.createNumericEventHandler(fieldNames.max_discharges)}
              />
            </DualLayout>
          </div>
          <div className={styles.filtersRow}>
            <DualLayout>
              <NumericInputField
                title={"minimum average covered charges"}
                component={NumericInput}
                value={min_average_covered_charges}
                onValueChange={this.createNumericEventHandler(fieldNames.min_average_covered_charges)}
              />
              <NumericInputField
                title={"maximum average covered charges"}
                component={NumericInput}
                value={max_average_covered_charges}
                onValueChange={this.createNumericEventHandler(fieldNames.max_average_covered_charges)}
              />
            </DualLayout>
          </div>
          <div className={styles.filtersRow}>
            <DualLayout>
              <NumericInputField
                title={"minium average medicare payments"}
                component={NumericInput}
                value={min_average_medicare_payments}
                onValueChange={this.createNumericEventHandler(fieldNames.min_average_medicare_payments)}
              />
              <NumericInputField
                title={"maxium average medicare payments"}
                component={NumericInput}
                value={max_average_medicare_payments}
                onValueChange={this.createNumericEventHandler(fieldNames.max_average_medicare_payments)}
              />
            </DualLayout>
          </div>
          <div className={styles.filtersRow}>
            <StateField
              title={"select state"}
              component={StateCombo}
              value={state}
              onValueChange={(item) => setHealthCareField(fieldNames.state, item)}
            />
          </div>
          <div className={styles.filtersRow}>
            <StringField
              title={"select fields or leave blank for all fields"}
              component={FieldSelection}
              value={fields}
              onValueChange={(value) => setHealthCareField(fieldNames.fields, value)}
            />
          </div>
        </Collapse>
        {results.length > 0 && <div className={styles.results}><Results results={results} /></div>}
        {isLoading && <div className={styles.backdrop}><Spinner className={styles.spinner} intent={Intent.PRIMARY} size={100} /></div>}
      </div>
    );
  }
}