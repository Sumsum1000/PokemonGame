import style from "./GameLogo.module.scss";
import logo from "../Images/Logo.png";

export const GameLogo = () => {
  return (
    <div className={style["logo"]}>
      <img src={logo} />
    </div>
  );
};
