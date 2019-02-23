import {healthCareReducer, HealthCareStoreSlice} from "./healthCareReducer";
import {combineReducers} from "redux";
import {Reducer} from "redux-actions";

export interface RootState {
  healthCare: HealthCareStoreSlice;
}

const reducerMap: Record<keyof RootState, Reducer<any, any>> = {
  healthCare: healthCareReducer,
};

export default combineReducers(reducerMap);