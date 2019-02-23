import {Dispatch} from "redux";
import {RootState} from "./index";
import {fieldNames, filterFieldNames, HealthCareStoreSlice} from "./healthCareReducer";
import {setHealthCareField} from "./actions";

// export const rootApi = "https://us-central1-health-care-db.cloudfunctions.net/api";
export const rootApi = "http://localhost:3001";

export const getFilterValue = (value: NonNullable<any>): string => {
  if (typeof value === "object") {
    if (value.code) { // StateItem
      return value.code;
    }

    throw new Error("getFilterValue - unrecognized filter object");
  }

  return value;
};
export const getFilterString = (healthCareStoreSlice: HealthCareStoreSlice): string => {
  let filterString = Object.entries(healthCareStoreSlice).reduce((str, entry) => {
    if (filterFieldNames[entry[0]] && entry[1]) {
      str += `${entry[0]}=${getFilterValue(entry[1])}&`;
    }
    return str;
  }, "?");

  filterString = filterString.length === 1 ? "" : filterString.slice(0, filterString.length - 1);

  return filterString;
};

export const search = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const healthCareStoreSlice = getState().healthCare;

  dispatch(setHealthCareField(fieldNames.isFiltersOpen, false));
  dispatch(setHealthCareField(fieldNames.isLoading, true));
  dispatch(setHealthCareField(fieldNames.results, []));

  const response = await fetch(`${rootApi}/providers${getFilterString(healthCareStoreSlice)}`, {
    credentials: "same-origin",
    headers: {
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const results = await response.json();
    dispatch(setHealthCareField(fieldNames.results, results));
    dispatch(setHealthCareField(fieldNames.isLoading, false));
  } else {
    // TODO - error handling
    dispatch(setHealthCareField(fieldNames.isLoading, false));
  }

};