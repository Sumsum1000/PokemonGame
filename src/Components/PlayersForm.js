import style from "./PlayersForm.module.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { playersInfoActions } from "../_Store/Store";

export const PlayersForm = () => {
  const dispatch = useDispatch();
  const p1Ref = useRef();
  const p2Ref = useRef();
  const subRef = useRef();

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT");
    const p1 = p1Ref.current.value;
    const p2 = p2Ref.current.value;
    dispatch(playersInfoActions.setPlayersNames([p1, p2]));
    navigate("/game");
  };

  const backHandler = () => {
    navigate("/");
  };

  const startHandler = () => {
    subRef.submit();
  };

  return (
    <div className={style["form-container"]}>
      <form ref={subRef} onSubmit={onSubmit}>
        <h2>WHO IS PLAYING?</h2>
        <div className={style["player"]}>
          <h5>Player 1:</h5>
          <input ref={p1Ref} type="text" maxLength={12} />
        </div>
        <div className={style["player"]}>
          <h5>Player 2:</h5>
          <input ref={p2Ref} type="text" maxLength={12} />
        </div>
        <div className={style["btns"]}>
          <input type="submit" value="Start" />
          <button onClick={backHandler}>Back</button>
        </div>
      </form>
    </div>
  );
};
