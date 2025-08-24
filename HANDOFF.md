# HANDOFF.md - Portfolio 3D Development Context

## Current Project State

This is an interactive 3D portfolio website with WebGL fluid simulation, advanced glassmorphism UI, and complete TypeScript + TailwindCSS + shadcn/ui integration. The project features a sophisticated dual-response chat modal system, comprehensive dark theme support, and theme-aware logo switching.

### ✅ Recently Completed Features

1. **TypeScript Migration** - Full conversion from JavaScript to TypeScript with proper type annotations
2. **TailwindCSS + shadcn/ui Integration** - Hybrid CSS approach preserving glass components while adding modern utility framework
3. **Comprehensive Dark Theme System** - Theme-aware CSS variables, WebGL background adaptation, and smooth transitions
4. **Theme-Aware Logo Switching** - Automatic logo switching between light/dark variants in header and chat modal
5. **Enhanced Glassmorphism System** - Professional frosted glass effects with theme-aware CSS custom properties
6. **Dual-Response Chat System** - Differentiated responses: typed questions → text bubbles, preset questions → custom UI showcases
7. **"Me" Section Showcase** - Complete personal profile UI with photo, skill tags, and bio
8. **CSS Invalidation Fix** - Solved backdrop-filter rendering issues with programmatic CSS variable changes
9. **Logical Proportional Layout** - All sizing uses ratios (4/5th modal width, 1/4th for images) instead of hardcoded values

### 🎯 Current Status

- **Tech Stack**: TypeScript + TailwindCSS + shadcn/ui + WebGL + Vite
- **Theme System**: Complete light/dark mode with automatic logo switching and WebGL background adaptation
- **Working Features**: Dual-response chat system, "Me" showcase UI, theme toggle, CSS invalidation fix, proportional layouts
- **Chat Modal Behavior**: 
  - Typed questions → User bubble visible + AI text response
  - "Me" preset → User bubble hidden + Personal showcase UI
  - "Projects" preset → Basic structure exists (needs enhancement)
- **Glass System**: Theme-aware professional frosted effects with CSS invalidation solution for backdrop-filter issues
- **Layout Philosophy**: 100% logical proportions - no hardcoded pixel values anywhere
- **Logo System**: Automatic switching between `logo.png` (light mode) and `light_logo.png` (dark mode)

### 🔧 Key Technical Implementation

- **TypeScript Architecture**: Fully typed PortfolioApp and ChatModal classes with proper interfaces
- **Theme Management**: Complete theme system with localStorage persistence and system preference detection
- **Logo Switching System**: CSS opacity-based logo switching with smooth transitions
- **WebGL Integration**: Exposed `window.fluidSimulationConfig` for dynamic theme-based background updates
- **Hybrid CSS Approach**: TailwindCSS utilities + preserved glass components + shadcn/ui components
- **Dual Response System**: `isPresetQuestion` flag differentiates between typed vs preset responses
- **CSS Invalidation**: `invalidateGlass()` method fixes backdrop-filter rendering by changing CSS variables
- **Proportional Sizing**: Main containers use percentages (80% = 4/5th, 25% = 1/4th) relative to modal width
- **Content Visibility**: `hideUserMessage()`/`showUserMessage()` methods control user bubble display
- **Glass Styling Strategy**: Only skill tags have glass panels, no glass on images or text content
- **Avatar Sizing**: `calc(100vw / 25)` for current avatar dimensions

## 📁 Essential Files for Context Building

### Core Application Files
1. **`CLAUDE.md`** - Complete project documentation and architecture
2. **`index.html`** - Main HTML structure with chat modal elements and theme toggle
3. **`package.json`** - Project dependencies (TypeScript, TailwindCSS, shadcn/ui, etc.)
4. **`tsconfig.json`** - TypeScript configuration with path mapping
5. **`tailwind.config.js`** - TailwindCSS configuration with custom glass utilities
6. **`postcss.config.js`** - PostCSS configuration for TailwindCSS v4
7. **`components.json`** - shadcn/ui configuration

