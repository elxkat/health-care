import {setHealthCareField} from "./actions";
import {fieldNames, healthCareReducer, initialSliceState} from "./healthCareReducer";

describe("healthCareReducer", () => {
  it('create a set field action correctly', () => {
    const action = setHealthCareField(fieldNames.isFiltersOpen, true);
    const changedState = healthCareReducer(initialSliceState, action);
    expect(changedState).toEqual({ ...initialSliceState, isFiltersOpen: true });
  });
});