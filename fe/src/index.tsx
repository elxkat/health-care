import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppContainer from './components/app';
import rootReducer from './redux';
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import ReduxThunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'));