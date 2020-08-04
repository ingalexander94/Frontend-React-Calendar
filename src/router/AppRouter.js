import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { startIsAuth } from "../actions/auth";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { cheking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startIsAuth());
  }, [dispatch]);

  if (cheking) return <h1>Cargando...</h1>;

  return (
    <Router>
      <div>
        <Switch>
          <PublicRouter
            path="/login"
            isAuthenticated={!!uid}
            component={LoginScreen}
          />
          <PrivateRouter
            path="/"
            isAuthenticated={!!uid}
            component={CalendarScreen}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
