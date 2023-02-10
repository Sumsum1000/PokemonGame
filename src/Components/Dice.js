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
  const [resultsL, setResultsL] = useState("-");
  const [resultsR, setResultsR] = useState("-");
  const [resultsLVisible, setIsResultsLVisible] = useState(true);
  const [resultsRVisible, setIsResultsRVisible] = useState(true);
  const {
    numAttackDice,
    numDeffenceDice,
    attackResults,
    deffenceResults,
    isModal,
    isPlayerTurn,
  } = gameLogic;
  const DELAY = 600;

  useEffect(() => {
    let timer;
    if (numAttackDice === 3 && attackResults.length > 2) {
      // set player playing for update attack/defence icons

      setRoundCounter(roundCounter + 1);

      timer = setTimeout(() => {
        setIsAttackGrayed(!isAttackGrayed);
        setIsDeffenceGrayed(!isDeffenceGrayed);

        const result = attackResults[0] * attackResults[1] * attackResults[2];
        setAttackMultiply(result);
        setIsAttackCalc(true);
        dispatch(gameLogicActions.resetAttackResult());
        dispatch(player1Actions.setIsPlaying(!player1.isPlaying));
        // p2 attack
        dispatch(player2Actions.setIsPlaying(!player2.isPlaying));
        // p1 defence
      }, DELAY);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [numAttackDice, attackResults]);

  useEffect(() => {
    let timer;
    if (numDeffenceDice === 2 && deffenceResults.length > 1) {
      // set player playing for update attack/defence icons
      setRoundCounter(roundCounter + 1);

      timer = setTimeout(() => {
        setIsAttackGrayed(!isAttackGrayed);
        setIsDeffenceGrayed(!isDeffenceGrayed);

        const result = deffenceResults[0] * deffenceResults[1];

        //console.log("attackResults! ", attackResults);

        // after a complete round-----------------------
        setDeffenceMultiply(result);
        setIsDefeenceCalc(true);
        dispatch(gameLogicActions.resetDeffenceResult());
        dispatch(gameLogicActions.reactivateDice());
      }, DELAY);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [numDeffenceDice, deffenceResults]);

  useEffect(() => {
    console.log("R ", resultsR);
    console.log("L ", resultsL);
    const timerL = setTimeout(() => {
      setResultsL("-");
      //setIsResultsLVisible(false);
    }, 1000);

    const timerR = setTimeout(() => {
      setResultsR("-");
      //setIsResultsRVisible(false);
    }, 1000);

    return () => {
      clearTimeout(timerL);
      clearTimeout(timerR);
    };
  }, [resultsL, resultsR]);

  // Status of every player, attack/defence
  useEffect(() => {
    const timer = setTimeout(() => {
      if (roundCounter === 1) {
        console.log("p1 attack");
        dispatch(player1Actions.setIsAttack(true));
        dispatch(player1Actions.setIsDefence(false));
        dispatch(player2Actions.setIsAttack(false));
        dispatch(player2Actions.setIsDefence(false));
        showResultsL(7);
      }
      if (roundCounter === 2) {
        console.log("p2 defence");
        dispatch(player1Actions.setIsAttack(false));
        dispatch(player1Actions.setIsDefence(false));
        dispatch(player2Actions.setIsAttack(false));
        dispatch(player2Actions.setIsDefence(true));
      }
      if (roundCounter === 3) {
        console.log("p2 attack");
        dispatch(player1Actions.setIsAttack(false));
        dispatch(player1Actions.setIsDefence(false));
        dispatch(player2Actions.setIsAttack(true));
        dispatch(player2Actions.setIsDefence(false));
        showResultsR(2);
      }
      if (roundCounter === 4) {
        console.log("p1 defence");
        dispatch(player1Actions.setIsAttack(false));
        dispatch(player1Actions.setIsDefence(true));
        dispatch(player2Actions.setIsAttack(false));
        dispatch(player2Actions.setIsDefence(false));
      }
    }, 600);
    if (roundCounter === 5) {
      console.log("reset");
      setRoundCounter(1);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [roundCounter]);

  const showResultsL = (number) => {
    setIsResultsLVisible(true);
    // if (number > 0) {
    //   setResultsL(number);
    // }
    // if (number < 0) {
    //   setResultsL(number);
    // }
    // if (number === 0) {
    //   setResultsL(0);
    // }
  };

  const showResultsR = (number) => {
    setIsResultsRVisible(true);
    // if (number > 0) {
    //   setResultsR(number);
    // }
    // if (number < 0) {
    //   setResultsR(number);
    // }
    // if (number === 0) {
    //   setResultsR(0);
    // }
  };

  useEffect(() => {
    if (isAttackCalc && isDeffenceCalc) {
      if (player2.mode === "deffence") {
        setIsAttackCalc(false);
        setIsDefeenceCalc(false);
        const substructAmount = attackMultiply - deffenceMultiply;
        setResultsR(substructAmount);
        const newHp = player2.bigCardHp - substructAmount;
        // showResultsR(substructAmount);
        setIsResultsRVisible(true);
        dispatch(player2Actions.setBigCardHp(newHp));
        dispatch(player2Actions.setAttackMode());
        dispatch(player1Actions.setDeffenceMode());
      }
      if (player1.mode === "deffence" && player1.bigCardHp >= 0) {
        setIsAttackCalc(false);
        setIsDefeenceCalc(false);
        const substructAmount = attackMultiply - deffenceMultiply;
        setResultsL(substructAmount);
        const newHp = player1.bigCardHp - substructAmount;
        // showResultsL(substructAmount);
        setIsResultsLVisible(true);
        dispatch(player1Actions.setBigCardHp(newHp));
        dispatch(player1Actions.setAttackMode());
        dispatch(player2Actions.setDeffenceMode());
      }
    }
  }, [isAttackCalc, isDeffenceCalc]);

  // to do -- FIX RESULTS ui

  // useEffect(() => {
  //   if (roundCounter === 4) {
  //     showResultsL(2);
  //   }
  //   if (roundCounter === 3) {
  //     showResultsR(7);
  //   }
  // }, [roundCounter, isAttackCalc, isDeffenceCalc]);

  // Move to game component
  useEffect(() => {
    // Modal is active if no bigCards, and if decks not empty
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
        <div className={style["results"]}>
          {resultsLVisible && <span>{resultsL}</span>}
          {resultsRVisible && <span>{resultsR}</span>}
        </div>
      </div>
    </div>
  );
};
