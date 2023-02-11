import style from "./Victory.module.scss";
import trophy from "../Images/Trophy.png";

export const Victory = ({ id, name }) => {
  return (
    <div
      className={style["victory-container"]}
      //   name={name}
      id={id}
    >
      <h2>{name}</h2>
      <img className={style["trophy"]} src={trophy} />
      <p>Winner</p>
    </div>
  );
};
