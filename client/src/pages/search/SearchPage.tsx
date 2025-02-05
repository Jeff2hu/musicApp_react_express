import { cn } from "@/lib/utils";

const images = [
  "/search/1.jpg",
  "/search/2.jpg",
  "/search/3.jpg",
  "/search/4.jpg",
  "/search/5.jpg",
  "/search/6.jpg",
  "/search/7.jpg",
  "/search/8.jpg",
  "/search/9.jpg",
  "/search/10.jpg",
];

const imageDetails = [
  {
    image: "/search/1.jpg",
    artist: "Lany",
    year: "2021",
  },
  {
    image: "/search/2.jpg",
    artist: "Lauv",
    year: "2021",
  },
  {
    image: "/search/3.jpg",
    artist: "Tai verdes",
    year: "2021",
  },
  {
    image: "/search/4.jpg",
    artist: "Clairo",
    year: "2021",
  },
  {
    image: "/search/5.jpg",
    artist: "Gareth.T",
    year: "2021",
  },
  {
    image: "/search/6.jpg",
    artist: "Tessa Violet",
    year: "2021",
  },
  {
    image: "/search/7.jpg",
    artist: "Keshi",
    year: "2021",
  },
  {
    image: "/search/8.jpg",
    artist: "Billie Eilish",
    year: "2021",
  },
  {
    image: "/search/9.jpg",
    artist: "Dua Lipa",
    year: "2021",
  },
  {
    image: "/search/10.jpg",
    artist: "Snoop Dog",
    year: "2021",
  },
];

const SearchPage = () => {
  return (
    <div className="w-full h-800vh">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden bg-black opacity-35 z-[-1]">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Image Background"
            className="absolute transform-scale-115 filter blur-[10px]"
          />
        ))}
      </div>
      <div className="fixed top-0 left-0 w-100vw h-100vh preserve3d perspective-750 overflow-hidden">
        {imageDetails.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute w-[400px] h-[500px] overflow-hidden top-[50%]",
              index % 2 === 0 ? "left-[30%]" : "left-[50%]"
            )}
          >
            <p className="text-white text-2xl font-bold text-uppercase text-center line-height-1.5">
              {image.artist}
            </p>
            <p className="text-white text-xl font-semibold mb-5">
              {image.year}
            </p>
            <img src={image.image} alt="Image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
