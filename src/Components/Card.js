import style from "./Card.module.scss";
import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Card = ({
  src,
  className,
  className2,
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

  const testFunc = () => {
    console.log("Test is working");
    setIsClicked(true);
    setCanClick(false);
  };

  const updateClassName = () => {
    console.log("UPDATED");
    setIsClicked(true);
  };

  useEffect(() => {
    console.log("isClicked: ", isClicked);
    setCurrentClass(c2);
  }, [isClicked]);

  return (
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
                testFunc,
              })
          : ""
      }
      isClicked={isClicked}
      // className={[
      //   `${style["card-container"]} ${className} ${className2}`,
      // ].join()}
      className={isClicked ? c2 : c1}
    >
      <h3>{name}</h3>
      <h3>{id}</h3>
      <h3>{experience}</h3>
      {/* <h3>{url}</h3> */}
    </div>
  );
};

//  {`${styles.navbar} ${styles.active}`}
