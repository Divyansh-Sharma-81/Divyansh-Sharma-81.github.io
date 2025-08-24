// Chat Modal - Content Replacement System

type PresetSection = 'me' | 'projects' | 'skills' | 'fun' | 'contact';

interface PresetMessages {
  [key: string]: string;
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  theme: {
    main: string;
    glow: string;
    text: string;
    pillBg: string;
    pillText: string;
    gradientFrom: string;
    gradientTo: string;
    gridCell: string;
    bgColor: string;
  };
  categories: string[];
  techStack: { icon: string; label: string; }[];
  icon: string;
}

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  spawnTime: number;
}

export class ChatModal {
  private uiContainer: Element | null;
  private defaultChatSection: HTMLElement | null;
  private chatModalSection: HTMLElement | null;
  private footerSection: Element | null;
  private chatInput: HTMLInputElement | null;
  private sendButton: HTMLElement | null;
  private userMessageText: HTMLElement | null;
  private aiResponseText: HTMLElement | null;
  private aiMessageArea: HTMLElement | null;
  private loadingDots: HTMLElement | null;
  private chatInputField: HTMLInputElement | null;
  private sendButtonModal: HTMLElement | null;
  private chatCloseBtn: HTMLElement | null;
  private questionsToggle: HTMLElement | null;
  private quickQuestionsGrid: HTMLElement | null;
  private meShowcase: HTMLElement | null;
  private projectsShowcase: HTMLElement | null;
  private isChatMode: boolean = false;
  private questionsCollapsed: boolean = false;
  private isPresetQuestion: boolean = false;
  private currentSection: PresetSection | null = null;
  private projectsScrollContainer: HTMLElement | null = null;
  private carouselLeftBtn: HTMLElement | null = null;
  private carouselRightBtn: HTMLElement | null = null;
  private projectBallAnimations: Map<string, number> = new Map();

  constructor() {
    // Debug: Check if elements exist
    this.uiContainer = document.querySelector('.ui-container');
    this.defaultChatSection = document.getElementById('defaultChatSection');
    this.chatModalSection = document.getElementById('chatModalSection');
    this.footerSection = document.querySelector('.footer-section');
    
    console.log('UI Container:', this.uiContainer);
    console.log('Default Chat Section:', this.defaultChatSection);
    console.log('Chat Modal Section:', this.chatModalSection);
    
    // Original UI elements
    this.chatInput = document.querySelector('.chat-input');
    this.sendButton = document.querySelector('.send-button');
    
    // Modal UI elements
    this.userMessageText = document.getElementById('userMessageText');
    this.aiResponseText = document.getElementById('aiResponseText');
    this.aiMessageArea = document.querySelector('.ai-message-area');
    this.loadingDots = document.querySelector('.loading-dots');
    this.chatInputField = document.querySelector('.chat-input-field');
    this.sendButtonModal = document.querySelector('.send-button-modal');
    this.chatCloseBtn = document.getElementById('chatCloseBtn');
    this.questionsToggle = document.getElementById('questionsToggle');
    this.quickQuestionsGrid = document.getElementById('quickQuestionsGrid');
    
    // Special showcase elements
    this.meShowcase = document.getElementById('meShowcase');
    this.projectsShowcase = document.getElementById('projectsShowcase');
    
    // Projects carousel elements
    this.projectsScrollContainer = document.getElementById('projectsScrollContainer');
    this.carouselLeftBtn = document.getElementById('carouselLeft');
    this.carouselRightBtn = document.getElementById('carouselRight');
    
    console.log('User Message Text:', this.userMessageText);
    console.log('AI Response Text:', this.aiResponseText);
    console.log('Me Showcase:', this.meShowcase);
    console.log('Projects Showcase:', this.projectsShowcase);
    
    this.isChatMode = false;
    this.questionsCollapsed = false;
    this.isPresetQuestion = false; // Track if current question is preset
    
    this.init();
  }

  init(): void {
    this.setupEventListeners();
    this.setupQuickQuestions();
    this.initializeProjectsCarousel();
  }

