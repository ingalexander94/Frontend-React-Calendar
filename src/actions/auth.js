import { types } from "../types/types";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { showAlert } from "../alerts/alerts";
import { startLoading, finishLoading } from "./ui";

// Realizo la petición para saber si un usuario esta autenticado o no
export const startIsAuth = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken("auth/renew");
      const body = await res.json();
      const { ok, uid, name, token } = body;
      if (ok) {
        localStorage.setItem("token", token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(login({ uid, name }));
      } else {
        dispatch(finishCheking());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Realizo la petición para iniciar la sesión de un usuario
export const startLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const res = await fetchWithoutToken("auth", { email, password }, "POST");
    const body = await res.json();
    const { ok, msg, uid, name, token } = body;
    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid, name }));
      dispatch(finishLoading());
      showAlert("success", msg);
    } else {
      showAlert("error", msg);
      dispatch(finishLoading());
    }
  };
};

// Realizo la petición para crear un usuario
export const startRegister = (nameR, email, password) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const res = await fetchWithoutToken(
      "auth/new",
      { name: nameR, email, password },
      "POST"
    );
    const body = await res.json();
    const { ok, msg, uid, name, token } = body;
    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid, name }));
      dispatch(finishLoading());
      showAlert("success", msg);
    } else {
      showAlert("error", msg);
      dispatch(finishLoading());
    }
  };
};

// Limpio el localStorage para terminar le sesión del usuario.
export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const login = (user) => ({
  type: types.login,
  payload: user,
});

const logout = () => ({
  type: types.logout,
});

const finishCheking = () => ({
  type: types.finishCheking,
});
