
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
 
export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
 
  const beams = [
    { xPercent: 5, duration: 7, repeatDelay: 3, delay: 2 },
    { xPercent: 15, duration: 3, repeatDelay: 3, delay: 4 },
    { xPercent: 30, duration: 6, repeatDelay: 5, className: "h-6" },
    { xPercent: 50, duration: 5, repeatDelay: 10, delay: 4 },
    { xPercent: 70, duration: 8, repeatDelay: 2, className: "h-20" },
    { xPercent: 80, duration: 4, repeatDelay: 2, className: "h-12" },
    { xPercent: 95, duration: 6, repeatDelay: 4, delay: 2, className: "h-6" },
  ];
 
  return (
    <div
      ref={parentRef}
      className={cn(
        "h-full w-full bg-gradient-to-b from-neutral-950 to-neutral-800 relative flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {beams.map((beam, idx) => (
        <CollisionMechanism
          key={`beam-${idx}`}
          beamOptions={beam}
          parentRef={parentRef}
        />
      ))}
      {children}
    </div>
  );
};

interface CollisionMechanismProps {
    parentRef: React.RefObject<HTMLDivElement>;
    beamOptions?: {
      xPercent?: number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
}
 
const CollisionMechanism = React.forwardRef<HTMLDivElement, CollisionMechanismProps>(({ parentRef, beamOptions }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (parentRef.current) {
        const updateSize = () => {
            if (parentRef.current) {
                setParentSize({
                    width: parentRef.current.offsetWidth,
                    height: parentRef.current.offsetHeight,
                });
            }
        };
        
        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(parentRef.current);
        updateSize(); // Initial size

        return () => resizeObserver.disconnect();
    }
  }, [parentRef]);
 
  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        parentRef.current &&
        parentSize.height > 0 &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();
 
        if (beamRect.bottom >= parentRect.bottom - 5) { // Use parent bottom for collision
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = parentRect.height;
 
          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };
 
    const animationInterval = setInterval(checkCollision, 50);
 
    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, parentRef, parentSize.height]);
 
  useEffect(() => {
    if (collision.detected) {
      const resetTimeout = setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);

      return () => clearTimeout(resetTimeout);
    }
  }, [collision.detected]);

  if (parentSize.width === 0) {
    return null; // Don't render until we have parent dimensions
  }
  
  const xPosition = parentSize.width * ((beamOptions?.xPercent || 0) / 100);
 
  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        initial={{
          y: -100, // Start above the container
          x: xPosition,
          rotate: beamOptions?.rotate || 0,
        }}
        animate={{
          y: parentSize.height + 50, // Animate past the bottom of the container
          x: xPosition,
          rotate: beamOptions?.rotate || 0,
        }}
        transition={{
          duration: beamOptions?.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions?.delay || 0,
          repeatDelay: beamOptions?.repeatDelay || 0,
        }}
        className={cn(
          "absolute left-0 top-0 h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent",
          beamOptions?.className
        )}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});
 
CollisionMechanism.displayName = "CollisionMechanism";
 
const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: (Math.random() - 0.5) * 80,
    directionY: Math.random() * -50 - 10,
  }));
 
  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
        />
      ))}
    </div>
  );
};
