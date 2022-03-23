import { ActionTypes } from "./action-types";
import { Props } from "../../Components/Users/UserTypes";
import { FetchProps } from "../reducers/UserReducer";
import { FetchPosts } from "../reducers/PostsReducer";

interface FetchUsersAction {
  type: ActionTypes.FETCH_USERS;
  payload: FetchProps;
}
interface UserLimitReachedAction {
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
export type Action = FetchUsersAction | UserLimitReachedAction 
export type ActionPost= FetchPostsAction | UserLimitReachedAction;
export type ActionTodo=FetchTodosAction | UserLimitReachedAction
