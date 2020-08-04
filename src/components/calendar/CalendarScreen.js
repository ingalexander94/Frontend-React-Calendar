import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/calendar-spanish";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import { useDispatch, useSelector } from "react-redux";
import { openModals } from "../../actions/ui";
import {
  activeEvent,
  cleanerActive,
  startLoadEvents,
} from "../../actions/calendar";
import { ButtonFloating } from "../ui/ButtonFloating";
import { ButtonDelete } from "../ui/ButtonDelete";

const localizer = momentLocalizer(moment);
moment().locale("es");

export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const [initDates, setInitDates] = useState({ start: "", end: "" });

  const { calendar, ui, auth } = useSelector((state) => state);
  const myEventsList = calendar.events;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadEvents());
  }, [dispatch]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const color = event.user._id === auth.uid ? "#ffc107" : "#E6E6E6";
    const style = {
      backgroundColor: color,
      border: "0px",
      opacity: 0.8,
      color: "black",
      textAlign: "left",
    };

    return {
      style,
    };
  };

  const onSelectEvent = (e) => {
    dispatch(activeEvent(e));
  };

  const onSelectSlot = (e) => {
    const { start, end } = e;
    setInitDates({ start, end });
    calendar.active ? dispatch(cleanerActive()) : dispatch(openModals());
  };

  const onDoubleClickEvent = (e) => {
    dispatch(openModals());
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  return (
    <>
      <Navbar />
      <div className="container calendar-screen">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent,
          }}
          onSelectEvent={onSelectEvent}
          onDoubleClickEvent={onDoubleClickEvent}
          onSelectSlot={onSelectSlot}
          selectable={true}
          onView={onViewChange}
          view={lastView}
        />

        {calendar.active && !ui.modalOpen && <ButtonDelete />}
        <ButtonFloating />
        <CalendarModal initDates={initDates} />
      </div>
    </>
  );
};