  setupEventListeners(): void {
    // Original chat input (typed questions)
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.chatInput.value.trim()) {
        this.enterChatMode(this.chatInput.value.trim(), false); // false = not preset
      }
    });

    this.sendButton.addEventListener('click', () => {
      if (this.chatInput.value.trim()) {
        this.enterChatMode(this.chatInput.value.trim(), false); // false = not preset
      }
    });

    // Modal chat input (typed questions)
    this.chatInputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.chatInputField.value.trim()) {
        this.sendNewMessage(this.chatInputField.value.trim(), false); // false = not preset
      }
    });

    this.sendButtonModal.addEventListener('click', () => {
      if (this.chatInputField.value.trim()) {
        this.sendNewMessage(this.chatInputField.value.trim(), false); // false = not preset
      }
    });

    // Close chat mode
    this.chatCloseBtn.addEventListener('click', () => {
      this.exitChatMode();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isChatMode) {
        this.exitChatMode();
      }
    });

    // Questions toggle
    this.questionsToggle.addEventListener('click', () => {
      this.toggleQuestions();
    });
  }

  setupQuickQuestions(): void {
    // Setup original footer buttons
    const originalButtons = document.querySelectorAll('.footer-section .preset-btn');
    
    // Setup modal quick question buttons
    const modalButtons = document.querySelectorAll('.quick-questions-grid .preset-btn');
    
    [...originalButtons, ...modalButtons].forEach(button => {
      button.addEventListener('click', () => {
        const section = button.dataset.section;
        const message = this.getPresetMessage(section);
        
        if (this.isChatMode) {
          // Update current conversation with preset
          this.sendNewMessage(message, true, section); // true = preset, pass section
        } else {
          // Enter chat mode with preset message
          this.enterChatMode(message, true, section); // true = preset, pass section
        }
      });
    });
  }

  getPresetMessage(section: string): string {
    const presetMessages: PresetMessages = {
      me: "Tell me about yourself. What do you work on?",
      projects: "Show me your most interesting projects and what makes them special.",
      skills: "What are your technical skills and areas of expertise?",
      fun: "Tell me something fun or interesting about you!",
      contact: "How can I get in touch with you for opportunities?"
    };
    
    return presetMessages[section] || "Tell me more about this section.";
  }

  enterChatMode(message: string, isPreset: boolean = false, section: PresetSection | null = null): void {
    console.log('Entering chat mode with message:', message, 'isPreset:', isPreset, 'section:', section);
    this.isChatMode = true;
    this.isPresetQuestion = isPreset;
    this.currentSection = section;
    
    // Set the user message
    this.userMessageText.textContent = message;
    
    // Clear inputs
    this.chatInput.value = '';
    this.chatInputField.value = '';
    
    // Show loading state
    this.showAIThinking();
    
    // Add chat-mode class to container - this triggers CSS changes
    this.uiContainer.classList.add('chat-mode');
    console.log('Added chat-mode class to container');
    
    // Activate the modal section
    this.chatModalSection.classList.add('active');
    console.log('Added active class to modal section');
    
    // Force glass invalidation after DOM changes
    setTimeout(() => {
      if (window.portfolioApp && window.portfolioApp.invalidateGlass) {
        window.portfolioApp.invalidateGlass();
      }
    }, 50);
    
    // Simulate AI response - keep loading for 2 seconds
    setTimeout(() => {
      this.simulateAIResponse(message, isPreset, section);
    }, 2000);
    
    // Focus on modal input
    setTimeout(() => {
      this.chatInputField.focus();
    }, 500);
  }

  exitChatMode(): void {
    this.isChatMode = false;
    
    // Cleanup project animations
    this.cleanupProjectAnimations();
    
    // Remove active state
    this.chatModalSection.classList.remove('active');
    
    // Remove chat-mode class after animation
    setTimeout(() => {
      this.uiContainer.classList.remove('chat-mode');
      
      // Force glass invalidation after returning to home
      if (window.portfolioApp && window.portfolioApp.invalidateGlass) {
        window.portfolioApp.invalidateGlass();
      }
    }, 300);
    
    // Clear AI thinking state
    this.hideAIThinking();
    
    // Reset questions if collapsed
    if (this.questionsCollapsed) {
      this.questionsCollapsed = false;
      this.quickQuestionsGrid.classList.remove('collapsed');
      this.questionsToggle.classList.remove('collapsed');
      this.questionsToggle.querySelector('span').textContent = 'Hide Quick Questions';
    }
  }

  sendNewMessage(message: string, isPreset: boolean = false, section: PresetSection | null = null): void {
    // Update user message display
    this.userMessageText.textContent = message;
    this.isPresetQuestion = isPreset;
    this.currentSection = section;
    
    // Clear input
    this.chatInputField.value = '';
    
    // Show AI thinking
    this.showAIThinking();
    
    // Simulate new AI response - keep loading for 2 seconds
    setTimeout(() => {
      this.simulateAIResponse(message, isPreset, section);
    }, 2000);
  }

  showAIThinking(): void {
    // Show the entire AI logo + loading section
    const aiLogoResponse = document.querySelector('.ai-logo-response');
    
    if (aiLogoResponse) {
      aiLogoResponse.style.display = 'flex';
    }
    
    // Hide all response types during thinking
    this.hideAllResponses();
    
    this.loadingDots.style.display = 'flex';
  }

  hideAllResponses(): void {
    // Hide regular text response
    if (this.aiMessageArea) {
      this.aiMessageArea.style.display = 'none';
    }
    
    // Hide all special showcases
    if (this.meShowcase) {
      this.meShowcase.style.display = 'none';
    }
    if (this.projectsShowcase) {
      this.projectsShowcase.style.display = 'none';
    }
  }

  hideUserMessage(): void {
    // Hide user message bubble for preset showcases
    const userMessageDisplay = document.querySelector('.user-message-display');
    if (userMessageDisplay) {
      userMessageDisplay.style.display = 'none';
    }
  }

  showUserMessage(): void {
    // Show user message bubble for regular responses
    const userMessageDisplay = document.querySelector('.user-message-display');
    if (userMessageDisplay) {
      userMessageDisplay.style.display = 'block';
    }
  }

  showResponse(isPreset: boolean, section: PresetSection | null): void {
    // Hide the AI logo + loading section
    const aiLogoResponse = document.querySelector('.ai-logo-response');
    if (aiLogoResponse) {
      aiLogoResponse.style.display = 'none';
    }
    this.loadingDots.style.display = 'none';
    
    if (isPreset && section === 'me') {
      // Hide user message and show Me showcase
      this.hideUserMessage();
      if (this.meShowcase) {
        this.meShowcase.style.display = 'flex';
      }
    } else if (isPreset && section === 'projects') {
      // Hide user message and show Projects showcase
      this.hideUserMessage();
      if (this.projectsShowcase) {
        this.projectsShowcase.style.display = 'flex';
      }
    } else {
      // Show user message and regular text response
      this.showUserMessage();
      if (this.aiMessageArea) {
        this.aiMessageArea.style.display = 'block';
      }
    }
  }

  simulateAIResponse(userMessage: string, isPreset: boolean = false, section: PresetSection | null = null): void {
    console.log('Simulating AI response:', { userMessage, isPreset, section });
    
    if (isPreset && section === 'me') {
      // Show Me showcase instead of text response
      this.showResponse(true, 'me');
    } else if (isPreset && section === 'projects') {
      // Show Projects showcase instead of text response
      this.showResponse(true, 'projects');
    } else {
      // Generate and show regular text response
      const response = this.generateResponse(userMessage);
      this.aiResponseText.textContent = response;
      this.showResponse(false, null);
    }
  }

  generateResponse(message: string): string {
    const lowerMessage: string = message.toLowerCase();
    
    // Enhanced responses for portfolio context
    if (lowerMessage.includes('yourself') || lowerMessage.includes('about you')) {
      return "Hi! I'm Divyansh, a passionate AI/ML engineer and full-stack developer. I love creating innovative solutions that bridge the gap between complex technology and user-friendly interfaces. I specialize in building intelligent systems, interactive web experiences like this portfolio, and exploring the frontiers of artificial intelligence. I'm always excited about pushing the boundaries of what's possible with code!";
    } else if (lowerMessage.includes('projects')) {
      return "I've worked on some exciting projects! This interactive 3D portfolio you're looking at combines WebGL fluid simulation with glassmorphism UI design. I also build AI-powered applications, machine learning models, and full-stack web solutions. Each project teaches me something new about the intersection of technology and user experience. Would you like to hear about any specific type of project?";
    } else if (lowerMessage.includes('skills') || lowerMessage.includes('technical')) {
      return "My technical toolkit includes Python, JavaScript, React, Node.js, TensorFlow, PyTorch, and various AI/ML frameworks. I'm experienced in both frontend and backend development, with expertise in WebGL, 3D graphics, and machine learning. I also work with cloud platforms, databases, and modern DevOps practices. I believe in continuous learning and staying up-to-date with emerging technologies!";
    } else if (lowerMessage.includes('fun') || lowerMessage.includes('interesting')) {
      return "Fun fact: This entire portfolio features a real-time WebGL fluid simulation that responds to your mouse movements! I built the glassmorphism UI components from scratch and designed the whole experience to feel like you're interacting with liquid glass. When I'm not coding, I love experimenting with generative art, exploring new AI research papers, and finding creative ways to make technology more engaging and beautiful.";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('touch')) {
      return "I'd love to connect! You can reach me through LinkedIn, GitHub, or email for professional opportunities, collaborations, or just to chat about technology and innovation. I'm always open to discussing new ideas, working on interesting projects, or sharing knowledge with fellow developers and tech enthusiasts. Feel free to reach out anytime!";
    } else {
      return "That's a great question! I'd be happy to tell you more about that. This interactive portfolio is designed to showcase both my technical skills and creative approach to problem-solving. Is there a particular aspect of my work or background you're most curious about? Feel free to ask me anything!";
    }
  }

  toggleQuestions(): void {
    this.questionsCollapsed = !this.questionsCollapsed;
    
    if (this.questionsCollapsed) {
      this.quickQuestionsGrid.classList.add('collapsed');
      this.questionsToggle.classList.add('collapsed');
      this.questionsToggle.querySelector('span').textContent = 'Show Quick Questions';
    } else {
      this.quickQuestionsGrid.classList.remove('collapsed');
      this.questionsToggle.classList.remove('collapsed');
      this.questionsToggle.querySelector('span').textContent = 'Hide Quick Questions';
    }
  }

  // Project data from project-cards folder
  private getProjectsData(): ProjectData[] {
    return [
      {
        id: 'dressify',
        title: 'Dressify',
        description: 'A fashion-forward outfit recommendation platform leveraging AI to personalize your style.',
        theme: {
          main: '#a855f7', glow: '#a855f7', text: '#d8b4fe', pillBg: 'rgba(168, 85, 247, 0.1)', 
          pillText: '#c084fc', gradientFrom: '#c084fc', gradientTo: '#a855f7', 
          gridCell: 'rgba(216, 180, 254, 0.05)', bgColor: '#16091f'
        },
        categories: ['AI Fashion', 'Recommendations'],
        techStack: [{ icon: '⚛️', label: 'NextJS' }, { icon: '🎨', label: 'TailwindCSS' }, { icon: '📘', label: 'TypeScript' }, { icon: '🤖', label: 'AI' }],
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white"><path d="M9 3H15L17 8H7L9 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 8L20 12V21H4V12L7 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 8H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
      },
      {
        id: 'aishiro',
        title: 'AIshiro',
        description: 'An integrated platform for developing, deploying, and managing AI models at scale.',
        theme: {
          main: '#22c55e', glow: '#22c55e', text: '#86efac', pillBg: 'rgba(34, 197, 94, 0.1)',
          pillText: '#4ade80', gradientFrom: '#4ade80', gradientTo: '#22c55e',
          gridCell: 'rgba(134, 239, 172, 0.07)', bgColor: '#0a1a0f'
        },
        categories: ['Data Science', 'AI Platform'],
        techStack: [{ icon: '⚛️', label: 'NextJS' }, { icon: '🎨', label: 'TailwindCSS' }, { icon: '📘', label: 'TypeScript' }, { icon: '🤖', label: 'AI' }],
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="text-white"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>`
      },
      {
        id: 'mosaic',
        title: "Mosaic's PM Dashboard",
        description: 'A central hub for product managers to track KPIs, roadmaps, and feature progress.',
        theme: {
          main: '#3b82f6', glow: '#3b82f6', text: '#93c5fd', pillBg: 'rgba(59, 130, 246, 0.1)',
          pillText: '#60a5fa', gradientFrom: '#60a5fa', gradientTo: '#3b82f6',
          gridCell: 'rgba(147, 197, 253, 0.07)', bgColor: '#0c1421'
        },
        categories: ['Product Management'],
        techStack: [{ icon: '⚛️', label: 'NextJS' }, { icon: '🎨', label: 'TailwindCSS' }, { icon: '📘', label: 'TypeScript' }, { icon: '🤖', label: 'AI' }],
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="text-white"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`
      },
      {
        id: 'reefchat',
        title: 'Reef-Chat',
        description: 'Real-time communication platform with advanced messaging features and team collaboration tools.',
        theme: {
          main: '#14b8a6', glow: '#14b8a6', text: '#5eead4', pillBg: 'rgba(20, 184, 166, 0.1)',
          pillText: '#2dd4bf', gradientFrom: '#2dd4bf', gradientTo: '#14b8a6',
          gridCell: 'rgba(94, 234, 212, 0.07)', bgColor: '#051a17'
        },
        categories: ['Communication', 'Real-time'],
        techStack: [{ icon: '⚛️', label: 'NextJS' }, { icon: '🎨', label: 'TailwindCSS' }, { icon: '📘', label: 'TypeScript' }, { icon: '🤖', label: 'AI' }],
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="text-white"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`
      },
      {
        id: 'satya',
        title: 'SATYA',
        description: 'Truth verification and fact-checking platform powered by advanced natural language processing.',
        theme: {
          main: '#f97316', glow: '#f97316', text: '#fdba74', pillBg: 'rgba(249, 115, 22, 0.1)',
          pillText: '#fb923c', gradientFrom: '#fb923c', gradientTo: '#f97316',
          gridCell: 'rgba(253, 186, 116, 0.07)', bgColor: '#1f1206'
        },
        categories: ['Truth Verification', 'NLP'],
        techStack: [{ icon: '⚛️', label: 'NextJS' }, { icon: '🎨', label: 'TailwindCSS' }, { icon: '📘', label: 'TypeScript' }, { icon: '🤖', label: 'AI' }],
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="text-white"><path d="M9 12l2 2 4-4"></path><path d="M21 12c-1.5 0-3-1-3-3s1.5-3 3-3 3 1 3 3-1.5 3-3 3"></path><path d="M3 12c1.5 0 3-1 3-3s-1.5-3-3-3-3 1-3 3 1.5 3 3 3"></path></svg>`
      },
      {
        id: 'conference-agent',
        title: 'Conference Agent',
        description: 'AI-powered virtual assistant for managing conference schedules, networking, and event logistics.',
        theme: {
          main: '#ef4444', glow: '#ef4444', text: '#fca5a5', pillBg: 'rgba(239, 68, 68, 0.1)',
          pillText: '#f87171', gradientFrom: '#f87171', gradientTo: '#ef4444',
          gridCell: 'rgba(252, 165, 165, 0.07)', bgColor: '#1f0d0d'
        },
        categories: ['AI Assistant', 'Events'],
        techStack: [{ icon: '⚛️', label: 'NextJS' }, { icon: '🎨', label: 'TailwindCSS' }, { icon: '📘', label: 'TypeScript' }, { icon: '🤖', label: 'AI' }],
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="text-white"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>`
      },
      {
        id: 'chisquarex',
        title: 'Chi-SquareX Projects',
        description: 'Statistical analysis and data science toolkit for advanced hypothesis testing and research.',
        theme: {
          main: '#ec4899', glow: '#ec4899', text: '#f9a8d4', pillBg: 'rgba(236, 72, 153, 0.1)',
          pillText: '#f472b6', gradientFrom: '#f472b6', gradientTo: '#ec4899',
          gridCell: 'rgba(249, 168, 212, 0.07)', bgColor: '#1f0d16'
        },
        categories: ['Statistics', 'Data Science'],
        techStack: [{ icon: '⚛️', label: 'NextJS' }, { icon: '🎨', label: 'TailwindCSS' }, { icon: '📘', label: 'TypeScript' }, { icon: '🤖', label: 'AI' }],
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="text-white"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`
      },
      {
        id: 'mini-projects',
        title: 'Mini Side Projects',
        description: 'A curated collection of experimental side projects and creative coding explorations.',
        theme: {
          main: '#6366f1', glow: '#6366f1', text: '#a5b4fc', pillBg: 'rgba(99, 102, 241, 0.1)',
          pillText: '#818cf8', gradientFrom: '#818cf8', gradientTo: '#6366f1',
          gridCell: 'rgba(165, 180, 252, 0.07)', bgColor: '#0e0e1f'
        },
        categories: ['Experiments', 'Portfolio'],
        techStack: [{ icon: '⚛️', label: 'NextJS' }, { icon: '🎨', label: 'TailwindCSS' }, { icon: '📘', label: 'TypeScript' }, { icon: '🤖', label: 'AI' }],
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="text-white"><path d="M20 7h-9"></path><path d="M11 12h9"></path><path d="M11 17h9"></path><path d="M4 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M4 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M4 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></svg>`
      }
    ];
  }

  // Initialize projects carousel
  initializeProjectsCarousel(): void {
    if (!this.projectsScrollContainer) return;
    
    // Generate all project cards
    this.generateProjectCards();
    
    // Setup carousel navigation
    this.setupCarouselNavigation();
  }

  // Generate project cards with animations
  generateProjectCards(): void {
    if (!this.projectsScrollContainer) return;
    
    const projects = this.getProjectsData();
    this.projectsScrollContainer.innerHTML = '';
    
    projects.forEach(project => {
      const cardElement = this.createAnimatedProjectCard(project);
      this.projectsScrollContainer.appendChild(cardElement);
      
      // Start ball animation for this card
      this.startBallAnimation(project.id, project.theme);
    });
  }

  // Create animated project card
  createAnimatedProjectCard(project: ProjectData): HTMLElement {
    const card = document.createElement('div');
    card.className = 'animated-project-card';
    card.setAttribute('data-project-id', project.id);
    
    // Add hover effect with glow
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = `0 25px 50px -12px ${project.theme.glow}40`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.5), 0 4px 6px -2px rgba(0,0,0,0.5)';
    });
    
    card.innerHTML = `
      <div class="card-animated-grid" style="background-color: ${project.theme.bgColor}; background-image: url('data:image/svg+xml,${encodeURIComponent(`<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="30" height="30" rx="6" fill="${project.theme.gridCell}" /></svg>`)},'); background-size: 2.5rem 2.5rem;">
        <div id="balls-${project.id}"></div>
        <div class="card-icon-section">
          <div class="card-main-icon" style="background: linear-gradient(to bottom right, ${project.theme.gradientFrom}, ${project.theme.gradientTo}); box-shadow: 0 10px 15px -3px ${project.theme.main}33;">
            ${project.icon}
          </div>
        </div>
        <div class="card-tags-section">
          ${project.categories.map(cat => 
            `<span class="card-category-tag" style="color: ${project.theme.text};">${cat}</span>`
          ).join('')}
        </div>
      </div>
      <div class="card-content-section">
        <h2 class="card-title">${project.title}</h2>
        <p class="card-description">${project.description}</p>
        <div class="card-tech-section">
          ${project.techStack.map(tech => 
            `<div class="card-tech-pill" style="color: ${project.theme.pillText};"><span>${tech.icon}</span><span>${tech.label}</span></div>`
          ).join('')}
        </div>
        <div class="card-links-section">
          <a href="#" class="card-link" style="color: ${project.theme.text};">View Details</a>
          <a href="#" class="card-link" style="color: ${project.theme.text};">↗</a>
        </div>
      </div>
    `;
    
    return card;
  }

  // Start ball animation for a project card
  startBallAnimation(projectId: string, theme: any): void {
    const ballsContainer = document.getElementById(`balls-${projectId}`);
    if (!ballsContainer) return;
    
    const balls: Ball[] = [];
    
    // Create initial balls
    for (let i = 0; i < 3; i++) {
      balls.push({
        id: Date.now() + Math.random() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 30,
        vy: (Math.random() - 0.5) * 30,
        size: 12,
        spawnTime: Date.now()
      });
    }
    
    let lastSpawnTime = Date.now();
    let lastTimestamp: number | null = null;
    
    const animate = (timestamp: number) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
        this.projectBallAnimations.set(projectId, requestAnimationFrame(animate));
        return;
      }
      
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      const now = Date.now();
      
      // Add new balls occasionally
      if (now - lastSpawnTime > 1500) {
        lastSpawnTime = now;
        balls.push({
          id: now + Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 30,
          vy: (Math.random() - 0.5) * 30,
          size: 12,
          spawnTime: now
        });
      }
      
      const dtSeconds = deltaTime / 1000;
      
      // Update ball positions
      for (let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];
        
        // Remove old balls
        if (now - ball.spawnTime > 4000) {
          balls.splice(i, 1);
          continue;
        }
        
        // Update position
        ball.x += ball.vx * dtSeconds;
        ball.y += ball.vy * dtSeconds;
        
        // Bounce off edges
        if (ball.x <= 0 || ball.x >= 100) {
          ball.vx *= -1;
          ball.x = Math.max(0, Math.min(100, ball.x));
        }
        if (ball.y <= 0 || ball.y >= 100) {
          ball.vy *= -1;
          ball.y = Math.max(0, Math.min(100, ball.y));
        }
      }
      
      // Render balls
      ballsContainer.innerHTML = balls.map(ball => 
        `<div class="card-animated-ball" style="left: ${ball.x}%; top: ${ball.y}%; width: ${ball.size}px; height: ${ball.size}px;"></div>`
      ).join('');
      
      // Continue animation if card is still visible
      if (document.getElementById(`balls-${projectId}`)) {
        this.projectBallAnimations.set(projectId, requestAnimationFrame(animate));
      }
    };
    
    this.projectBallAnimations.set(projectId, requestAnimationFrame(animate));
  }

  // Setup carousel navigation
  setupCarouselNavigation(): void {
    if (!this.carouselLeftBtn || !this.carouselRightBtn || !this.projectsScrollContainer) return;
    
    const updateArrowStates = () => {
      const { scrollLeft, scrollWidth, clientWidth } = this.projectsScrollContainer!;
      
      if (this.carouselLeftBtn) {
        this.carouselLeftBtn.disabled = scrollLeft < 10;
      }
      if (this.carouselRightBtn) {
        this.carouselRightBtn.disabled = scrollWidth - scrollLeft - clientWidth < 10;
      }
    };
    
    this.carouselLeftBtn.addEventListener('click', () => {
      if (this.projectsScrollContainer) {
        const scrollAmount = this.projectsScrollContainer.clientWidth / 2;
        this.projectsScrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    });
    
    this.carouselRightBtn.addEventListener('click', () => {
      if (this.projectsScrollContainer) {
        const scrollAmount = this.projectsScrollContainer.clientWidth / 2;
        this.projectsScrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });
    
    this.projectsScrollContainer.addEventListener('scroll', updateArrowStates);
    
    // Initial state check
    setTimeout(updateArrowStates, 100);
  }

  // Cleanup animations when switching modes
  private cleanupProjectAnimations(): void {
    this.projectBallAnimations.forEach((animationId) => {
      cancelAnimationFrame(animationId);
    });
    this.projectBallAnimations.clear();
  }
}