import { Props } from "../../../Types/UserTypes";
import { ActionTypes } from "../actions/action-types";
import { Action } from "../actions/index";
const initialState: Props[] = [];
const userreducer = (state: Props[] = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCTS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
export default userreducer;
