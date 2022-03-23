import { MyPostProps } from "../../Components/Posts/PostsTypes";
import { ActionTypes } from "../actions/action-types";
import { Action, ActionPost } from "../actions/index";

interface Reference {
  myref: (node?: Element | null | undefined) => void;
  myView: boolean;
  pageStart: number;
  pageLimit: number;
}
export interface FetchPosts {
  data: MyPostProps[];
  reference: Reference;
  didFirstLoad: boolean;
}

const initialState: FetchPosts = {
  data: [],
  reference: {
    myref: () => {},
    myView: false,
    pageStart: 0,
    pageLimit: 6,
  },
  didFirstLoad: false,
};

const PostsReducer = (state: FetchPosts = initialState, action: ActionPost) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        reference: {
          myref: action.payload.reference.myref,
          myView: action.payload.reference.myView,
          pageStart: action.payload.reference.pageStart + action.payload.data.length,
          pageLimit: action.payload.reference.pageLimit + action.payload.data.length,
        },
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
