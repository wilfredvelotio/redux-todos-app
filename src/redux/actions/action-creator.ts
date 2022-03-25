import { ActionTypes } from "src/redux/actions/action-types";
import { Dispatch } from "redux";
import { Action, ActionModal, ActionPost, ActionTodo } from "./index";
import { Props } from "src/Components/Users/UserTypes";
import axios from "axios";
import { MyPostProps } from "src/Components/Posts/PostsTypes";
import { InitialValuesFormikUser } from "src/Components/MyForms/MyForms";

export const fetchUsers = (url: string, pageStart: number, pageLimit: number) => {
  return async (dispatch: Dispatch<Action>) => {
    const { data } = await axios.get<Props[]>(url);
    if (data)
      dispatch({
        type: ActionTypes.FETCH_USERS,
        payload: {
          data: data,
          pageStart: pageStart,
          pageLimit: pageLimit,
          didFirstLoad: true,
        },
      });
    else
      dispatch({
        type: ActionTypes.USERS_LIMIT_REACHED,
      });
  };
};

export const updateUsers = (data: InitialValuesFormikUser) => {
  return async (dispatch: Dispatch<Action>) => {
    if (data)
      dispatch({
        type: ActionTypes.UPDATE_USERS,
        payload: {
          id: data.id,
          email: data.email,
          name: data.name,
          phone: data.phone,
          userName: data.userName,
          website: data.website,
        },
      });
  };
};

export const fetchPosts = (url: string, pageStart: number, pageLimit: number) => {
  return async (dispatch: Dispatch<ActionPost>) => {
    const { data } = await axios.get<MyPostProps[]>(url);
    if (data)
      dispatch({
        type: ActionTypes.FETCH_POSTS,
        payload: {
          data: data,
          pageStart: pageStart,
          pageLimit: pageLimit,
          didFirstLoad: true,
        },
      });
    else {
      dispatch({
        type: ActionTypes.POSTS_LIMIT_REACHED,
      });
    }
  };
};

export const fetchTodos = (url: string, pageStart: number, pageLimit: number) => {
  return async (dispatch: Dispatch<ActionTodo>) => {
    const { data } = await axios.get<[]>(url);
    if (data)
      dispatch({
        type: ActionTypes.FETCH_TODOS,
        payload: {
          data: data,
          pageStart: pageStart,
          pageLimit: pageLimit,
          didFirstLoad: true,
        },
      });
    else
      dispatch({
        type: ActionTypes.USERS_LIMIT_REACHED,
      });
  };
};

export const modalOpen = (user: Props) => {
  return (dispatch: Dispatch<ActionModal>) => {
    dispatch({
      type: ActionTypes.MODAL_OPEN,
      payload: {
        open: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          username: user.username,
          website: user.website,
        },
        posts: {
          title: "",
          body: "",
        },
      },
    });
  };
};

export const modalOpenPost = (post: MyPostProps) => {
  return (dispatch: Dispatch<ActionModal>) => {
    dispatch({
      type: ActionTypes.MODAL_OPEN,
      payload: {
        open: true,
        user: {
          id: 0,
          name: "",
          email: "",
          phone: "",
          username: "",
          website: "",
        },
        posts: {
          title: post.title,
          body: post.body,
        },
      },
    });
  };
};

export const modalClose = () => {
  return (dispatch: Dispatch<ActionModal>) => {
    dispatch({
      type: ActionTypes.MODAL_CLOSE,
      payload: {
        open: false,
        user: {
          id: 0,
          name: "",
          email: "",
          phone: "",
          username: "",
          website: "",
        },
        posts: {
          title: "",
          body: "",
        },
      },
    });
  };
};
