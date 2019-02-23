import ReactDOM from "react-dom";
import React from "react";
import {Field} from "./field";
import {NumericInput} from "@blueprintjs/core";

describe("Field component", () => {
  it('renders without crashing', () => {
    const NumberField = Field.ofType<number>();
    const div = document.createElement('div');
    ReactDOM.render(
      <NumberField component={NumericInput} title={"test"} value={11} onValueChange={(value) => console.log(value)} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});