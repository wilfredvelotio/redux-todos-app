import { ActionTypes } from "../actions/action-types";
import { Dispatch } from "redux";
import { Action, ActionModal, ActionPost, ActionTodo } from "./index";
import { Props } from "../../Components/Users/UserTypes";
import axios from "axios";
import { MyPostProps } from "../../Components/Posts/PostsTypes";

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
          name: "user.name",
          email: "user.email",
          phone: "user.phone",
          username: "user.username",
          website: "user.website",
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
