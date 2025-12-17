import Player from "../components/Player";

export default function PlayerPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-200">
      <h1 className="text-4xl font-bold mt-10 mb-6">🎶 Notas Ocultas</h1>
      <Player />
    </div>
  );
}
