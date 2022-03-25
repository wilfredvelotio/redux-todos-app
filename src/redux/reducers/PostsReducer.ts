import { MyPostProps } from "src/Components/Posts/PostsTypes";
import { ActionTypes } from "src/redux/actions/action-types";
import { Action, ActionPost } from "src/redux/actions/index";

export interface FetchPosts {
  data: MyPostProps[];
  pageStart: number;
  pageLimit: number;
  didFirstLoad: boolean;
}

const initialState: FetchPosts = {
  data: [],
  pageStart: 0,
  pageLimit: 6,
  didFirstLoad: false,
};

const PostsReducer = (state: FetchPosts = initialState, action: ActionPost) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        pageStart: action.payload.pageStart + action.payload.data.length,
        pageLimit: action.payload.pageLimit + action.payload.data.length,
        didFirstLoad: action.payload.didFirstLoad,
      };
    case ActionTypes.POSTS_LIMIT_REACHED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default PostsReducer;
