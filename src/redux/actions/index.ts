import { ActionTypes } from "./action-types";
import { FetchProps } from "src/redux/reducers/UserReducer";
import { FetchPosts } from "src/redux/reducers/PostsReducer";
import { ModalInterfaceProps } from "src/redux/reducers/ModalReducer";
import { InitialValuesFormikUser } from "src/Components/MyForms/MyForms";
import { FetchTodos } from "src/redux/reducers/TodosReducer";
import { InitialValuesFormikPost } from "src/Components/MyForms/Posts";
import { InitialValuesFormikTodos } from "src/Components/MyForms/Todos";

export interface FetchUsersAction {
  type: ActionTypes.FETCH_USERS;
  payload: FetchProps;
}
export interface LimitReachedAction {
  type: ActionTypes.LIMIT_REACHED;
}

export interface FetchPostsAction {
  type: ActionTypes.FETCH_POSTS;
  payload: FetchPosts;
}

export interface FetchTodosAction {
  type: ActionTypes.FETCH_TODOS;
  payload: FetchTodos;
}

export interface ModalAction {
  type: ActionTypes.MODAL_OPEN;
  payload: ModalInterfaceProps;
}
export interface ModalActionClose {
  type: ActionTypes.MODAL_CLOSE;
  payload: {
    open: boolean;
  };
}
export interface UpdateUsersAction {
  type: ActionTypes.UPDATE_USERS;
  payload: InitialValuesFormikUser;
}
export interface UpdatePostsAction {
  type: ActionTypes.UPDATE_POSTS;
  payload: InitialValuesFormikPost;
}

export interface UpdateTodosAction {
  type: ActionTypes.UPDATE_TODOS;
  payload: InitialValuesFormikTodos;
}

export type Action = FetchUsersAction | LimitReachedAction | UpdateUsersAction;
export type ActionPost = FetchPostsAction | LimitReachedAction | UpdatePostsAction;
export type ActionTodo = FetchTodosAction | LimitReachedAction | UpdateTodosAction;
export type ActionModal = ModalAction | ModalActionClose;
