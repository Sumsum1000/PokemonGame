import style from "./Game.module.scss";
import big from "./BigCard.module.scss";
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

import { decksActions } from "../_Store/Store";
import { Die } from "./Die";
import { Dice } from "./Dice";

export const Game = () => {
  const dispatch = useDispatch();
  const { p1, p2 } = useSelector((state) => state.playersInfo);
  const deck1 = useSelector((state) => state.playersDecks.deck1);
  const deck2 = useSelector((state) => state.playersDecks.deck2);
  const { bigCard1, bigCard2 } = useSelector((state) => state.playersDecks);

  const player1 = useSelector((state) => state.player1);
  const player2 = useSelector((state) => state.player2);

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
    dispatch(player1Actions.setBigCardHp(e.experience));
    dispatch(
      decksActions.setBigCard1({
        name: e.name,
        url: e.url,
        //experience: e.experience,
      })
    );
  };

  const rightCardHandler = (e) => {
    updateClassName(e);
    dispatch(player2Actions.setBigCardHp(e.experience));
    dispatch(
      decksActions.setBigCard2({
        name: e.name,
        url: e.url,
        //experience: e.experience,
      })
    );
  };

  // init game
  useEffect(() => {
    dispatch(player1Actions.setIsPlaying(true));
    dispatch(player2Actions.setIsPlaying(false));
    dispatch(player1Actions.setAttackMode());
    dispatch(player2Actions.setDeffenceMode());
  }, []);

  // remove card from deck

  // useEffect(() => {
  //   console.log("deck1 ", deck1);
  // }, [deck1]);

  // useEffect(() => {
  //   console.log("bigCard1 ", bigCard1);
  // }, [bigCard1]);

  return (
    <div className={style["game-container"]}>
      <div className={style["game-text"]}>
        <div>
          <PlayerInfo name={p1} isPlaying={""} mode={""} hasCard={""} />
        </div>
        <div>
          <PlayerInfo name={p2} />
        </div>
      </div>
      <div className={style["game-play"]}>
        {/* P1 */}
        <BigCard
          className={cardsPosition["left"]}
          className2={player1.isPlaying ? big["green-border"] : ""}
          name={bigCard1.name}
          url={bigCard1.url}
          //experience={bigCard1.experience}
          experience={player1.bigCardHp}
        />
        <Dice
          className={style["dice-area-container"]}
          className2={[`${style["dice-info"]} ${style["attack-info"]}`].join()}
          className3={[
            `${style["dice-info"]} ${style["deffence-info"]}`,
          ].join()}
        />
        {/* P2 */}
        <BigCard
          className={cardsPosition["right"]}
          className2={player2.isPlaying ? big["green-border"] : ""}
          name={bigCard2.name}
          url={bigCard2.url}
          experience={player2.bigCardHp}
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
                // className2={isClicked ? backStyle["opacity"] : ""}
                name={card.name}
                id={card.id}
                experience={parseInt(card.experience)}
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
                experience={parseInt(card.experience)}
                url={card.url}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
