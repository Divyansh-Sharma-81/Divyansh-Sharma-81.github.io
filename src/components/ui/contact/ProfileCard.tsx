import React from 'react';
import CalendarIcon from './icons/CalendarIcon';
import LocationIcon from './icons/LocationIcon';
import CodeIcon from './icons/CodeIcon';

const techStack1 = [
    "Python, Next.js, TypeScript, Tailwind CSS",
    "Vercel AI SDK, Supabase, Prisma",
    "OpenAI, Mistral, Claude, Whisper",
    "Prompt engineering, fine-tuning",
];

const techStack2 = [
    "Weaviate, Pinecone, vector DBs",
    "Hugging Face Transformers",
    "Tool routing, calling, RAG",
    "Hackathons + AI agent workflows",
];

const ProfileCard: React.FC = () => {
    const [showMore, setShowMore] = React.useState(false);

    return (
        <div 
            className="glass-panel glass-panel--chat-element rounded-2xl"
            style={{
                backgroundColor: 'var(--glass-bg)',
                backdropFilter: 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))',
                WebkitBackdropFilter: 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))',
                border: '1px solid var(--glass-border)',
                padding: 'calc(var(--spacing-lg) * 1.25)', // Proportional padding - 1.25x large spacing
            }}
        >
            {/* Header Section - Profile Info + Live Status */}
            <header 
                className="flex items-center justify-between"
                style={{
                    marginBottom: 'calc(var(--spacing-lg) * 1.5)', // 1.5x large spacing for section separation
                    gap: 'var(--spacing-md)',
                    flexWrap: 'wrap', // Allow wrapping on very small screens
                }}
            >
                <div 
                    className="flex items-center"
                    style={{
                        gap: 'calc(var(--spacing-md) * 1.2)', // Slightly larger gap for header elements
                    }}
                >
                    <img 
                        src="/assets/divyansh.png" 
                        alt="Divyansh Sharma" 
                        className="rounded-full shadow-md"
                        style={{ 
                            borderColor: 'var(--glass-border)',
                            border: '3px solid var(--glass-border)', // Thinner border
                            width: 'calc(var(--spacing-xl) * 2.5)', // Proportional sizing - 2.5x xl spacing
                            height: 'calc(var(--spacing-xl) * 2.5)',
                        }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--spacing-xs) * 0.5)' }}>
                        <h1 
                            className="font-bold"
                            style={{ 
                                color: 'var(--text-primary)', 
                                fontSize: 'calc(1rem + 0.75vw)', // Responsive font size
                                lineHeight: '1.2',
                                margin: 0,
                            }}
                        >
                            Divyansh Sharma
                        </h1>
                        <p 
                            style={{ 
                                color: 'var(--text-secondary)', 
                                fontSize: 'calc(0.875rem + 0.15vw)', // Responsive secondary text
                                margin: 0,
                            }}
                        >
                            Available for Opportunities
                        </p>
                    </div>
                </div>
                <div 
                    className="flex items-center glass-panel glass-panel--button rounded-full"
                    style={{
                        color: '#22c55e',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        padding: 'calc(var(--spacing-xs) * 0.75) var(--spacing-sm)', // Proportional padding
                        gap: 'calc(var(--spacing-xs) * 0.75)',
                        fontSize: 'calc(0.8rem + 0.1vw)', // Responsive text
                        fontWeight: '500',
                        flexShrink: 0, // Prevent shrinking
                    }}
                >
                    <span 
                        className="rounded-full" 
                        style={{ 
                            backgroundColor: '#22c55e',
                            width: 'calc(var(--spacing-xs) * 0.75)',
                            height: 'calc(var(--spacing-xs) * 0.75)',
                        }}
                    ></span>
                    Live
                </div>
            </header>
            
            {/* Info Grid Section - Duration + Location */}
            <div 
                className="grid grid-cols-1 md:grid-cols-2"
                style={{
                    gap: 'calc(var(--spacing-lg) * 1.5) calc(var(--spacing-xl) * 1.25)', // row-gap column-gap
                    marginBottom: 'calc(var(--spacing-lg) * 1.75)', // Section separation
                }}
            >
                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'calc(var(--spacing-sm) * 0.75)', // Internal spacing within info item
                    }}
                >
                    <div 
                        className="flex items-center"
                        style={{
                            gap: 'calc(var(--spacing-sm) * 0.8)', // Icon to text gap
                        }}
                    >
                        <CalendarIcon 
                            style={{ 
                                color: '#6366f1', 
                                width: 'calc(var(--spacing-md) * 1.25)', // Proportional icon size
                                height: 'calc(var(--spacing-md) * 1.25)',
                                flexShrink: 0,
                            }} 
                        />
                        <h2 
                            className="font-semibold" 
                            style={{ 
                                color: 'var(--text-primary)', 
                                fontSize: 'calc(1rem + 0.1vw)', // Responsive heading
                                margin: 0,
                            }}
                        >
                            Duration
                        </h2>
                    </div>
                    <div style={{ paddingLeft: 'calc(var(--spacing-md) * 1.25 + var(--spacing-sm) * 0.8)' }}> {/* Align with heading text */}
                        <p 
                            style={{ 
                                color: 'var(--text-primary)', 
                                fontSize: 'calc(0.95rem + 0.1vw)',
                                margin: 0,
                                marginBottom: 'calc(var(--spacing-xs) * 0.5)',
                                lineHeight: '1.4',
                            }}
                        >
                            6 months — starting September 2025
                        </p>
                        <p 
                            style={{ 
                                color: 'var(--text-secondary)', 
                                fontSize: 'calc(0.85rem + 0.05vw)',
                                margin: 0,
                                fontStyle: 'italic',
                            }}
                        >
                            (fall 2025)
                        </p>
                    </div>
                </div>

                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'calc(var(--spacing-sm) * 0.75)',
                    }}
                >
                    <div 
                        className="flex items-center"
                        style={{
                            gap: 'calc(var(--spacing-sm) * 0.8)',
                        }}
                    >
                        <LocationIcon 
                            style={{ 
                                color: '#22c55e', 
                                width: 'calc(var(--spacing-md) * 1.25)',
                                height: 'calc(var(--spacing-md) * 1.25)',
                                flexShrink: 0,
                            }} 
                        />
                        <h2 
                            className="font-semibold" 
                            style={{ 
                                color: 'var(--text-primary)', 
                                fontSize: 'calc(1rem + 0.1vw)',
                                margin: 0,
                            }}
                        >
                            Location
                        </h2>
                    </div>
                    <div style={{ paddingLeft: 'calc(var(--spacing-md) * 1.25 + var(--spacing-sm) * 0.8)' }}>
                        <p 
                            style={{ 
                                color: 'var(--text-primary)', 
                                fontSize: 'calc(0.95rem + 0.1vw)',
                                margin: 0,
                                lineHeight: '1.4',
                            }}
                        >
                            Preferably San Francisco US
                        </p>
                    </div>
                </div>

            </div>

            {/* Tech Stack Section */}
            <div 
                style={{
                    marginBottom: 'calc(var(--spacing-lg) * 1.75)', // Section separation
                }}
            >
                <div 
                    className="flex items-center"
                    style={{
                        gap: 'calc(var(--spacing-sm) * 0.8)',
                        marginBottom: 'calc(var(--spacing-md) * 1.2)', // Space before tech list
                    }}
                >
                    <CodeIcon 
                        style={{ 
                            color: '#a855f7', 
                            width: 'calc(var(--spacing-md) * 1.25)',
                            height: 'calc(var(--spacing-md) * 1.25)',
                            flexShrink: 0,
                        }} 
                    />
                    <h2 
                        className="font-semibold" 
                        style={{ 
                            color: 'var(--text-primary)', 
                            fontSize: 'calc(1rem + 0.1vw)',
                            margin: 0,
                        }}
                    >
                        Tech Expertise
                    </h2>
                </div>
                <div 
                    className="grid grid-cols-1 sm:grid-cols-2"
                    style={{
                        gap: 'calc(var(--spacing-sm) * 0.5) calc(var(--spacing-lg) * 1.25)', // row-gap column-gap
                        paddingLeft: 'calc(var(--spacing-md) * 1.25 + var(--spacing-sm) * 0.8)', // Align with heading text
                        color: 'var(--text-primary)',
                    }}
                >
                    <ul 
                        className="list-disc list-inside"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'calc(var(--spacing-xs) * 0.75)',
                            fontSize: 'calc(0.9rem + 0.05vw)',
                            lineHeight: '1.5',
                        }}
                    >
                        {techStack1.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                    <ul 
                        className="list-disc list-inside"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'calc(var(--spacing-xs) * 0.75)',
                            fontSize: 'calc(0.9rem + 0.05vw)',
                            lineHeight: '1.5',
                        }}
                    >
                        {techStack2.slice(0, showMore ? techStack2.length : 3).map((item, index) => <li key={index}>{item}</li>)}
                         <li>
                            <button 
                                onClick={() => setShowMore(!showMore)} 
                                className="hover:underline"
                                style={{ 
                                    color: 'var(--accent-color)',
                                    fontSize: 'calc(0.85rem + 0.05vw)',
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                }}
                            >
                                {showMore ? 'See less' : 'See more'}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            </div>

            {/* What I Bring Section */}
            <div 
                style={{
                    marginBottom: 'calc(var(--spacing-lg) * 1.5)', // Section separation
                }}
            >
                <h3 
                    className="font-semibold" 
                    style={{ 
                        color: 'var(--text-primary)', 
                        fontSize: 'calc(1.1rem + 0.15vw)', // Responsive heading
                        marginBottom: 'calc(var(--spacing-sm) * 1.25)',
                        lineHeight: '1.3',
                    }}
                >
                    What I Bring
                </h3>
                <p 
                    style={{ 
                        color: 'var(--text-secondary)', 
                        fontSize: 'calc(0.95rem + 0.1vw)',
                        lineHeight: '1.65',
                        margin: 0,
                        textAlign: 'left',
                    }}
                >
                    Real-world AI development experience from AIRAA (AI platforms, secure GPTs, RAG pipelines). 
                    3x hackathon wins (ETH Oxford, Paris Blockchain Week, Colosseum Breakout on Solana). 
                    I ship fast and love building useful things that actually work.
                </p>
            </div>

            {/* Goal Section */}
            <div 
                style={{
                    marginBottom: 'calc(var(--spacing-lg) * 2)', // Larger gap before contact button
                }}
            >
                <h3 
                    className="font-semibold" 
                    style={{ 
                        color: 'var(--text-primary)', 
                        fontSize: 'calc(1.1rem + 0.15vw)',
                        marginBottom: 'calc(var(--spacing-sm) * 1.25)',
                        lineHeight: '1.3',
                    }}
                >
                    Looking For
                </h3>
                <p 
                    style={{ 
                        color: 'var(--text-secondary)', 
                        fontSize: 'calc(0.95rem + 0.1vw)',
                        lineHeight: '1.65',
                        margin: 0,
                        textAlign: 'left',
                    }}
                >
                    Opportunities to join innovative teams building AI-powered tools that matter. I want to contribute meaningfully, learn 
                    rapidly, and create impact. Ready to dive in! 🚀
                </p>
            </div>

            {/* Contact Button Section */}
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <button 
                    className="font-semibold rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                        backgroundColor: 'var(--accent-color)',
                        color: 'white',
                        border: 'none',
                        padding: 'calc(var(--spacing-sm) * 1.25) calc(var(--spacing-lg) * 1.5)', // Proportional button padding
                        fontSize: 'calc(0.95rem + 0.1vw)',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        transform: 'translateY(0)',
                        transition: 'all 0.2s ease-in-out',
                        focusRingColor: 'var(--accent-color)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }}
                >
                    Get In Touch
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;