import { types } from "../types/types";

const initState = {
  events: [],
  active: null,
};

export const calendarReducer = (state = initState, actions) => {
  switch (actions.type) {
    case types.loadEvents:
      return {
        ...state,
        events: [...actions.payload],
      };

    case types.activeEvent:
      return {
        ...state,
        active: {
          ...actions.payload,
        },
      };

    case types.cleanerActive:
      return {
        ...state,
        active: null,
      };

    case types.cleanerEvents:
      return {
        ...initState,
      };

    case types.addEvent:
      return {
        ...state,
        events: [{ ...actions.payload }, ...state.events],
      };

    case types.updateEvent:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === actions.payload.id ? actions.payload : event
        ),
      };

    case types.deleteEvent:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== state.active.id),
        active: null,
      };

    default:
      return state;
  }
};
