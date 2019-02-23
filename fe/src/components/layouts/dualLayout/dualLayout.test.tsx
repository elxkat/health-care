import ReactDOM from "react-dom";
import React from "react";
import {DualLayout} from "./dualLayout";

describe("DualLayout component", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <DualLayout>
        <div>AAA</div>
        <div>BBB</div>
      </DualLayout>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders successfully with more than 2 children', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <DualLayout>
        <div>AAA</div>
        <div>BBB</div>
        <div>CCCCC</div>
        <div>BBBDDDDDDD</div>
      </DualLayout>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders successfully with one child', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <DualLayout>
        <div>AAA</div>
      </DualLayout>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});