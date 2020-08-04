import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
import { cleanerEvents } from "../../actions/calendar";

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
    dispatch(cleanerEvents());
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <div className="navbar-brand">
        <img
          src="../../logo192.png"
          width="30"
          height="30"
          className="d-inline-block align-top mr-2"
          alt=""
          loading="lazy"
        />
        {name}
      </div>
      <button
        onClick={handleLogout}
        className="btn btn-outline-warning"
        type="button"
      >
        Salir<i className="fas fa-sign-out-alt ml-2"></i>
      </button>
    </div>
  );
};
