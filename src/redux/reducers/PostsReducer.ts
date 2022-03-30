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
        ...action.payload,
      };
    case ActionTypes.UPDATE_POSTS:
      const postData = [...state.data];
      let postToUpdate = postData.findIndex((val) => val.id === action.payload.id);
      postData[postToUpdate] = { ...postData[postToUpdate], ...action.payload };
      return {
        ...state,
        data: postData,
      };
    case ActionTypes.LIMIT_REACHED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default PostsReducer;
