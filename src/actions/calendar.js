import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";
import { showAlert } from "../alerts/alerts";
import { toDate } from "../helpers/date";

export const startCreateEvent = (newEvent) => {
  return async (dispatch, getState) => {
    try {
      const { name, uid } = getState().auth;
      const res = await fetchWithToken("events", newEvent, "POST");
      const { ok, msg, event } = await res.json();
      if (ok) {
        newEvent.id = event.id;
        newEvent.user = {
          _id: uid,
          name,
        };
        dispatch(addEvent(newEvent));
        showAlert("success", msg);
      } else {
        showAlert("error", msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startLoadEvents = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken("events");
      const { ok, msg, events } = await res.json();
      if (ok) {
        dispatch(loadEvents(toDate(events)));
      } else {
        showAlert("error", msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startUpdateEvent = (editEvent) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken(
        `events/${editEvent.id}`,
        editEvent,
        "PUT"
      );
      const { ok, msg } = await res.json();
      if (ok) {
        dispatch(updateEvent(editEvent));
        showAlert("success", msg);
      } else {
        showAlert("error", msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startDeleteEvent = () => {
  return async (dispatch, getState) => {
    const { active } = getState().calendar;
    try {
      const res = await fetchWithToken(`events/${active.id}`, {}, "DELETE");
      const { ok, msg } = await res.json();
      if (ok) {
        dispatch(deleteEvent());
        showAlert("success", msg);
      } else {
        showAlert("error", msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const activeEvent = (event) => ({
  type: types.activeEvent,
  payload: event,
});

export const cleanerActive = () => ({
  type: types.cleanerActive,
});

const addEvent = (event) => ({
  type: types.addEvent,
  payload: event,
});

const loadEvents = (events) => ({
  type: types.loadEvents,
  payload: events,
});

const updateEvent = (event) => ({
  type: types.updateEvent,
  payload: event,
});

const deleteEvent = () => ({
  type: types.deleteEvent,
});

export const cleanerEvents = () => ({
  type: types.cleanerEvents,
});
