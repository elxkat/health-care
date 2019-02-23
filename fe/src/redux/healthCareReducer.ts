import {Action, handleActions} from "redux-actions";
import * as ActionTypes from "./actionTypes";
import {SetHealthCareFieldPayload} from "./actions";

export interface HealthCareStoreSlice {
  // view settings
  isFiltersOpen: boolean;
  isLoading: boolean;

  // filters values
  min_discharges: number | undefined;
  max_discharges: number | undefined;
  min_average_covered_charges: number | undefined;
  max_average_covered_charges: number | undefined;
  min_average_medicare_payments: number | undefined;
  max_average_medicare_payments: number | undefined;
  state: StateItem | undefined;

  // fields selection
  fields: string | undefined;

  results: ResultItem[];
}

export interface StateItem {
  name: string;
  code: string;
}

export interface ResultItem {
  ["DRG Definition"]: string;
  ["Provider Id"]: string;
  ["Provider Name"]: string;
  ["Provider Street Address"]: string;
  ["Provider City"]: string;
  ["Provider State"]: string;
  ["Provider Zip Code"]: string;
  ["Hospital Referral Region Description"]: string;
  ["Total Discharges"]: number;
  ["Average Covered Charges"]: string;
  ["Average Total Payments"]: string;
  ["Average Medicare Payments"]: string;
}

export const resultItemFields: Array<keyof ResultItem> = [
  "DRG Definition",
  "Provider Id",
  "Provider Name",
  "Provider Street Address",
  "Provider City",
  "Provider State",
  "Provider Zip Code",
  "Hospital Referral Region Description",
  "Total Discharges",
  "Average Covered Charges",
  "Average Total Payments",
  "Average Medicare Payments",
];

export const initialSliceState: HealthCareStoreSlice = {
  isFiltersOpen: false,
  isLoading: false,
  min_discharges: undefined,
  max_discharges: undefined,
  min_average_medicare_payments: undefined,
  max_average_medicare_payments: undefined,
  min_average_covered_charges: undefined,
  max_average_covered_charges: undefined,
  state: undefined,
  fields: undefined,
  results: [],
};

export const filterFieldNames: { [fieldName: string]: string } = {
  min_discharges: "min_discharges",
  max_discharges: "max_discharges",
  min_average_medicare_payments: "min_average_medicare_payments",
  max_average_medicare_payments: "max_average_medicare_payments",
  min_average_covered_charges: "min_average_covered_charges",
  max_average_covered_charges: "max_average_covered_charges",
  state: "state",
};

export const fieldNames: Record<keyof HealthCareStoreSlice, string> = {
  ...filterFieldNames as any,
  isFiltersOpen: "isFiltersOpen",
  isLoading: "isLoading",
  fields: "fields",
  results: "results",
};

export const healthCareReducer = handleActions({
  [ActionTypes.setHealthCareField]: (state: HealthCareStoreSlice, action: Action<SetHealthCareFieldPayload>) => {
    return { ...state, [action.payload!.fieldName]: action.payload!.value };
  },
}, initialSliceState);