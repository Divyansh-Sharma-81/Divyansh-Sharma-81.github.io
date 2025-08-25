import React, { useRef, useState, useEffect } from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "./draggable-card";

// Personal fun cards data - adapted for Divyansh's interests
const FUN_CARDS = [
  {
    title: "Music Producer",
    image: "https://picsum.photos/seed/music/256/256",
    description: "Love creating beats and electronic music in my free time 🎵",
    className: "absolute top-[10%] left-[15%] rotate-[-8deg] z-10",
  },
  {
    title: "3D Designer",
    image: "https://picsum.photos/seed/3d/256/256", 
    description: "Started with 3D design before getting into AI development 🎨",
    className: "absolute top-[30%] left-[25%] rotate-[5deg] z-20",
  },
  {
    title: "Tech Explorer",
    image: "https://picsum.photos/seed/tech/256/256",
    description: "Always experimenting with the latest AI research papers 🔬",
    className: "absolute top-[5%] left-[50%] rotate-[12deg] z-15",
  },
  {
    title: "Product Builder", 
    image: "https://picsum.photos/seed/startup/256/256",
    description: "Passionate about building user-friendly AI-powered products 🚀",
    className: "absolute top-[40%] left-[60%] rotate-[-3deg] z-25",
  },
  {
    title: "IIT Kharagpur",
    image: "https://picsum.photos/seed/college/256/256", 
    description: "Currently pursuing Bachelor's from IIT Kharagpur 🎓",
    className: "absolute top-[15%] right-[15%] rotate-[8deg] z-20",
  },
  {
    title: "AI Research",
    image: "https://picsum.photos/seed/ai/256/256",
    description: "Building AI agents and pipelines at AIRAA.xyz 🤖",
    className: "absolute top-[45%] left-[40%] rotate-[-6deg] z-30",
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