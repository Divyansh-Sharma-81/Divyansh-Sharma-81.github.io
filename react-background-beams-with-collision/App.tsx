

import React from 'react';
import { BackgroundBeamsWithCollision } from './components/ui/background-beams-with-collision';

function App() {
  return (
    <div className="h-screen w-full bg-neutral-950 text-white flex flex-col items-center justify-center antialiased">
      <BackgroundBeamsWithCollision className="h-full w-full">
        <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center">
            Background Beams Collision
          </h1>
          <p className="text-neutral-400 max-w-lg mx-auto my-4 text-sm md:text-base text-center">
            A stunning visual effect with falling beams that detect collision with a surface and create an explosion animation. Built with React, Framer Motion, and Tailwind CSS.
          </p>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}

export default App;