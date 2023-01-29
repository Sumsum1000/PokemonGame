import style from "./Card.module.scss";
import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Card = ({
  src,
  className,
  name,
  id,
  experience,
  url,
  onClick,
}) => {
  const c1 = [`${style["card-container"]} ${className}`].join();
  const c2 = [
    `${style["card-container"]} ${className} ${style["opacity"]}`,
  ].join();

  const [isClicked, setIsClicked] = useState(false);
  const [currentClass, setCurrentClass] = useState(c1);
  const [canClick, setCanClick] = useState(true);

  const cardClickHandler = () => {
    console.log("click click click");
    setIsClicked(true);
    setCanClick(false);
  };

  useEffect(() => {
    setCurrentClass(c2);
  }, [isClicked]);

  return (
    <di className={style["empty-card"]}>
      <div
        onClick={
          canClick
            ? () =>
                onClick({
                  name,
                  id,
                  experience,
                  url,
                  animate,
                  isClicked,
                  cardClickHandler,
                })
            : ""
        }
        isClicked={isClicked}
        className={isClicked ? c2 : c1}
      ></div>
    </di>
  );
};

//  {`${styles.navbar} ${styles.active}`}
