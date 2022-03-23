import { MyTodosProps } from "../../Components/Todos/TodosTypes";
import { ActionTypes } from "../actions/action-types";
import { Action, ActionPost, ActionTodo } from "../actions/index";

interface Reference {
  myref: (node?: Element | null | undefined) => void;
  myView: boolean;
  pageStart: number;
  pageLimit: number;
}
export interface FetchTodos {
  data: MyTodosProps[];
  reference: Reference;
  didFirstLoad: boolean;
}

const initialState: FetchTodos = {
  data: [],
  reference: {
    myref: () => {},
    myView: false,
    pageStart: 0,
    pageLimit: 6,
  },
  didFirstLoad: false,
};

const TodosReducer = (state: FetchTodos = initialState, action: ActionTodo) => {
  switch (action.type) {
    case ActionTypes.FETCH_TODOS:
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        reference: {
          myref: action.payload.reference.myref,
          myView: action.payload.reference.myView,
          pageStart: action.payload.reference.pageStart + action.payload.data.length,
          pageLimit: action.payload.reference.pageLimit + action.payload.data.length,
        },
        didFirstLoad: action.payload.didFirstLoad,
      };
    case ActionTypes.TODOS_LIMIT_REACHED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default TodosReducer;
