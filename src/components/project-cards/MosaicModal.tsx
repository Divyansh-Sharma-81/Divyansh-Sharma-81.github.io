import React, { useState, useEffect, useRef } from 'react';

// Type for the animated balls
type Ball = {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    spawnTime: number;
};

// Theme for Mosaic's PM Dashboard (blue theme)
const theme = {
    gridCell: 'rgba(59, 130, 246, 0.1)', // blue-500 with 10% opacity
    bgColor: 'rgba(12, 20, 33, 0.5)',    // Dark blue background with transparency
    ballColor: 'rgba(96, 165, 250, 0.2)', // blue-400 with 20% opacity
    ballGlow: '0 0 15px 5px rgba(96, 165, 250, 0.1)' // blue-400 glow
};

// Icons from the project-showcase-card
const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const MosaicIcon: React.FC = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="text-black">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <path d="M9 9h.01M15 9h.01M9 15h6"></path>
        <path d="M3 12h18M12 3v18"></path>
    </svg>
);

const NextJsIcon: React.FC = () => (
    <svg width="16" height="16" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="64" fill="#6A0DAD" />
        <path d="M84.5 106.5V40H71V93.5L39.5 40H26.5V106.5H39.5V53L71 106.5H84.5Z" fill="white" />
        <path d="M102 40V106.5H115V40H102Z" fill="white" />
    </svg>
);

const TailwindIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TypeScriptIcon: React.FC = () => (
    <svg width="16" height="16" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#3178C6" />
        <path d="M64 96V78H48V66H80V78H64V96ZM80 50V36H48V50H58V62H68V50H80Z" fill="white" />
    </svg>
);

