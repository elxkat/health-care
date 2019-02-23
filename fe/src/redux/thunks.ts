import {Dispatch} from "redux";
import {RootState} from "./index";
import {fieldNames, filterFieldNames, HealthCareStoreSlice} from "./healthCareReducer";
import {setHealthCareField} from "./actions";

export const rootApi = "https://us-central1-health-care-db.cloudfunctions.net/api";
// export const rootApi = "http://localhost:3001";

export const getFilterValue = (value: NonNullable<any>): string => {
  if (typeof value === "object") {
    if (value.code) { // StateItem
      return value.code;
    }

    throw new Error("getFilterValue - unrecognized filter object");
  }

  return value;
};

export const wrapFieldsForQuery = (fields: string): string => {
  return fields.split(",").map((fieldName) => `"${fieldName}"`).join(",");
};

export const getFilterString = (healthCareStoreSlice: HealthCareStoreSlice): string => {
  let filterString = Object.entries(healthCareStoreSlice).reduce((str, entry) => {
    if (filterFieldNames[entry[0]] && entry[1]) {
      str += `${entry[0]}=${getFilterValue(entry[1])}&`;
    }
    return str;
  }, "?");

  if (healthCareStoreSlice.fields) {
    const fields = wrapFieldsForQuery(healthCareStoreSlice.fields);
    filterString = filterString.length === 1 ? `${filterString}fields=${fields}&` : `${filterString}&fields=${fields}&`;
  }

  filterString = filterString.length === 1 ? "" : filterString.slice(0, filterString.length - 1);

  return filterString;
};

export const search = () => (dispatch: Dispatch, getState: () => RootState) => {
  const healthCareStoreSlice = getState().healthCare;

  dispatch(setHealthCareField(fieldNames.isFiltersOpen, false));
  dispatch(setHealthCareField(fieldNames.isLoading, true));
  dispatch(setHealthCareField(fieldNames.results, []));

  const searchFunction = retryFn(() => {
    return fetch(`${rootApi}/providers${getFilterString(healthCareStoreSlice)}`, {
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "Keep-Alive": "timeout=30",
      },
    }).then(async (response) => {
      if (response.ok) {
        const results = await response.json();
        dispatch(setHealthCareField(fieldNames.results, results));
        dispatch(setHealthCareField(fieldNames.isLoading, false));
      } else {
        // TODO - error handling
        dispatch(setHealthCareField(fieldNames.isLoading, false));
      }
    });
  }, 3);

  searchFunction();
};

const retryFn = (fn: () => Promise<any>, times: number) => {
  async function retryFnInternal(n: number) {
    try {
      await fn();
    } catch (e) {
      const timeout = Math.pow(2, n) + (Math.random() * 1000);
      if (n >= times) {
        return;
      }
      setTimeout(() => retryFnInternal(n + 1), Math.min(timeout, 20000));
    }
  }

  return () => retryFnInternal(1);
};