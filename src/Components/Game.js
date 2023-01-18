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
  const [deck, setDeck] = useState();
  //const fullDeck = useSelector((state) => state.fullDeck.fullDeck);

  const fetchDeck = async () => {
    try {
      const pokemons = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=15&offset=0"
      );
      const data = pokemons.json().then((data) => setDeck(data.results));
    } catch (error) {
      console.log(error);
    }
  };

  const shuffleDeck = (arr) => {
    for (let i in arr) {
      const random = Math.floor(Math.random() * (arr.length - 1));
      const temp = arr[i];
      arr[i] = arr[random];
      arr[random] = temp;
    }
    return arr;
  };

  useEffect(() => {
    fetchDeck();
  }, []);

  useEffect(() => {
    const shuffeled = shuffleDeck(deck);
    console.log("updated fullDeCK ", shuffeled);
  }, [deck]);

  return (
    <div className={style["game-container"]}>
      <div className={style["game-text"]}>
        <div>
          <PlayerInfo />
        </div>
        {/* <h1>POKEMON pLAY</h1> */}
        <div>
          <PlayerInfo />
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
