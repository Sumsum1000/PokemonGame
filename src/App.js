import "./App.css";
import { Game } from "./Components/Game/Game";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SharedComponent } from "./Components/SharedComponent";
import { GameMenu } from "./Components/GameMenu/GameMenu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<SharedComponent />}>
          <Route index element={<GameMenu />} />
          <Route path={"/game"} element={<Game />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
