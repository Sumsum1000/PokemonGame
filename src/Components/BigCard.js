import style from "./BigCard.module.scss";
import sword from "../Images/Icons/Sword.png";
import shield from "../Images/Icons/Shield.png";
import { LifeBar } from "./Threejs/LifeBar";

export const BigCard = ({
  name,
  id,
  experience,
  url,
  className,
  className2,
  className3,
  classIcons,
  classMirror,
  attackActive,
  defenceActive,
}) => {
  return (
    <div
      className={[
        `${style["big-card-container"]} ${className3} ${className2}`,
      ].join()}
      name={name}
      id={id}
      experience={experience}
      url={url}
    >
      <div
        className={[
          `${style["player-status"]} ${classIcons} ${classMirror}`,
        ].join()}
      >
        <img
          className={[`${style["icon"]}   ${attackActive}`].join()}
          src={sword}
        />
        <img className={defenceActive} src={shield} />
      </div>
      <h2>{name}</h2>
      <img
        className={[`${style["img-pokemon"]}   ${className}`].join()}
        src={url}
      />
      <p>HP: {experience}</p>
    </div>
  );
};
