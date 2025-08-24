import React, { useState, useEffect, useRef } from 'react';
import type { Ball, ThemeColors } from './types';

// THEME AND TITLE ARE NOW HARDCODED HERE
const theme: ThemeColors = { main: '#ef4444', glow: '#ef4444', text: '#fca5a5', pillBg: 'rgba(239, 68, 68, 0.1)', pillText: '#f87171', gradientFrom: '#f87171', gradientTo: '#ef4444', gridCell: 'rgba(252, 165, 165, 0.07)', bgColor: '#1f0d0d' };
const title = "Conference Agent";

interface AnimatedGridProps {
    children: React.ReactNode;
}
const AnimatedGrid: React.FC<AnimatedGridProps> = ({ children }) => {
    const createInitialBalls = (): Ball[] => {
        const initialBalls: Ball[] = [];
        const now = Date.now();
        for (let i = 0; i < 3; i++) {
            initialBalls.push({
                id: now + Math.random() + i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                vx: (Math.random() - 0.5) * 30,
                vy: (Math.random() - 0.5) * 30,
                size: 12,
                spawnTime: now,
            });
        }
        return initialBalls;
    };

    const [balls, setBalls] = useState<Ball[]>(() => createInitialBalls());
    const lastSpawnTimeRef = useRef<number>(Date.now());
    const animationFrameIdRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);

    useEffect(() => {
        const animate = (timestamp: number) => {
            if (lastTimestampRef.current === null) {
                lastTimestampRef.current = timestamp;
                animationFrameIdRef.current = requestAnimationFrame(animate);
                return;
            }
            
            const deltaTime = timestamp - lastTimestampRef.current;
            lastTimestampRef.current = timestamp;

            setBalls(prevBalls => {
                let newBalls = [...prevBalls];
                const now = Date.now();

                if (now - lastSpawnTimeRef.current > 1500) {
                    lastSpawnTimeRef.current = now;
                    newBalls.push({
                        id: now + Math.random(),
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        vx: (Math.random() - 0.5) * 30,
                        vy: (Math.random() - 0.5) * 30,
                        size: 12,
                        spawnTime: now,
                    });
                }

                const dtSeconds = deltaTime / 1000;

                return newBalls
                    .map(ball => {
                        let newX = ball.x + ball.vx * dtSeconds;
                        let newY = ball.y + ball.vy * dtSeconds;
                        let newVx = ball.vx;
                        let newVy = ball.vy;

                        if (newX <= 0 || newX >= 100) { newVx *= -1; newX = Math.max(0, Math.min(100, newX)); }
                        if (newY <= 0 || newY >= 100) { newVy *= -1; newY = Math.max(0, Math.min(100, newY)); }
                        
                        return { ...ball, x: newX, y: newY, vx: newVx, vy: newVy };
                    })
                    .filter(ball => now - ball.spawnTime < 4000);
            });
            
            animationFrameIdRef.current = requestAnimationFrame(animate);
        };

        animationFrameIdRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
            lastTimestampRef.current = null;
        };
    }, []);

    const gridCellSvg = `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="30" height="30" rx="6" fill="${theme.gridCell}" /></svg>`;
    const backgroundImageUrl = `url("data:image/svg+xml,${encodeURIComponent(gridCellSvg)}")`;

    return (
        <div className="relative w-full h-56 rounded-xl overflow-hidden p-4 flex flex-col justify-between" 
            style={{ backgroundColor: theme.bgColor, backgroundImage: backgroundImageUrl, backgroundSize: '2.5rem 2.5rem' }}>
            {balls.map((ball) => (
                <div key={ball.id} className="absolute bg-white/10 rounded-full animate-fade-in-out"
                    style={{ left: `${ball.x}%`, top: `${ball.y}%`, width: `${ball.size}px`, height: `${ball.size}px`, transform: 'translate(-50%, -50%)', boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.05)' }} />
            ))}
            <div className="relative z-10 flex flex-col justify-between h-full">{children}</div>
        </div>
    );
};

