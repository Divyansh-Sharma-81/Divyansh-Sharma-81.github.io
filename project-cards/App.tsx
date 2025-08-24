import React, { useState, useRef, useEffect } from 'react';
import DressifyCard from './components/DressifyCard';
import AIShiroCard from './components/AIShiroCard';
import MosaicCard from './components/MosaicCard';
import ReefChatCard from './components/ReefChatCard';
import SatyaCard from './components/SatyaCard';
import ConferenceAgentCard from './components/ConferenceAgentCard';
import ChiSquareXCard from './components/ChiSquareXCard';
import MiniSideProjectsCard from './components/MiniSideProjectsCard';

const ArrowButton: React.FC<{ direction: 'left' | 'right'; onClick: () => void; disabled: boolean }> = ({ direction, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center transition-all duration-300 hover:bg-white/10 disabled:opacity-0 disabled:pointer-events-none ${direction === 'left' ? '-left-6' : '-right-6'}`}
        aria-label={direction === 'left' ? 'Scroll left' : 'Scroll right'}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {direction === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
        </svg>
    </button>
);

const CardCarousel: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const cardComponents = [
        <DressifyCard />,
        <AIShiroCard />,
        <MosaicCard />,
        <ReefChatCard />,
        <SatyaCard />,
        <ConferenceAgentCard />,
        <ChiSquareXCard />,
        <MiniSideProjectsCard />
    ];

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setIsAtStart(scrollLeft < 10);
            setIsAtEnd(scrollWidth - scrollLeft - clientWidth < 10);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = (scrollContainerRef.current.clientWidth / 2);
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto relative">
             <div ref={scrollContainerRef} className="flex gap-8 overflow-x-auto p-4 snap-x snap-mandatory no-scrollbar">
                {cardComponents.map((CardComponent, index) => (
                    <div key={index} className="snap-center shrink-0">
                        {CardComponent}
                    </div>
                ))}
            </div>
            <ArrowButton direction="left" onClick={() => scroll('left')} disabled={isAtStart} />
            <ArrowButton direction="right" onClick={() => scroll('right')} disabled={isAtEnd} />
        </div>
    );
};


const App: React.FC = () => {
  return (
    <main className="bg-[#0a0a0a] min-h-screen flex items-center justify-center p-4 font-sans overflow-hidden">
      <CardCarousel />
    </main>
  );
};

export default App;
