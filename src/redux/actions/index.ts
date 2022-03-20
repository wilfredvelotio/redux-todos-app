import { ActionTypes } from "./action-types";
import { Props } from "../../../Types/UserTypes";

interface FetchProductsAction {
  type: ActionTypes.FETCH_PRODUCTS;
  payload: Props[];
}

export type Action = FetchProductsAction;
