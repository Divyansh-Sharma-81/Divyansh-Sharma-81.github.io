// Main application entry point
import { ChatModal } from './chat-modal.ts';

declare global {
  interface Window {
    portfolioApp: PortfolioApp;
  }
}

class PortfolioApp {
  private chatModal: ChatModal | null = null;
  private isDarkTheme: boolean = false;

  constructor() {
    this.init();
  }

  init(): void {
    console.log('Portfolio App initialized');
    this.initTheme();
    this.setupGridBackground();
    this.setupResponsiveGrid();
    this.loadFluidSimulation();
    this.setupChatModal();
    this.setupThemeToggle();
  }

  setupGridBackground(): void {
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

  setupResponsiveGrid(): void {
    // Handle responsive grid size adjustments
    const updateGridSize = (): void => {
      const width: number = window.innerWidth;
      let gridSize: number;
      
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
  async loadFluidSimulation(): Promise<void> {
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
  invalidateGlass(): void {
    const root: HTMLElement = document.documentElement;
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
  setupChatModal(): void {
    this.chatModal = new ChatModal();
    console.log('Chat Modal initialized');
  }

  // Initialize theme system
  initTheme(): void {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
    } else {
      // Check system preference
      this.isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    this.applyTheme();
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio-theme')) {
        this.isDarkTheme = e.matches;
        this.applyTheme();
      }
    });
  }

  // Apply the current theme
  applyTheme(): void {
    const htmlElement = document.documentElement;
    
    if (this.isDarkTheme) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    // Update WebGL fluid simulation background
    this.updateFluidSimulationTheme();

    // Force glass invalidation after theme change
    setTimeout(() => {
      this.invalidateGlass();
    }, 100);
  }

  // Toggle between light and dark theme
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
    
    // Save preference
    localStorage.setItem('portfolio-theme', this.isDarkTheme ? 'dark' : 'light');
    
    console.log(`Theme switched to: ${this.isDarkTheme ? 'dark' : 'light'}`);
  }

  // Setup theme toggle button
  setupThemeToggle(): void {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }

  // Update WebGL fluid simulation background color based on theme
  updateFluidSimulationTheme(): void {
    // This will be called after WebGL loads to update the background color
    if ((window as any).fluidSimulationConfig) {
      const config = (window as any).fluidSimulationConfig;
      if (this.isDarkTheme) {
        config.BACK_COLOR = { r: 0.04, g: 0.04, b: 0.04 };
      } else {
        config.BACK_COLOR = { r: 1.0, g: 1.0, b: 1.0 };
      }
      console.log(`Fluid simulation background updated for ${this.isDarkTheme ? 'dark' : 'light'} theme`);
    }
  }

}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});

// Export for use with WebGL simulation
export default PortfolioApp;