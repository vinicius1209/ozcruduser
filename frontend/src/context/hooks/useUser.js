import { useReducer } from "react";

const useUser = () => {
  const initialState = {
    users: [],
    isLoading: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "TOGGLE_LOADING":
        return { ...state, isLoading: !state.isLoading };
      case "SET_USERS":
        return { ...state, users: action.payload };
      default:
        return initialState;
    }
  }
  const [state, dispatch] = useReducer(reducer, { users: [] });

  return {
    state,
    dispatch
  };
};

export default useUser;
