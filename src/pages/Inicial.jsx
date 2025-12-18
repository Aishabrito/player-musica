import { useNavigate } from "react-router-dom";
import fundo from "../assets/fundoinicial.png";

export default function Inicial() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${fundo})` }}
    >
     <h1 style={{ fontFamily: "Caveat, cursive" }} className="text-9xl drop-shadow-2xl font-extrabold mb-6 text-white ">
  Notas Ocultas
</h1>
<p className=" text-lg text-white mb-10 max-w-xl drop-shadow-md"> Descubra músicas indie de artistas independentes. </p>
    
      <button
        onClick={() => navigate("/player")}
        className="bg-green-800 hover:bg-green-600 text-white px-7 py-3 rounded-full text-xl font-bold"
      >
        Conheça agora <picture>
          <source media="(min-width: )" srcset="" />
          <img src="" alt="" />
        </picture>
      </button>
    </div>
  );
}
