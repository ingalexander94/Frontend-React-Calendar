import React from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { useForm } from "../../hooks/useForm";
import { startLogin, startRegister } from "../../actions/auth";
import "./login.css";
import { showAlert } from "../../alerts/alerts";

export const LoginScreen = () => {
  const [valuesLogin, handleInputChangeLogin, resetLogin] = useForm({
    emailLogin: "",
    passwordLogin: "",
  });

  const [valuesRegister, handleInputChangeRegister, resetRegister] = useForm({
    nameRegister: "",
    emailRegister: "",
    passwordRegister: "",
    password2Register: "",
  });

  const dispatch = useDispatch();
  const { ui } = useSelector((state) => state);

  const { emailLogin, passwordLogin } = valuesLogin;
  const {
    nameRegister,
    emailRegister,
    passwordRegister,
    password2Register,
  } = valuesRegister;

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (isFormValid(emailLogin, passwordLogin, null)) {
      dispatch(startLogin(emailLogin, passwordLogin));
      resetLogin();
    }
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (isFormValid(emailRegister, passwordRegister, nameRegister)) {
      if (passwordRegister !== password2Register)
        return showAlert("error", "Las contraseñas no coinciden");
      dispatch(startRegister(nameRegister, emailRegister, passwordRegister));
      resetRegister();
    }
  };

  const isFormValid = (email, password, name) => {
    if (!validator.isEmail(email)) {
      showAlert("error", "Ingrese un email valido");
      return false;
    } else if (password.length < 6) {
      showAlert("error", "La contraseña debe tener minimo 6 caracteres");
      return false;
    } else if (name !== null) {
      if (validator.isEmpty(name)) {
        showAlert("error", "El nombre es necesario");
        return false;
      }
    }
    return true;
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleSubmitLogin}>
            <div className="form-group">
              <input
                type="email"
                name="emailLogin"
                id="emailLogin"
                onChange={handleInputChangeLogin}
                value={emailLogin}
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="passwordLogin"
                id="passwordLogin"
                onChange={handleInputChangeLogin}
                value={passwordLogin}
                className="form-control"
                placeholder="Contraseña"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btnSubmit">
                Login{" "}
                {ui.loading && <i className="fas fa-spinner fa-spin ml-2"></i>}
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleSubmitRegister}>
            <div className="form-group">
              <input
                type="text"
                name="nameRegister"
                id="nameRegister"
                value={nameRegister}
                onChange={handleInputChangeRegister}
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="emailRegister"
                id="emailRegister"
                value={emailRegister}
                onChange={handleInputChangeRegister}
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="passwordRegister"
                id="passwordRegister"
                value={passwordRegister}
                onChange={handleInputChangeRegister}
                className="form-control"
                placeholder="Contraseña"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password2Register"
                id="password2Register"
                value={password2Register}
                onChange={handleInputChangeRegister}
                className="form-control"
                placeholder="Repita la contraseña"
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
