import { InitialValuesFormikUser } from "src/Components/MyForms/MyForms";
import { InitialValuesFormikPost } from "src/Components/MyForms/Posts";
import { InitialValuesFormikTodos } from "src/Components/MyForms/Todos";
import { ActionTypes } from "src/redux/actions/action-types";
import { Action, ActionModal, ActionPost } from "src/redux/actions/index";
import { resetPost, resetTodo, resetUser } from "src/redux/actions/reset";

export interface ModalInterfaceProps {
  open: boolean;
  user: InitialValuesFormikUser;
  posts: InitialValuesFormikPost;
  todos: InitialValuesFormikTodos;
}

const initialState: ModalInterfaceProps = {
  open: false,
  user: resetUser,
  posts: resetPost,
  todos: resetTodo,
};

const ModalReducer = (state: ModalInterfaceProps = initialState, action: ActionModal) => {
  switch (action.type) {
    case ActionTypes.MODAL_OPEN:
      return {
        ...state,
        open: action.payload.open,
        posts: { ...action.payload.posts },
        user: { ...action.payload.user },
        todos: { ...action.payload.todos },
      };
    case ActionTypes.MODAL_CLOSE:
      return {
        ...state,
        open: action.payload.open,
      };
    default:
      return state;
  }
};
export default ModalReducer;
