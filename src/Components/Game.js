import { BigCard } from "./BigCard";
import { Card } from "./Card";
import style from "./Game.module.scss";
import backStyle from "./Card.module.scss";
import { PlayerInfo } from "./PlayerInfo";
import backCard from "../Images/CardBack.jpg";
import backCard2 from "../Images/CardBack2.jpg";

export const Game = () => {
  return (
    <div className={style["game-container"]}>
      <div className={style["game-text"]}>
        <div>
          <PlayerInfo />
        </div>
        <h1>POKEMON pLAY</h1>
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
