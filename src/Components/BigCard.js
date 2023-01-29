import style from "./BigCard.module.scss";
import voctory from "../Images/Victory.png";

export const BigCard = ({
  name,
  id,
  experience,
  url,
  className,
  className2,
  className3,
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
      <h2>{name}</h2>
      <img className={className} src={url} />
      <p>HP: {experience}</p>
    </div>
  );
};
