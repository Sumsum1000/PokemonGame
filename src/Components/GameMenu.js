import { Link, useNavigate } from "react-router-dom";

export const GameMenu = () => {
  const navigate = useNavigate();

  const startGameHandler = () => {
    navigate("/game");
  };

  return (
    <div>
      <button>Enter names</button>
      <button onClick={startGameHandler}>Start game</button>
      <button>Sound on/off</button>
      <button>Dark mode/Light mode</button>
      <button>Quit</button>
    </div>
  );
};
