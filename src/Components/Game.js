import { BigCard } from "./BigCard";
import { Card } from "./Card";
import style from "./Game.module.scss";
import backStyle from "./Card.module.scss";
import { PlayerInfo } from "./PlayerInfo";
import backCard from "../Images/CardBack.jpg";
import backCard2 from "../Images/CardBack2.jpg";
import { useEffect, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { fullDeckActions } from "../_Store/Store";

export const Game = () => {
  const dispatch = useDispatch();
  //   const [deck, setDeck] = useState();
  const { p1, p2 } = useSelector((state) => state.playersInfo);
  const deck1 = useSelector((state) => state.playersDecks.deck1);
  const deck2 = useSelector((state) => state.playersDecks.deck2);

  useEffect(() => {
    console.log("deck1 ", deck1);
  }, [deck1]);

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
        <BigCard />
        <div className={style["dice-area"]}></div>
        <BigCard />
      </div>
      <div className={style["game-cards"]}>
        <div className={style["deck-container-l"]}>
          <Card className={backStyle["left-cards"]} />
          <Card className={backStyle["left-cards"]} />
          <Card className={backStyle["left-cards"]} />
          <Card className={backStyle["left-cards"]} />
          <Card className={backStyle["left-cards"]} />
        </div>
        <div className={style["deck-container-r"]}>
          <Card className={backStyle["right-cards"]} />
          <Card className={backStyle["right-cards"]} />
          <Card className={backStyle["right-cards"]} />
          <Card className={backStyle["right-cards"]} />
          <Card className={backStyle["right-cards"]} />
        </div>
      </div>
    </div>
  );
};
