import React from 'react';
import styles from './app.module.scss';
import {Button, Collapse, Intent, Label, NumericInput, Spinner} from "@blueprintjs/core";
import {fieldNames, HealthCareStoreSlice, StateItem} from "../../redux/healthCareReducer";
import {DualLayout} from '../layouts/dualLayout/dualLayout';
import {StateCombo} from "../stateCombo/stateCombo";
import {Field} from "../layouts/field/field";
import {Header} from "../header/header";
import {Results} from "../results/results";

export interface AppStateProps extends HealthCareStoreSlice {
}

export interface AppDispatchProps {
  toggleFilters: (value: boolean) => void;
  setHealthCareField: (fieldName: string, value: unknown) => void;
  search: () => void;
}

const StateField = Field.ofType<StateItem | undefined>();
const NumberField = Field.ofType<number | undefined>();

export class App extends React.Component<AppStateProps & AppDispatchProps> {
  public render() {
    const {
      min_discharges, max_discharges, isFiltersOpen, toggleFilters,
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
        <Button onClick={() => toggleFilters(!isFiltersOpen)}>{isFiltersOpen ? "Hide" : "Show"} Filters</Button>
        <Collapse isOpen={isFiltersOpen} keepChildrenMounted={true}>
          <DualLayout className={styles.filtersRow}>
            <>
              <NumberField
                title={"minimum # of discharges"}
                component={<NumericInput/>}
                value={min_discharges!}
                onValueChange={(value) => setHealthCareField(fieldNames.min_discharges, value)}
              />
              <NumberField
                title={"minimum average covered charges"}
                component={<NumericInput/>}
                value={min_average_covered_charges!}
                onValueChange={(value) => setHealthCareField(fieldNames.min_average_covered_charges, value)}
              />
              <NumberField
                title={"minium average medicare payments"}
                component={<NumericInput/>}
                value={min_average_medicare_payments!}
                onValueChange={(value) => setHealthCareField(fieldNames.min_average_medicare_payments, value)}
              />
            </>
            <>
              <NumberField
                title={"maximum # of discharges"}
                component={<NumericInput/>}
                value={max_discharges!}
                onValueChange={(value) => setHealthCareField(fieldNames.max_discharges, value)}
              />
              <NumberField
                title={"maximum average covered charges"}
                component={<NumericInput/>}
                value={max_average_covered_charges!}
                onValueChange={(value) => setHealthCareField(fieldNames.max_average_covered_charges, value)}
              />
              <NumberField
                title={"maxium average medicare payments"}
                component={<NumericInput/>}
                value={max_average_medicare_payments!}
                onValueChange={(value) => setHealthCareField(fieldNames.max_average_medicare_payments, value)}
              />
            </>
          </DualLayout>
          <StateField
            title={"select state"}
            component={<StateCombo/>}
            value={state}
            onValueChange={(item) => setHealthCareField(fieldNames.state, item)}
          />
        </Collapse>
        {results.length > 0 && <div className={styles.results}><Results results={results} /></div>}
        {isLoading && <Spinner className={styles.spinner} intent={Intent.PRIMARY} size={100} />}
      </div>
    );
  }
}