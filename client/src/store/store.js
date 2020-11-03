import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers/rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeEnhancers = composeEnhancers(applyMiddleware(thunk, logger));

const configureStore = (initialState) => {
  return createStore(rootReducer, initialState, storeEnhancers);
};

export default configureStore;
