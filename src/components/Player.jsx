import { useState, useRef, useEffect } from "react";
import musica1 from "../assets/musica1.mp3";
import musica2 from "../assets/musica2.mp3";
import musica3 from "../assets/musica3.mp3";
import capa1 from "../assets/capa1.jpg";
import capa2 from "../assets/capa2.jpg";
import capa3 from "../assets/capa3.jpg";

const musicas = [
  {
    nome: "Echoes Between Walls",
    artista: "Moon Static",
    src: musica1,
    capa: capa1
  },
  {
    nome: "Lights Still On at 3AM",
    artista: "Empty Hallways",
    src: musica2,
    capa: capa2
  },
  {
    nome: "Letters I Never Sent",
    artista: "Slow Tide",
    src: musica3,
    capa: capa3,
  },
];

export default function Player() {
  const [index, setIndex] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const [shuffle, setShuffle] = useState(false);

  const audioRef = useRef(new Audio(musicas[0].src));

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = musicas[index].src;

    audio.onloadedmetadata = () => setDuracao(audio.duration);
    audio.ontimeupdate = () => setTempo(audio.currentTime);

    if (tocando) {
      audio.play().catch(() => setTocando(false));
    } else {
      audio.pause();
    }

    return () => audio.pause();
  }, [index, tocando]);

  const togglePlay = () => setTocando(!tocando);

  const next = () => {
    if (shuffle) {
      let randomIndex;
      if (musicas.length > 1) {
        do {
          randomIndex = Math.floor(Math.random() * musicas.length);
        } while (randomIndex === index);
      } else {
        randomIndex = index;
      }
      setIndex(randomIndex);
    } else {
      setIndex((index + 1) % musicas.length);
    }
  };

  const prev = () => setIndex((index - 1 + musicas.length) % musicas.length);

  const toggleShuffle = () => setShuffle(!shuffle);

  const formatTime = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = Math.floor(segundos % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div 
      className="
        w-[90%] md:w-full max-w-md mx-auto 
        mt-4 md:mt-10                      
        p-4 md:p-8                          
        bg-white/10 backdrop-blur-md 
        border-[3px] border-green-800 
        rounded-3xl shadow-2xl text-center
        transition-all duration-300         
      "
    >
      <img
        src={musicas[index].capa}
        alt={musicas[index].nome}
        className="
          w-40 h-40 md:w-64 md:h-64        
          mx-auto rounded-full mb-4 md:mb-6 
          object-cover shadow-lg border-2 border-green-900
          transition-all duration-300
        "
      />
      
      {/* Títulos  */}
      <h2 className="text-xl md:text-3xl font-bold text-white truncate px-2">
        {musicas[index].nome}
      </h2>
      <p className="text-sm md:text-lg text-gray-300 mb-4 md:mb-6">
        {musicas[index].artista}
      </p>

      {/* Barra de progresso */}
      <div className="mb-6 px-2">
        <div className="w-full bg-gray-600/50 rounded-full h-1.5 cursor-pointer">
           <div 
             className="bg-cyan-400 h-1.5 rounded-full relative" 
             style={{ width: `${(tempo / duracao) * 100}%` }}
           >
              <div className="absolute right-0 -top-1 w-3 h-3 bg-white rounded-full shadow"></div>
           </div>
        </div>
        <div className="flex justify-between text-[10px] md:text-xs text-gray-300 mt-2 font-mono">
          <span>{formatTime(tempo)}</span>
          <span>{formatTime(duracao)}</span>
        </div>
      </div>

     {/* Controles */}
      <div className="flex justify-center items-center gap-3 md:gap-6 mb-6">
        <button
          onClick={prev}
          className="bg-transparent hover:bg-white/10 text-white p-2 md:p-3 rounded-lg transition backdrop-blur-sm border-[1px] border-green-800"
        >
          ⏮️
        </button>

        <button
          onClick={togglePlay}
          
          className="bg-transparent hover:bg-white/10 text-white p-3 md:p-3 rounded-lg transition transform hover:scale-105 active:scale-95 border-[1px] border-green-800"
        >
          {tocando ? "⏸️" : "▶️"}
        </button>

        <button
          onClick={next}
          className="bg-transparent hover:bg-white/10 text-white p-2 md:p-3 rounded-lg transition backdrop-blur-sm border-[1px] border-green-800"
        >
          ⏭️
        </button>
      </div>

      <button
        onClick={toggleShuffle}
        className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition ${
          shuffle 
            ? "bg-purple-500/80 text-white shadow-purple-500/50" 
            : "text-gray-400 hover:text-white bg-white/5"
        }`}
      >
        Shuffle: {shuffle ? "ON" : "OFF"}
      </button>
    </div>
  );
}