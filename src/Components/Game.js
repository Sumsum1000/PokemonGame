import style from "./Game.module.scss";
import big from "./BigCard.module.scss";
//import dice from "./Die.module.scss";
import victory from "../Images/Victory.png";
import { BigCard } from "./BigCard";
import { Card } from "./Card";
import bigCard from "./BigCard.module.scss";
import backStyle from "./Card.module.scss";
import { PlayerInfo } from "./PlayerInfo";
//import backCard from "../Images/CardBack.jpg";
//import backCard2 from "../Images/CardBack2.jpg";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gameLogicActions,
  player1Actions,
  player2Actions,
  decksActions,
} from "../_Store/Store";
import { Die } from "./Die";
import { Dice } from "./Dice";
import { Victory } from "./Victory";
import { PlayersForm } from "./PlayersForm";
import { TopBoard } from "./TopBoard";
import { BottomBoard } from "./BottomBoard";

export const Game = () => {
  const dispatch = useDispatch();
  // const deck1 = useSelector((state) => state.playersDecks.deck1);
  // const deck2 = useSelector((state) => state.playersDecks.deck2);
  const { bigCard1, bigCard2 } = useSelector((state) => state.playersDecks);

  const player1 = useSelector((state) => state.player1);
  const player2 = useSelector((state) => state.player2);
  const { terminatedL, terminatedR } = useSelector((state) => state.gameLogic);

  const [isSubstractL, setIsSubstarctL] = useState(false);
  const [isSubstractR, setIsSubstarctR] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [btnStart, setBtnStart] = useState("Start");
  // const [terminatedL, setTerminatedL] = useState("");
  // const [terminatedR, setTerminatedR] = useState("");

  // const hideModal = () => {
  //   if (player1.isBigCard && player1.isBigCard) {
  //     dispatch(gameLogicActions.setIsModal(false));
  //   }
  // };

  //To Do - set as initial game
  const formHandler = () => {
    setIsFormVisible(false);
    dispatch(gameLogicActions.setTerminatedL(""));
    dispatch(gameLogicActions.setTerminatedR(""));
    // setTerminatedL("");
    // setTerminatedR("");

    dispatch(player1Actions.setBigCardHp("-"));
    dispatch(
      decksActions.setBigCard1({
        name: null,
        url: null,
      })
    );
    dispatch(player1Actions.resetDeckCounter());

    dispatch(player2Actions.setBigCardHp("-"));
    dispatch(
      decksActions.setBigCard2({
        name: null,
        url: null,
      })
    );
    dispatch(player2Actions.resetDeckCounter());
  };

  // init game
  useEffect(() => {
    dispatch(player1Actions.setIsPlaying(true));
    dispatch(player2Actions.setIsPlaying(false));
    // dispatch(player1Actions.setAttackMode());
    // dispatch(player2Actions.setDeffenceMode());
    dispatch(player1Actions.setIsAttack(true));
    dispatch(player1Actions.setIsDefence(true));
  }, []);

  // Set rigth and left big card with 1 method(not 2) accordint tag or somthing...
  // const leftCardHandler = (e) => {
  //   hideModal();

  //   if (player1.bigCardHp <= 0 || player1.bigCardHp === "-") {
  //     e.cardClickHandler();
  //     setTerminatedL("");
  //     dispatch(player1Actions.setBigCardHp(e.experience));
  //     dispatch(
  //       decksActions.setBigCard1({
  //         name: e.name,
  //         url: e.url,
  //       })
  //     );
  //   }
  // };

  // const rightCardHandler = (e) => {
  //   hideModal();

  //   if (player2.bigCardHp <= 0 || player2.bigCardHp === "-") {
  //     e.cardClickHandler();
  //     setTerminatedR("");
  //     dispatch(player2Actions.setBigCardHp(e.experience));
  //     dispatch(
  //       decksActions.setBigCard2({
  //         name: e.name,
  //         url: e.url,
  //       })
  //     );
  //   }
  // };

  useEffect(() => {
    if (player1.bigCardHp <= 0) {
      dispatch(player1Actions.setBigCardHp(0));
      //setTerminatedL(big["terminated"]);
      dispatch(gameLogicActions.setTerminatedL("terminated"));
      setIsSubstarctL(true);
      console.log("p1 counter -1");
      dispatch(player1Actions.setIsBIgCard(false));
    }
    if (player2.bigCardHp <= 0) {
      dispatch(player2Actions.setBigCardHp(0));
      //setTerminatedR(big["terminated"]);
      dispatch(gameLogicActions.setTerminatedR("terminated"));
      setIsSubstarctR(true);
      console.log("p2 counter -1");
      dispatch(player2Actions.setIsBIgCard(false));
    }

    if (player1.bigCardHp <= 0 || player2.bigCardHp <= 0) {
      dispatch(gameLogicActions.setIsModal(true));
    }

    if (player1.bigCardHp > 0 && player2.bigCardHp > 0) {
      dispatch(gameLogicActions.setIsModal(false));
    }
  }, [player1.bigCardHp, player2.bigCardHp]);

  useEffect(() => {
    if (isSubstractL) {
      setIsSubstarctL(false);
      dispatch(player1Actions.substructDeckCounter());
    }
    if (isSubstractR) {
      setIsSubstarctR(false);
      dispatch(player2Actions.substructDeckCounter());
    }
  }, [isSubstractL, isSubstractR]);

  useEffect(() => {
    // set play again instead of start
    if (player1.deckCounter === 0 || player2.deckCounter === 0) {
      setBtnStart("Play again");
      setIsFormVisible(true);
    }
  }, [player1.deckCounter, player2.deckCounter]);

  return (
    <div className={style["game-container"]}>
      {isFormVisible && <PlayersForm formHide={formHandler} start={btnStart} />}

      <TopBoard />

      <div className={style["game-play"]}>
        {/* P1 */}
        {player2.deckCounter === 0 ? (
          <Victory name={player2.name} />
        ) : (
          <BigCard
            attackActive={player1.isAttack && bigCard["icon-active"]}
            defenceActive={player1.isDefence && bigCard["icon-active"]}
            classIcons={bigCard["icons-left"]}
            className={bigCard["left"]}
            className2={player1.isPlaying ? big["green-border"] : ""}
            className3={terminatedL}
            name={player2.isLost ? player1.name : bigCard1.name}
            url={bigCard1.url}
            experience={player1.bigCardHp}
          />
        )}
        <Dice
          //className={style["dice-area-container"]}
          className2={[`${style["dice-info"]} ${style["attack-info"]}`].join()}
          className3={[
            `${style["dice-info"]} ${style["deffence-info"]}`,
          ].join()}
        />
        {/* P2 */}
        {player1.deckCounter === 0 ? (
          <Victory name={player2.name} />
        ) : (
          <BigCard
            attackActive={player2.isAttack && bigCard["icon-active"]}
            defenceActive={player2.isDefence && bigCard["icon-active"]}
            classIcons={bigCard["icons-right"]}
            classMirror={bigCard["classMirror"]}
            className={bigCard["right"]}
            className2={player2.isPlaying ? big["green-border"] : ""}
            className3={terminatedR}
            name={player1.isLost ? player2.name : bigCard2.name}
            url={bigCard2.url}
            experience={player2.bigCardHp}
          />
        )}
      </div>
      <BottomBoard />
      {/* <div className={style["game-cards"]}>
        <div className={style["deck-container-l"]}>
          {deck1.length !== 0 ? (
            deck1.map((card) => {
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
            })
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
        <div className={style["deck-container-r"]}>
          {deck1.length !== 0 ? (
            deck2.map((card) => {
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
            })
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </div> */}
    </div>
  );
};
