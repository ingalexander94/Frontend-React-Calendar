import React from "react";
import { useDispatch } from "react-redux";
import { startDeleteEvent } from "../../actions/calendar";

export const ButtonDelete = () => {
  const dispatch = useDispatch();

  const handleDeleteEvent = () => dispatch(startDeleteEvent());

  return (
    <>
      <button
        onClick={handleDeleteEvent}
        className="btn btn-lg btn-danger rounded-circle my-btn-danger"
      >
        <i className="far fa-trash-alt"></i>
      </button>
    </>
  );
};
