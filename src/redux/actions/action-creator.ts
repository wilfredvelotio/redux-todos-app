import { ActionTypes } from "src/redux/actions/action-types";
import { Dispatch } from "redux";
import { Action, ActionModal, ActionPost, ActionTodo } from "./index";
import axios from "axios";
import { InitialValuesFormikUser } from "src/Components/MyForms/MyForms";
import { getAxios, putAxios } from "src/Components/Reusable/Network/AxiosAllMethods";
import { InitialValuesFormikPost } from "src/Components/MyForms/Posts";
import { InitialValuesFormikTodos } from "src/Components/MyForms/Todos";
import { isTodo, isUser } from "src/utils/helper";
import { ReduxState } from "src/redux/reducers";

export const fetchUsers = (url: string, pageStart: number, pageLimit: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => ReduxState) => {
    const data = await getAxios<Props[]>(url);
    if (data)
      dispatch({
        type: ActionTypes.FETCH_USERS,
        payload: {
          data: [...getState().user.data, ...data],
          pageStart: pageStart + data.length,
          pageLimit: pageLimit + data.length,
          didFirstLoad: true,
        },
      });
    else
      dispatch({
        type: ActionTypes.LIMIT_REACHED,
      });
  };
};

export const fetchPosts = (url: string, pageStart: number, pageLimit: number) => {
  return async (dispatch: Dispatch<ActionPost>, getState: () => ReduxState) => {
    const data = await getAxios<MyPostProps[]>(url);
    if (data)
      dispatch({
        type: ActionTypes.FETCH_POSTS,
        payload: {
          data: [...getState().posts.data, ...data],
          pageStart: pageStart + data.length,
          pageLimit: pageLimit + data.length,
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

export const fetchTodos = (url: string, pageStart: number, pageLimit: number) => {
  return async (dispatch: Dispatch<ActionTodo>, getState: () => ReduxState) => {
    const data = await getAxios<MyTodosProps[]>(url);
    if (data)
      dispatch({
        type: ActionTypes.FETCH_TODOS,
        payload: {
          data: [...getState().todos.data, ...data],
          pageStart: pageStart + data.length,
          pageLimit: pageLimit + data.length,
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

export const updatePosts = (udata: InitialValuesFormikPost) => {
  return async (dispatch: Dispatch<ActionPost>) => {
    const data = await putAxios<MyPostProps>(`posts/${udata.id}`, udata);
    dispatch({
      type: ActionTypes.UPDATE_POSTS,
      payload: data,
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

export const modalOpen = (data: UserTodoPost) => {
  if (isUser(data))
    return (dispatch: Dispatch<ActionModal>) => {
      dispatch({
        type: ActionTypes.MODAL_OPEN,
        payload: {
          open: true,
          user: { ...data },
        },
      });
    };
  else if (isTodo(data))
    return (dispatch: Dispatch<ActionModal>) => {
      dispatch({
        type: ActionTypes.MODAL_OPEN,
        payload: {
          open: true,
          todos: { ...data },
        },
      });
    };
  else
    return (dispatch: Dispatch<ActionModal>) => {
      dispatch({
        type: ActionTypes.MODAL_OPEN,
        payload: {
          open: true,
          posts: { ...data },
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
