import { ActionTypes } from "../actions/action-types";
import { Dispatch } from "redux";
import { Action } from "./index";
import { Props } from "../../../Types/UserTypes";
import axios from "axios";

export const fetchProducts = (url: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const users = await axios.get<Props[]>(url);
    dispatch({
      type: ActionTypes.FETCH_PRODUCTS,
      payload: {
        data: users.data,
        reference,
      },
    });
  };
};
