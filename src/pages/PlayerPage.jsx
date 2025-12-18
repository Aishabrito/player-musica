import Player from "../components/Player";
import fundo from "../assets/fundoplayer.png";

export default function PlayerPage() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="min-h-screen w-full flex flex-col items-center justify-start px-4 bg-black/40">
        <h1 className="text-4xl font-bold mt-10 mb-6 text-white drop-shadow-lg font-sans">
          🎶 Notas Ocultas
        </h1>

        <Player />
      </div>
    </div>
  );
}
