import { ActionTypes } from "src/redux/actions/action-types";
import { Action } from "src/redux/actions/index";

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
        ...action.payload,
      };
    case ActionTypes.LIMIT_REACHED:
      return {
        ...state,
      };
    case ActionTypes.UPDATE_USERS:
      const userData = [...state.data];
      let userToUpdate = userData.findIndex((val) => val.id === action.payload.id);
      userData[userToUpdate] = { ...userData[userToUpdate], ...action.payload };
      return {
        ...state,
        data: userData,
      };
    default:
      return state;
  }
};
export default UserReducer;
