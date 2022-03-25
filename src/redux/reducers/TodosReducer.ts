import { MyTodosProps } from "src/Components/Todos/TodosTypes";
import { ActionTypes } from "src/redux/actions/action-types";
import { Action, ActionPost, ActionTodo } from "src/redux/actions/index";

export interface FetchTodos {
  data: MyTodosProps[];
  pageStart: number;
  pageLimit: number;
  didFirstLoad: boolean;
}

const initialState: FetchTodos = {
  data: [],
  pageStart: 0,
  pageLimit: 6,
  didFirstLoad: false,
};

const TodosReducer = (state: FetchTodos = initialState, action: ActionTodo) => {
  switch (action.type) {
    case ActionTypes.FETCH_TODOS:
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        pageStart: action.payload.pageStart + action.payload.data.length,
        pageLimit: action.payload.pageLimit + action.payload.data.length,
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
