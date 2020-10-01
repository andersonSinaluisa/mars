import React, { useState } from "react";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { iniciarSesionAction } from "../Redux/authDuck";
import { showAlertAction } from "../Redux/alertDuck";
import Alerta from "./Alerta";
const Login = () => {
  //dispatch
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = data;

  const saveData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const sendAlert = (data) => {
    dispatch(showAlertAction(data));
  };

  const sendData = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      sendAlert({ message: "Username is required", category: "Error" });
      return;
    }
    if (!password.trim()) {
      sendAlert({
        message: "The password must be at least 6 characters",
        category: "Error",
      });
      return;
    }
    dispatch(iniciarSesionAction(data));
    console.log("Enviando");
  };

  return (
    <form
      onSubmit={(e) => {
        sendData(e);
      }}
      className="login"
    >
      <Alerta />
      <input
        type="text"
        placeholder="username"
        name="username"
        value={username}
        onChange={(e) => {
          saveData(e);
        }}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        value={password}
        onChange={(e) => {
          saveData(e);
        }}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
