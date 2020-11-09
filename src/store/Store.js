import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import * as burgeBuilderReducers from "./reducers/index"

const logger = createLogger({});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  ingrds: burgeBuilderReducers.ingredients_reducer,
  order: burgeBuilderReducers.order_reducer,
  auth: burgeBuilderReducers.auth_reducer
})

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  ) /* ,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
);

export default store;
