import * as React from "react";
import {Select} from "@blueprintjs/select";
import {Button} from "@blueprintjs/core";
import {StateItem} from "../../redux/healthCareReducer";
import styles from './stateCombo.module.scss';

export interface StateComboProps {
  value?: StateItem;
  onValueChange?: (state: StateItem) => void;
}

const StringSelect = Select.ofType<StateItem>();

export const stateItemDisplay = (item?: StateItem) => item ? `${item.name} (${item.code})` : "";

export type StateCombo = React.FunctionComponent<StateComboProps>;
export const StateCombo: React.FunctionComponent<StateComboProps> = (props) => {
  return (
    <StringSelect
      scrollToActiveItem={true}
      activeItem={props.value}
      items={states as StateItem[]}
      filterable={false}
      onItemSelect={props.onValueChange!}
      itemRenderer={(item, itemProps) => <Button key={item ? item.code : "empty"} className={styles.comboItem} onClick={itemProps.handleClick} minimal={true}>{stateItemDisplay(item)}</Button>}
    >
      <Button text={stateItemDisplay(props.value)} rightIcon="double-caret-vertical"/>
    </StringSelect>
  );
};

const states: Array<StateItem | undefined> = [
  undefined,
  {code: "AK", name: "Alaska"},
  {code: "AL", name: "Alabama"},
  {code: "AR", name: "Arkansas"},
  {code: "AS", name: "American Samoa"},
  {code: "AZ", name: "Arizona"},
  {code: "CA", name: "California"},
  {code: "CO", name: "Colorado"},
  {code: "CT", name: "Connecticut"},
  {code: "DC", name: "District of Columbia"},
  {code: "DE", name: "Delaware"},
  {code: "FL", name: "Florida"},
  {code: "GA", name: "Georgia"},
  {code: "GU", name: "Guam"},
  {code: "HI", name: "Hawaii"},
  {code: "IA", name: "Iowa"},
  {code: "ID", name: "Idaho"},
  {code: "IL", name: "Illinois"},
  {code: "IN", name: "Indiana"},
  {code: "KS", name: "Kansas"},
  {code: "KY", name: "Kentucky"},
  {code: "LA", name: "Louisiana"},
  {code: "MA", name: "Massachusetts"},
  {code: "MD", name: "Maryland"},
  {code: "ME", name: "Maine"},
  {code: "MI", name: "Michigan"},
  {code: "MN", name: "Minnesota"},
  {code: "MO", name: "Missouri"},
  {code: "MS", name: "Mississippi"},
  {code: "MT", name: "Montana"},
  {code: "NC", name: "North Carolina"},
  {code: "ND", name: " North Dakota"},
  {code: "NE", name: "Nebraska"},
  {code: "NH", name: "New Hampshire"},
  {code: "NJ", name: "New Jersey"},
  {code: "NM", name: "New Mexico"},
  {code: "NV", name: "Nevada"},
  {code: "NY", name: "New York"},
  {code: "OH", name: "Ohio"},
  {code: "OK", name: "Oklahoma"},
  {code: "OR", name: "Oregon"},
  {code: "PA", name: "Pennsylvania"},
  {code: "PR", name: "Puerto Rico"},
  {code: "RI", name: "Rhode Island"},
  {code: "SC", name: "South Carolina"},
  {code: "SD", name: "South Dakota"},
  {code: "TN", name: "Tennessee"},
  {code: "TX", name: "Texas"},
  {code: "UT", name: "Utah"},
  {code: "VA", name: "Virginia"},
  {code: "VI", name: "Virgin Islands"},
  {code: "VT", name: "Vermont"},
  {code: "WA", name: "Washington"},
  {code: "WI", name: "Wisconsin"},
  {code: "WV", name: "West Virginia"},
  {code: "WY", name: "Wyoming"},
];