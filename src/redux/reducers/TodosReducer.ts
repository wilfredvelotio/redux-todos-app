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
        ...action.payload,
      };
    case ActionTypes.UPDATE_TODOS:
      const todosData = [...state.data];
      let todosToUpdate = todosData.findIndex((val) => val.id === action.payload.id);
      todosData[todosToUpdate] = { ...todosData[todosToUpdate], ...action.payload };
      return {
        ...state,
        data: todosData,
      };
    case ActionTypes.LIMIT_REACHED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default TodosReducer;
