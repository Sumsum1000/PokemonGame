import style from "./Game.module.scss";
import dice from "./Die.module.scss";
import { BigCard } from "./BigCard";
import { Card } from "./Card";
import cardsPosition from "./BigCard.module.scss";
import backStyle from "./Card.module.scss";
import { PlayerInfo } from "./PlayerInfo";
import backCard from "../Images/CardBack.jpg";
import backCard2 from "../Images/CardBack2.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameLogicActions } from "../_Store/Store";

import {
  decksActions,
  fullDeckActions,
  playersInfoActions,
} from "../_Store/Store";
//import { animate } from "framer-motion";
import { Die } from "./Die";

export const Dice = ({ className }) => {
  const dispatch = useDispatch();
  //   const [deck, setDeck] = useState();
  const [isAttackGrayed, setIsAttackGrayed] = useState(false);
  const [isDeffenceGrayed, setIsDeffenceGrayed] = useState(true);
  const { p1, p2 } = useSelector((state) => state.playersInfo);
  const deck1 = useSelector((state) => state.playersDecks.deck1);
  const deck2 = useSelector((state) => state.playersDecks.deck2);
  const bigCard1 = useSelector((state) => state.playersDecks.bigCard1);
  const bigCard2 = useSelector((state) => state.playersDecks.bigCard2);
  const gameLogic = useSelector((state) => state.gameLogic);
  const {
    isStart,
    isAttack,
    numAttackDice,
    numDeffenceDice,
    numCardsDeck1,
    numCardsDeck2,
    isBigCardLeft,
    isBigCardRight,
    isDiceReactivated,
  } = gameLogic;

  return (
    <div className={className}>
      <div className={style["dice-area"]}>
        <div
          className={[`${style["dice-spread"]} ${style["four-dice"]}`].join()}
        >
          <Die
            className={dice["attack"]}
            isGradeOut={isAttackGrayed}
            add={() => dispatch(gameLogicActions.setAttackDice())}
          />
          <span>x</span>
          <Die
            className={dice["attack"]}
            isGradeOut={isAttackGrayed}
            add={() => dispatch(gameLogicActions.setAttackDice())}
          />
          <span>x</span>
          <Die
            className={dice["attack"]}
            isGradeOut={isAttackGrayed}
            add={() => dispatch(gameLogicActions.setAttackDice())}
          />
        </div>
        <div
          className={[`${style["dice-spread"]} ${style["two-dice"]}`].join()}
        >
          <Die
            className={dice["deffence"]}
            isGradeOut={isDeffenceGrayed}
            add={() => dispatch(gameLogicActions.setDeffenceDice())}
          />
          <span>x</span>
          <Die
            className={dice["deffence"]}
            isGradeOut={isDeffenceGrayed}
            add={() => dispatch(gameLogicActions.setDeffenceDice())}
          />
        </div>
      </div>
    </div>
  );
};
