import { Props } from "../../../Types/UserTypes";
import { ActionTypes } from "../actions/action-types";
import { Action } from "../actions/index";
interface Reference {
  myref: (node?: Element | null | undefined) => void;
  myView: boolean;
  pageStart: number;
  pageLimit: number;
}
export interface FetchProps {
  data: Props[];
  reference: Reference;
  didURLChange: boolean;
}

const initialState: FetchProps = {
  data: [],
  reference: {
    myref: () => {},
    myView: false,
    pageStart: 0,
    pageLimit: 6,
  },
  didURLChange: false,
};
const userreducer = (state: FetchProps = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default userreducer;
