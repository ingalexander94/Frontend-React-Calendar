import moment from "moment";

export const toDate = (events = []) => {
  events.map((event) => {
    event.start = moment(event.start).toDate();
    event.end = moment(event.end).toDate();
    return event;
  });
  return events;
};
