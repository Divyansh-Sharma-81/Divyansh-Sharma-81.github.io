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
            className="glass-panel glass-panel--chat-element rounded-2xl p-8 sm:p-12"
            style={{
                backgroundColor: 'var(--glass-bg)',
                backdropFilter: 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))',
                WebkitBackdropFilter: 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))',
                border: '1px solid var(--glass-border)',
            }}
        >
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-5">
                    <img 
                        src="/assets/divyansh.png" 
                        alt="Divyansh Sharma" 
                        className="w-20 h-20 rounded-full border-4 shadow-md"
                        style={{ borderColor: 'var(--glass-border)' }}
                    />
                    <div>
                        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Divyansh Sharma</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Internship Application</p>
                    </div>
                </div>
                <div 
                    className="flex items-center gap-2 text-sm font-medium glass-panel glass-panel--button rounded-full px-3 py-1"
                    style={{
                        color: '#22c55e',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.2)'
                    }}
                >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }}></span>
                    Live
                </div>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <CalendarIcon className="w-5 h-5" style={{ color: '#6366f1' }} />
                        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Duration</h2>
                    </div>
                    <p style={{ color: 'var(--text-primary)' }}>6 months — starting September 2025</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>(fall 2025)</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <LocationIcon className="w-5 h-5" style={{ color: '#22c55e' }} />
                        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Location</h2>
                    </div>
                    <p style={{ color: 'var(--text-primary)' }}>Preferably San Francisco us</p>
                </div>

                <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center gap-3">
                        <CodeIcon className="w-5 h-5" style={{ color: '#a855f7' }} />
                        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Tech stack</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8" style={{ color: 'var(--text-primary)' }}>
                        <ul className="space-y-1 list-disc list-inside">
                            {techStack1.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                        <ul className="space-y-1 list-disc list-inside">
                            {techStack2.slice(0, showMore ? techStack2.length : 3).map((item, index) => <li key={index}>{item}</li>)}
                             <li>
                                <button 
                                    onClick={() => setShowMore(!showMore)} 
                                    className="hover:underline"
                                    style={{ color: 'var(--accent-color)' }}
                                >
                                    {showMore ? 'See less' : 'See more'}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-12 space-y-8">
                <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>What I bring</h3>
                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Real-world AI dev experience from AIRAA (AI platforms, secure GPTs, RAG pipelines).
                        3x hackathon wins (ETH Oxford, Paris Blockchain Week, Colosseum Breakout on Solana).
                        I ship fast, and love building useful things that actually work.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Goal</h3>
                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Join a bold, innovative team building AI-powered tools that matter. I want to improve fast, contribute hard, and leave a mark. I'm fast, flexible, and HUNGRYYYYY 🔥
                    </p>
                </div>
            </div>

            <div className="text-center mt-12">
                <button 
                    className="glass-panel glass-panel--button font-semibold rounded-full px-8 py-4 transition-colors focus:outline-none"
                    style={{
                        backgroundColor: 'var(--accent-color)',
                        color: 'white',
                        border: 'none'
                    }}
                >
                    Contact me
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;