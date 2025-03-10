import { cn } from "@/lib/utils";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Home, Volume2, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const imageDetails = [
  {
    artist: "City Lights",
    album: "Urban Jungle",
    audio: "/songs/15.mp3",
    year: "2021",
  },
  {
    artist: "Silver Shadows",
    album: "Moonlight Dance",
    audio: "/songs/14.mp3",
    year: "2021",
  },
  {
    artist: "Electric Dreams",
    album: "Lost in Tokyo",
    audio: "/songs/3.mp3",
    year: "2021",
  },
  {
    artist: "Sarah Mitchell",
    album: "Stay With Me",
    audio: "/songs/1.mp3",
    year: "2021",
  },
  {
    artist: "Luna Bay",
    album: "Starlight",
    audio: "/songs/10.mp3",
    year: "2021",
  },
  {
    artist: "Night Runners",
    album: "Neon Lights",
    audio: "/songs/5.mp3",
    year: "2018",
  },
  {
    artist: "Keshi",
    album: "Gabriel",
    audio: "/songs/7.mp3",
    year: "2022",
  },
  {
    artist: "Cyber Pulse",
    album: "Neon Dreams",
    audio: "/songs/13.mp3",
    year: "2021",
  },

  {
    artist: "The Wanderers",
    album: "Midnight Drive",
    audio: "/songs/2.mp3",
    year: "2019",
  },
  {
    artist: "Urban Echo",
    album: "City Rain",
    audio: "/songs/7.mp3",
    year: "2006",
  },
];

const getInitalTranslateZ = (slide: HTMLElement) => {
  const style = window.getComputedStyle(slide);
  const matrix = style.transform.match(/matrix3d\((.+)\)/);
  return matrix ? parseFloat(matrix[1].split(", ")[14]) : 0;
};

const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

