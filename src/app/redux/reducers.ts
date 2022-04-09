import { combineReducers } from "redux";

import counter from "app/redux/slices/counter";
import auth from "app/redux/slices/auth";

const rootReducer = combineReducers({ counter, auth });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
