import usePlayerStore from "@/zustand/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevSong = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext, setAudioRef } = usePlayerStore();

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (!currentSong || !audioRef.current) return;
    const audioDom = audioRef.current;

    const isChanged = prevSong.current !== currentSong.audioUrl;
    if (isChanged) {
      audioDom.src = currentSong.audioUrl;
      audioDom.currentTime = 0;
      prevSong.current = currentSong.audioUrl;

      if (isPlaying) audioDom.play();
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const audioDom = audioRef.current;

    const handleEnded = () => {
      playNext();
    };

    if (audioDom) {
      audioDom.addEventListener("ended", handleEnded);
    }

    return () => {
      audioDom?.removeEventListener("ended", handleEnded);
    };
  }, [playNext]);

  useEffect(() => {
    setAudioRef(audioRef);
  }, [setAudioRef]);

  return (
    <div>
      <audio ref={audioRef} />
    </div>
  );
};

export default AudioPlayer;
