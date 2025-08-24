// Chat Modal - Clean Implementation with React Integration

type PresetSection = 'me' | 'projects' | 'skills' | 'fun' | 'contact';

interface Skill {
  name: string;
}

interface SkillCategoryData {
  title: string;
  icon: string;
  skills: Skill[];
}

interface PresetMessages {
  [key: string]: string;
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
  private skillsShowcase: HTMLElement | null;
  private isChatMode: boolean = false;
  private questionsCollapsed: boolean = false;
  private isPresetQuestion: boolean = false;
  private currentSection: PresetSection | null = null;
  private reactRoot: any = null;

  constructor() {
    // Initialize DOM elements
    this.uiContainer = document.querySelector('.ui-container');
    this.defaultChatSection = document.getElementById('defaultChatSection');
    this.chatModalSection = document.getElementById('chatModalSection');
    this.footerSection = document.querySelector('.footer-section');
    
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
    this.skillsShowcase = document.getElementById('skillsShowcase');
    
    this.init();
  }

  init(): void {
    this.setupEventListeners();
    this.setupQuickQuestions();
    this.initializeReactCarousel();
  }

  setupEventListeners(): void {
    // Original chat input (typed questions)
    this.chatInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.chatInput.value.trim()) {
        this.enterChatMode(this.chatInput.value.trim(), false);
      }
    });

    this.sendButton?.addEventListener('click', () => {
      if (this.chatInput?.value.trim()) {
        this.enterChatMode(this.chatInput.value.trim(), false);
      }
    });

    // Modal chat input (typed questions)
    this.chatInputField?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.chatInputField.value.trim()) {
        this.sendNewMessage(this.chatInputField.value.trim(), false);
      }
    });

    this.sendButtonModal?.addEventListener('click', () => {
      if (this.chatInputField?.value.trim()) {
        this.sendNewMessage(this.chatInputField.value.trim(), false);
      }
    });

    // Close chat mode
    this.chatCloseBtn?.addEventListener('click', () => {
      this.exitChatMode();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isChatMode) {
        this.exitChatMode();
      }
    });

    // Questions toggle
    this.questionsToggle?.addEventListener('click', () => {
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
        const section = (button as HTMLElement).dataset.section as PresetSection;
        const message = this.getPresetMessage(section);
        
        if (this.isChatMode) {
          // Update current conversation with preset
          this.sendNewMessage(message, true, section);
        } else {
          // Enter chat mode with preset message
          this.enterChatMode(message, true, section);
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

  async initializeReactCarousel(): Promise<void> {
    try {
      // Dynamically import React and ReactDOM
      const [React, ReactDOM] = await Promise.all([
        import('react'),
        import('react-dom/client')
      ]);
      
      // Dynamically import the carousel component
      const { default: ProjectsCarousel } = await import('../components/ProjectsCarousel');
      
      // Find the projects scroll container
      const projectsContainer = document.getElementById('projectsScrollContainer');
      if (projectsContainer) {
        // Create React root and render the carousel
        this.reactRoot = ReactDOM.createRoot(projectsContainer);
        this.reactRoot.render(React.createElement(ProjectsCarousel));
      }
    } catch (error) {
      console.error('Failed to initialize React carousel:', error);
      // Fallback to showing simple message
      const projectsContainer = document.getElementById('projectsScrollContainer');
      if (projectsContainer) {
        projectsContainer.innerHTML = '<div class="p-4 text-center text-white">Loading projects...</div>';
      }
    }
  }

  enterChatMode(message: string, isPreset: boolean = false, section: PresetSection | null = null): void {
    this.isChatMode = true;
    this.isPresetQuestion = isPreset;
    this.currentSection = section;
    
    // Set the user message
    if (this.userMessageText) {
      this.userMessageText.textContent = message;
    }
    
    // Clear inputs
    if (this.chatInput) this.chatInput.value = '';
    if (this.chatInputField) this.chatInputField.value = '';
    
    // Show loading state
    this.showAIThinking();
    
    // Add chat-mode class to container
    this.uiContainer?.classList.add('chat-mode');
    
    // Activate the modal section
    this.chatModalSection?.classList.add('active');
    
    // Force glass invalidation after DOM changes
    setTimeout(() => {
      if ((window as any).portfolioApp && (window as any).portfolioApp.invalidateGlass) {
        (window as any).portfolioApp.invalidateGlass();
      }
    }, 50);
    
    // Simulate AI response
    setTimeout(() => {
      this.simulateAIResponse(message, isPreset, section);
    }, 2000);
    
    // Focus on modal input
    setTimeout(() => {
      this.chatInputField?.focus();
    }, 500);
  }

  exitChatMode(): void {
    this.isChatMode = false;
    
    // Remove active state
    this.chatModalSection?.classList.remove('active');
    
    // Remove chat-mode class after animation
    setTimeout(() => {
      this.uiContainer?.classList.remove('chat-mode');
      
      // Force glass invalidation after returning to home
      if ((window as any).portfolioApp && (window as any).portfolioApp.invalidateGlass) {
        (window as any).portfolioApp.invalidateGlass();
      }
    }, 300);
    
    // Clear AI thinking state
    this.hideAIThinking();
    
    // Reset questions if collapsed
    if (this.questionsCollapsed) {
      this.questionsCollapsed = false;
      this.quickQuestionsGrid?.classList.remove('collapsed');
      this.questionsToggle?.classList.remove('collapsed');
      const span = this.questionsToggle?.querySelector('span');
      if (span) span.textContent = 'Hide Quick Questions';
    }
  }

  sendNewMessage(message: string, isPreset: boolean = false, section: PresetSection | null = null): void {
    // Update user message display
    if (this.userMessageText) {
      this.userMessageText.textContent = message;
    }
    this.isPresetQuestion = isPreset;
    this.currentSection = section;
    
    // Clear input
    if (this.chatInputField) this.chatInputField.value = '';
    
    // Show AI thinking
    this.showAIThinking();
    
    // Simulate new AI response
    setTimeout(() => {
      this.simulateAIResponse(message, isPreset, section);
    }, 2000);
  }

  showAIThinking(): void {
    // Show the entire AI logo + loading section
    const aiLogoResponse = document.querySelector('.ai-logo-response') as HTMLElement;
    if (aiLogoResponse) {
      aiLogoResponse.style.display = 'flex';
    }
    
    // Hide all response types during thinking
    this.hideAllResponses();
    
    if (this.loadingDots) {
      this.loadingDots.style.display = 'flex';
    }
  }

  hideAIThinking(): void {
    if (this.loadingDots) {
      this.loadingDots.style.display = 'none';
    }
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
    if (this.skillsShowcase) {
      this.skillsShowcase.style.display = 'none';
    }
  }

  hideUserMessage(): void {
    // Hide user message bubble for preset showcases
    const userMessageDisplay = document.querySelector('.user-message-display') as HTMLElement;
    if (userMessageDisplay) {
      userMessageDisplay.style.display = 'none';
    }
  }

  showUserMessage(): void {
    // Show user message bubble for regular responses
    const userMessageDisplay = document.querySelector('.user-message-display') as HTMLElement;
    if (userMessageDisplay) {
      userMessageDisplay.style.display = 'block';
    }
  }

  showResponse(isPreset: boolean, section: PresetSection | null): void {
    // Hide the AI logo + loading section
    const aiLogoResponse = document.querySelector('.ai-logo-response') as HTMLElement;
    if (aiLogoResponse) {
      aiLogoResponse.style.display = 'none';
    }
    this.hideAIThinking();
    
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
    } else if (isPreset && section === 'skills') {
      // Hide user message and show Skills showcase
      this.hideUserMessage();
      if (this.skillsShowcase) {
        this.skillsShowcase.style.display = 'flex';
        // Generate skills showcase with animations
        this.generateSkillsShowcase();
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
    if (isPreset && section === 'me') {
      // Show Me showcase instead of text response
      this.showResponse(true, 'me');
    } else if (isPreset && section === 'projects') {
      // Show Projects showcase instead of text response
      this.showResponse(true, 'projects');
    } else if (isPreset && section === 'skills') {
      // Show Skills showcase instead of text response
      this.showResponse(true, 'skills');
    } else {
      // Generate and show regular text response
      const response = this.generateResponse(userMessage);
      if (this.aiResponseText) {
        this.aiResponseText.textContent = response;
      }
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
      this.quickQuestionsGrid?.classList.add('collapsed');
      this.questionsToggle?.classList.add('collapsed');
      const span = this.questionsToggle?.querySelector('span');
      if (span) span.textContent = 'Show Quick Questions';
    } else {
      this.quickQuestionsGrid?.classList.remove('collapsed');
      this.questionsToggle?.classList.remove('collapsed');
      const span = this.questionsToggle?.querySelector('span');
      if (span) span.textContent = 'Hide Quick Questions';
    }
  }

  // Skills data from animated-skills-&-expertise-page
  private getSkillsData(): SkillCategoryData[] {
    return [
      {
        title: 'Frontend Development',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>`,
        skills: [
          { name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript/TypeScript' }, 
          { name: 'Tailwind CSS' }, { name: 'Bootstrap' }, { name: 'Next.js' }, 
          { name: 'React' }, { name: 'Vercel AI SDK' }, { name: 'Gsap' }
        ],
      },
      {
        title: 'Backend & Systems',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>`,
        skills: [
          { name: 'Unix' }, { name: 'C' }, { name: 'C++' }, { name: 'Python' }, 
          { name: 'Typescript' }, { name: 'Git' }, { name: 'GitHub' }, 
          { name: 'Docker' }, { name: 'GCP' }, { name: 'PostgreSQL' }
        ],
      },
      {
        title: 'Design & Creative Tools',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>`,
        skills: [
          { name: 'Figma' }, { name: 'Davinci Code' }, { name: 'Illustrator' }, 
          { name: 'Canva' }, { name: 'Keynote' }
        ],
      },
      {
        title: 'Soft Skills',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 005 14.5M3 21a6 6 0 019-5.197" />
        </svg>`,
        skills: [
          { name: 'Communication' }, { name: 'Problem-Solving' }, { name: 'Adaptability' },
          { name: 'Learning Agility' }, { name: 'Teamwork' }, { name: 'Creativity' }, { name: 'Focus' }
        ],
      },
      {
        title: 'AI & Fullstack Engineering',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6.75h.008v.008H12V6.75z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25h.008v.008h-.008V8.25zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008zm-3 0h.008v.008H10.5v-.008zm-3 0h.008v.008H7.5v-.008zm-3 0h.008v.008H4.5v-.008zM12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
        </svg>`,
        skills: [
          { name: 'LLM Providers (ChatGPT, Whisper, Groq, Mistral & Claude)' }, 
          { name: 'AI Agents' }, { name: 'Prompt engineering' }, 
          { name: 'Vector databases (Weaviate, Pinecone)' }, 
          { name: 'RAG (Retrieval-Augmented Generation)' }, 
          { name: 'Tool routing & calling' }, { name: 'Hugging Face Transformers' }, 
          { name: 'Vercel AI SDK' }, { name: 'Supabase' }, { name: 'Prisma' }, { name: 'Next.js' }
        ],
      },
    ];
  }

  // Generate skills showcase with animations
  generateSkillsShowcase(): void {
    const skillsCategories = document.getElementById('skillsCategories');
    const skillsDescription = document.getElementById('skillsDescription');
    
    if (!skillsCategories || !skillsDescription) return;
    
    // Clear previous content
    skillsCategories.innerHTML = '';
    skillsDescription.innerHTML = '';
    
    const skillsData = this.getSkillsData();
    const TAG_STAGGER_DELAY = 60; // milliseconds between each tag animation
    const TYPING_SPEED = 5; // milliseconds per character
    
    // Calculate total tags for paragraph timing (like reference code)
    const totalTags = skillsData.reduce((acc, cat) => acc + cat.skills.length, 0);
    
    // Global delay counter for continuous animation across all categories
    let globalDelay = 0;
    
    // Generate skill categories
    skillsData.forEach((category) => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'skill-category';
      
      // Create category title with icon
      const titleDiv = document.createElement('div');
      titleDiv.className = 'category-title';
      titleDiv.innerHTML = `${category.icon}<span>${category.title}</span>`;
      
      // Create skills tags container
      const tagsDiv = document.createElement('div');
      tagsDiv.className = 'skills-tags';
      
      // Create individual skill tags with continuous global delay
      category.skills.forEach((skill) => {
        const tagDiv = document.createElement('div');
        tagDiv.className = 'skill-tag-animated glass-panel glass-panel--chat-element';
        tagDiv.textContent = skill.name;
        
        // Add animation delay using global counter (like reference code)
        setTimeout(() => {
          tagDiv.classList.add('visible');
        }, globalDelay);
        
        globalDelay += TAG_STAGGER_DELAY; // Increment for next tag across all categories
        tagsDiv.appendChild(tagDiv);
      });
      
      categoryDiv.appendChild(titleDiv);
      categoryDiv.appendChild(tagsDiv);
      skillsCategories.appendChild(categoryDiv);
    });
    
    // Add typing animation for description paragraphs (like reference code)
    const paragraph1 = "I've got a solid set of skills! For hard skills, I'm into frontend development with HTML, CSS, JavaScript, and frameworks like Next.js. On the backend, I work with Python, C, and Unix.";
    const paragraph2 = "When it comes to soft skills, I excel in communication, problem-solving, and adaptability. I'm a team player and love getting creative with challenges. Want to know how I apply any of these skills in my projects? 😊";
    
    const paragraph1StartDelay = totalTags * TAG_STAGGER_DELAY + 200;
    const paragraph2StartDelay = paragraph1StartDelay + paragraph1.length * TYPING_SPEED + 300;
    
    // Create paragraph elements
    const para1Div = document.createElement('div');
    para1Div.className = 'typing-paragraph';
    const para2Div = document.createElement('div');
    para2Div.className = 'typing-paragraph';
    
    skillsDescription.appendChild(para1Div);
    skillsDescription.appendChild(para2Div);
    
    // Start typing animations
    this.startTypingAnimation(para1Div, paragraph1, paragraph1StartDelay);
    this.startTypingAnimation(para2Div, paragraph2, paragraph2StartDelay);
  }

  // Typing animation helper method
  startTypingAnimation(element: HTMLElement, text: string, startDelay: number): void {
    const TYPING_SPEED = 5;
    
    setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          element.textContent = text.substring(0, i + 1) + '|';
          i++;
        } else {
          element.textContent = text;
          clearInterval(typingInterval);
        }
      }, TYPING_SPEED);
    }, startDelay);
  }
}