import { Props } from "../../Components/Users/UserTypes";
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
  didFirstLoad: boolean;
}

const initialState: FetchProps = {
  data: [],
  reference: {
    myref: () => {},
    myView: false,
    pageStart: 0,
    pageLimit: 6,
  },
  didFirstLoad: false,
};

const userreducer = (state: FetchProps = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS:
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        reference: {
          myref: action.payload.reference.myref,
          myView: action.payload.reference.myView,
          pageStart:
            action.payload.reference.pageStart + action.payload.data.length,
          pageLimit:
            action.payload.reference.pageLimit + action.payload.data.length,
        },
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
export default userreducer;
