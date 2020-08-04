import React from "react";

export const CalendarEvent = ({ event }) => {
  const { title, user } = event;
  return (
    <div className="w-100 h-100 event">
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </div>
  );
};
