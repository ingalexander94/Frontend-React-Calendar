import React from "react";
import { useDispatch } from "react-redux";
import { openModals } from "../../actions/ui";

export const ButtonFloating = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModals());
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="btn btn-warning rounded-circle btn-lg my-btn"
      >
        <i className="fas fa-plus"></i>
      </button>
    </>
  );
};
