import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from ".";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "../../redux";

describe("App component", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={createStore(rootReducer)}><AppContainer /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});