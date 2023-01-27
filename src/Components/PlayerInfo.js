export const PlayerInfo = ({ name, isPlaying, mode, hasCard }) => {
  return (
    <div
      isPlaying={isPlaying}
      mode={mode} //attack/deffence
      hasArd={hasCard}
    >
      <span>Player 1</span>
      <h2>{name}</h2>
    </div>
  );
};
