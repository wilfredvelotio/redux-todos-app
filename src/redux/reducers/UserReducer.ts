import { Props } from "../../Components/Users/UserTypes";
import { ActionTypes } from "../actions/action-types";
import { Action } from "../actions/index";

export interface FetchProps {
  data: Props[];
  pageStart: number;
  pageLimit: number;
  didFirstLoad: boolean;
}

const initialState: FetchProps = {
  data: [],
  pageStart: 0,
  pageLimit: 6,
  didFirstLoad: false,
};

const UserReducer = (state: FetchProps = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS:
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        pageStart: action.payload.pageStart + action.payload.data.length,
        pageLimit: action.payload.pageLimit + action.payload.data.length,
        didFirstLoad: action.payload.didFirstLoad,
      };
    case ActionTypes.USERS_LIMIT_REACHED:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default UserReducer;
