import style from "./Die.module.scss";
import die_1 from "../Images/Dice/die_1.png";
import die_2 from "../Images/Dice/die_2.png";
import die_3 from "../Images/Dice/die_3.png";
import die_4 from "../Images/Dice/die_4.png";
import die_5 from "../Images/Dice/die_5.png";
import die_6 from "../Images/Dice/die_6.png";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gameLogicActions } from "../_Store/Store";

export const Die = ({ className, isGradeOut, add }) => {
  const dispatch = useDispatch();
  const numbers = [die_1, die_2, die_3, die_4, die_5, die_6];

  const isDiceReactivated = useSelector(
    (state) => state.gameLogic.isDiceReactivated
  );

  const [dieNum, setDieNum] = useState(die_3);
  const [isClicked, setIsClicked] = useState(false);
  const [canRoll, setCanRoll] = useState(true);
  const [repeats, setRepeats] = useState(15);
  const random = Math.ceil(Math.random() * 5);
  let diceInterval;
  //style["grayed-out"]

  const clickMe = () => {
    if (!isGradeOut) {
      setIsClicked(true);
      setCanRoll(false);
      add();
    }
  };

  useEffect(() => {
    let diceInterval;
    if (repeats > 0 && isClicked) {
      diceInterval = setInterval(() => {
        const random = Math.ceil(Math.random() * 5);
        setDieNum(numbers[random]);
        setRepeats(repeats - 1);
      }, 150);
    }

    return () => {
      clearInterval(diceInterval);
    };
  }, [repeats, isClicked]);

  useEffect(() => {
    console.log("dice activated ", isDiceReactivated);
    setCanRoll(true);
    setIsClicked(false);
    setRepeats(15);
    dispatch(gameLogicActions.resetAttackDice());
    dispatch(gameLogicActions.resetDeffenceDice());
  }, [isDiceReactivated]);

  return (
    <div
      className={
        !canRoll
          ? [`${style["die"]} ${className} ${style["inactive"]}`].join()
          : [`${style["die"]} ${className}`].join()
      }
      onClick={() => clickMe()}
    >
      {/* <div className={isGradeOut ? `style[${gradeOutClass}]` : ""} /> */}
      <div className={isGradeOut ? style["grayed-out"] : undefined} />
      <img src={dieNum} className={style["m"]} />
    </div>
  );
};

// ? [`${style["die"]} ${className} ${style["inactive"]}`].join()
// : [`${style["die"]} ${className}`].join()
