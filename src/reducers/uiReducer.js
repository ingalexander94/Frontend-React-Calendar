import { types } from "../types/types";

const initState = {
  modalOpen: false,
  loading: false,
};

export const uiReducer = (state = initState, actions) => {
  switch (actions.type) {
    case types.openModal:
      return {
        ...state,
        modalOpen: true,
      };

    case types.closeModal:
      return {
        ...state,
        modalOpen: false,
      };

    case types.startLoading:
      return {
        ...state,
        loading: true,
      };

    case types.finishLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
