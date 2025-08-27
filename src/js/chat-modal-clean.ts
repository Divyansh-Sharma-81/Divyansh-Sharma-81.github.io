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

  // Generate contact showcase with React components
  generateContactShowcase(): void {
    const contactTextReveal = document.getElementById('contactTextReveal');
    const contactProfileSection = document.getElementById('contactProfileSection');
    const contactInternshipInfo = document.getElementById('contactInternshipInfo');
    
    if (!contactTextReveal || !contactProfileSection || !contactInternshipInfo) return;

    // Clear previous content
    contactTextReveal.innerHTML = '';
    contactProfileSection.innerHTML = '';
    contactInternshipInfo.innerHTML = '';

    // Render Text Reveal Card
    this.renderTextRevealCard(contactTextReveal);
    
    // Render Profile Card
    this.renderProfileCard(contactProfileSection);
    
    // Render Internship Search Info
    this.renderInternshipInfo(contactInternshipInfo);
  }

  private renderTextRevealCard(container: HTMLElement): void {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'glass-panel glass-panel--chat-element rounded-lg p-8 relative overflow-hidden';
    cardDiv.style.backgroundColor = 'var(--glass-bg)';
    cardDiv.style.backdropFilter = 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))';
    cardDiv.style.WebkitBackdropFilter = 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))';
    cardDiv.style.border = '1px solid var(--glass-border)';
    
    // Title and description
    const titleDiv = document.createElement('h2');
    titleDiv.textContent = "Let's Connect!";
    titleDiv.style.color = 'var(--text-primary)';
    titleDiv.className = 'text-lg mb-2';
    
    const descDiv = document.createElement('p');
    descDiv.textContent = "Move your cursor over the card to reveal the message";
    descDiv.style.color = 'var(--text-secondary)';
    descDiv.className = 'text-sm mb-4';
    
    // Interactive reveal container
    const interactiveDiv = document.createElement('div');
    interactiveDiv.className = 'h-40 relative flex items-center overflow-hidden';
    interactiveDiv.style.borderRadius = '8px';
    
    // Text reveal variables
    let widthPercentage = 0;
    let isMouseOver = false;
    let left = 0;
    let localWidth = 0;
    
    // Update dimensions function
    const updateDimensions = () => {
      const rect = interactiveDiv.getBoundingClientRect();
      left = rect.left;
      localWidth = rect.width;
    };
    
    // Reveal overlay (the text that gets revealed)
    const revealOverlay = document.createElement('div');
    revealOverlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--glass-bg);
      backdrop-filter: blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate));
      -webkit-backdrop-filter: blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate));
      z-index: 20;
      clip-path: inset(0 100% 0 0);
      transition: clip-path 0.4s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const revealText = document.createElement('p');
    revealText.textContent = "Let's build something amazing together!";
    revealText.style.cssText = `
      color: var(--text-primary);
      font-size: 1.5rem;
      font-weight: bold;
      text-shadow: 4px 4px 15px rgba(0,0,0,0.5);
      padding: 2.5rem 1rem;
      text-align: center;
      margin: 0;
    `;
    
    revealOverlay.appendChild(revealText);
    
    // Sliding divider
    const divider = document.createElement('div');
    divider.style.cssText = `
      position: absolute;
      top: 0;
      height: 100%;
      width: 8px;
      background: linear-gradient(to bottom, transparent, var(--text-secondary), transparent);
      z-index: 50;
      opacity: 0;
      transition: opacity 0.4s ease;
      left: 0%;
    `;
    
    // Base text container with stars
    const baseContainer = document.createElement('div');
    baseContainer.style.cssText = `
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      mask-image: linear-gradient(to bottom, transparent, white, transparent);
      -webkit-mask-image: linear-gradient(to bottom, transparent, white, transparent);
    `;
    
    const baseText = document.createElement('p');
    baseText.textContent = "Ready to collaborate";
    baseText.style.cssText = `
      color: var(--text-muted);
      font-size: 1.5rem;
      font-weight: bold;
      padding: 2.5rem 1rem;
      text-align: center;
      margin: 0;
      position: relative;
      z-index: 1;
    `;
    
    // Create stars animation
    const starsContainer = document.createElement('div');
    starsContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;
    
    // Create 80 animated particles (exact replication of original motion.span behavior)
    for (let i = 0; i < 80; i++) {
      const star = document.createElement('span');
      
      // Helper functions matching original
      const randomMove = () => Math.random() * 4 - 2;
      const randomOpacity = () => Math.random();
      const random = () => Math.random();
      
      // Initial position (matching original style prop)
      const initialTop = random() * 100;
      const initialLeft = random() * 100;
      
      // Animation duration (20-30 seconds like original)
      const duration = (random() * 10 + 20) * 1000; // Convert to milliseconds
      
      star.style.cssText = `
        position: absolute;
        top: ${initialTop}%;
        left: ${initialLeft}%;
        width: 2px;
        height: 2px;
        background-color: white;
        border-radius: 50%;
        z-index: 1;
        display: inline-block;
      `;
      
      // Create CSS animation that matches motion.span animate prop
      const animationName = `star-${i}`;
      const keyframes = `
        @keyframes ${animationName} {
          0% {
            top: calc(${random() * 100}% + ${randomMove()}px);
            left: calc(${random() * 100}% + ${randomMove()}px);
            opacity: ${randomOpacity()};
            transform: scale(1);
          }
          33% {
            top: calc(${random() * 100}% + ${randomMove()}px);
            left: calc(${random() * 100}% + ${randomMove()}px);
            opacity: ${randomOpacity()};
            transform: scale(1.2);
          }
          66% {
            top: calc(${random() * 100}% + ${randomMove()}px);
            left: calc(${random() * 100}% + ${randomMove()}px);
            opacity: ${randomOpacity()};
            transform: scale(0);
          }
          100% {
            top: calc(${random() * 100}% + ${randomMove()}px);
            left: calc(${random() * 100}% + ${randomMove()}px);
            opacity: ${randomOpacity()};
            transform: scale(1);
          }
        }
      `;
      
      // Inject keyframes
      const style = document.createElement('style');
      style.textContent = keyframes;
      document.head.appendChild(style);
      
      // Apply animation
      star.style.animation = `${animationName} ${duration}ms linear infinite`;
      
      starsContainer.appendChild(star);
    }
    
    baseContainer.appendChild(baseText);
    baseContainer.appendChild(starsContainer);
    
    // Mouse handlers
    const handleMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      if (!isMouseOver) return;
      
      const clientX = event.clientX;
      const relativeX = clientX - left;
      widthPercentage = Math.max(0, Math.min(100, (relativeX / localWidth) * 100));
      
      revealOverlay.style.clipPath = `inset(0 ${100 - widthPercentage}% 0 0)`;
      divider.style.left = `${widthPercentage}%`;
      divider.style.opacity = widthPercentage > 0 ? '1' : '0';
      
      const rotateDeg = (widthPercentage - 50) * 0.1;
      divider.style.transform = `rotate(${rotateDeg}deg)`;
    };
    
    const handleMouseEnter = () => {
      isMouseOver = true;
      updateDimensions();
      revealOverlay.style.transition = 'none';
      divider.style.transition = 'none';
    };
    
    const handleMouseLeave = () => {
      isMouseOver = false;
      widthPercentage = 0;
      revealOverlay.style.transition = 'clip-path 0.4s ease';
      revealOverlay.style.clipPath = 'inset(0 100% 0 0)';
      divider.style.opacity = '0';
      divider.style.transition = 'opacity 0.4s ease';
    };
    
    // Touch handlers for mobile
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (!isMouseOver || event.touches.length === 0) return;
      
      const clientX = event.touches[0].clientX;
      const relativeX = clientX - left;
      widthPercentage = Math.max(0, Math.min(100, (relativeX / localWidth) * 100));
      
      revealOverlay.style.clipPath = `inset(0 ${100 - widthPercentage}% 0 0)`;
      divider.style.left = `${widthPercentage}%`;
      divider.style.opacity = widthPercentage > 0 ? '1' : '0';
    };
    
    // Add event listeners
    interactiveDiv.addEventListener('mouseenter', handleMouseEnter);
    interactiveDiv.addEventListener('mouseleave', handleMouseLeave);
    interactiveDiv.addEventListener('mousemove', handleMouseMove);
    interactiveDiv.addEventListener('touchstart', handleMouseEnter);
    interactiveDiv.addEventListener('touchend', handleMouseLeave);
    interactiveDiv.addEventListener('touchmove', handleTouchMove);
    
    // Handle window resize
    window.addEventListener('resize', updateDimensions);
    
    // Assemble the interactive div
    interactiveDiv.appendChild(baseContainer);
    interactiveDiv.appendChild(revealOverlay);
    interactiveDiv.appendChild(divider);
    
    // Assemble the card
    cardDiv.appendChild(titleDiv);
    cardDiv.appendChild(descDiv);
    cardDiv.appendChild(interactiveDiv);
    
    container.appendChild(cardDiv);
    
    // Initial dimensions update
    setTimeout(updateDimensions, 100);
  }

  private renderProfileCard(container: HTMLElement): void {
    const profileDiv = document.createElement('div');
    profileDiv.className = 'glass-panel glass-panel--chat-element rounded-2xl p-8 sm:p-12';
    profileDiv.style.backgroundColor = 'var(--glass-bg)';
    profileDiv.style.backdropFilter = 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))';
    profileDiv.style.WebkitBackdropFilter = 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))';
    profileDiv.style.border = '1px solid var(--glass-border)';
    
    profileDiv.innerHTML = `
      <header style="display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 1.5rem; margin-bottom: 2.5rem;">
        <div style="display: flex; align-items: center; gap: 1.25rem;">
          <img src="/assets/divyansh.png" alt="Divyansh Sharma" style="width: 5rem; height: 5rem; border-radius: 9999px; border: 4px solid var(--glass-border); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);" />
          <div>
            <h1 style="font-size: 1.875rem; font-weight: 700; color: var(--text-primary);">Divyansh Sharma</h1>
            <p style="color: var(--text-secondary);">Available for Opportunities</p>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 500; color: #22c55e; background-color: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 9999px; padding: 0.25rem 0.75rem;">
          <span style="width: 0.5rem; height: 0.5rem; background-color: #22c55e; border-radius: 9999px;"></span>
          Active
        </div>
      </header>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem 3rem; margin-bottom: 3rem;">
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <svg style="width: 1.25rem; height: 1.25rem; color: #6366f1;" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v13.5a3 3 0 003 3h13.5a3 3 0 003-3V5.25a3 3 0 00-3-3H5.25zm1.5 9a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm3 0a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zm5.25.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM6.75 15a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm3 0a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zm5.25.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM9 5.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z" clip-rule="evenodd" />
            </svg>
            <h2 style="font-weight: 600; color: var(--text-primary);">Availability</h2>
          </div>
          <p style="color: var(--text-primary);">Immediate — Available now</p>
          <p style="font-size: 0.875rem; color: var(--text-secondary);">(open to opportunities)</p>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <svg style="width: 1.25rem; height: 1.25rem; color: #22c55e;" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <h2 style="font-weight: 600; color: var(--text-primary);">Location</h2>
          </div>
          <p style="color: var(--text-primary);">Kolkata, India + Remote</p>
        </div>
        
        <div style="grid-column: 1 / -1; display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <svg style="width: 1.25rem; height: 1.25rem; color: #a855f7;" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h2 style="font-weight: 600; color: var(--text-primary);">Tech Expertise</h2>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; color: var(--text-primary);">
            <ul style="display: flex; flex-direction: column; gap: 0.25rem; list-style: disc; padding-left: 1rem;">
              <li>AI/ML Development & Deployment</li>
              <li>Full-stack Web Development</li>
              <li>Python, JavaScript, TypeScript</li>
              <li>Next.js, React, TailwindCSS</li>
            </ul>
            <ul style="display: flex; flex-direction: column; gap: 0.25rem; list-style: disc; padding-left: 1rem;">
              <li>RAG Pipelines & Vector Databases</li>
              <li>Prompt Engineering & Fine-tuning</li>
              <li>SaaS Product Development</li>
              <li>Open Source Contributions</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div style="margin-top: 3rem; display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">What I Bring</h3>
          <p style="line-height: 1.625; color: var(--text-secondary);">
            Real-world AI development experience from AIRAA (AI platforms, secure GPTs, RAG pipelines).
            Proven track record with hackathon wins and open-source contributions.
            I ship fast and love building useful things that actually work.
          </p>
        </div>
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">Looking For</h3>
          <p style="line-height: 1.625; color: var(--text-secondary);">
            Opportunities to join innovative teams building AI-powered tools that matter. 
            I want to contribute meaningfully, learn rapidly, and create impact. Ready to dive in! 🚀
          </p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 3rem;">
        <button style="background-color: var(--accent-color); color: white; font-weight: 600; border-radius: 9999px; padding: 1rem 2rem; border: none; cursor: pointer; transition: all 0.2s;">
          Get In Touch
        </button>
      </div>
    `;
    
    container.appendChild(profileDiv);
  }

  private renderInternshipInfo(container: HTMLElement): void {
    const infoDiv = document.createElement('div');
    infoDiv.className = 'glass-panel glass-panel--chat-element rounded-lg px-4 py-6 sm:px-8';
    infoDiv.style.backgroundColor = 'var(--glass-bg)';
    infoDiv.style.backdropFilter = 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))';
    infoDiv.style.WebkitBackdropFilter = 'blur(var(--glass-backdrop-blur)) saturate(var(--glass-backdrop-saturate))';
    infoDiv.style.border = '1px solid var(--glass-border)';
    
    infoDiv.innerHTML = `
      <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
        Here are the ways to connect with me 👇
      </p>
      <ul style="display: flex; flex-direction: column; gap: 1rem;">
        <li style="display: flex; align-items: flex-start; gap: 1rem;">
          <div style="width: 1.5rem; height: 1.5rem; display: flex; align-items: center; justify-content: center; border-radius: 9999px; background-color: rgba(99, 102, 241, 0.1); flex-shrink: 0;">
            <svg style="width: 1rem; height: 1rem; color: #6366f1;" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
          </div>
          <p style="color: var(--text-primary);">
            <span style="font-weight: 700; color: var(--text-primary);">Email:</span> Feel free to reach out at <span style="font-weight: 700;">divyanshs81@gmail.com</span> for opportunities or collaboration.
          </p>
        </li>
        <li style="display: flex; align-items: flex-start; gap: 1rem;">
          <div style="width: 1.5rem; height: 1.5rem; display: flex; align-items: center; justify-content: center; border-radius: 9999px; background-color: rgba(34, 197, 94, 0.1); flex-shrink: 0;">
            <svg style="width: 1rem; height: 1rem; color: #22c55e;" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 01-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.804 9.804a3.75 3.75 0 00-1.035-6.037.75.75 0 01.646-1.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 011.06 1.06l-1.757 1.757a3.75 3.75 0 000 5.304z" clip-rule="evenodd" />
            </svg>
          </div>
          <p style="color: var(--text-primary);">
            <span style="font-weight: 700; color: var(--text-primary);">LinkedIn:</span> Connect with me professionally at <span style="font-weight: 700;">linkedin.com/in/divyansh-sharma-81</span>.
          </p>
        </li>
        <li style="display: flex; align-items: flex-start; gap: 1rem;">
          <div style="width: 1.5rem; height: 1.5rem; display: flex; align-items: center; justify-content: center; border-radius: 9999px; background-color: rgba(168, 85, 247, 0.1); flex-shrink: 0;">
            <svg style="width: 1rem; height: 1rem; color: #a855f7;" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </div>
          <p style="color: var(--text-primary);">
            <span style="font-weight: 700; color: var(--text-primary);">GitHub:</span> Check out my projects and contributions at <span style="font-weight: 700;">github.com/Divyansh-Sharma-81</span>.
          </p>
        </li>
      </ul>
    `;
    
    container.appendChild(infoDiv);
  }

}