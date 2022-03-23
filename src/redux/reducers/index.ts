import { combineReducers } from "redux";
import PostsReducer from "./PostsReducer";
import TodosReducer from "./TodosReducer";
import UserReducer from "./UserReducer";

const reducer = combineReducers({
  user: UserReducer,
  posts: PostsReducer,
  todos: TodosReducer,
});
export default reducer;

export type ReduxState = ReturnType<typeof reducer>;
