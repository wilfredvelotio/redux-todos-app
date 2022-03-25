import { ActionTypes } from "src/redux/actions/action-types";
import { Action, ActionModal, ActionPost } from "src/redux/actions/index";

interface UserModal {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}
interface PostModal {
  title: string;
  body: string;
}
export interface ModalInterfaceProps {
  open: boolean;
  user: UserModal;
  posts: PostModal;
}

const initialState: ModalInterfaceProps = {
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
};

const ModalReducer = (state: ModalInterfaceProps = initialState, action: ActionModal) => {
  switch (action.type) {
    case ActionTypes.MODAL_OPEN:
      return {
        ...state,
        open: action.payload.open,
        posts: { ...action.payload.posts },
        user: { ...action.payload.user },
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
