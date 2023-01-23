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
import { animate } from "framer-motion";
import { Die } from "./Die";

export const Game = () => {
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

  const [isClicked, setIsClicked] = useState(false);

  const updateClassName = (e) => {
    e.cardClickHandler();

    for (let card of deck1) {
      if (card.id === e.id) {
        console.log("id ", e.id);
      }
    }
  };

  const leftCardHandler = (e) => {
    updateClassName(e);
    dispatch(
      decksActions.setBigCard1({
        name: e.name,
        url: e.url,
        experience: e.experience,
      })
    );
  };

  const rightCardHandler = (e) => {
    updateClassName(e);

    dispatch(
      decksActions.setBigCard2({
        name: e.name,
        url: e.url,
        experience: e.experience,
      })
    );
  };

  // update big card acording to this card
  // remove card from deck

  useEffect(() => {
    console.log("deck1 ", deck1);
  }, [deck1]);

  useEffect(() => {
    console.log("bigCard1 ", bigCard1);
  }, [bigCard1]);

  useEffect(() => {
    console.log("Attack ", numAttackDice);
    let timer;
    if (numAttackDice === 3) {
      timer = setTimeout(() => {
        setIsAttackGrayed(!isAttackGrayed);
        setIsDeffenceGrayed(!isDeffenceGrayed);
        // Display result - num
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [numAttackDice]);

  useEffect(() => {
    console.log("diccce 1", isDiceReactivated);
    let timer;
    if (numDeffenceDice === 2) {
      timer = setTimeout(() => {
        setIsAttackGrayed(!isAttackGrayed);
        setIsDeffenceGrayed(!isDeffenceGrayed);
        dispatch(gameLogicActions.reactivateDice());
        // Display result - num
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [numDeffenceDice]);

  useEffect(() => {
    console.log("qqq ", isDiceReactivated);
  }, [isDiceReactivated]);

  return (
    <div className={style["game-container"]}>
      <div className={style["game-text"]}>
        <div>
          <PlayerInfo name={p1} />
          {/* <h1>{deck1[0].url}</h1> */}
        </div>
        {/* <h1>POKEMON pLAY</h1> */}
        <div>
          <PlayerInfo name={p2} />
        </div>
      </div>
      <div className={style["game-play"]}>
        <BigCard
          className={cardsPosition["left"]}
          name={bigCard1.name}
          url={bigCard1.url}
          experience={bigCard1.experience}
        />
        <div className={style["dice-area-container"]}>
          <div className={style["left-area"]}>
            <button>Click</button>
          </div>
          <div className={style["dice-area"]}>
            <div
              className={[
                `${style["dice-spread"]} ${style["four-dice"]}`,
              ].join()}
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
              className={[
                `${style["dice-spread"]} ${style["two-dice"]}`,
              ].join()}
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

          <div className={style["right-area"]}>
            <button>Click</button>
          </div>
        </div>
        <BigCard
          className={cardsPosition["right"]}
          name={bigCard2.name}
          url={bigCard2.url}
          experience={bigCard2.experience}
        />
      </div>
      <div className={style["game-cards"]}>
        <div className={style["deck-container-l"]}>
          {deck1.map((card) => {
            return (
              <Card
                anim={'backStyle["anim"]'} // -------------------anim
                onClick={(e) => leftCardHandler(e)}
                isClicked={false}
                className={backStyle["left-cards"]}
                className2={isClicked ? backStyle["opacity"] : ""}
                name={card.name}
                id={card.id}
                experience={card.experience}
                url={card.url}
              />
            );
          })}
        </div>
        <div className={style["deck-container-r"]}>
          {deck2.map((card) => {
            return (
              <Card
                onClick={(e) => rightCardHandler(e)}
                className={backStyle["right-cards"]}
                name={card.name}
                id={card.id}
                experience={card.experience}
                url={card.url}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
