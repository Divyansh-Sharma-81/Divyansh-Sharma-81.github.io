
import React, { useEffect, useRef, useState, memo } from "react";
// @ts-ignore - Using esm.sh for motion/react dependency
import { motion } from "https://esm.sh/motion/react";
import { twMerge } from "tailwind-merge";
import { cn } from "../../../lib/utils";
 
export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement | any>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
 
  useEffect(() => {
    if (cardRef.current) {
      const { left, width: localWidth } =
        cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(localWidth);
    }
    const handleResize = () => {
        if (cardRef.current) {
            const { left, width: localWidth } =
            cardRef.current.getBoundingClientRect();
            setLeft(left);
            setLocalWidth(localWidth);
        }
    };
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    }
  }, []);
 
  function mouseMoveHandler(event: any) {
    event.preventDefault();
 
    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }
 
  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }
  function mouseEnterHandler() {
    setIsMouseOver(true);
  }
  function touchMoveHandler(event: React.TouchEvent<HTMLDivElement>) {
    event.preventDefault();
    const clientX = event.touches[0]!.clientX;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }
 
  const rotateDeg = (widthPercentage - 50) * 0.1;
  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      className={cn(
        "glass-panel glass-panel--chat-element rounded-lg p-8 relative overflow-hidden",
        className
      )}
      style={{
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))',
        WebkitBackdropFilter: 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))',
        border: '1px solid var(--glass-border)',
      }}
    >
      {children}
 
      <div className="h-40 relative flex items-center overflow-hidden">
        <motion.div
          style={{
            width: "100%",
          }}
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : {
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute z-20 will-change-transform"
          style={{
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))',
            WebkitBackdropFilter: 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))'
          }}
        >
          <p
            style={{
              textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
              color: 'var(--text-primary)'
            }}
            className="text-base sm:text-[3rem] py-10 font-bold"
          >
            {revealText}
          </p>
        </motion.div>
        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="h-40 w-[8px] absolute z-50 will-change-transform"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--text-secondary), transparent)'
          }}
        ></motion.div>
 
        <div className=" overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <p 
            className="text-base sm:text-[3rem] py-10 font-bold"
            style={{ color: 'var(--text-muted)' }}
          >
            {text}
          </p>
          <MemoizedStars />
        </div>
      </div>
    </div>
  );
};
 
export const TextRevealCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 
      className={twMerge("text-lg mb-2", className)}
      style={{ color: 'var(--text-primary)' }}
    >
      {children}
    </h2>
  );
};
 
export const TextRevealCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p 
      className={twMerge("text-sm", className)}
      style={{ color: 'var(--text-secondary)' }}
    >
      {children}
    </p>
  );
};
 
const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(80)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        ></motion.span>
      ))}
    </div>
  );
};
 
export const MemoizedStars = memo(Stars);
