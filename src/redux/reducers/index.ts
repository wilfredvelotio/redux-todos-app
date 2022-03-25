import { combineReducers } from "redux";
import ModalReducer from "./ModalReducer";
import PostsReducer from "./PostsReducer";
import TodosReducer from "./TodosReducer";
import UserReducer from "./UserReducer";

const reducer = combineReducers({
  user: UserReducer,
  posts: PostsReducer,
  todos: TodosReducer,
  modal: ModalReducer,
});
export default reducer;

export type ReduxState = ReturnType<typeof reducer>;
