import { ActionTypes } from "../actions/action-types";
import { Dispatch } from "redux";
import { Action } from "./index";
import { Props } from "../../Components/Users/UserTypes";
import axios from "axios";

export const fetchUsers = (
  url: string,
  ref: (node?: Element | null | undefined) => void,
  pageStart: number,
  pageLimit: number,
  inView: boolean
) => {
  console.log("action dispacthed");
  return async (dispatch: Dispatch<Action>) => {
    const { data } = await axios.get<Props[]>(url);
    if (data)
      dispatch({
        type: ActionTypes.FETCH_USERS,
        payload: {
          data: data,
          reference: {
            myView: inView,
            myref: ref,
            pageStart: pageStart,
            pageLimit: pageLimit,
          },
          didFirstLoad: true,
        },
      });
    else
      dispatch({
        type: ActionTypes.USERS_LIMIT_REACHED,
      });
  };
};
