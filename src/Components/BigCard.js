import style from "./BigCard.module.scss";

export const BigCard = ({ name, id, experience, url, className }) => {
  return (
    <div
      className={style["big-card-container"]}
      name={name}
      id={id}
      experience={experience}
      url={url}
    >
      <h2>{name}</h2>
      <img className={className} src={url} />
      <p>Experience: {experience}</p>
    </div>
  );
};
