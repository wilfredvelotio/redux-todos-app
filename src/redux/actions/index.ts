import { ActionTypes } from "./action-types";
import { Props } from "src/Components/Users/UserTypes";
import { FetchProps } from "src/redux/reducers/UserReducer";
import { FetchPosts } from "src/redux/reducers/PostsReducer";
import { ModalInterfaceProps } from "src/redux/reducers/ModalReducer";
import { InitialValuesFormikUser } from "src/Components/MyForms/MyForms";

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

interface UpdateUsersAction {
  type: ActionTypes.UPDATE_USERS;
  payload: InitialValuesFormikUser;
}

export type Action = FetchUsersAction | LimitReachedAction | UpdateUsersAction;
export type ActionPost = FetchPostsAction | LimitReachedAction;
export type ActionTodo = FetchTodosAction | LimitReachedAction;
export type ActionModal = ModalAction;
