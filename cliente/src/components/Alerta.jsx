import React, { useEffect } from "react";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useSelector } from "react-redux";
const Alerta = () => {
  const alert = useSelector((store) => store.alert.alert);

  useEffect(() => {
    if (alert) {
      store.addNotification({
        title: alert.category,
        message: alert.message,
        type: alert.category === "Error" ? "danger" : "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
  }, [alert]);

  return <ReactNotification />;
};

export default Alerta;
