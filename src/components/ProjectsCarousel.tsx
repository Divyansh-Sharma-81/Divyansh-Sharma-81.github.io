import React, { useRef, useState, useEffect } from 'react';

// Import all project cards
import AIRAACard from './project-cards/AIRAACard';
import AIShiroCard from './project-cards/AIShiroCard';
import MosaicCard from './project-cards/MosaicCard';
import ReefChatCard from './project-cards/ReefChatCard';
import SatyaCard from './project-cards/SatyaCard';
import ConferenceAgentCard from './project-cards/ConferenceAgentCard';
import ChiSquareXCard from './project-cards/ChiSquareXCard';
import MiniSideProjectsCard from './project-cards/MiniSideProjectsCard';

const ProjectsCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const cardComponents = [
    <AIRAACard key="airaa" />,
    <AIShiroCard key="aishiro" />,
    <MosaicCard key="mosaic" />,
    <ReefChatCard key="reefchat" />,
    <SatyaCard key="satya" />,
    <ConferenceAgentCard key="conference" />,
    <ChiSquareXCard key="chisquare" />,
    <MiniSideProjectsCard key="miniprojects" />
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // Only update state if container has valid dimensions
      if (scrollWidth > 0 && clientWidth > 0) {
        setIsAtStart(scrollLeft < 10);
        setIsAtEnd(scrollWidth - scrollLeft - clientWidth < 10);
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth / 2;
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
      
      // Defer initial check until after DOM is fully rendered
      const rafId = requestAnimationFrame(() => {
        // Double RAF to ensure layout is complete
        requestAnimationFrame(() => {
          handleScroll();
        });
      });
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        cancelAnimationFrame(rafId);
      };
    }
  }, []);

  return (
    <div className="projects-carousel-container">
      <button 
        className="carousel-arrow carousel-arrow--left" 
        onClick={() => scroll('left')} 
        disabled={isAtStart}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>
      
      <div 
        ref={scrollContainerRef} 
        className="projects-scroll-container"
      >
        {cardComponents.map((CardComponent, index) => (
          <div key={index} className="flex-shrink-0">
            {CardComponent}
          </div>
        ))}
      </div>
      
      <button 
        className="carousel-arrow carousel-arrow--right" 
        onClick={() => scroll('right')} 
        disabled={isAtEnd}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default ProjectsCarousel;