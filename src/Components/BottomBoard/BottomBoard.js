import style from "./BottomBoard.module.scss";
import backStyle from "../Card/Card.module.scss";
import { Card } from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  player1Actions,
  player2Actions,
  decksActions,
  gameLogicActions,
} from "../../_Store/Store";

export const BottomBoard = () => {
  const dispatch = useDispatch();
  const deck1 = useSelector((state) => state.playersDecks.deck1);
  const deck2 = useSelector((state) => state.playersDecks.deck2);
  const player1 = useSelector((state) => state.player1);
  const player2 = useSelector((state) => state.player2);

  const hideModal = () => {
    if (player1.isBigCard && player1.isBigCard) {
      dispatch(gameLogicActions.setIsModal(false));
    }
  };

  const leftCardHandler = (e) => {
    hideModal();

    if (player1.bigCardHp <= 0 || player1.bigCardHp === "-") {
      e.cardClickHandler();
      dispatch(gameLogicActions.setTerminatedL("terminated"));
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
    hideModal();

    if (player2.bigCardHp <= 0 || player2.bigCardHp === "-") {
      e.cardClickHandler();
      dispatch(gameLogicActions.setTerminatedR("terminated"));
      dispatch(player2Actions.setBigCardHp(e.experience));
      dispatch(
        decksActions.setBigCard2({
          name: e.name,
          url: e.url,
        })
      );
    }
  };

  return (
    <div className={style["game-cards"]}>
      <div className={style["deck-container-l"]}>
        {deck1.length !== 0 ? (
          deck1.map((card) => {
            return (
              <Card
                anim={'backStyle["anim"]'} // -------------------anim
                onClick={(e) => leftCardHandler(e)}
                isClicked={false}
                className={backStyle["left-cards"]}
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
    </div>
  );
};
