import { combineReducers } from "redux";
import userreducer from "./UserReducer";

const reducer = combineReducers({
  user: userreducer,
});
export default reducer;

export type ReduxState = ReturnType<typeof reducer>;
