import { combineReducers } from "redux";

import counter from "app/redux/slices/counter";
import auth from "app/redux/slices/auth";
// import apartment from "app/redux/slices/apartment";

const rootReducer = combineReducers({ counter, auth });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
