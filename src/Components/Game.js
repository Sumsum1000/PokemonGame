import { BigCard } from "./BigCard";
import { Card } from "./Card";
import style from "./Game.module.scss";
import cardsPosition from "./BigCard.module.scss";
import backStyle from "./Card.module.scss";
import { PlayerInfo } from "./PlayerInfo";
import backCard from "../Images/CardBack.jpg";
import backCard2 from "../Images/CardBack2.jpg";
import { useEffect, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import {
  decksActions,
  fullDeckActions,
  playersInfoActions,
} from "../_Store/Store";
import { animate } from "framer-motion";

export const Game = () => {
  const dispatch = useDispatch();
  //   const [deck, setDeck] = useState();
  const { p1, p2 } = useSelector((state) => state.playersInfo);
  const deck1 = useSelector((state) => state.playersDecks.deck1);
  const deck2 = useSelector((state) => state.playersDecks.deck2);
  const bigCard1 = useSelector((state) => state.playersDecks.bigCard1);
  const bigCard2 = useSelector((state) => state.playersDecks.bigCard2);

  const [isClicked, setIsClicked] = useState(false);

  const updateClassName = (e) => {
    e.testFunc();

    for (let card of deck1) {
      if (card.id === e.id) {
        console.log("id ", e.id);
      }
    }
  };

  const leftCardHandler = (e) => {
    // double code -----------
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
    // double code -----------
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
        <div className={style["dice-area"]}></div>
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
