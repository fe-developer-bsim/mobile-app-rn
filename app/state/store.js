import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from './reducers';
import {screenTracking, debounceNavActions} from './reduxMiddlewares.js';

let enhancers = [];
const devToolsExtension = window.devToolsExtension;
if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}

const enhancer = compose(applyMiddleware(thunk, promise, debounceNavActions, screenTracking), ...enhancers);

const initStore = () => createStore(rootReducer, {}, enhancer);

module.exports = {
  initStore
};
