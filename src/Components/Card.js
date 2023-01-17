import style from "./Card.module.scss";

export const Card = ({ src, className }) => {
  return (
    <div className={[`${style["card-container"]} ${className}`].join()}>
      {/* <div>
        <img src={src} />
      </div> */}
    </div>
  );
};

//  {`${styles.navbar} ${styles.active}`}
