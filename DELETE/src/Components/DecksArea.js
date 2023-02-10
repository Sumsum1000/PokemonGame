import style from "./DecksArea.module.scss";
import backStyle from "../Components/Card.module.scss";
import { Card } from "../Components/Card";
import {
  gameLogicActions,
  decksActions,
  player1Actions,
  player2Actions,
} from "../_Store/Store";
import { useDispatch, useSelector } from "react-redux";

export const DecksArea = () => {
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
      //setTerminatedL("");
      dispatch(gameLogicActions.setTerminatedL(""));
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
    dispatch(gameLogicActions.setTerminatedR(""));

    if (player2.bigCardHp <= 0 || player2.bigCardHp === "-") {
      e.cardClickHandler();
      //setTerminatedR("");

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
    </div>
  );
};
