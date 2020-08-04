import { types } from "../types/types";

const initState = {
  cheking: true,
};

export const authReducer = (state = initState, actions) => {
  switch (actions.type) {
    case types.finishCheking:
      return {
        ...state,
        cheking: false,
      };

    case types.renewToken:
      return {
        ...state,
      };

    case types.login:
      return {
        ...state,
        ...actions.payload,
        cheking: false,
      };

    case types.logout:
      return {
        cheking: false,
      };

    default:
      return state;
  }
};
