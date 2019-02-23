import {setHealthCareField} from "./actions";

describe("Actions", () => {
  it('create a set field action correctly', () => {
    const action = setHealthCareField("testFieldName", 55);
    expect(action.payload).toEqual({ fieldName: "testFieldName", value: 55 });
  });
});