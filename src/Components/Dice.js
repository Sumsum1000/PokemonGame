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
import {
  gameLogicActions,
  player1Actions,
  player2Actions,
} from "../_Store/Store";

//import { animate } from "framer-motion";
import { Die } from "./Die";
import { Modal } from "./Modal";

export const Dice = ({ className, className2, className3 }) => {
  const dispatch = useDispatch();
  //   const [deck, setDeck] = useState();
  const [roundCounter, setRoundCounter] = useState(1);
  const [isAttackGrayed, setIsAttackGrayed] = useState(false);
  const [isDeffenceGrayed, setIsDeffenceGrayed] = useState(true);
  const [attackMultiply, setAttackMultiply] = useState("?");
  const [deffenceMultiply, setDeffenceMultiply] = useState("?");
  const [isAttackCalc, setIsAttackCalc] = useState(false);
  const [isDeffenceCalc, setIsDefeenceCalc] = useState(false);
  //const [isModal, setIsModal] = useState(false);
  const player1 = useSelector((state) => state.player1);
  const player2 = useSelector((state) => state.player2);
  const gameLogic = useSelector((state) => state.gameLogic);
  const {
    numAttackDice,
    numDeffenceDice,
    attackResults,
    deffenceResults,
    isModal,
    isPlayerTurn,
  } = gameLogic;

  // Add icons for attack and deffence - who is play, attack or deffence
  // Duplicate code for attack and deffence
  //console.log("conter ", roundCounter);

  useEffect(() => {
    //console.log("Attack ", numAttackDice);
    let timer;
    if (numAttackDice === 3 && attackResults.length > 2) {
      //console.log("numAttackDice ", numAttackDice);

      // set player playing for update attack/defence icons

      setRoundCounter(roundCounter + 1);

      // if (roundCounter === 1) {
      //   // p2 defence
      //   console.log("p2 defence");
      // }
      // if (roundCounter === 2) {
      //   // p1 defence
      //   console.log("p1 defence");
      //   setRoundCounter(0);
      // }

      timer = setTimeout(() => {
        setIsAttackGrayed(!isAttackGrayed);
        setIsDeffenceGrayed(!isDeffenceGrayed);

        const result = attackResults[0] * attackResults[1] * attackResults[2];
        //console.log("attackResults! ", attackResults);
        setAttackMultiply(result);
        setIsAttackCalc(true);
        dispatch(gameLogicActions.resetAttackResult());
        dispatch(player1Actions.setIsPlaying(!player1.isPlaying));
        // p2 attack
        dispatch(player2Actions.setIsPlaying(!player2.isPlaying));
        // p1 defence
      }, 600);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [numAttackDice, attackResults]);

  useEffect(() => {
    //console.log("Attack ", numDeffenceDice);
    let timer;
    if (numDeffenceDice === 2 && deffenceResults.length > 1) {
      //console.log("numDeffenceDice ", numDeffenceDice);

      // set player playing for update attack/defence icons
      setRoundCounter(roundCounter + 1);

      // if (roundCounter === 1) {
      //   // p2 attack
      //   console.log("p2 attack");
      // }
      // if (roundCounter === 2) {
      //   // p1 attack
      //   console.log("p1 attack");
      // }

      timer = setTimeout(() => {
        setIsAttackGrayed(!isAttackGrayed);
        setIsDeffenceGrayed(!isDeffenceGrayed);

        const result = deffenceResults[0] * deffenceResults[1];
        //console.log("attackResults! ", attackResults);

        // after a complete round-----------------------
        setDeffenceMultiply(result);
        setIsDefeenceCalc(true);
        //console.log("attackMultiply ", attackMultiply);
        //console.log("deffenceMultiply ", deffenceMultiply);
        //calculateHp(attackMultiply - deffenceMultiply);
        dispatch(gameLogicActions.resetDeffenceResult());
        dispatch(gameLogicActions.reactivateDice());
      }, 600);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [numDeffenceDice, deffenceResults]);

  useEffect(() => {
    if (roundCounter === 1) {
      console.log("roundCounter: ", roundCounter);
      console.log("p1 attack");
      dispatch(player1Actions.setIsAttack(true));
      dispatch(player1Actions.setIsDefence(false));
      dispatch(player2Actions.setIsAttack(false));
      dispatch(player2Actions.setIsDefence(false));
    }
    if (roundCounter === 2) {
      console.log("p2 defence");
      console.log("roundCounter: ", roundCounter);
      dispatch(player1Actions.setIsAttack(false));
      dispatch(player1Actions.setIsDefence(false));
      dispatch(player2Actions.setIsAttack(false));
      dispatch(player2Actions.setIsDefence(true));
    }
    if (roundCounter === 3) {
      console.log("p2 attack");
      console.log("roundCounter: ", roundCounter);
      dispatch(player1Actions.setIsAttack(false));
      dispatch(player1Actions.setIsDefence(false));
      dispatch(player2Actions.setIsAttack(true));
      dispatch(player2Actions.setIsDefence(false));
    }
    if (roundCounter === 4) {
      console.log("p1 defence");
      console.log("roundCounter: ", roundCounter);
      dispatch(player1Actions.setIsAttack(false));
      dispatch(player1Actions.setIsDefence(true));
      dispatch(player2Actions.setIsAttack(false));
      dispatch(player2Actions.setIsDefence(false));
    }
    if (roundCounter === 5) {
      console.log("reset");
      console.log("roundCounter: ", roundCounter);
      setRoundCounter(1);
    }
  }, [roundCounter]);

  useEffect(() => {
    if (isAttackCalc && isDeffenceCalc) {
      if (player2.mode === "deffence") {
        setIsAttackCalc(false);
        setIsDefeenceCalc(false);
        const newHp = player2.bigCardHp - (attackMultiply - deffenceMultiply);
        dispatch(player2Actions.setBigCardHp(newHp));
        //console.log("newHp ", newHp);
        dispatch(player2Actions.setAttackMode());
        dispatch(player1Actions.setDeffenceMode());
      }
      if (player1.mode === "deffence" && player1.bigCardHp >= 0) {
        setIsAttackCalc(false);
        setIsDefeenceCalc(false);
        const newHp = player1.bigCardHp - (attackMultiply - deffenceMultiply);
        dispatch(player1Actions.setBigCardHp(newHp));
        //console.log("newHp ", newHp);
        dispatch(player1Actions.setAttackMode());
        dispatch(player2Actions.setDeffenceMode());
      }
    }
  }, [isAttackCalc, isDeffenceCalc]);

  useEffect(() => {
    if (!player1.isBigCard || !player2.isBigCard) {
      if (player1.deckCounter > 0 && player2.deckCounter > 0) {
        dispatch(gameLogicActions.setIsModal(true));
      }
    }
  }, [
    player1.isBigCard,
    player2.isBigCard,
    player1.deckCounter,
    player2.deckCounter,
  ]);

  return (
    <div className={style["dice-area-container"]}>
      {isModal && <Modal text="Choose a card to play!" />}
      {/* --------------------------------------------------------------------------- */}
      <div className={className2}>
        <h3>Attack</h3>
        <div className={style["results-info"]}>
          <span>=</span>
          <h3>{attackMultiply}</h3>
        </div>
      </div>
      <div className={className3}>
        <h3>Deffence</h3>
        <div className={style["results-info"]}>
          <span>=</span>
          <h3>{deffenceMultiply}</h3>
        </div>
      </div>
      {/* --------------------------------------------------------------------------- */}
      <div className={style["dice-area"]}>
        <div
          className={[`${style["dice-spread"]} ${style["four-dice"]}`].join()}
        >
          <Die
            className={dice["attack"]}
            isGradeOut={isAttackGrayed}
            add={() => dispatch(gameLogicActions.setAttackDice())}
            tag="attack"
          />
          <span>x</span>
          <Die
            className={dice["attack"]}
            isGradeOut={isAttackGrayed}
            add={() => dispatch(gameLogicActions.setAttackDice())}
            tag="attack"
          />
          <span>x</span>
          <Die
            className={dice["attack"]}
            isGradeOut={isAttackGrayed}
            add={() => dispatch(gameLogicActions.setAttackDice())}
            tag="attack"
          />
        </div>
        <div
          className={[`${style["dice-spread"]} ${style["two-dice"]}`].join()}
        >
          <Die
            className={dice["deffence"]}
            isGradeOut={isDeffenceGrayed}
            add={() => dispatch(gameLogicActions.setDeffenceDice())}
            tag="deffence"
          />
          <span>x</span>
          <Die
            className={dice["deffence"]}
            isGradeOut={isDeffenceGrayed}
            add={() => dispatch(gameLogicActions.setDeffenceDice())}
            tag="deffence"
          />
        </div>
      </div>
    </div>
  );
};
