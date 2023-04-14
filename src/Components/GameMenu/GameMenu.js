import style from "./GameMenu.module.scss";
import { Link, useNavigate } from "react-router-dom";
//import ball from "../Images/Ball2.png";

export const GameMenu = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    console.log("Handler");
    //navigate("/form");
    navigate("/game");
  };

  return (
    <div className={style["menu-container"]}>
      <div className={style["menu"]}>
        <div className={style["click"]} onClick={clickHandler}>
          <button className={style["btn"]} onClick={clickHandler}></button>
          {/* <button>Sound on/off</button>
        <button>Dark mode/Light mode</button>
        <button>Quit</button> */}
        </div>
      </div>
      <p className={style["btn-text"]} onClick={clickHandler}>
        {" "}
        Start
      </p>
    </div>
  );
};
