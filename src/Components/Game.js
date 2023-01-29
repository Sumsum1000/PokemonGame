import style from "./Game.module.scss";
import big from "./BigCard.module.scss";
import dice from "./Die.module.scss";
import victory from "../Images/Victory.png";
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
  decksActions,
} from "../_Store/Store";
import { Die } from "./Die";
import { Dice } from "./Dice";

export const Game = () => {
  // const [isSubststractP1, setIsSubstractP1] = useState(false);
  // const [isSubststractP2, setIsSubstractP2] = useState(false);
  const dispatch = useDispatch();
  //const { p1, p2 } = useSelector((state) => state.playersInfo);
  const deck1 = useSelector((state) => state.playersDecks.deck1);
  const deck2 = useSelector((state) => state.playersDecks.deck2);
  const { bigCard1, bigCard2 } = useSelector((state) => state.playersDecks);

  const player1 = useSelector((state) => state.player1);
  const player2 = useSelector((state) => state.player2);

  // init game
  useEffect(() => {
    dispatch(player1Actions.setIsPlaying(true));
    dispatch(player2Actions.setIsPlaying(false));
    dispatch(player1Actions.setAttackMode());
    dispatch(player2Actions.setDeffenceMode());
  }, []);

  // Set rigth and left big card with 1 method(not 2) accordint tag or somthing...
  const leftCardHandler = (e) => {
    if (player1.bigCardHp <= 0 || player1.bigCardHp === "-") {
      e.cardClickHandler();
      dispatch(player1Actions.setBigCardHp(e.experience));
      dispatch(
        decksActions.setBigCard1({
          name: e.name,
          url: e.url,
        })
      );
    }
  };

  const rightCardHandler = (e) => {
    if (player2.bigCardHp <= 0 || player2.bigCardHp === "-") {
      dispatch(gameLogicActions.setIsModal(false));
      e.cardClickHandler();
      dispatch(player2Actions.setBigCardHp(e.experience));
      dispatch(
        decksActions.setBigCard2({
          name: e.name,
          url: e.url,
        })
      );
    }
  };

  useEffect(() => {
    if (player1.bigCardHp <= 0) {
      dispatch(player1Actions.setBigCardHp(0));
      dispatch(player1Actions.setIsBIgCard(false));
      //dispatch(gameLogicActions.setIsModal(true));
    }
    if (player2.bigCardHp <= 0) {
      dispatch(player2Actions.setBigCardHp(0));
      dispatch(player2Actions.setIsBIgCard(false));
      //dispatch(gameLogicActions.setIsModal(true));
    }

    if (player1.bigCardHp <= 0 || player2.bigCardHp <= 0) {
      dispatch(gameLogicActions.setIsModal(true));
    }

    if (player1.bigCardHp > 0 && player2.bigCardHp > 0) {
      dispatch(gameLogicActions.setIsModal(false));
    }
  }, [player1.bigCardHp, player2.bigCardHp]);

  useEffect(() => {
    if (player1.isBigCard) {
      dispatch(player1Actions.setIsBIgCard(false));
      dispatch(player1Actions.substructDeckCounter());
    }
    if (player2.isBigCard) {
      dispatch(player1Actions.setIsBIgCard(false));
      dispatch(player2Actions.substructDeckCounter());
    }
  }, [player1.isBigCard, player1.isBigCard]);

  useEffect(() => {
    if (player1.deckCounter === 0) {
      dispatch(player1Actions.setIsLost());
    }
    if (player2.deckCounter === 0) {
      dispatch(player2Actions.setIsLost());
    }
  }, [player1.deckCounter, player2.deckCounter]);

  return (
    <div className={style["game-container"]}>
      <div className={style["game-text"]}>
        <div>
          <PlayerInfo
            name={player1.name}
            isPlaying={""}
            mode={""}
            hasCard={""}
          />
        </div>
        <div>
          <PlayerInfo name={player2.name} />
        </div>
      </div>
      <div className={style["game-play"]}>
        {/* P1 */}
        <BigCard
          className={cardsPosition["left"]}
          className2={player1.isPlaying ? big["green-border"] : ""}
          className3={player1.bigCardHp <= 0 ? big["terminated"] : ""}
          name={player2.setIsLost ? player1.name : bigCard1.name}
          url={player2.deckCounter === 0 ? victory : bigCard1.url}
          experience={player1.bigCardHp}
        />
        <Dice
          //className={style["dice-area-container"]}
          className2={[`${style["dice-info"]} ${style["attack-info"]}`].join()}
          className3={[
            `${style["dice-info"]} ${style["deffence-info"]}`,
          ].join()}
        />
        {/* P2 */}
        <BigCard
          className={cardsPosition["right"]}
          className2={player2.isPlaying ? big["green-border"] : ""}
          className3={player2.bigCardHp <= 0 ? big["terminated"] : ""}
          name={player1.setIsLost ? player2.name : bigCard2.name}
          url={player1.deckCounter === 0 ? victory : bigCard2.url}
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
