import { Outlet } from "react-router";
import { GameLogo } from "../Components/Game/GameLogo";

export const SharedComponent = () => {
  return (
    <div>
      <GameLogo />
      <Outlet />
    </div>
  );
};