### CSS Architecture (Hybrid Approach)
8. **`src/styles/base.css`** - Theme-aware CSS custom properties and responsive breakpoints
9. **`src/styles/tailwind.css`** - TailwindCSS imports and custom glassmorphism utilities
10. **`src/styles/glass-components.css`** - Theme-aware glassmorphism system with all variants
11. **`src/styles/chat-modal.css`** - Interactive chat modal styles with theme-aware logo switching
12. **`src/styles/ui-components.css`** - Base UI component styles with theme toggle
13. **`src/styles/layout.css`** - Theme-aware grid background and WebGL canvas positioning
14. **`src/styles/main.css`** - Main CSS file importing TailwindCSS + custom components

### TypeScript Modules
15. **`src/js/main.ts`** - Main PortfolioApp class with theme management system
16. **`src/js/chat-modal.ts`** - ChatModal class with proper TypeScript interfaces
17. **`src/js/fluid-simulation.js`** - WebGL fluid simulation with theme-aware background config
18. **`src/lib/utils.ts`** - shadcn/ui utility functions

### Reference Materials & Assets
19. **`mockup2.png`** - Target design for chat modal interface
20. **`assets/logo.png`** - Dark logo (used in light mode)
21. **`assets/light_logo.png`** - Light logo (used in dark mode)
22. **`assets/avatar.png`** - User avatar image
23. **`assets/divyansh.png`** - Personal photo for "Me" showcase

## 🚀 Development Commands

```bash
npm run dev    # Start development server (localhost:5173)
npm run build  # Production build
```

## 🎨 Current Design System

### Theme System
- **Light Theme**: White background, subtle gray grid, light glass effects
- **Dark Theme**: Deep black background, darker grid, enhanced glass contrast
- **Theme Toggle**: Floating glassmorphism button in top-right with smooth icon transitions
- **Logo Switching**: Automatic opacity-based switching between dark/light logo variants
- **WebGL Adaptation**: Fluid simulation background adapts from white to dark gray

### Glass Panel Variants (Theme-Aware)
- **`.glass-panel`**: Base frosted glass with theme-aware backdrop blur and saturation
- **`.glass-panel--modal`**: Main chat container with enhanced theme-specific effects
- **`.glass-panel--chat-element`**: Theme-aware contrast for chat interface elements
- **`.glass-panel--button`**: Interactive elements with theme-appropriate hover states
- **`.glass-pill-tw`**: TailwindCSS utility class for pill-shaped glass components

### Key Measurements
- **Chat Input**: `33.333vw` (1/3 screen width)
- **Avatar**: `calc(100vw / 15)` (1/15th screen width, square)
- **Modal**: `50vw × 96vh` (centered on screen)
- **Quick Questions**: 5 equal-width buttons within modal

### CSS Custom Properties (Theme-Aware)
```css
/* Layout Variables */
--chat-input-width: 33.333vw;
--avatar-size: calc(var(--chat-input-width) / 3);
--spacing-xs to --spacing-xl: 0.5rem to 3rem;

/* Theme Variables (Light Mode) */
--body-bg: #ffffff;
--grid-color: #f8f8f8;
--text-primary: #333333;
--glass-bg: rgba(255, 255, 255, 0.15);
--glass-border: rgba(255, 255, 255, 0.25);

/* Dark Mode Overrides */
.dark {
  --body-bg: #0f0f0f;
  --grid-color: #242424;
  --text-primary: #e4e4e7;
  --glass-bg: rgba(30, 30, 30, 0.4);
  --glass-border: rgba(255, 255, 255, 0.1);
}
```

## ⚠️ Critical Implementation Notes

1. **TypeScript First**: All new development should use TypeScript with proper type annotations
2. **Theme System**: Always use CSS custom properties for colors/effects - never hardcode theme-specific values
3. **Logo Management**: Both `logo.png` and `light_logo.png` must be present for theme switching to work
4. **Hybrid CSS Approach**: Preserve existing glass components while using TailwindCSS for utilities
5. **No Hardcoded Values**: All sizing uses viewport calculations and CSS custom properties
6. **Content Replacement**: Chat modal replaces content, doesn't overlay it
7. **Pointer Events**: Essential for fluid simulation to work behind modal
8. **WebGL Integration**: Theme changes update `window.fluidSimulationConfig.BACK_COLOR` for background adaptation
9. **Glass Invalidation**: Call `invalidateGlass()` after theme changes to ensure proper backdrop-filter rendering

