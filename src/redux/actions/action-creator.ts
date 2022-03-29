import { ActionTypes } from "src/redux/actions/action-types";
import { Dispatch } from "redux";
import { Action, ActionModal, ActionPost, ActionTodo } from "./index";
import axios from "axios";
import { InitialValuesFormikUser } from "src/Components/MyForms/MyForms";
import { getAxios, putAxios } from "src/Components/Reusable/Network/AxiosAllMethods";
import { resetPost, resetTodo, resetUser } from "./reset";
import { InitialValuesFormikPost } from "src/Components/MyForms/Posts";
import { InitialValuesFormikTodos } from "src/Components/MyForms/Todos";

export const fetchUsers = (url: string, pageStart: number, pageLimit: number) => {
  return async (dispatch: Dispatch<Action>) => {
    const data = await getAxios<Props[]>(url);
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
        type: ActionTypes.LIMIT_REACHED,
      });
  };
};

export const updateUsers = (udata: InitialValuesFormikUser) => {
  return async (dispatch: Dispatch<Action>) => {
    const data = await putAxios<Props>(`users/${udata.id}`, udata);
    dispatch({
      type: ActionTypes.UPDATE_USERS,
      payload: data,
    });
  };
};

export const fetchPosts = (url: string, pageStart: number, pageLimit: number) => {
  return async (dispatch: Dispatch<ActionPost>) => {
    const data = await getAxios<MyPostProps[]>(url);
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
        type: ActionTypes.LIMIT_REACHED,
      });
    }
  };
};

export const updatePosts = (udata: InitialValuesFormikPost) => {
  return async (dispatch: Dispatch<ActionPost>) => {
    const data = await putAxios<MyPostProps>(`posts/${udata.id}`, udata);
    dispatch({
      type: ActionTypes.UPDATE_POSTS,
      payload: data,
    });
  };
};

export const fetchTodos = (url: string, pageStart: number, pageLimit: number) => {
  return async (dispatch: Dispatch<ActionTodo>) => {
    const data = await getAxios<MyTodosProps[]>(url);
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
        type: ActionTypes.LIMIT_REACHED,
      });
  };
};

export const updateTodos = (udata: InitialValuesFormikTodos) => {
  return async (dispatch: Dispatch<ActionTodo>) => {
    const data = await putAxios<MyTodosProps>(`todos/${udata.id}`, udata);
    dispatch({
      type: ActionTypes.UPDATE_TODOS,
      payload: data,
    });
  };
};

export const modalOpen = (user: Props) => {
  return (dispatch: Dispatch<ActionModal>) => {
    dispatch({
      type: ActionTypes.MODAL_OPEN,
      payload: {
        open: true,
        user: user,
        posts: resetPost,
        todos: resetTodo,
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
        user: resetUser,
        posts: post,
        todos: resetTodo,
      },
    });
  };
};

export const modalOpenTodo = (post: MyTodosProps) => {
  return (dispatch: Dispatch<ActionModal>) => {
    dispatch({
      type: ActionTypes.MODAL_OPEN,
      payload: {
        open: true,
        user: resetUser,
        posts: resetPost,
        todos: post,
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
      },
    });
  };
};
