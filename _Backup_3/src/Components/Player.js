import { BigCard } from "./BigCard";
import { PlayerInfo } from "./PlayerInfo";

export const Player = ({ deck, playerName, cardName }) => {
  // Deck
  // Big card
  // info

  return (
    <div>
      <PlayerInfo name={playerName} />
      <BigCard
        className2={[`${style["big-card-container"]} ${className2}`].join()}
        className1={className1}
        name={cardName}
        id={id}
        experience={experience}
        url={url}
      />
      {deck}
    </div>
  );
};
