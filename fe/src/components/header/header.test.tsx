import ReactDOM from "react-dom";
import React from "react";
import {Header} from "./header";

describe("Header component", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});