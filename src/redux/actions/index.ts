import { ActionTypes } from "./action-types";
import { Props } from "../../Components/Users/UserTypes";
import { FetchProps } from "../reducers/UserReducer";
interface FetchUsersAction {
  type: ActionTypes.FETCH_USERS;
  payload: FetchProps;
}
interface UserLimitReachedAction {
  type: ActionTypes.USERS_LIMIT_REACHED;
}

export type Action = FetchUsersAction | UserLimitReachedAction;
