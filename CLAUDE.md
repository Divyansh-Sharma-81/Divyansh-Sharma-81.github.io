# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Development Server
```bash
npm run dev
```
Starts the Vite development server with hot reload. The application will be available at http://localhost:5173.

### Building for Production
```bash
npm run build
```
Creates optimized production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

## Architecture Overview

This is an interactive 3D portfolio website with a sophisticated layered background system and glassmorphism UI components. The codebase is professionally organized with modular CSS architecture.

### Layer Architecture (Z-Index Stack)
The application uses a carefully orchestrated z-index system:

- **Layer 0**: Grid background (`grid-background`) - White background with light gray CSS Grid lines
- **Layer 1**: WebGL fluid simulation (`fluid-canvas`) - Interactive colorful fluid effects positioned BELOW UI
- **Layer 2**: UI container (`ui-container`) - Main application content with proper flexbox layout
- **Layer 3+**: Glass panels - True frosted glass components with enhanced backdrop-filter effects

### Modular CSS Architecture
The CSS is organized into component-based files for maintainability:

- **`base.css`**: Reset styles, CSS custom properties, responsive breakpoints
- **`layout.css`**: Background layers (grid, fluid canvas) and main UI container
- **`glass-components.css`**: Reusable glass panel variants with BEM-like naming
- **`ui-components.css`**: Specific UI component styles (header, chat, buttons)
- **`main.css`**: Clean imports of all component files

### Core Components

#### 1. Grid Background System
- **Location**: CSS-based grid in `src/styles/main.css`
- **Purpose**: Provides elegant light gray grid lines on white background
- **Responsive**: Uses CSS custom properties (`--grid-size`) that adapt to screen size
- **Performance**: Pure CSS implementation for optimal performance

#### 2. WebGL Fluid Simulation
- **File**: `src/js/fluid-simulation.js`
- **Based on**: Pavel Dobryakov's WebGL-Fluid-Simulation (MIT License)
- **Key Features**:
  - High-performance WebGL2/WebGL1 fluid dynamics
  - Bloom effects, sunrays, and sophisticated shading
  - Mouse/touch interaction (movement creates fluid effects)
  - Transparent rendering to show grid background beneath
- **Configuration**: Optimized for portfolio use with subtle, elegant fluid movement
- **Interaction**: Responds to mouse movement without requiring clicks

#### 3. Application Structure
- **Entry Point**: `src/js/main.js` - PortfolioApp class that orchestrates all components
- **Responsive Grid**: Dynamic CSS custom property updates based on screen size
- **Module Loading**: ES6 modules with dynamic imports for fluid simulation

#### 4. UI Layout System
- **Architecture**: Professional flexbox-based layout with semantic HTML structure
- **Sections**: 
  - Header: Logo (D-shaped) in separate container
  - Text Section: Greeting and "AI PORTFOLIO" title with balanced spacing
  - Main: Avatar (square, 1/3 chat width) positioned above chat input (pill-shaped, 1/3 screen width)
  - Footer: 5 equally-wide preset buttons spanning same width as chat input
- **Responsive**: Uses CSS custom properties and logical proportions, zero hardcoded pixel values

#### 5. Layout Specifications (Critical Requirements)
- **Chat Input**: Exactly 1/3 screen width (`33.333vw`), perfect pill shape (`border-radius: 50px`)
- **Avatar**: Square shape (no border-radius), size = 1/2 chat input width, positioned edge-to-edge above input
- **Buttons**: 5 equally-wide buttons (`flex: 1`) spanning total width of chat input
- **Text Spacing**: Balanced gaps between logo → greeting → title for proper visual hierarchy

## Design System

### Glassmorphism Implementation (True Frosted Glass Effect)
Based on professional glassmorphism standards from frosty reference files:

- **Background**: `rgba(255, 255, 255, 0.15)` - Perfect transparency balance
- **Backdrop Filter**: `blur(8px)` with `-webkit-backdrop-filter` fallback
- **Border**: `1px solid rgba(255, 255, 255, 0.18)` - Subtle glass edge
- **Box Shadow**: `0 8px 32px 0 rgba(31, 38, 135, 0.37)` - Realistic depth
- **Hover States**: Subtle `translateY(-2px)` with enhanced shadow and opacity
- **Transitions**: Quick `0.1s ease-in-out` for responsive feel

### Responsive Design
- **Breakpoints**: 768px (tablet) and 480px (mobile)
- **Spacing System**: CSS custom properties (`--spacing-xs` through `--spacing-xl`)
- **Typography**: `clamp()` functions for fluid font scaling
- **Layout**: Flexbox with percentage-based sizing, no absolute positioning

### CSS Custom Properties
```css
--glass-bg: rgba(255, 255, 255, 0.15);
--glass-border: rgba(255, 255, 255, 0.3);
--glass-backdrop: blur(40px);
--spacing-sm: 1rem;
--spacing-md: 1.5rem;
--spacing-lg: 2rem;
```

## WebGL Fluid Simulation Details

### Performance Settings
- **SIM_RESOLUTION**: 256 (optimized for background use)
- **DYE_RESOLUTION**: 1024 (high quality on desktop, 512 on mobile)
- **BLOOM_INTENSITY**: 1.6 with 8 iterations
- **SUNRAYS_WEIGHT**: 0.8 for elegant light effects

### Interaction Model
- **Mouse Movement**: Creates fluid effects without clicking
- **Touch Support**: Multi-touch interaction for mobile devices
- **Keyboard**: 'P' key toggles pause, spacebar adds random splats

### Shader System
The simulation uses multiple WebGL shaders for different effects:
- Display shader with bloom and sunray support
- Advection, divergence, and pressure shaders for fluid dynamics
- Blur and bloom shaders for visual effects

## Important Implementation Notes

### Layout Philosophy
This codebase uses professional frontend practices:
- **NO absolute positioning** with hardcoded pixel values
- **Flexbox for all layout** with semantic HTML structure
- **CSS custom properties** for consistent theming
- **Mobile-first responsive design** with logical breakpoints

### Critical Rendering Path
1. Grid background renders as CSS (Layer 0)
2. WebGL fluid simulation initializes and runs (Layer 1) 
3. UI components render with glassmorphism effects (Layer 2+)
4. All components center perfectly using flexbox

### Asset Requirements
- **Logo**: `/assets/logo.png` (D-shaped logo)
- **Avatar**: `/assets/avatar.png` (User profile image)
- **Dithering Texture**: `LDR_LLL1_0.png` (for WebGL bloom effects)

### Browser Compatibility
- **WebGL**: Graceful fallback from WebGL2 to WebGL1
- **Backdrop Filter**: Modern browser support required for glass effects
- **CSS Grid**: Used for background pattern
- **ES6 Modules**: Modern JavaScript features used throughout