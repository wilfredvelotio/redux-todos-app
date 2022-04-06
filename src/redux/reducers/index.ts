import { combineReducers } from "redux";
import ModalReducer from "src/redux/reducers/ModalReducer";
import PostsReducer from "src/redux/reducers/PostsReducer";
import TodosReducer from "src/redux/reducers/TodosReducer";
import UserReducer from "src/redux/reducers/UserReducer";

const reducer = combineReducers({
  user: UserReducer,
  posts: PostsReducer,
  todos: TodosReducer,
  modal: ModalReducer,
});
export default reducer;

export type ReduxState = ReturnType<typeof reducer>;
