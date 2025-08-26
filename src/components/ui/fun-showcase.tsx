import React, { useRef, useState, useEffect } from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "./draggable-card";

// Personal fun cards data - adapted for Divyansh's interests
const FUN_CARDS = [
  {
    title: "Drumming",
    image: "https://i.redd.it/t96n3n9eyhld1.jpeg",
    description: "Love creating beats and jamming to music in my free time 🎵",
    className: "absolute top-[10%] left-[15%] rotate-[-8deg] z-10",
  },
  {
    title: "3D Designer",
    image: "./assets/3d_design.jpg", 
    description: "Started with 3D design before getting into AI development 🎨",
    className: "absolute top-[30%] left-[25%] rotate-[5deg] z-20",
  },
  {
    title: "Brewing Coffee",
    image: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2024-10/241003-espresso-machines-oo-main-6de618.jpg",
    description: "Love trying out different different flavours of coffee whenever I get the chance",
    className: "absolute top-[5%] left-[50%] rotate-[12deg] z-15",
  },
  {
    title: "Long Drives", 
    image: "https://www.team-bhp.com/forum/attachments/travelogues/465944d1291816088-around-india-7-days-gq-drive-img_4045.jpg",
    description: "Passionate about going to road trips and long drives while jamming to good music!! ",
    className: "absolute top-[40%] left-[60%] rotate-[-3deg] z-25",
  },
  {
    title: "Occasional Skating",
    image: "https://preview.redd.it/is-this-still-good-to-skate-board-is-3-weeks-old-v0-xaqyqfz7focc1.jpeg?width=1080&crop=smart&auto=webp&s=9c50f4f9cc79d341687051ce2deff575b23fb299", 
    description: "Head out during some evenings with my board. Was an active skateboarder during high school and even broke 2 boards trying out some stunts :)",
    className: "absolute top-[15%] right-[15%] rotate-[8deg] z-20",
  },
  {
    title: "Puzzles and books",
    image: "https://static01.nyt.com/images/2024/07/01/multimedia/01SCI-RUBIKS-04-gvjq/01SCI-RUBIKS-04-gvjq-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
    description: "Solving the rubiks cube or reading a non fiction when I'm free is how I chill nowadays.",
    className: "absolute top-[45%] left-[40%] rotate-[-6deg] z-30",
  },
  {
    title: "Occasional Gaming",
    image: "https://bizdaddy.ae/wp-content/uploads/2023/08/pexels-photo-3977908-3-768x512.jpeg",
    description: "Hop onto some old saves of Cyberpunk or Valo sessions with the boys every month or two. Was an active console player during high school. Fav game: God of war 3 hands down",
    className: "absolute top-[10%] left-[40%] rotate-[-6deg] z-30",
  },
  
];

interface PolaroidContentProps {
  image: string;
  title: string;
  description: string;
}

const PolaroidContent: React.FC<PolaroidContentProps> = ({ image, title, description }) => {
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

interface FunShowcaseProps {
  className?: string;
}

export const FunShowcase: React.FC<FunShowcaseProps> = ({ className }) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);
  const [isActivated, setIsActivated] = useState(false);

  const handleReset = () => {
    setResetKey(prevKey => prevKey + 1);
  };

  const handleActivateFun = () => {
    setIsActivated(true);
    // Small delay to ensure DOM is ready, then trigger reset to set up cards
    setTimeout(() => {
      handleReset();
    }, 50);
  };

  return (
    <div className={`w-full ${className || ''}`}>
      {/* Interactive Container - Full area for dragging */}
      <div
        ref={constraintsRef}
        className="relative w-full max-w-6xl h-[70vh] mx-auto rounded-2xl shadow-2xl"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: '1px solid var(--glass-border)',
        }}
      >
        {/* Initial Activation Button - Centered */}
        {!isActivated && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <button
              onClick={handleActivateFun}
              className="px-8 py-4 text-xl font-bold text-white rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 animate-pulse"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4)',
              }}
            >
              Here's What I Do For Fun! 🎉
            </button>
          </div>
        )}

        {/* Reset Button - Only visible after activation */}
        {isActivated && (
          <button
            onClick={handleReset}
            className="absolute top-4 right-4 z-50 px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
            style={{
              background: '#4f46e5',
              backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
            aria-label="Reset card positions"
          >
            Reset
          </button>
        )}

        {/* Draggable Cards Container - Only render after activation */}
        {isActivated && (
          <DraggableCardContainer className="w-full h-full">
            {FUN_CARDS.map((item) => (
              <DraggableCardBody 
                key={`${item.title}-${resetKey}`} 
                containerRef={constraintsRef}
                className={`${item.className} !bg-transparent !shadow-none !p-0 !min-h-0 !w-auto !h-auto`}
              >
                <PolaroidContent 
                  image={item.image} 
                  title={item.title} 
                  description={item.description}
                />
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        )}
      </div>
    </div>
  );
};