import React from "react";
import "./ErrorPage.css";
import { IoAlertCircleOutline } from "react-icons/all";

export default function ErrorPage() {
  return (
    <div className="body body-error">
      <IoAlertCircleOutline className="alert-icon" />
      <p className="body-error-msg">
        Summoner not. Please check your spelling or region and try again.
      </p>
    </div>
  );
}
