
import React, { useRef, useState } from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "./components/DraggableCard";

const POLAROIDS = [
    {
      title: "Arctic Fox",
      image: "https://picsum.photos/seed/fox/256/256",
      className: "absolute top-[15%] left-[20%] rotate-[-8deg] z-10",
    },
    {
      title: "Mountain Cabin",
      image: "https://picsum.photos/seed/cabin/256/256",
      className: "absolute top-[40%] left-[25%] rotate-[3deg] z-20",
    },
    {
      title: "Coastal Highway",
      image: "https://picsum.photos/seed/road/256/256",
      className: "absolute top-[5%] left-[45%] rotate-[10deg] z-10",
    },
    {
      title: "Misty Forest",
      image: "https://picsum.photos/seed/forest/256/256",
      className: "absolute top-[35%] left-[55%] rotate-[-5deg] z-20",
    },
    {
      title: "Downtown at Night",
      image: "https://picsum.photos/seed/city/256/256",
      className: "absolute top-[20%] right-[20%] rotate-[12deg] z-10",
    },
    {
      title: "Sahara Dunes",
      image: "https://picsum.photos/seed/desert/256/256",
      className: "absolute top-[45%] left-[40%] rotate-[-2deg] z-30",
    },
    {
      title: "Lakeside Pier",
      image: "https://picsum.photos/seed/lake/256/256",
      className: "absolute top-[8%] left-[30%] rotate-[4deg] z-20",
    },
  ];

interface PolaroidContentProps {
  image: string;
  title: string;
}

const PolaroidContent: React.FC<PolaroidContentProps> = ({ image, title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full cursor-grab active:cursor-grabbing">
      <div className="bg-white p-3 pb-5 rounded-sm shadow-xl transform transition-transform hover:scale-105">
        <img
          src={image}
          alt={title}
          draggable={false}
          className="pointer-events-none h-56 w-56 object-cover select-none"
        />
        <h3 className="mt-4 text-center text-lg font-semibold text-neutral-800 font-serif tracking-wide">
          {title}
        </h3>
      </div>
    </div>
  );
};

function App() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey(prevKey => prevKey + 1);
  };

  return (
    <main className="dark-radial-background text-white min-h-screen flex flex-col items-center justify-center p-4">
       <div className="text-center mb-6 select-none">
          <h1 className="text-4xl font-bold text-gray-300 md:text-6xl">
            Polaroid Memories
          </h1>
          <p className="mt-2 max-w-md text-lg text-gray-500">
            An interactive collection of moments. Drag and toss them around.
          </p>
        </div>

      <div
        ref={constraintsRef}
        className="relative w-full max-w-6xl h-[70vh] rounded-2xl bg-black/20 backdrop-blur-sm border border-gray-800 shadow-2xl"
      >
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 z-50 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          aria-label="Reset card positions"
        >
          Reset
        </button>
        <DraggableCardContainer className="w-full h-full">
          {POLAROIDS.map((item) => (
            <DraggableCardBody 
              key={`${item.title}-${resetKey}`} 
              containerRef={constraintsRef}
              className={`${item.className} !bg-transparent !shadow-none !p-0 !min-h-0 !w-auto !h-auto`}
            >
              <PolaroidContent image={item.image} title={item.title} />
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </div>
    </main>
  );
}

export default App;
