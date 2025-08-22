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
- **`glass-components.css`**: Enhanced frosted glass panel variants with professional glassmorphism effects
- **`ui-components.css`**: Specific UI component styles (header, chat, buttons)
- **`chat-modal.css`**: Interactive chat modal system with content replacement functionality
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

#### 5. Interactive Chat Modal System
- **File**: `src/js/chat-modal.js` - ChatModal class handling content replacement
- **Trigger**: Text input submission transforms the entire UI into chat interface
- **Layout**: Large glass card (50vw × 96vh) perfectly centered on screen
- **Avatar Positioning**: Exactly 1/15th screen width (`calc(100vw / 15)`), square, upper edge aligned with glass card
- **Content Replacement**: Original UI elements completely hidden, replaced with chat interface
- **Pointer Events**: Fluid simulation continues working behind modal via `pointer-events: none/all`

#### 6. Layout Specifications (Critical Requirements)
- **Chat Input**: Exactly 1/3 screen width (`var(--chat-input-width): 33.333vw`), perfect pill shape
- **Avatar**: Square shape (no border-radius), exactly 1/15th screen width
- **Glass Modal**: 50% viewport width, 96% viewport height, perfectly centered
- **Quick Questions**: 5 equally-wide buttons within modal with darker glass tint
- **Text Spacing**: Balanced gaps between logo → greeting → title for proper visual hierarchy

## Design System

### Enhanced Glassmorphism Implementation (Professional Frosted Glass)
Based on Glassmorphism-Clock reference implementation with advanced techniques:

#### Base Glass Components
- **Background**: `rgba(235, 233, 233, 0.12)` - Realistic frosted tint
- **Backdrop Filter**: `blur(30px) saturate(180%)` - True frosted effect with color enhancement
- **Border**: `1px solid rgba(255, 255, 255, 0.25)` - Enhanced glass edge visibility
- **Box Shadow**: `0 8px 25px 0 rgba(0, 0, 0, 0.15)` - Professional depth
- **Hover States**: `translateY(-2px)` with enhanced shadows and `rgba(211, 211, 211, 0.18)` background
- **Transitions**: Quick `0.1s ease-in-out` for responsive feel

#### Chat Modal Glass Variants
- **Modal Container**: `rgba(231, 231, 231, 0.15)` with `blur(30px) saturate(200%)`
- **Chat Elements**: `rgba(219, 219, 219, 0.25)` with darker tint for contrast
- **Enhanced Frost**: Higher blur values (30px-40px) and saturation effects
- **Layered Depth**: Multiple shadow levels for authentic glass appearance

#### Glass Panel Variants
- **`.glass-panel`**: Base frosted glass with enhanced blur and saturation
- **`.glass-panel--modal`**: Large modal container with premium glass effect
- **`.glass-panel--chat-element`**: Darker tinted elements for chat interface contrast
- **`.glass-panel--button`**: Interactive elements with hover enhancement
- **`.glass-panel--chat`**: Input components with optimized transparency

### Responsive Design
- **Breakpoints**: 768px (tablet) and 480px (mobile)
- **Spacing System**: CSS custom properties (`--spacing-xs` through `--spacing-xl`)
- **Typography**: `clamp()` functions for fluid font scaling
- **Layout**: Flexbox with percentage-based sizing, no absolute positioning