const CardIcon = () => ( <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="text-white"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> );
const NextJsIcon = () => (<svg height="12" viewBox="0 0 128 128" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M64 0C28.653 0 0 28.653 0 64s28.653 64 64 64 64-28.653 64-64S99.347 0 64 0zm0 119.556C32.943 119.556 8.444 95.057 8.444 64S32.943 8.444 64 8.444 119.556 32.943 119.556 64 95.057 119.556 64 119.556z" /><path d="M85.738 41.22H68.824v44.44h8.445V57.697l13.511 27.963h9.651V41.22h-8.445v27.289L85.738 41.22zM42.262 85.66V41.22h20.48v8.445H50.707v11.85h10.283v8.444H50.707v15.701h12.035v8.445H42.262z" /></svg>);
const TailwindIcon = () => (<svg height="10" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 0.25c-8.75 0-15.75 7-15.75 15.75s7 15.75 15.75 15.75c8.75 0 15.75-7 15.75-15.75s-7-15.75-15.75-15.75z m-4.725 18.001c-1.575-0.787-2.625-2.1-3.675-3.675-0.787-1.312-0.525-2.362 0.787-2.625 1.050-0.263 2.1 0.263 2.887 1.050 1.575 1.575 3.15 3.15 4.725 4.725 0.787 0.787 0.787 2.1 0 2.887s-2.1 0.787-2.887 0c-0.525-0.525-1.050-1.050-1.575-1.575-0.263-0.263-0.525-0.263-0.787-0.263-0.263 0-0.525 0-0.787 0.263z m9.45-5.25c-1.575-0.787-2.625-2.1-3.675-3.675-0.787-1.312-0.525-2.362 0.787-2.625 1.050-0.263 2.1 0.263 2.887 1.050 1.575 1.575 3.15 3.15 4.725 4.725 0.787 0.787 0.787 2.1 0 2.887s-2.1 0.787-2.887 0c-0.525-0.525-1.050-1.050-1.575-1.575s-0.525-0.263-0.787-0.263c-0.263 0-0.525 0-0.787 0.263z" /></svg>);
const TypeScriptIcon = () => (<svg height="12" viewBox="0 0 128 128" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h128v128H0z" fill="#007ACC" /><path d="M23.111 20.333h81.778v38.222H79.333v49.111H48.667V58.556H23.111V20.333z" fill="#fff" /><path d="M84.444 93.333a14.222 14.222 0 1 0 28.445 0 14.222 14.222 0 0 0-28.445 0z" fill="#fff" /></svg>);
const AIIcon = () => (<svg height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="2" width="10" height="4" rx="1" ry="1"></rect><path d="M4 6h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"></path><path d="M9 12h6"></path></svg>);
const ExternalLinkIcon = () => (<svg height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>);

interface TechPillProps { icon: React.ReactNode; label: string; }
const TechPill: React.FC<TechPillProps> = ({ icon, label }) => (<div className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium glass-panel glass-panel--chat-element" style={{ backgroundColor: theme.pillBg, color: theme.pillText }}>{icon}<span>{label}</span></div>);


const ConferenceAgentCard: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isHovered ? `0 25px 50px -12px ${theme.glow}40` : '0 10px 15px -3px rgba(0,0,0,0.5), 0 4px 6px -2px rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease-in-out',
    };

    return (
        <div className="w-80 rounded-2xl p-4 text-white border border-white/10 glass-panel glass-panel--button" style={hoverStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <AnimatedGrid>
                <div /> 
                <div className="flex items-center justify-center">
                    <div className="w-24 h-24 rounded-3xl flex items-center justify-center ring-1 ring-white/10"
                        style={{ background: `linear-gradient(to bottom right, ${theme.gradientFrom}, ${theme.gradientTo})`, boxShadow: `0 10px 15px -3px ${theme.main}33` }}>
                        <CardIcon />
                    </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <span className="text-sm font-medium bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full glass-panel glass-panel--chat-element" style={{ color: theme.text }}>AI Agent</span>
                    <span className="text-sm font-medium bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full glass-panel glass-panel--chat-element" style={{ color: theme.text }}>Scheduling</span>
                </div>
            </AnimatedGrid>

            <div className="pt-5 pb-2">
                <h2 className="text-2xl font-bold text-gray-50">{title}</h2>
                <p className="text-gray-400 mt-1.5 text-base leading-relaxed">An intelligent AI agent for organizing and managing conference schedules and logistics.</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
                <TechPill icon={<NextJsIcon />} label="NextJS" />
                <TechPill icon={<TailwindIcon />} label="TailwindCSS" />
                <TechPill icon={<TypeScriptIcon />} label="TypeScript" />
                <TechPill icon={<AIIcon />} label="AI" />
            </div>

            <div className="mt-6 flex justify-between items-center">
                <a href="#" className="font-semibold transition-colors" style={{ color: theme.text }}>View Details</a>
                <a href="#" className="transition-colors" style={{ color: theme.text }}><ExternalLinkIcon /></a>
            </div>
        </div>
    );
};

export default ConferenceAgentCard;