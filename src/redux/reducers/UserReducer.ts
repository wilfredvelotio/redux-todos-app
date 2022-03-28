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
        data: [...state.data, ...action.payload.data],
        pageStart: action.payload.pageStart + action.payload.data.length,
        pageLimit: action.payload.pageLimit + action.payload.data.length,
        didFirstLoad: action.payload.didFirstLoad,
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
