import { cn } from "@/lib/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowBigLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const imageDetails = [
  {
    artist: "Lany",
    album: "gg bb xx",
    year: "2021",
  },
  {
    artist: "Tai verdes",
    album: "TV",
    year: "2021",
  },
  {
    artist: "Lauv",
    album: "All 4 Nothing",
    year: "2021",
  },
  {
    artist: "Clairo",
    album: "Sling",
    year: "2021",
  },
  {
    artist: "Gareth.T",
    album: "Boyfriend Material",
    year: "2021",
  },
  {
    artist: "Tessa Violet",
    album: "Crush",
    year: "2018",
  },
  {
    artist: "Keshi",
    album: "Gabriel",
    year: "2022",
  },
  {
    artist: "Billie Eilish",
    album: "Happier Than Ever",
    year: "2021",
  },

  {
    artist: "Dua Lipa",
    album: "Don't Start Now",
    year: "2019",
  },
  {
    artist: "Snoop Dogg",
    album: "Tha Blue Carpet Treatment",
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

  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 1,
        behavior: "smooth",
      });
    }, 100);

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
    }

    const slides = document.querySelectorAll(".slide");

    const activesSlideImages = gsap.utils.toArray(".active-slide img");

    gsap.registerPlugin(ScrollTrigger);

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
        },
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[800vh]">
      <div
        onClick={() => navigate(-1)}
        className="fixed top-5 left-5 size-10 text-white cursor-pointer hover:text-gray-400 hover:rotate-45 transition-all duration-150 z-50"
      >
        <ArrowBigLeft className="size-10" />
      </div>

      <div className="active-slide fixed top-0 left-0 w-full h-full overflow-hidden bg-black opacity-35 z-[-1]">
        {Array.from({ length: 10 }).map((_, index) => (
          <img
            key={index}
            src={`/search/${index + 1}.jpg`}
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
              "absolute w-[400px] h-[500px] opacity-0 overflow-hidden top-[50%] translate-x-[-50%] translate-y-[-50%]",
              index % 2 === 0 ? "left-[30%]" : "left-[70%]"
            )}
            style={{ transform: `translateZ(${index * 1500 - 13500}px)` }}
          >
            <p className="text-white text-2xl font-bold text-uppercase text-right line-height-1.5 mb-1.5">
              {image.artist}
            </p>
            <p className="text-sx text-zinc-400 font-semibold text-right mb-2">
              {image.album}．{image.year}
            </p>
            <img src={`/search/${index + 1}.jpg`} alt="Image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
