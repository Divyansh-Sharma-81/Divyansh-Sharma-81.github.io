# HANDOFF.md - Portfolio 3D Development Context

## Current Project State

This is an interactive 3D portfolio website with WebGL fluid simulation and advanced glassmorphism UI. The project features a sophisticated dual-response chat modal system that provides different UI showcases for preset questions vs regular typed questions.

### ✅ Recently Completed Features

1. **Enhanced Glassmorphism System** - Professional frosted glass effects with CSS custom properties for dynamic invalidation
2. **Dual-Response Chat System** - Differentiated responses: typed questions → text bubbles, preset questions → custom UI showcases
3. **"Me" Section Showcase** - Complete personal profile UI with photo, skill tags, and bio (matches mockup3.png)
4. **CSS Invalidation Fix** - Solved backdrop-filter rendering issues with programmatic CSS variable changes
5. **Proper Content Replacement** - User message bubbles hide for preset showcases, show for typed questions
6. **Logical Proportional Layout** - All sizing uses ratios (4/5th modal width, 1/4th for images) instead of hardcoded values

### 🎯 Current Status

- **Working Features**: Dual-response chat system, "Me" showcase UI, CSS invalidation fix, proportional layouts
- **Chat Modal Behavior**: 
  - Typed questions → User bubble visible + AI text response
  - "Me" preset → User bubble hidden + Personal showcase UI
- **Glass System**: Professional frosted effects with CSS invalidation solution for backdrop-filter issues
- **Layout Philosophy**: 100% logical proportions - no hardcoded pixel values anywhere

### 🔧 Key Technical Implementation

- **Dual Response System**: `isPresetQuestion` flag differentiates between typed vs preset responses
- **CSS Invalidation**: `invalidateGlass()` method fixes backdrop-filter rendering by changing CSS variables
- **Proportional Sizing**: Main containers use percentages (80% = 4/5th, 25% = 1/4th) relative to modal width
- **Content Visibility**: `hideUserMessage()`/`showUserMessage()` methods control user bubble display
- **Glass Styling Strategy**: Only skill tags have glass panels, no glass on images or text content
- **Avatar Sizing**: `calc(100vw / 25)` for current avatar dimensions

## 📁 Essential Files for Context Building

### Core Application Files
1. **`/home/divyansh/code/portfolio_3d/CLAUDE.md`** - Complete project documentation and architecture
2. **`/home/divyansh/code/portfolio_3d/index.html`** - Main HTML structure with chat modal elements
3. **`/home/divyansh/code/portfolio_3d/package.json`** - Project dependencies and scripts

### CSS Architecture (Read in Order)
4. **`src/styles/base.css`** - CSS custom properties and responsive breakpoints
5. **`src/styles/glass-components.css`** - Enhanced glassmorphism system with all variants
6. **`src/styles/chat-modal.css`** - Interactive chat modal styles and animations
7. **`src/styles/ui-components.css`** - Base UI component styles
8. **`src/styles/layout.css`** - Grid background and WebGL canvas positioning

### JavaScript Modules
9. **`src/js/main.js`** - Main application entry point and PortfolioApp class
10. **`src/js/chat-modal.js`** - ChatModal class handling content replacement system
11. **`src/js/fluid-simulation.js`** - WebGL fluid simulation (check splatStack fixes)

### Reference Materials
12. **`mockup2.png`** - Target design for chat modal interface
13. **`Glassmorphism-Clock/styles.css`** - Reference for enhanced glass effects

## 🚀 Development Commands

```bash
npm run dev    # Start development server (localhost:5173)
npm run build  # Production build
```

## 🎨 Current Design System

### Glass Panel Variants
- **`.glass-panel`**: Base frosted glass with `blur(30px) saturate(180%)`
- **`.glass-panel--modal`**: Main chat container with enhanced effects
- **`.glass-panel--chat-element`**: Darker tinted elements for contrast
- **`.glass-panel--button`**: Interactive elements with hover states

### Key Measurements
- **Chat Input**: `33.333vw` (1/3 screen width)
- **Avatar**: `calc(100vw / 15)` (1/15th screen width, square)
- **Modal**: `50vw × 96vh` (centered on screen)
- **Quick Questions**: 5 equal-width buttons within modal

### CSS Custom Properties
```css
--chat-input-width: 33.333vw;
--avatar-size: calc(var(--chat-input-width) / 3);
--spacing-xs to --spacing-xl: 0.5rem to 3rem;
```

## ⚠️ Critical Implementation Notes

1. **No Hardcoded Values**: All sizing uses viewport calculations and CSS custom properties
2. **Content Replacement**: Chat modal replaces content, doesn't overlay it
3. **Pointer Events**: Essential for fluid simulation to work behind modal
4. **Avatar Alignment**: Upper edge must align exactly with glass card top edge
5. **Responsive**: All components work across screen sizes with logical proportions

## 🐛 Known Issues to Watch

1. **Fluid Simulation**: Check if random splats are disabled (spacebar events commented out)
2. **Avatar Positioning**: Ensure no overlap, exact edge alignment with glass card
3. **Glass Contrast**: Chat elements need darker tint for visibility
4. **Mobile Responsive**: Test chat modal on various screen sizes

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

1. **4 Remaining Preset Showcases**: Build Projects, Skills, Fun, and Contact section UIs
2. **AI Chatbot Integration**: Connect real AI responses for typed questions
3. **Animation Polish**: Enhance modal transitions and showcase entry animations
4. **Mobile Testing**: Verify all showcases work properly across screen sizes
5. **Performance Optimization**: Ensure smooth transitions between showcase types

## 🎯 Quick Start for New Instance

1. Read CLAUDE.md for complete architecture understanding
2. Examine mockup2.png to understand target chat modal design
3. Review glass-components.css for current glass implementation
4. Check chat-modal.css for content replacement system
5. Test the chat modal by typing text and pressing Enter
6. Verify fluid simulation continues working in chat mode

The codebase is well-organized, professionally structured, and ready for further development. Focus on enhancing user experience and adding new interactive features while maintaining the established design system.