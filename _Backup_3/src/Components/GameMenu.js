import style from "./GameMenu.module.scss";
import { Link, useNavigate } from "react-router-dom";

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
        <button onClick={clickHandler}>Start</button>
        {/* <button>Sound on/off</button>
        <button>Dark mode/Light mode</button>
        <button>Quit</button> */}
      </div>
    </div>
  );
};
