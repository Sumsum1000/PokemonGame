import style from "./Modal.module.scss";
import { useState, useEffect } from "react";

export const Modal = ({ text }) => {
  return (
    <div className={style["no-card-modal"]}>
      <p>{text}</p>
      {/* <span className={style["close"]}>X</span> */}
    </div>
  );
};
