// Main application entry point
import { ChatModal } from './chat-modal.js';

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    console.log('Portfolio App initialized');
    this.setupGridBackground();
    this.setupResponsiveGrid();
    this.loadFluidSimulation();
    this.setupChatModal();
  }

  setupGridBackground() {
    // Grid background is handled by CSS
    // This method can be extended for dynamic grid effects later
    const gridBackground = document.getElementById('gridBackground');
    
    // Add subtle parallax effect to grid (optional enhancement)
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.1;
      gridBackground.style.transform = `translateY(${parallax}px)`;
    });
  }

  setupResponsiveGrid() {
    // Handle responsive grid size adjustments
    const updateGridSize = () => {
      const width = window.innerWidth;
      let gridSize;
      
      if (width < 480) {
        gridSize = 25;
      } else if (width < 768) {
        gridSize = 30;
      } else {
        gridSize = 40;
      }
      
      document.documentElement.style.setProperty('--grid-size', `${gridSize}px`);
    };
    
    // Update on load and resize
    updateGridSize();
    window.addEventListener('resize', updateGridSize);
  }

  // Load the WebGL fluid simulation
  async loadFluidSimulation() {
    try {
      // Import and initialize the fluid simulation
      await import('./fluid-simulation.js');
      console.log('WebGL Fluid Simulation loaded');
      
      // Force CSS invalidation after WebGL loads
      setTimeout(() => this.invalidateGlass(), 100);
    } catch (error) {
      console.error('Failed to load fluid simulation:', error);
    }
  }

  // Force CSS invalidation by changing custom properties
  invalidateGlass() {
    const root = document.documentElement;
    // Change values slightly to force CSS recompilation
    root.style.setProperty('--glass-blur', '30.1px');
    root.style.setProperty('--glass-saturation', '200.1%');
    
    requestAnimationFrame(() => {
      // Reset to original values
      root.style.setProperty('--glass-blur', '30px');
      root.style.setProperty('--glass-saturation', '200%');
    });
  }

  // Setup chat modal functionality
  setupChatModal() {
    this.chatModal = new ChatModal();
    console.log('Chat Modal initialized');
  }

}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});

// Export for use with WebGL simulation
export default PortfolioApp;