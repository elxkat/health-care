import {createAction} from "redux-actions";
import * as ActionTypes from "./actionTypes";

export interface SetHealthCareFieldPayload {
  fieldName: string;
  value: unknown;
}
export const setHealthCareField = createAction<SetHealthCareFieldPayload, string, unknown>
  (ActionTypes.setHealthCareField, (fieldName: string, value) => ({
  fieldName,
  value,
}));