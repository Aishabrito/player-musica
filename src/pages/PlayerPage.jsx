import Player from "../components/Player";
import fundo from "../assets/fundoplayer.png";

export default function PlayerPage() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${fundo})` }}
    >
     
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 bg-black/40 overflow-y-auto">
        
        <Player />
      </div>
    </div>
  );
}