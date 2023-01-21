import style from "./PlayersForm.module.scss";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { decksActions, playersInfoActions } from "../_Store/Store";

export const PlayersForm = () => {
  const test = useSelector((state) => state.playersDecks);
  const dispatch = useDispatch();

  const [deck, setDeck] = useState([]);

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

  const fetchDeck = async () => {
    try {
      const pokemons = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"
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

  const fetchPokemon = async (pokeUrl) => {
    const pokemon = await fetch(pokeUrl);
    const data = await pokemon.json().then((data) => data);
    const { name, base_experience, id } = data;
    const url = data.sprites.other.dream_world.front_default;
    const pokemonData = { id, name, experience: base_experience, url };
    return pokemonData;
  };

  useEffect(() => {
    fetchDeck();
  }, []);

  useEffect(() => {
    const shuffeledDeck = shuffleDeck(deck);
    let temp = [];
    const pokes = Promise.all(
      shuffeledDeck.map((item) =>
        fetch(item.url).then((resp) => resp.json().then((data) => data))
      )
    );

    const d1 = pokes.then((data) =>
      data.map((item) => {
        temp.push({
          name: item.name,
          id: item.id,
          experience: item.base_experience,
          url: item.sprites.other.dream_world.front_default,
        });
      })
    );

    d1.then((data) =>
      dispatch(decksActions.setDecks([temp.slice(0, 5), temp.slice(10, 15)]))
    );
  }, [deck]);

  useEffect(() => {
    console.log("new decks ", test);
  }, [test]);

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