### CSS Custom Properties
```css
--chat-input-width: 33.333vw; /* 1/3 page width for chat input */
--avatar-size: calc(var(--chat-input-width) / 3); /* 1/3 of pill width */
--text-primary: #333;
--text-secondary: #666;
--accent-color: #007AFF;
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 1.5rem;
--spacing-lg: 2rem;
--spacing-xl: 3rem;
--grid-size: 40px; /* Responsive - adjusts to screen size */
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
- **Keyboard**: 'P' key toggles pause (spacebar splats disabled for clean portfolio experience)
- **Chat Mode**: Fluid simulation continues working behind chat modal via pointer events management

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
3. UI components render with enhanced glassmorphism effects (Layer 2+)
4. All components center perfectly using flexbox
5. Chat modal system ready for text input transformation

### Chat Modal Behavior
1. **Default State**: Standard portfolio layout with input pill and preset buttons
2. **Text Entry**: User types in chat input and presses Enter
3. **Content Replacement**: Original UI (header, text, footer) completely hidden
4. **Modal Activation**: Large glass card (50vw × 96vh) appears centered on screen
5. **Avatar Repositioning**: Avatar moves to center-top of modal, upper edge aligned
6. **AI Interaction**: Loading dots animation, then AI response in glass bubble
7. **Collapsible UI**: Quick questions can be hidden/shown with toggle button
8. **Exit Options**: Close button or Escape key returns to default state

### Asset Requirements
- **Logo**: `/assets/logo.png` (D-shaped logo)
- **Avatar**: `/assets/avatar.png` (User profile image)
- **Dithering Texture**: `LDR_LLL1_0.png` (for WebGL bloom effects)

### Browser Compatibility
- **WebGL**: Graceful fallback from WebGL2 to WebGL1
- **Backdrop Filter**: Modern browser support required for glass effects
- **CSS Grid**: Used for background pattern
- **ES6 Modules**: Modern JavaScript features used throughout

# User Custom Instructions

## Coding Philosophy & Practices

### 🚫 Absolute No-Nos
- **Never use hardcoded pixel values** - Always use proportional/logical sizing (percentages, viewport units, CSS custom properties)
- **No absolute positioning with fixed coordinates** - Use flexbox and logical layout systems
- **Avoid overcomplicating solutions** - Think ultrahard, analyze the real problem, then implement the simplest effective solution
- **Don't assume or guess** - When unclear about requirements, ask specific clarifying questions

### ✅ Required Practices

#### **Logical Proportional Design**
- Use ratios and proportions: "1/4th modal width" = `width: 25%`
- Reference containers logically: "4/5th of chat modal" = `width: 80%`
- Implement responsive design with viewport-relative units (`vw`, `vh`, `%`)
- Use CSS custom properties for consistent theming and dynamic changes

#### **Task Breakdown Methodology**
- **Always break complex tasks into atomic sub-tasks** using TodoWrite tool
- Mark tasks `in_progress` before starting work
- Mark tasks `completed` immediately after finishing (don't batch)
- Use systematic, step-by-step implementation approach

#### **Problem-Solving Approach**
1. **UltraThink**: Analyze the real root cause of issues before implementing solutions
2. **Read existing code** thoroughly to understand current implementation
3. **Follow established patterns** - mimic existing code structure and conventions
4. **Test incrementally** - implement small changes and verify they work

#### **Code Organization**
- **Modular CSS**: Separate concerns (base, layout, components, modal-specific styles)
- **Semantic HTML**: Use proper semantic structure, avoid unnecessary wrappers
- **Clean JavaScript**: Single responsibility functions, clear variable names
- **Consistent naming**: Follow established naming conventions throughout codebase

### 🎨 Design System Adherence

#### **Glass Panel Usage Strategy**
- **Minimal glass panels**: Only use on truly interactive elements (buttons, tags, form inputs)
- **No glass on content areas**: Text content, images, and containers should not have glass styling
- **Proper glass hierarchy**: Main modal container can have glass, but content within should be clean

#### **Layout Architecture**
- **Flexbox-first**: Use flexbox for all layout needs
- **Mobile-responsive**: Always implement mobile-first responsive design
- **Content-based sizing**: Let content determine size, then constrain with max-widths using percentages

### 🐛 Common Issues & Solutions

#### **CSS Backdrop-Filter Problems**
- Use the implemented `invalidateGlass()` method for rendering issues
- CSS custom properties with programmatic changes force browser recompilation
- Never rely on browser-specific hacks or workarounds

#### **Chat Modal State Management**  
- Always track `isPresetQuestion` flag to differentiate response types
- Use `hideUserMessage()`/`showUserMessage()` for proper content visibility
- Implement proper content replacement, not overlay systems

### 🔄 Working Methodology

#### **When Starting New Tasks**
1. **Examine existing code** to understand current implementation patterns  
2. **Create TodoWrite list** breaking down the task into atomic steps
3. **Follow established patterns** from similar existing implementations

#### **When Debugging Issues**
1. **Identify the real problem** - don't treat symptoms
2. **Check browser console** for actual error messages
3. **Test incrementally** - make small changes and verify results
4. **Use logical deduction** rather than trial-and-error approaches

#### **Code Quality Standards**
- **Consistent indentation** and formatting
- **Meaningful variable names** that describe purpose
- **Commented complex logic** only when truly necessary
- **No redundant or dead code** - clean up as you go

### 💬 Communication Style
- **Be concise** - avoid unnecessary explanations unless requested
- **Focus on execution** - implement solutions rather than discussing theory
- **Ask specific questions** when requirements are unclear
- **Provide concrete examples** when explaining concepts

This is a professional-grade codebase that requires systematic, thoughtful development practices. Always prioritize clean, maintainable, and logically structured code over quick fixes.