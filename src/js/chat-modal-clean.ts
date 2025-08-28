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
  private funShowcase: HTMLElement | null;
  private contactShowcase: HTMLElement | null;
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
    this.funShowcase = document.getElementById('funShowcase');
    this.contactShowcase = document.getElementById('contactShowcase');
    
    this.init();
  }

  init(): void {
    this.setupEventListeners();
    this.setupQuickQuestions();
    this.initializeReactCarousel();
    this.initializeFunShowcase();
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

  async initializeFunShowcase(): Promise<void> {
    try {
      // Dynamically import React and ReactDOM
      const [React, ReactDOM] = await Promise.all([
        import('react'),
        import('react-dom/client')
      ]);
      
      // Dynamically import the fun showcase component
      const { FunShowcase } = await import('../components/ui/fun-showcase');
      
      // Find the fun content container
      const funContainer = document.getElementById('funContentContainer');
      if (funContainer) {
        // Create React root and render the fun showcase
        const funReactRoot = ReactDOM.createRoot(funContainer);
        funReactRoot.render(React.createElement(FunShowcase));
      }
    } catch (error) {
      console.error('Failed to initialize Fun showcase:', error);
      // Fallback to showing simple message
      const funContainer = document.getElementById('funContentContainer');
      if (funContainer) {
        funContainer.innerHTML = '<div class="p-4 text-center text-white">Loading fun content...</div>';
      }
    }
  }

  async initializeContactFloatingDock(): Promise<void> {
    try {
      // Dynamically import React and ReactDOM
      const [React, ReactDOM] = await Promise.all([
        import('react'),
        import('react-dom/client')
      ]);
      
      // Dynamically import the contact floating dock component
      const { default: ContactFloatingDock } = await import('../components/ui/contact-floating-dock');
      
      const dockContainer = document.getElementById('contactFloatingDockContainer');
      if (dockContainer) {
        // Create React root and render the floating dock
        const dockReactRoot = ReactDOM.createRoot(dockContainer);
        dockReactRoot.render(React.createElement(ContactFloatingDock));
      }
    } catch (error) {
      console.error('Failed to initialize Contact floating dock:', error);
      // Fallback to showing simple button
      const dockContainer = document.getElementById('contactFloatingDockContainer');
      if (dockContainer) {
        dockContainer.innerHTML = `
          <button style="background-color: var(--accent-color); color: white; font-weight: 600; border-radius: 9999px; padding: calc(var(--spacing-sm) * 1.25) calc(var(--spacing-lg) * 1.5); border: none; cursor: pointer; font-size: calc(0.95rem + 0.1vw); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
            Get In Touch
          </button>
        `;
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
    
    // Get AI response
    setTimeout(async () => {
      await this.simulateAIResponse(message, isPreset, section);
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
    
    // Get new AI response
    setTimeout(async () => {
      await this.simulateAIResponse(message, isPreset, section);
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
    if (this.funShowcase) {
      this.funShowcase.style.display = 'none';
    }
    if (this.contactShowcase) {
      this.contactShowcase.style.display = 'none';
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
    } else if (isPreset && section === 'fun') {
      // Hide user message and show Fun showcase
      this.hideUserMessage();
      if (this.funShowcase) {
        this.funShowcase.style.display = 'flex';
      }
    } else if (isPreset && section === 'contact') {
      // Hide user message and show Contact showcase
      this.hideUserMessage();
      if (this.contactShowcase) {
        this.contactShowcase.style.display = 'flex';
        // Generate contact showcase with React components
        this.generateContactShowcase();
      }
    } else {
      // Show user message and regular text response
      this.showUserMessage();
      if (this.aiMessageArea) {
        this.aiMessageArea.style.display = 'block';
      }
    }
  }

  async simulateAIResponse(userMessage: string, isPreset: boolean = false, section: PresetSection | null = null): Promise<void> {
    if (isPreset && section === 'me') {
      // Show Me showcase instead of text response
      this.showResponse(true, 'me');
    } else if (isPreset && section === 'projects') {
      // Show Projects showcase instead of text response
      this.showResponse(true, 'projects');
    } else if (isPreset && section === 'skills') {
      // Show Skills showcase instead of text response
      this.showResponse(true, 'skills');
    } else if (isPreset && section === 'fun') {
      // Show Fun showcase instead of text response
      this.showResponse(true, 'fun');
    } else if (isPreset && section === 'contact') {
      // Show Contact showcase instead of text response
      this.showResponse(true, 'contact');
    } else {
      // Get AI response from backend API
      const response = await this.getAIResponse(userMessage);
      if (this.aiResponseText) {
        this.aiResponseText.textContent = response;
      }
      this.showResponse(false, null);
    }
  }

  async getAIResponse(message: string): Promise<string> {
    try {
      // Call the Python backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message.trim() })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      if (data.response) {
        return data.response;
      } else if (data.error) {
        console.error('API error:', data.error);
        return this.getFallbackResponse();
      } else {
        throw new Error('Invalid response format');
      }
      
    } catch (error) {
      console.error('Error calling AI API:', error);
      return this.getFallbackResponse();
    }
  }

  getFallbackResponse(): string {
    // Fallback response when API is unavailable
    const fallbackResponses = [
      "Thanks for your question! I'm experiencing some technical difficulties with my AI responses right now. Feel free to explore my project showcases using the quick question buttons, or try asking again in a moment! 🚀",
      "I appreciate your interest! My AI response system is temporarily unavailable. You can learn more about me through the preset questions below, or please try again shortly! 💻",
      "Great question! I'm having some trouble with my response system at the moment. Check out my projects, skills, and other sections using the buttons below, or give me another try in a bit! ⚡"
    ];
    
    const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    return fallbackResponses[randomIndex];
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

  // Generate skills showcase with animations — each category's tags appear left->right within 3 seconds
  generateSkillsShowcase(): void {
    const skillsCategories = document.getElementById('skillsCategories');
    const skillsDescription = document.getElementById('skillsDescription');
    if (!skillsCategories || !skillsDescription) return;

    // Clear previous content
    skillsCategories.innerHTML = '';
    skillsDescription.innerHTML = '';

    const skillsData = this.getSkillsData();

    // Total time window for all tags in one category to appear (milliseconds)
    const TAG_APPEAR_WINDOW = 3000;

    // Create skill categories
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

      const skillCount = Math.max(1, category.skills.length);
      // Per-tag delay so all tags in this category finish within TAG_APPEAR_WINDOW
      const perTagDelay = TAG_APPEAR_WINDOW / skillCount;

      category.skills.forEach((skill, tagIndex) => {
        const tagDiv = document.createElement('div');
        tagDiv.className = 'skill-tag-animated glass-panel glass-panel--chat-element';
        tagDiv.textContent = skill.name;

        // Initially not visible (CSS should handle .skill-tag-animated defaults)
        // Reveal each tag left->right within the category's 3s window
        const revealAt = Math.round(tagIndex * perTagDelay);
        setTimeout(() => {
          tagDiv.classList.add('visible');
        }, revealAt);

        tagsDiv.appendChild(tagDiv);
      });

      categoryDiv.appendChild(titleDiv);
      categoryDiv.appendChild(tagsDiv);
      skillsCategories.appendChild(categoryDiv);
    });

    // Typing paragraphs: start after the longest category finishes (TAG_APPEAR_WINDOW)
    const paragraph1 = "I've got a solid set of skills! For hard skills, I'm into frontend development with HTML, CSS, JavaScript, and frameworks like Next.js. On the backend, I work with Python, C, and Unix.";
    const paragraph2 = "When it comes to soft skills, I excel in communication, problem-solving, and adaptability. I'm a team player and love getting creative with challenges. Want to know how I apply any of these skills in my projects? 😊";

    const BUFFER_AFTER_TAGS = 300; // small buffer after tags finish
    const paragraph1StartDelay = TAG_APPEAR_WINDOW + BUFFER_AFTER_TAGS;
    const TYPING_SPEED_PER_CHAR = 20; // ms per character (readable typing pace)
    const paragraph2StartDelay = paragraph1StartDelay + (paragraph1.length * TYPING_SPEED_PER_CHAR) + 300;

    // Create paragraph elements and start typing
    const para1Div = document.createElement('div');
    para1Div.className = 'typing-paragraph';
    const para2Div = document.createElement('div');
    para2Div.className = 'typing-paragraph';

    skillsDescription.appendChild(para1Div);
    skillsDescription.appendChild(para2Div);

    this.startTypingAnimation(para1Div, paragraph1, paragraph1StartDelay);
    this.startTypingAnimation(para2Div, paragraph2, paragraph2StartDelay);
  }

  // Typing animation helper method — types text into element after startDelay (ms)
  startTypingAnimation(element: HTMLElement, text: string, startDelay: number): void {
    const TYPING_SPEED = 20; // ms per character

    // safety: clear any previous content
    element.textContent = '';

    setTimeout(() => {
      let i = 0;
      // cursor shown as '|' while typing (keeps previous UX)
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

  // Generate contact showcase with simplified layout
  generateContactShowcase(): void {
    const contactProfileSection = document.getElementById('contactProfileSection');
    const contactInternshipInfo = document.getElementById('contactInternshipInfo');
    
    if (!contactProfileSection || !contactInternshipInfo) return;

    // Clear previous content
    contactProfileSection.innerHTML = '';
    contactInternshipInfo.innerHTML = '';

    // Simple layout: Profile Card first (top), Plain Text second (bottom)
    
    // Render Profile Card (top - like skills-categories)
    this.renderProfileCard(contactProfileSection);
    
    // Render Plain Contact Info Text (bottom - like skills-description)
    this.renderContactPlainText(contactInternshipInfo);
  }


  private renderProfileCard(container: HTMLElement): void {
    const profileDiv = document.createElement('div');
    profileDiv.className = 'glass-panel glass-panel--chat-element contact-profile-card';
    profileDiv.style.backgroundColor = 'var(--glass-bg)';
    profileDiv.style.backdropFilter = 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))';
    profileDiv.style.WebkitBackdropFilter = 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))';
    profileDiv.style.border = '1px solid var(--glass-border)';
    profileDiv.style.borderRadius = '1.5rem';
    profileDiv.style.padding = 'calc(var(--spacing-lg) * 1.25)';
    
    profileDiv.innerHTML = `
      <header style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--spacing-md); margin-bottom: calc(var(--spacing-lg) * 1.5);">
        <div style="display: flex; align-items: center; gap: calc(var(--spacing-md) * 1.2);">
          <img src="/assets/divyansh.png" alt="Divyansh Sharma" style="width: calc(var(--spacing-xl) * 2.5); height: calc(var(--spacing-xl) * 2.5); border-radius: 50%; border: 3px solid var(--glass-border); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); flex-shrink: 0;" />
          <div style="display: flex; flex-direction: column; gap: calc(var(--spacing-xs) * 0.5);">
            <h1 style="font-size: calc(1rem + 0.75vw); font-weight: 700; color: var(--text-primary); line-height: 1.2; margin: 0;">Divyansh Sharma</h1>
            <p style="color: var(--text-secondary); font-size: calc(0.875rem + 0.15vw); margin: 0;">Available for Opportunities</p>
          </div>
        </div>
        <div class="contact-active-badge" style="display: flex; align-items: center; gap: calc(var(--spacing-xs) * 0.75); font-size: calc(0.8rem + 0.1vw); font-weight: 500; color: #22c55e; background-color: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 9999px; padding: calc(var(--spacing-xs) * 0.75) var(--spacing-sm); flex-shrink: 0;">
          <span class="contact-active-dot" style="width: calc(var(--spacing-xs) * 0.75); height: calc(var(--spacing-xs) * 0.75); background-color: #22c55e; border-radius: 50%;"></span>
          Active
        </div>
      </header>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: calc(var(--spacing-lg) * 1.5) calc(var(--spacing-xl) * 1.25); margin-bottom: calc(var(--spacing-lg) * 1.75);">
        <div style="display: flex; flex-direction: column; gap: calc(var(--spacing-sm) * 0.75);">
          <div style="display: flex; align-items: center; gap: calc(var(--spacing-sm) * 0.8);">
            <svg style="width: calc(var(--spacing-md) * 1.25); height: calc(var(--spacing-md) * 1.25); color: #6366f1; flex-shrink: 0;" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v13.5a3 3 0 003 3h13.5a3 3 0 003-3V5.25a3 3 0 00-3-3H5.25zm1.5 9a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm3 0a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zm5.25.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM6.75 15a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm3 0a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zm5.25.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM9 5.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z" clip-rule="evenodd" />
            </svg>
            <h2 style="font-weight: 600; color: var(--text-primary); font-size: calc(1rem + 0.1vw); margin: 0;">Duration</h2>
          </div>
          <div style="padding-left: calc(var(--spacing-md) * 1.25 + var(--spacing-sm) * 0.8);">
            <p style="color: var(--text-primary); font-size: calc(0.95rem + 0.1vw); margin: 0; margin-bottom: calc(var(--spacing-xs) * 0.5); line-height: 1.4;">6 months — starting September 2025</p>
            <p style="font-size: calc(0.85rem + 0.05vw); color: var(--text-secondary); margin: 0; font-style: italic;">(fall 2025)</p>
          </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: calc(var(--spacing-sm) * 0.75);">
          <div style="display: flex; align-items: center; gap: calc(var(--spacing-sm) * 0.8);">
            <svg style="width: calc(var(--spacing-md) * 1.25); height: calc(var(--spacing-md) * 1.25); color: #22c55e; flex-shrink: 0;" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <h2 style="font-weight: 600; color: var(--text-primary); font-size: calc(1rem + 0.1vw); margin: 0;">Location</h2>
          </div>
          <div style="padding-left: calc(var(--spacing-md) * 1.25 + var(--spacing-sm) * 0.8);">
            <p style="color: var(--text-primary); font-size: calc(0.95rem + 0.1vw); margin: 0; line-height: 1.4;">Preferably San Francisco US</p>
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: calc(var(--spacing-lg) * 1.75);">
        <div style="display: flex; align-items: center; gap: calc(var(--spacing-sm) * 0.8); margin-bottom: calc(var(--spacing-md) * 1.2);">
          <svg style="width: calc(var(--spacing-md) * 1.25); height: calc(var(--spacing-md) * 1.25); color: #a855f7; flex-shrink: 0;" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h2 style="font-weight: 600; color: var(--text-primary); font-size: calc(1rem + 0.1vw); margin: 0;">Tech Expertise</h2>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: calc(var(--spacing-sm) * 0.5) calc(var(--spacing-lg) * 1.25); padding-left: calc(var(--spacing-md) * 1.25 + var(--spacing-sm) * 0.8); color: var(--text-primary);">
          <ul style="display: flex; flex-direction: column; gap: calc(var(--spacing-xs) * 0.75); list-style: disc; padding-left: var(--spacing-md); font-size: calc(0.9rem + 0.05vw); line-height: 1.5;">
            <li>Python, Next.js, TypeScript, Tailwind CSS</li>
            <li>Vercel AI SDK, Supabase, Prisma</li>
            <li>OpenAI, Mistral, Claude, Whisper</li>
            <li>Prompt engineering, fine-tuning</li>
          </ul>
          <ul style="display: flex; flex-direction: column; gap: calc(var(--spacing-xs) * 0.75); list-style: disc; padding-left: var(--spacing-md); font-size: calc(0.9rem + 0.05vw); line-height: 1.5;">
            <li>Weaviate, Pinecone, vector DBs</li>
            <li>Hugging Face Transformers</li>
            <li>Tool routing, calling, RAG</li>
            <li>Hackathons + AI agent workflows</li>
          </ul>
        </div>
      </div>
      
      <div style="margin-bottom: calc(var(--spacing-lg) * 1.5);">
        <h3 style="font-size: calc(1.1rem + 0.15vw); font-weight: 600; margin-bottom: calc(var(--spacing-sm) * 1.25); color: var(--text-primary); line-height: 1.3;">What I Bring</h3>
        <p style="line-height: 1.65; color: var(--text-secondary); font-size: calc(0.95rem + 0.1vw); margin: 0; text-align: left;">
          Real-world AI development experience from AIRAA (AI platforms, secure GPTs, RAG pipelines). 
          3x hackathon wins (ETH Oxford, Paris Blockchain Week, Colosseum Breakout on Solana). 
          I ship fast and love building useful things that actually work.
        </p>
      </div>
      
      <div style="margin-bottom: calc(var(--spacing-lg) * 2);">
        <h3 style="font-size: calc(1.1rem + 0.15vw); font-weight: 600; margin-bottom: calc(var(--spacing-sm) * 1.25); color: var(--text-primary); line-height: 1.3;">Looking For</h3>
        <p style="line-height: 1.65; color: var(--text-secondary); font-size: calc(0.95rem + 0.1vw); margin: 0; text-align: left;">
          Opportunities to join innovative teams building AI-powered tools that matter. I want to contribute meaningfully, learn 
          rapidly, and create impact. Ready to dive in! 🚀
        </p>
      </div>
      
      <div id="contactFloatingDockContainer" style="display: flex; justify-content: center; align-items: center; margin-top: calc(var(--spacing-md) * 0.5);">
        <!-- Floating dock will be rendered here by React -->
      </div>
    `;
    
    container.appendChild(profileDiv);
    
    // Initialize the floating dock after adding the profile card to DOM
    setTimeout(() => this.initializeContactFloatingDock(), 0);
  }

  private renderContactPlainText(container: HTMLElement): void {
    // Create plain text content similar to skills-description
    const textDiv = document.createElement('div');
    textDiv.className = 'contact-description';
    
    textDiv.innerHTML = `
      <p>Here are the ways to connect with me 👇</p>
      <p><strong>Email:</strong> Feel free to reach out at <strong>divyanshs81@gmail.com</strong> for opportunities or collaboration.</p>
      <p><strong>LinkedIn:</strong> Connect with me professionally at <strong>linkedin.com/in/divyansh-sharma-81</strong>.</p>
      <p><strong>GitHub:</strong> Check out my projects and contributions at <strong>github.com/Divyansh-Sharma-81</strong>.</p>
    `;
    
    container.appendChild(textDiv);
  }

}