import { useNavigate } from "react-router-dom";

export default function Inicial() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-extrabold mb-6">Notas Ocultas</h1>
      <p className="text-lg text-gray-700 mb-10 max-w-xl">
        Descubra músicas indie de artistas independentes.
      </p>
      <button
        onClick={() => navigate("/player")}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl text-xl font-bold"
      >
        Conheça agora 🎵
      </button>
    </div>
  );
}
