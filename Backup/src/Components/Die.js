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

export const Die = ({ className, isGradeOut, add, tag }) => {
  const dispatch = useDispatch();
  const numbers = [die_1, die_2, die_3, die_4, die_5, die_6];
  const { attackResults } = useSelector(
    (state) => state.gameLogic.attackResults
  );

  const isDiceReactivated = useSelector(
    (state) => state.gameLogic.isDiceReactivated
  );

  const [dieNum, setDieNum] = useState(numbers[5]);
  const [isClicked, setIsClicked] = useState(false);
  const [canRoll, setCanRoll] = useState(true);
  const [repeats, setRepeats] = useState(5);
  const [canRandomRoll, setCanRandomRoll] = useState(false);
  const [randomNums, setRandomNums] = useState([]);
  //const random = Math.ceil(Math.random() * 5);
  let diceInterval;
  //style["grayed-out"]

  const clickMe = () => {
    if (!isGradeOut && !isClicked) {
      setIsClicked(true);
      setCanRoll(false);
      add();
      const random = Math.floor(Math.random() * 5);
      setDieNum(numbers[random + 1]);
    }
  };

  // Roll more than once
  useEffect(() => {
    let random;

    if (isClicked) {
      if (tag === "attack") {
        random = Math.floor(Math.random() * 6);
        dispatch(gameLogicActions.updaterAttackResult(random + 1));
        setDieNum(numbers[random]);
        //console.log("Attack clicked ", random + 1);
      }
      if (tag === "deffence") {
        random = Math.floor(Math.random() * 6);
        dispatch(gameLogicActions.updateDeffenceResult(random + 1));
        setDieNum(numbers[random]);
        //console.log("Deffence clicked ", random + 1);
      }
    }
  }, [isClicked]);

  useEffect(() => {
    setCanRoll(true);
    setIsClicked(false);
    setRepeats(15);
    dispatch(gameLogicActions.resetAttackDice());
    dispatch(gameLogicActions.resetDeffenceDice());
  }, [isDiceReactivated]);

  useEffect(() => {
    console.log("attackResults%% ", attackResults);
  }, [attackResults]);

  return (
    <div
      className={
        !canRoll
          ? [`${style["die"]} ${className} ${style["inactive"]}`].join()
          : [`${style["die"]} ${className}`].join()
      }
      onClick={() => clickMe()}
      tag={tag}
    >
      {/* <div className={isGradeOut ? `style[${gradeOutClass}]` : ""} /> */}
      <div className={isGradeOut ? style["grayed-out"] : undefined} />
      <img src={dieNum} className={style["m"]} />
    </div>
  );
};

// ? [`${style["die"]} ${className} ${style["inactive"]}`].join()
// : [`${style["die"]} ${className}`].join()
