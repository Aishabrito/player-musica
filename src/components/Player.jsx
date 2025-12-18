import { useState, useRef, useEffect } from "react";
import { Play, Pause, Rewind, FastForward, Shuffle } from "lucide-react";
import { musicasData } from "../data/musicas";

export default function Player() {
  const musicas = musicasData;

  const [index, setIndex] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const [shuffle, setShuffle] = useState(false);

  const audioRef = useRef(new Audio(musicas[0].src));
  
  // referência para o elemento HTML da barra
  const progressBarRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = musicas[index].src;

    audio.onloadedmetadata = () => setDuracao(audio.duration);
    audio.ontimeupdate = () => setTempo(audio.currentTime);
// Lógica de Play/Pause
    if (tocando) {
      audio.play().catch(() => setTocando(false));
    } else {
      audio.pause();
    }
// Se sair da tela, pausa a música 
    return () => audio.pause();
  }, [index, tocando]);

  const togglePlay = () => setTocando(!tocando);
// Lógica de Próxima Música
  const next = () => {
    if (shuffle) {
      let randomIndex;
      if (musicas.length > 1) {
        do {
          randomIndex = Math.floor(Math.random() * musicas.length);
        } while (randomIndex === index);// Repete o sorteio se cair na mesma música
      } else {
        randomIndex = index;
      }
      setIndex(randomIndex);
    } else {
      setIndex((index + 1) % musicas.length);
    }
  };
// Lógica de Voltar Música
  const prev = () => setIndex((index - 1 + musicas.length) % musicas.length);
// Botão Aleatório Liga ou desliga o modo de embaralhar
  const toggleShuffle = () => setShuffle(!shuffle);

  //  Função que calcula onde você clicou e muda o tempo da música
  const handleSeek = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    // Calcula a posição do clique relativo ao início da barra
    const clickX = e.clientX - rect.left; 
    const width = rect.width;
  
    const newTime = (clickX / width) * duracao;

    // Atualiza o áudio e o estado visual
    audioRef.current.currentTime = newTime;
    setTempo(newTime);
  };

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
      
      {/* Títulos */}
      <h2 className="text-xl md:text-3xl font-bold text-white truncate px-2">
        {musicas[index].nome}
      </h2>
      <p className="text-sm md:text-lg text-gray-300 mb-4 md:mb-6">
        {musicas[index].artista}
      </p>

      {/* Barra de progresso */}
      <div className="mb-6 px-2">
        <div 
          //Conectaa referência e o evento de clique aqui
          ref={progressBarRef}
          onClick={handleSeek}
          className="w-full bg-gray-600/50 rounded-full h-1.5 cursor-pointer hover:h-2 transition-all"
        >
           <div 
             className="bg-green-800 h-full rounded-full relative pointer-events-none" 
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
        
        {/* Botão Voltar */}
        <button
          onClick={prev}
          className="bg-transparent hover:bg-white/10 text-green-800 p-2 md:p-3 rounded-lg transition backdrop-blur-sm border-[1px] border-green-800"
        >
          <Rewind className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
        </button>

        {/* Botão Play/Pause */}
        <button
          onClick={togglePlay}
          className="bg-transparent hover:bg-white/10 text-green-800 p-3 md:p-3 rounded-lg transition transform hover:scale-105 active:scale-95 border-[1px] border-green-800"
        >
          {tocando ? (
            <Pause className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2} />
          ) : (
            <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" strokeWidth={2} />
          )}
        </button>

        {/* Botão Avançar */}
        <button
          onClick={next}
          className="bg-transparent hover:bg-white/10 text-green-800 p-2 md:p-3 rounded-lg transition backdrop-blur-sm border-[1px] border-green-800"
        >
          <FastForward className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
        </button>
      </div>

      <button
        onClick={toggleShuffle}
        className={`flex items-center justify-center gap-2 mx-auto px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition ${
          shuffle 
            ? "bg-green-800/80 text-white shadow-green-500/50" 
            : "text-gray-400 hover:text-white bg-white/5"
        }`}
      >
        <Shuffle size={14} />
        Aleatório: {shuffle ? "ON" : "OFF"}
      </button>
    </div>
  );
}