import { ActionTypes } from "../actions/action-types";
import { Dispatch } from "redux";
import { Action, ActionPost, ActionTodo } from "./index";
import { Props } from "../../Components/Users/UserTypes";
import axios from "axios";
import { MyPostProps } from "../../Components/Posts/PostsTypes";

export const fetchUsers = (
  url: string,
  ref: (node?: Element | null | undefined) => void,
  pageStart: number,
  pageLimit: number,
  inView: boolean
) => {
  return async (dispatch: Dispatch<Action>) => {
    const { data } = await axios.get<Props[]>(url);
    if (data)
      dispatch({
        type: ActionTypes.FETCH_USERS,
        payload: {
          data: data,
          reference: {
            myView: inView,
            myref: ref,
            pageStart: pageStart,
            pageLimit: pageLimit,
          },
          didFirstLoad: true,
        },
      });
    else
      dispatch({
        type: ActionTypes.USERS_LIMIT_REACHED,
      });
  };
};

export const fetchPosts = (
  url: string,
  ref: (node?: Element | null | undefined) => void,
  pageStart: number,
  pageLimit: number,
  inView: boolean
) => {
  return async (dispatch: Dispatch<ActionPost>) => {
    const { data } = await axios.get<MyPostProps[]>(url);
    if (data)
      dispatch({
        type: ActionTypes.FETCH_POSTS,
        payload: {
          data: data,
          reference: {
            myView: inView,
            myref: ref,
            pageStart: pageStart,
            pageLimit: pageLimit,
          },
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

export const fetchTodos = (
  url: string,
  ref: (node?: Element | null | undefined) => void,
  pageStart: number,
  pageLimit: number,
  inView: boolean
) => {
  return async (dispatch: Dispatch<ActionTodo>) => {
    const { data } = await axios.get<[]>(url);
    if (data)
      dispatch({
        type: ActionTypes.FETCH_TODOS,
        payload: {
          data: data,
          reference: {
            myView: inView,
            myref: ref,
            pageStart: pageStart,
            pageLimit: pageLimit,
          },
          didFirstLoad: true,
        },
      });
    else
      dispatch({
        type: ActionTypes.USERS_LIMIT_REACHED,
      });
  };
};
