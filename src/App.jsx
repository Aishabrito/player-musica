import Player from "./componentes/Player";

function App() {
  return (
    <div className="App" style={{ fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>Music Player</h1>
      <Player />
    </div>
  );
}

export default App;