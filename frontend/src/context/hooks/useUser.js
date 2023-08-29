import { useReducer } from "react";

const useUser = () => {
  const initialState = {
    users: {},
    isLoading: false,
    openDeleteConfirm: false,
    openEditDialog: false,
    openNewDialog: false,
    lastClickedUserId: -1,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "TOGGLE_LOADING":
        return { ...state, isLoading: !state.isLoading };
      case "OPEN_DELETE_CONFIRM":
        return {
          ...state,
          openDeleteConfirm: true,
          lastClickedUserId: action.payload,
        };
      case "CLOSE_DELETE_CONFIRM":
        return { ...state, openDeleteConfirm: false, lastClickedUserId: -1 };
      case "OPEN_EDIT_CONFIRM":
        return {
          ...state,
          openEditDialog: true,
          lastClickedUserId: action.payload,
        };
      case "CLOSE_EDIT_CONFIRM":
        return { ...state, openEditDialog: false, lastClickedUserId: -1 };
      case "OPEN_NEW_USER":
        return {
          ...state,
          openNewDialog: true,
        };
      case "CLOSE_NEW_USER":
        return { ...state, openNewDialog: false };
      case "SET_USERS":
        return { ...state, users: action.payload };
      default:
        return initialState;
    }
  }
  const [state, dispatch] = useReducer(reducer, { users: {} });

  return {
    state,
    dispatch,
  };
};

export default useUser;
