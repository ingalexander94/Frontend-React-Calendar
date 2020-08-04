import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { uiReducer } from "../reducers/uiReducer";
import { calendarReducer } from "../reducers/calendarReducer";
import { authReducer } from "../reducers/authReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const rootReducer = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
  auth: authReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
