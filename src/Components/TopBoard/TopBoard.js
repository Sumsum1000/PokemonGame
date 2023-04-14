import style from "./TopBoard.module.scss";
import { PlayerInfo } from "../PlayerInfo";
import { useSelector } from "react-redux";

export const TopBoard = () => {
  const player1 = useSelector((state) => state.player1);
  const player2 = useSelector((state) => state.player2);

  return (
    <div className={style["game-text"]}>
      <div>
        <PlayerInfo p="1" name={player1.name} />
      </div>
      <div>
        <PlayerInfo p="2" name={player2.name} />
      </div>
    </div>
  );
};
