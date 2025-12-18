import { useState, useRef, useEffect } from "react";
import musica1 from "../assets/musica1.mp3";
import musica2 from "../assets/musica2.mp3";
import musica3 from "../assets/musica3.mp3";
import capa1 from "../assets/capa1.jpg";
import capa2 from "../assets/capa2.jpg";
import capa3 from "../assets/capa3.jpg";

const musicas = [
  {
    nome: "Musica 1",
    artista: "Artista 1",
    src: musica1,
    capa: capa1
  },
  {
    nome: "Musica 2",
    artista: "Artista 2",
    src: musica2,
    capa: capa2
  },
  {
    nome: "Musica 3",
    artista: "Artista 3",
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

  // Atualiza o audio quando muda a música ou play/pause
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
      
      className="max-w-md mx-auto mt-10 p-6 bg-white/10 backdrop-blur-sm border-2 border-green-800 rounded-2xl shadow-2xl text-center"
    >
      <img
        src={musicas[index].capa}
        alt={musicas[index].nome}
        className="w-64 h-64 mx-auto rounded-full mb-4 object-cover shadow-lg"
      />
      
      <h2 className="text-2xl font-bold text-white">{musicas[index].nome}</h2>
      <p className="text-gray-300 mb-6">{musicas[index].artista}</p>

      {/* Barra de progresso */}
      <div className="mb-6 px-2">
        <div className="w-full bg-gray-600/50 rounded-full h-1.5 cursor-pointer">
           <div 
             className="bg-cyan-400 h-1.5 rounded-full" 
             style={{ width: `${(tempo / duracao) * 100}%` }}
           ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-300 mt-2 font-mono">
          <span>{formatTime(tempo)}</span>
          <span>{formatTime(duracao)}</span>
        </div>
      </div>

      {/* Controles */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          onClick={prev}
          className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition backdrop-blur-sm"
        >
          ⏮️
        </button>
        <button
          onClick={togglePlay}
          className="bg-cyan-500 hover:bg-cyan-400 text-white p-5 rounded-full shadow-lg shadow-cyan-500/50 transition transform hover:scale-105"
        >
          {tocando ? "⏸️" : "▶️"}
        </button>
        <button
          onClick={next}
          className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition backdrop-blur-sm"
        >
          ⏭️
        </button>
      </div>

      <button
        onClick={toggleShuffle}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
          shuffle 
            ? "bg-purple-500/80 text-white shadow-purple-500/50" 
            : "text-gray-400 hover:text-white"
        }`}
      >
        Shuffle: {shuffle ? "ON" : "OFF"}
      </button>
    </div>
  );
}