import { Outlet } from "react-router";
import { GameLogo } from "./GameLogo";

export const SharedComponent = () => {
  return (
    <div>
      <GameLogo />
      <Outlet />
    </div>
  );
};
