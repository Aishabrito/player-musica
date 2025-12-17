import { Routes, Route } from "react-router-dom";
import Inicial from "./pages/Inicial";
import PlayerPage from "./pages/PlayerPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicial />} />
      <Route path="/player" element={<PlayerPage />} />
    </Routes>
  );
}
