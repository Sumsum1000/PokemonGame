import style from "./Game.module.scss";
import bigCard from "./BigCard.module.scss";
import { BigCard } from "./BigCard";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gameLogicActions,
  player1Actions,
  player2Actions,
  decksActions,
} from "../_Store/Store";
import { Dice } from "./Dice";
import { Victory } from "./Victory";
import { PlayersForm } from "./PlayersForm";
import { TopBoard } from "./TopBoard";
import { BottomBoard } from "./BottomBoard";
import { LifeBar } from "./Threejs/LifeBar";

export const Game = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const { bigCard1, bigCard2 } = useSelector((state) => state.playersDecks);

  const player1 = useSelector((state) => state.player1);
  const player2 = useSelector((state) => state.player2);
  const { terminatedL, terminatedR } = useSelector((state) => state.gameLogic);

  const [isSubstractL, setIsSubstarctL] = useState(false);
  const [isSubstractR, setIsSubstarctR] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [btnStart, setBtnStart] = useState("Start");

  //To Do - set as initial game
  const formHandler = () => {
    setIsFormVisible(false);
    dispatch(gameLogicActions.setTerminatedL(""));
    dispatch(gameLogicActions.setTerminatedR(""));

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

  function openFullscreen() {
    if (ref.current.requestFullscreen) {
      ref.current.requestFullscreen();
    } else if (ref.current.webkitRequestFullscreen) {
      /* Safari */
      ref.current.webkitRequestFullscreen();
    } else if (ref.current.msRequestFullscreen) {
      /* IE11 */
      ref.current.msRequestFullscreen();
    }
  }

  // init game
  useEffect(() => {
    dispatch(player1Actions.setIsPlaying(true));
    dispatch(player2Actions.setIsPlaying(false));
    dispatch(player1Actions.setIsAttack(true));
    dispatch(player1Actions.setIsDefence(true));
    //openFullscreen();
  }, []);

  useEffect(() => {
    if (player1.bigCardHp <= 0) {
      dispatch(player1Actions.setBigCardHp(0));
      dispatch(gameLogicActions.setTerminatedL(bigCard["terminated"]));
      setIsSubstarctL(true);
      dispatch(player1Actions.setIsBIgCard(false));
    }
    if (player2.bigCardHp <= 0) {
      dispatch(player2Actions.setBigCardHp(0));
      dispatch(gameLogicActions.setTerminatedR(bigCard["terminated"]));
      setIsSubstarctR(true);
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
    if (player1.deckCounter === 0 || player2.deckCounter === 0) {
      setBtnStart("Play again");
      setIsFormVisible(true);
    }
  }, [player1.deckCounter, player2.deckCounter]);

  return (
    <div className={style["game-container"]} ref={ref}>
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
            className2={player1.isPlaying ? bigCard["green-border"] : ""}
            className3={terminatedL}
            name={player2.isLost ? player1.name : bigCard1.name}
            url={bigCard1.url}
            experience={player1.bigCardHp}
          />
        )}
        <Dice
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
            className2={player2.isPlaying ? bigCard["green-border"] : ""}
            className3={terminatedR}
            name={player1.isLost ? player2.name : bigCard2.name}
            url={bigCard2.url}
            experience={player2.bigCardHp}
          />
        )}
      </div>
      <BottomBoard />
    </div>
  );
};
