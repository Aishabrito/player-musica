import { useState, useRef, useEffect } from "react";
import musica1 from "../assets/musica1.mp3";
import musica2 from "../assets/musica2.mp3";
import musica3 from "../assets/musica3.mp3";

const musicas = [
  { nome: "Musica 1", artista: "Artista 1", src: musica1 },
  { nome: "Musica 2", artista: "Artista 2", src: musica2 },
  { nome: "Musica 3", artista: "Artista 3", src: musica3 },
];

export default function Player() {
  const [index, setIndex] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [duração, setDuração] = useState(0);
  const [shuffle, setShuffle] = useState(false);

  const audioRef = useRef(new Audio(musicas[index].src));

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(musicas[index].src);
    audioRef.current.onloadedmetadata = () => setDuração(audioRef.current.duration);
    audioRef.current.ontimeupdate = () => setTempo(audioRef.current.currentTime);
    if (tocando) audioRef.current.play();
  }, [index]);

  const togglePlay = () => {
    if (tocando) audioRef.current.pause();
    else audioRef.current.play();
    setTocando(!tocando);
  };

  const next = () => {
    if (shuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * musicas.length);
      } while (randomIndex === index);
      setIndex(randomIndex);
    } else {
      setIndex((index + 1) % musicas.length);
    }
  };

  const prev = () => {
    setIndex((index - 1 + musicas.length) % musicas.length);
  };

  const toggleShuffle = () => setShuffle(!shuffle);

  const formatTime = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = Math.floor(segundos % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-2xl shadow-lg text-center">
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
          max={duração}
          className="w-full h-2 rounded-full overflow-hidden"
        />
        <div className="text-sm text-gray-600 mt-1">
          {formatTime(tempo)} / {formatTime(duração)}
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
