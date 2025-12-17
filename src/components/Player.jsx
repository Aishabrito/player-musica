import { useState, useRef, useEffect } from "react";
import musica1 from "../assets/musica1.mp3";
import musica2 from "../assets/musica2.mp3";
import musica3 from "../assets/musica3.mp3";

const musicas = [
  {
    nome: "Musica 1",
    artista: "Artista 1",
    src: musica1,
    capa: "https://via.placeholder.com/300x300.png?text=Musica+1",
  },
  {
    nome: "Musica 2",
    artista: "Artista 2",
    src: musica2,
    capa: "https://via.placeholder.com/300x300.png?text=Musica+2",
  },
  {
    nome: "Musica 3",
    artista: "Artista 3",
    src: musica3,
    capa: "https://via.placeholder.com/300x300.png?text=Musica+3",
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center">
      <img
        src={musicas[index].capa}
        alt={musicas[index].nome}
        className="w-64 h-64 mx-auto rounded-xl mb-4 object-cover"
      />
      <h2 className="text-2xl font-bold">{musicas[index].nome}</h2>
      <p className="text-gray-600 mb-4">{musicas[index].artista}</p>

      <div className="flex justify-center items-center mb-4">
        <button
          onClick={prev}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl mx-1"
        >
          ⏮️
        </button>
        <button
          onClick={togglePlay}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl mx-1"
        >
          {tocando ? "⏸️" : "▶️"}
        </button>
        <button
          onClick={next}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl mx-1"
        >
          ⏭️
        </button>
      </div>

      <div className="mb-2">
        <progress
          value={tempo}
          max={duracao}
          className="w-full h-2 rounded-full overflow-hidden"
        />
        <div className="text-sm text-gray-600 mt-1">
          {formatTime(tempo)} / {formatTime(duracao)}
        </div>
      </div>

      <button
        onClick={toggleShuffle}
        className={`px-4 py-2 rounded-xl mt-4 ${
          shuffle ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        Shuffle: {shuffle ? "ON" : "OFF"}
      </button>
    </div>
  );
}