## 🐛 Known Issues to Watch

1. **TailwindCSS v4**: Using PostCSS plugin `@tailwindcss/postcss` - different from v3 setup
2. **Theme Persistence**: Theme preference saved in localStorage as 'portfolio-theme'
3. **Logo Positioning**: Both logos are absolutely positioned - ensure container has relative positioning
4. **WebGL Config Access**: Ensure `window.fluidSimulationConfig` is available before theme updates
5. **Glass Invalidation**: May need to call after dynamic content changes or theme switches
6. **Mobile Responsive**: Test theme toggle and logo switching on various screen sizes

## 🎨 Preset Question Showcase System

### Current Implementation Status
- ✅ **"Me" Section**: Complete personal showcase with photo, tags, bio (matches mockup3.png)
- ⏳ **Projects Section**: Needs custom UI showcase design and implementation
- ⏳ **Skills Section**: Needs custom UI showcase design and implementation  
- ⏳ **Fun Section**: Needs custom UI showcase design and implementation
- ⏳ **Contact Section**: Needs custom UI showcase design and implementation

### Implementation Pattern for New Showcases
1. **HTML Structure**: Create showcase div in `index.html` following `.me-showcase` pattern
2. **CSS Styling**: Use logical proportions (percentages of modal width), minimal glass usage
3. **JavaScript Logic**: Add section handling in `simulateAIResponse()` method
4. **Content Visibility**: Ensure user message bubble hides for preset, shows for typed questions

### Design Principles for Showcases
- **Main container**: 80% of chat modal width (4/5th)
- **Images**: 25-30% of modal width maximum 
- **No glass panels**: Only on interactive elements (buttons, tags)
- **Responsive**: Stack vertically on mobile, adjust proportions logically
- **Content replacement**: Hide user message bubble entirely during showcase

## 📋 Next Development Areas

1. **Enhanced Projects Showcase**: Build interactive project cards using shadcn/ui components
2. **3 Remaining Preset Showcases**: Build Skills, Fun, and Contact section UIs using TypeScript + shadcn/ui
3. **AI Chatbot Integration**: Connect real AI responses for typed questions
4. **shadcn/ui Component Library**: Add more components (Cards, Badges, Tabs) for future showcases
5. **Theme Transition Polish**: Enhance theme switching animations and loading states
6. **Mobile Theme Testing**: Verify theme toggle and logo switching across all screen sizes
7. **Performance Optimization**: Ensure smooth transitions between showcase types and theme changes

## 🎯 Quick Start for New Instance

1. **Install Dependencies**: `npm install` (includes TypeScript, TailwindCSS, shadcn/ui)
2. **Development Server**: `npm run dev` to start Vite dev server
3. **Architecture Review**: Read CLAUDE.md for complete project understanding
4. **Theme System**: Test light/dark theme toggle in top-right corner
5. **Chat System**: Test both typed questions and preset "Me" showcase
6. **Code Structure**: Review TypeScript files in `src/js/` for typed interfaces
7. **Styling**: Examine hybrid CSS approach (TailwindCSS + custom glass components)
8. **Logo System**: Verify both logo variants switch correctly with theme

### Development Workflow
- **New Components**: Use shadcn/ui components with custom glass styling
- **Theme Updates**: Always use CSS custom properties, never hardcode colors
- **TypeScript**: Add proper type annotations for all new functionality
- **Testing**: Verify theme switching, logo changes, and WebGL background adaptation

The codebase is professionally structured with modern tooling (TypeScript + TailwindCSS + shadcn/ui), complete theme system, and ready for enhanced preset showcases. Focus on building interactive components while maintaining the established design patterns and proportional layout system.