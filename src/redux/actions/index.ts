import { ActionTypes } from "./action-types";
import { Props } from "../../Components/Users/UserTypes";
import { FetchProps } from "../reducers/UserReducer";
import { FetchPosts } from "../reducers/PostsReducer";
import { ModalInterfaceProps } from "../reducers/ModalReducer";

interface FetchUsersAction {
  type: ActionTypes.FETCH_USERS;
  payload: FetchProps;
}
interface LimitReachedAction {
  type: ActionTypes.USERS_LIMIT_REACHED | ActionTypes.POSTS_LIMIT_REACHED | ActionTypes.TODOS_LIMIT_REACHED;
}

interface FetchPostsAction {
  type: ActionTypes.FETCH_POSTS;
  payload: FetchPosts;
}

interface FetchTodosAction {
  type: ActionTypes.FETCH_TODOS;
  payload: FetchPosts;
}

interface ModalAction {
  type: ActionTypes.MODAL_CLOSE | ActionTypes.MODAL_OPEN;
  payload: ModalInterfaceProps;
}

export type Action = FetchUsersAction | LimitReachedAction;
export type ActionPost = FetchPostsAction | LimitReachedAction;
export type ActionTodo = FetchTodosAction | LimitReachedAction;
export type ActionModal = ModalAction;
