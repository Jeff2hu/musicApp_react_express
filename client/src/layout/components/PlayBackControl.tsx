import usePlayerStore from "@/zustand/usePlayerStore";
import { useEffect, useState } from "react";

const PlayBackControl = () => {
  const {
    isPlaying,
    currentSong,
    togglePlay,
    playPrev,
    playNext,
    audioRef,
    setIsPlaying,
  } = usePlayerStore();

  const [volumn, setVolumn] = useState<number>(75);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (!audioRef || !audioRef.current) return;

    const audioDom = audioRef.current;
    const updateTime = () => setCurrentTime(audioDom.currentTime);
    const updateDuration = () => setDuration(audioDom.duration);

    audioDom.addEventListener("timeupdate", updateTime);
    audioDom.addEventListener("loadedmetadata", updateDuration);

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audioDom.addEventListener("ended", handleEnded);

    return () => {
      audioDom.removeEventListener("timeupdate", updateTime);
      audioDom.removeEventListener("loadedmetadata", updateDuration);
      audioDom.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, setIsPlaying]);

  return (
    <div>
      {currentSong?.title}
      {isPlaying ? "Playing" : "Paused"}
      {currentTime}
      {duration}
    </div>
  );
};

export default PlayBackControl;