const AIIcon: React.FC = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 2L6.5 6.5L11 8L6.5 9.5L5 14L3.5 9.5L-1 8L3.5 6.5L5 2Z" transform="translate(14, 4)" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const DocumentIcon: React.FC = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ExternalLinkIcon: React.FC = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 3H21V9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 14L21 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// AnimatedGrid component for the hero section background
const AnimatedGrid: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [balls, setBalls] = useState<Ball[]>([]);
    const [gridAssembled, setGridAssembled] = useState(false);
    const [gridDimensions, setGridDimensions] = useState({ cols: 0, rows: 0, ready: false });

    const gridRef = useRef<HTMLDivElement>(null);
    const lastSpawnTimeRef = useRef<number>(Date.now());
    const animationFrameIdRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);

    // Effect for setting up the grid formation animation
    useEffect(() => {
        if (gridRef.current) {
            const { offsetWidth, offsetHeight } = gridRef.current;
            const cellSide = offsetHeight / 4;
            const cols = Math.round(offsetWidth / cellSide);
            const rows = 4;
            setGridDimensions({ cols, rows, ready: true });

            const totalAnimationTime = (cols + rows - 2) * 50 + 500;
            const timer = setTimeout(() => {
                setGridAssembled(true);
            }, totalAnimationTime);

            return () => clearTimeout(timer);
        }
    }, []);

    // Effect for the moving balls animation, starts after grid is assembled
    useEffect(() => {
        if (!gridAssembled) return;

        const createInitialBalls = (): Ball[] => {
            const initialBalls: Ball[] = [];
            const now = Date.now();
            for (let i = 0; i < 3; i++) {
                initialBalls.push({
                    id: now + Math.random() + i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    vx: (Math.random() - 0.5) * 20,
                    vy: (Math.random() - 0.5) * 20,
                    size: 12,
                    spawnTime: now,
                });
            }
            return initialBalls;
        };
        setBalls(createInitialBalls());

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
                        vx: (Math.random() - 0.5) * 20,
                        vy: (Math.random() - 0.5) * 20,
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
    }, [gridAssembled]);
    
    return (
        <div ref={gridRef} className="relative w-full h-full rounded-2xl overflow-hidden" style={{ backgroundColor: theme.bgColor, minHeight: '200px' }}>
            <div className="absolute inset-0 overflow-hidden">
                {gridDimensions.ready && (
                     <div 
                        className="grid w-full h-full gap-2"
                        style={{
                            gridTemplateColumns: `repeat(${gridDimensions.cols}, 1fr)`,
                            gridTemplateRows: `repeat(${gridDimensions.rows}, 1fr)`,
                            padding: '12px'
                        }}
                     >
                        {Array.from({ length: gridDimensions.cols * gridDimensions.rows }).map((_, index) => {
                            const row = Math.floor(index / gridDimensions.cols);
                            const col = index % gridDimensions.cols;
                            const delay = (row + col) * 50;
                            return (
                                <div
                                    key={index}
                                    className="opacity-0 animate-grid-fade-in rounded-lg"
                                    style={{ 
                                        animationDelay: `${delay}ms`,
                                        backgroundColor: theme.gridCell,
                                        minHeight: '30px'
                                    }}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
            
            {balls.map((ball) => (
                <div key={ball.id} className="absolute rounded-full"
                    style={{ 
                        left: `${ball.x}%`, 
                        top: `${ball.y}%`, 
                        width: `${ball.size}px`, 
                        height: `${ball.size}px`, 
                        transform: 'translate(-50%, -50%)', 
                        backgroundColor: theme.ballColor,
                        boxShadow: theme.ballGlow,
                    }} />
            ))}
            <div className="relative z-10 p-6 h-full">{children}</div>
        </div>
    );
};

interface MosaicModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MosaicModal: React.FC<MosaicModalProps> = ({ isOpen, onClose }) => {
    const achievements = [
        "Developed comprehensive KPI tracking system with real-time analytics",
        "Built intuitive roadmap visualization with drag-and-drop functionality",
        "Integrated cross-team collaboration features with 97% user satisfaction",
        "Deployed centralized PM hub serving product teams across multiple divisions"
    ];

    const technologies = [
        { name: "NextJS", icon: <NextJsIcon /> },
        { name: "TailwindCSS", icon: <TailwindIcon /> },
        { name: "TypeScript", icon: <TypeScriptIcon /> },
        { name: "AI", icon: <AIIcon /> }
    ];

    // Prevent body scrolling when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center font-sans text-white z-50" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <div className="bg-[#161616] rounded-2xl shadow-2xl shadow-black/50 p-8 relative overflow-hidden overflow-y-auto" style={{ width: '40vw', height: '96vh' }}>
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                >
                    <CloseIcon />
                </button>
                {/* Main Content Container - 90% width, centered, starts below close button */}
                <div style={{ 
                    width: '90%', 
                    height: 'calc(100% - 80px)', // Account for close button clearance
                    margin: '80px auto 0', // Top margin = close button height + padding
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem' // Increased spacing for better UX
                }}>

                    {/* Header Section - Title and Description with proper spacing */}
                    <div style={{ flex: '0 0 auto', marginBottom: '0rem' }}>
                        <h1 className="text-4xl font-bold text-white mb-4">Mosaic's PM Dashboard</h1>
                        <p className="text-gray-400 text-lg leading-relaxed">A central hub for product managers to track KPIs, roadmaps, and feature progress.</p>
                    </div>

                    {/* Hero Grid Section - Proper icon and tag positioning like original */}
                    <div style={{ flex: '0 0 30%', marginBottom: '0.5rem' }}>
                        <div className="rounded-2xl border border-blue-500/[0.3]" style={{ height: '100%' }}>
                            <AnimatedGrid>
                                <div className="relative flex flex-col h-full">
                                    {/* Icon in dead center of animation box */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/20" 
                                             style={{ 
                                                 width: 'calc(100% / 6)', 
                                                 height: 'calc(100%/ 3)',
                                                 display: 'flex',
                                                 alignItems: 'center',
                                                 justifyContent: 'center'
                                             }}>
                                            <MosaicIcon />
                                        </div>
                                    </div>
                                    {/* Tags in bottom third/lower half */}
                                    <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center pb-8">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-gray-800/50 text-gray-300 text-base font-semibold px-6 py-3 mx-2 rounded-full border border-gray-700 text-center" >Product Management</span>
                                            <span className="bg-gray-800/50 text-gray-300 text-base font-semibold px-6 py-3 mx-2 rounded-full border border-gray-700 text-center" >Dashboard</span>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedGrid>
                        </div>
                    </div>

                    {/* Content Section - Ends before button to prevent overlap */}
                    <div style={{ 
                        flex: '1 1 auto',
                        maxHeight: 'calc(100% - 120px)', // Reserve space for button
                        overflowY: 'auto',
                        paddingRight: '8px',
                        marginBottom: '6rem' // Extra space before button
                    }}
                    className="scrollable-content">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Project Objective */}
                            <section>
                                <h2 className="text-2xl font-bold mb-3 text-white" style={{marginBottom: '0.5rem'}}>Project Objective</h2>
                                <p className="text-gray-400 leading-relaxed text-base">
                                    Build a unified product management dashboard that centralizes KPI monitoring, roadmap planning, and feature tracking to streamline decision-making and team collaboration.
                                </p>
                            </section>

                            {/* Key Achievements */}
                            <section>
                                <h2 className="text-2xl font-bold mb-3 text-white" style={{marginBottom: '0.5rem'}}>Key Achievements</h2>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    {achievements.map((item, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <span className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                                            <span className="text-gray-400 leading-relaxed text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Technologies */}
                            <section>
                                <h2 className="text-2xl font-bold mb-4 text-white" style={{marginBottom: '0.5rem'}}>Technologies & Implementation</h2>
                                <p className="text-gray-400 leading-relaxed mb-12 text-base">
                                    Built with Next.js for performance, TypeScript for type safety, TailwindCSS for modern styling, and integrated comprehensive analytics tools for data-driven product decisions.
                                </p>
                                <div className="flex flex-wrap gap-4" style={{marginTop: '1rem'}}>
                                    {technologies.map((tech) => (
                                        <div key={tech.name} className="flex items-center gap-3 bg-[#2A2A2A]/80 border border-gray-700 px-6 py-4 rounded-lg" style={{marginRight: '0.1rem'}}>
                                            {tech.icon}
                                            <span className="text-gray-300 text-sm">{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Confidentiality Notice */}
                            <section className="bg-[#2A1F13] border border-yellow-600/50 rounded-lg p-6 flex items-start gap-5">
                                <div className="text-yellow-500 flex-shrink-0 mt-1">
                                    <DocumentIcon />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-3 text-lg">Project Confidentiality</h3>
                                    <p className="text-yellow-400 text-sm leading-relaxed">Can only share limited details due to proprietary technology</p>
                                </div>
                            </section>

                            {/* Impact & Results */}
                            <section>
                                <h2 className="text-2xl font-bold mb-4 text-white" style={{marginBottom: '0.5rem'}}>Impact & Results</h2>
                                <p className="text-gray-400 leading-relaxed text-base">
                                    Enhances product team efficiency by providing centralized visibility into metrics, reducing planning overhead by 75%, and enabling data-driven decisions through comprehensive analytics.
                                </p>
                            </section>
                        </div>
                    </div>

                    {/* Footer Section - Fixed at bottom */}
                    <div style={{ 
                        position: 'absolute', 
                        bottom: '2rem', 
                        left: '5%',
                        display: 'flex', 
                        justifyContent: 'flex-start' 
                    }}>
                        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-lg font-semibold text-white" >
                            <ExternalLinkIcon />
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MosaicModal;