const SearchPage = () => {
  const navigate = useNavigate();

  const [isMuted, setIsMuted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const currentActiveIndexRef = useRef<number>(1);
  const prevIndexRef = useRef<number>(0);

  const playAudioHandler = (index: number) => {
    if (audioRef.current) {
      audioRef.current.src = imageDetails[index].audio;
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const initializeScrollAnimations = () => {
    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.3)",
        }
      );
      setTimeout(() => {
        window.scrollTo({
          top: 5,
          behavior: "smooth",
        });
        playAudioHandler(currentActiveIndexRef.current);
      }, 100);
    }

    const slides = document.querySelectorAll(".slide");
    const activesSlideImages = gsap.utils.toArray(".active-slide img");
    // const scrollDistance = 750 - currentActiveIndexRef.current * 30;

    // let isScrolling = false;
    // let isAnimating = false;

    // containerRef.current?.addEventListener("wheel", (e) => {
    //   e.preventDefault();

    //   if (isScrolling || isAnimating) return;

    //   const direction = e.deltaY > 0 ? 1 : -1;
    //   const currentScroll = window.scrollY;
    //   const nextScroll = currentScroll + direction * scrollDistance;

    //   isScrolling = true;
    //   isAnimating = true;

    //   gsap.to(window, {
    //     scrollTo: nextScroll,
    //     duration: 0,
    //     ease: "power3.inOut",
    //     onComplete: () => {
    //       isScrolling = false;
    //       setTimeout(() => {
    //         isAnimating = false;
    //       }, 300);
    //     },
    //   });
    // });

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    let allIndex: number[] = [];
    let allIndex2: number[] = [];

    slides.forEach((slide, index) => {
      const slideElement = slide as HTMLElement;
      const initialZ = getInitalTranslateZ(slideElement);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const scrollingDown = self.direction > 0;
          const zIncrement = progress * 13500;
          const currentZ = initialZ + zIncrement;

          let opacity;

          if (currentZ > -1500) {
            opacity = mapRange(currentZ, -1500, 0, 0.5, 1);
          } else {
            opacity = mapRange(currentZ, -3000, -1500, 0, 0.5);
          }

          slideElement.style.opacity = opacity.toString();

          slideElement.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;

          if (currentZ < 450) {
            gsap.to(activesSlideImages[index] as HTMLElement, 1, {
              opacity: 1,
              ease: "power3.out",
            });
          } else {
            gsap.to(activesSlideImages[index] as HTMLElement, 1, {
              opacity: 0,
              ease: "power3.out",
            });
          }

          const activeSlideDom = activesSlideImages[index] as HTMLElement;
          const activeSlideOpacity = Number(activeSlideDom.style.opacity);

          if (scrollingDown) {
            if (activeSlideOpacity === 1) {
              allIndex.push(index);
            } else {
              allIndex = allIndex.filter((i) => i !== index);
            }
            if (allIndex.length > 1) {
              const maxIndex = Math.max(...allIndex);
              currentActiveIndexRef.current = maxIndex;
            }
          } else {
            if (activeSlideOpacity < 0.7 && activeSlideOpacity > 0.3) {
              allIndex2.push(index);
            } else {
              allIndex2 = allIndex2.filter((i) => i !== index);
            }
            if (allIndex2.length > 1) {
              const minIndex = Math.min(...allIndex2);
              currentActiveIndexRef.current = minIndex;
            }
          }

          if (
            audioRef.current &&
            prevIndexRef.current !== currentActiveIndexRef.current
          ) {
            prevIndexRef.current = currentActiveIndexRef.current;
            playAudioHandler(currentActiveIndexRef.current);
          }
        },
      });
    });
  };

  useEffect(() => {
    setTimeout(() => {
      initializeScrollAnimations();
    }, 100);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[800vh]">
      <audio ref={audioRef} className="hidden" />
      <div
        onClick={() => navigate("/")}
        className="fixed top-5 left-5 size-6 md:size-10 text-white cursor-pointer hover:text-gray-400 transition-all duration-150 z-50"
      >
        <Home className="size-6 md:size-10" />
      </div>
      <div
        onClick={() => {
          if (audioRef.current) {
            const muted = audioRef.current.muted;
            audioRef.current.muted = !muted;
            setIsMuted(!muted);
          }
        }}
        className="fixed top-5 right-5 size-6 md:size-10 text-white cursor-pointer hover:text-gray-400 transition-all duration-150 z-50"
      >
        {isMuted ? (
          <VolumeOff className="size-6 md:size-10 text-red-400" />
        ) : (
          <Volume2 className="size-6 md:size-10" />
        )}
      </div>

      <div className="active-slide fixed top-0 left-0 w-full h-full overflow-hidden bg-black opacity-35 z-[-1]">
        {Array.from({ length: 10 }).map((_, index) => (
          <img
            key={index}
            src={`/cover-images/${index + 1}.jpg`}
            alt="Image Background"
            className="absolute scale-115 blur-[10px] w-full h-full object-cover"
          />
        ))}
      </div>

      <div
        ref={sliderRef}
        className="fixed top-0 left-0 w-[100vw] h-[100vh] overflow-hidden"
        style={{ perspective: "750px", transformStyle: "preserve-3d" }}
      >
        {imageDetails.map((image, index) => (
          <div
            key={index}
            className={cn(
              "slide",
              "absolute w-[200px] h-[250px] md:w-[400px] md:h-[500px] opacity-0 overflow-hidden top-[50%] translate-x-[-50%] translate-y-[-50%]",
              index % 2 === 0
                ? "left-[40%] md:left-[30%]"
                : "left-[60%] md:left-[70%]"
            )}
            style={{ transform: `translateZ(${index * 1500 - 13500}px)` }}
          >
            <p className="text-white text-2xl font-bold text-uppercase text-right line-height-1.5 mb-1.5">
              {image.artist}
            </p>
            <p className="text-sx text-zinc-400 font-semibold text-right mb-2">
              {image.album}．{image.year}
            </p>
            <img src={`/cover-images/${index + 1}.jpg`} alt="Image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
