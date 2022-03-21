import { ActionTypes } from "./action-types";
import { Props } from "../../../Types/UserTypes";
import { FetchProps } from "../reducers/UserReducer";
interface FetchProductsAction {
  type: ActionTypes.FETCH_PRODUCTS;
  payload: FetchProps;
}

export type Action = FetchProductsAction;
