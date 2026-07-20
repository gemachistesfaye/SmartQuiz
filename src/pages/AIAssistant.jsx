import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { Send, Sparkles, Brain, Lightbulb, User, Bot, Loader2, Settings, Target, Trophy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../context/AuthContext';
import { useQuizHistory } from '../hooks/useFirestore';

const TIPS = [
  "Use console.table() to visualize large arrays and objects more clearly.",
  "Always use === instead of == to avoid type coercion bugs.",
  "Arrow functions don't have their own 'this' — use them for callbacks.",
  "Use optional chaining (?.) to safely access deeply nested properties.",
  "const prevents reassignment, but objects/arrays are still mutable.",
  "Destructuring makes extracting values from objects clean and readable.",
  "Use template literals instead of string concatenation for readability.",
  "Promise.all() runs multiple async operations in parallel.",
  "Use early returns to flatten nested if-else chains.",
  "Map, filter, and reduce are more expressive than for loops.",
  "Use semantic HTML tags (article, section, nav) for better accessibility.",
  "CSS Grid is ideal for 2D layouts; Flexbox is best for 1D.",
  "Always sanitize user input to prevent XSS attacks.",
  "Use HTTPS everywhere — never send credentials over plain HTTP.",
  "Hash passwords with bcrypt, never store them in plain text.",
];


export default function AIAssistant() {
  useAuth(); // Ensure auth context is available
  const { history: quizHistory } = useQuizHistory(10);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I'm your SmartQuiz AI Tutor. I can help you with programming, HTML, CSS, math, science, history, and more. What would you like to learn about today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    const defaultKey = import.meta.env.VITE_OPENAI_API_KEY || "";
    const saved = localStorage.getItem('openai_api_key');
    if (saved === null) {
      if (defaultKey) localStorage.setItem('openai_api_key', defaultKey);
      return defaultKey;
    }
    if (saved !== '' && defaultKey && saved !== defaultKey) {
      localStorage.setItem('openai_api_key', defaultKey);
      return defaultKey;
    }
    return saved;
  });
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [currentTip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Quiz history is now provided by the shared useQuizHistory hook

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('openai_api_key', key);
    setShowApiSettings(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    if (apiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `You are SmartQuiz AI Tutor — a friendly, knowledgeable assistant built into the SmartQuiz platform.

                       ABOUT SMARTQUIZ:
                       SmartQuiz is a multi-language educational platform for mastering programming through AI-powered quizzes, interactive code labs, theory guides, and personalized learning. Built with React, Firebase, and OpenAI.

                       PLATFORM FEATURES:
                       1. **Quiz Arena**: 13 categories (JavaScript, HTML, CSS, React, TypeScript, Python, Cybersecurity, Backend, SQL, NoSQL, AI Engineering, AI, DSA) with 125 questions each. Modes: Daily Challenge (5 questions, timed) and Full Quiz. Difficulty levels: Easy, Medium, Hard. Earn 50 XP per correct answer + streak bonuses.
                       2. **Code Lab**: 79+ interactive code snippets across 13 categories. Run code in-browser with a custom console. Categories include JavaScript (21 snippets), HTML, CSS, React, Python, TypeScript, Cybersecurity, Backend, SQL, NoSQL, AI Engineering, AI, DSA.
                       3. **Theory Vault**: 100+ searchable programming concepts with detailed explanations, code examples, and bookmark system. Filter by category.
                       4. **Cybersecurity Academy**: Interactive learning tracks (XSS Prevention, Secure Authentication, API Security) with lab challenges and XP rewards.
                       5. **AI Tutor (You!)**: Chat-based assistant for programming help, general knowledge, and study tips. Works in Simulation Mode (no key) or Live API Mode (OpenAI key).
                       6. **Analytics**: Score history charts, category breakdown, quiz history, best streak tracking.
                       7. **Leaderboard**: Global rankings by XP with top 3 podium display.
                       8. **Dashboard**: Stats overview, quick start grid, performance chart, study streak tracker, daily challenge progress.
                       9. **Profile**: Edit name/username, view XP/streak, role badge (Student/Admin).
                       10. **Settings**: Notifications, appearance (dark mode), quiz defaults, account security.
                       11. **Gamification**: XP system, streaks, 6 achievement badges (First Flight, Quick Learner, Fire Streak, Secure Coder, Top Tier, JS Master).
                       12. **Admin Panel**: User management, question bank management, platform stats, security status.

                       YOUR CAPABILITIES:
                       - Answer questions about programming, HTML, CSS, math, science, history.
                       - Explain how to use any SmartQuiz feature (quiz, codelab, theory, etc.).
                       - Help users navigate the platform and understand their options.
                       - Provide study tips and learning guidance.

                       RULES:
                       - Be helpful, clear, and concise. Use simple language.
                       - When asked about SmartQuiz, explain features clearly and guide users.
                       - Provide code snippets when relevant (HTML, CSS, JS, Python, etc.).
                       - Use markdown formatting for readability (headers, lists, code blocks).
                       - If you don't know something, say so honestly rather than guessing.
                       - Always be encouraging and supportive.`
              },
              {
                role: "user",
                content: input
              }
            ]
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "OpenAI API Error");
        }

        const data = await response.json();
        const text = data.choices[0].message.content;

        setMessages(prev => [...prev, { role: 'bot', content: text }]);
      } catch (error) {
        console.error("OpenAI API Error:", error);
        const msg = error.message || '';
        let friendlyMsg;
        if (msg.includes('quota') || msg.includes('exceeded')) {
          friendlyMsg = "My AI brain is resting — the API quota has been exceeded. You can update the API key in settings, or I can still help in **Simulation Mode** (no key needed).";
        } else if (msg.includes('invalid') || msg.includes('Unauthorized')) {
          friendlyMsg = "That API key doesn't look right. Please check your key in **Settings** (gear icon above), or clear it to use Simulation Mode.";
        } else {
          friendlyMsg = "Something went wrong connecting to the AI. I'll keep helping in **Simulation Mode** for now.";
        }
        setMessages(prev => [...prev, { role: 'bot', content: friendlyMsg }]);
        // Fallback: clear the bad key so simulation mode kicks in
        setApiKey('');
        localStorage.removeItem('openai_api_key');
      } finally {
        setIsTyping(false);
      }
      return;
    }

    // Simulation (Fallback)
    setTimeout(() => {
      let response = "";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('how can you help') || lowerInput.includes('what can you do')) {
        response = "I'm your **SmartQuiz AI Tutor**! Here's what I can help with:\n\n" +
                   "• **SmartQuiz Features**: Quiz Arena, Code Lab, Theory Vault, Analytics, Leaderboard, and more.\n" +
                   "• **Programming**: JavaScript, Python, Java, C++, React, and more.\n" +
                   "• **Web Dev**: HTML, CSS, Flexbox, Grid, responsive design.\n" +
                   "• **CS Concepts**: Data structures, algorithms, databases.\n" +
                   "• **General Knowledge**: Math, science, history, everyday questions.\n" +
                   "• **Study Tips**: Time management, exam prep, note-taking.\n\n" +
                   "Ask me anything about the platform or any topic you're learning!";
      } else if (lowerInput.includes('review my code') || lowerInput.includes('code review')) {
        response = "### Code Review\n\n" +
                   "Paste your code and I'll review it! Here's what I check:\n\n" +
                   "1. **Readability**: Clear variable names and structure.\n" +
                   "2. **Efficiency**: No unnecessary operations.\n" +
                   "3. **Error Handling**: Edge cases covered.\n" +
                   "4. **Best Practices**: Following language conventions.\n\n" +
                   "Go ahead and share your code snippet!";
      }
      // SmartQuiz - What is it
      else if (lowerInput.includes('what is smartquiz') || lowerInput.includes('what is this app') || lowerInput.includes('about smartquiz') || lowerInput.includes('tell me about this platform')) {
        response = "### About SmartQuiz\n\n" +
                   "**SmartQuiz** is an AI-powered educational platform for mastering programming through interactive quizzes, code labs, theory guides, and personalized learning.\n\n" +
                   "**Key Features:**\n" +
                   "• **Quiz Arena**: 13 categories, 125+ questions each, timed challenges\n" +
                   "• **Code Lab**: 79+ runnable code snippets across 13 topics\n" +
                   "• **Theory Vault**: 100+ searchable concepts with code examples\n" +
                   "• **Cybersecurity Academy**: Interactive security learning tracks\n" +
                   "• **AI Tutor**: Chat-based assistant (that's me!)\n" +
                   "• **Leaderboard**: Compete with other learners\n" +
                   "• **Analytics**: Track your progress and weak areas\n\n" +
                   "Start by taking a quiz or exploring the Code Lab!";
      }
      // SmartQuiz - Quiz
      else if ((lowerInput.includes('smartquiz') || lowerInput.includes('this app') || lowerInput.includes('platform')) && (lowerInput.includes('quiz') || lowerInput.includes('question'))) {
        response = "### Quiz Arena\n\n" +
                   "The Quiz Arena has **13 categories** with **125 questions each** (1,625+ total!):\n\n" +
                   "JavaScript, HTML, CSS, React, TypeScript, Python, Cybersecurity, Backend, SQL, NoSQL, AI Engineering, AI, DSA\n\n" +
                   "**How to Start:**\n" +
                   "1. Go to **Quiz Arena** from the sidebar\n" +
                   "2. Pick a category (or \"All\" for mixed)\n" +
                   "3. Choose difficulty: Easy, Medium, Hard, or All\n" +
                   "4. Select mode: **Daily Challenge** (5 timed questions) or **Full Quiz** (all 125)\n\n" +
                   "**Scoring:** 50 XP per correct answer + 10 XP streak bonus per consecutive correct!";
      }
      // SmartQuiz - Code Lab
      else if (lowerInput.includes('code lab') || lowerInput.includes('codelab') || lowerInput.includes('code snippets') || lowerInput.includes('run code')) {
        response = "### Code Lab\n\n" +
                   "The Code Lab has **79+ interactive code snippets** you can run in-browser!\n\n" +
                   "**Categories:**\n" +
                   "JavaScript (21), HTML (5), CSS (6), React (4), TypeScript (5), Python (5), Cybersecurity (4), Backend (5), SQL (5), NoSQL (5), AI Engineering (4), AI (5), DSA (5)\n\n" +
                   "**How to Use:**\n" +
                   "1. Go to **Code Lab** from the sidebar\n" +
                   "2. Filter by category and difficulty\n" +
                   "3. Choose how many snippets (5, 10, or All)\n" +
                   "4. Click **Run** or press **Ctrl+Enter** to execute code\n" +
                   "5. See output in the custom console below\n\n" +
                   "Great for learning by example!";
      }
      // SmartQuiz - Theory
      else if (lowerInput.includes('theory') || lowerInput.includes('theory vault') || lowerInput.includes('concepts') || lowerInput.includes('learn concepts')) {
        response = "### Theory Vault\n\n" +
                   "The Theory Vault has **100+ programming concepts** organized by category.\n\n" +
                   "**Features:**\n" +
                   "• Search by keyword (title, description, subcategory)\n" +
                   "• Filter by category (all 13 categories)\n" +
                   "• Bookmark concepts for later review\n" +
                   "• Each concept has: overview, key points, code examples\n" +
                   "• Direct link to take a quiz on that category\n\n" +
                   "Access it from the sidebar under **Theory Vault**!";
      }
      // SmartQuiz - Leaderboard
      else if (lowerInput.includes('leaderboard') || lowerInput.includes('ranking') || lowerInput.includes('top users') || lowerInput.includes('compete')) {
        response = "### Leaderboard\n\n" +
                   "The Leaderboard shows the **top 20 learners** ranked by XP.\n\n" +
                   "**Features:**\n" +
                   "• Top 3 podium with medals (Crown, Gold, Silver, Bronze)\n" +
                   "• Shows rank, name, role (Student/Admin), XP, and streak\n" +
                   "• Real-time updates as users earn XP\n\n" +
                   "**How to Climb:**\n" +
                   "• Earn XP by taking quizzes (50 XP per correct answer)\n" +
                   "• Get streak bonuses (+10 XP per consecutive correct)\n" +
                   "• Complete Code Lab challenges\n" +
                   "• Finish Cybersecurity tracks (+1000 XP each)\n\n" +
                   "Check your rank from the sidebar!";
      }
      // SmartQuiz - Analytics
      else if (lowerInput.includes('analytics') || lowerInput.includes('stats') || lowerInput.includes('progress') || lowerInput.includes('my scores')) {
        response = "### Analytics\n\n" +
                   "Track your learning progress with detailed analytics!\n\n" +
                   "**What You See:**\n" +
                   "• **Total XP** earned across all activities\n" +
                   "• **Average Quiz Score** percentage\n" +
                   "• **Quizzes Taken** count\n" +
                   "• **Best Streak** (consecutive days)\n" +
                   "• **Score History Chart**: Visual graph of your last 14 quiz scores\n" +
                   "• **Category Breakdown**: Per-category accuracy with color-coded bars\n" +
                   "• **Recent Quizzes**: Your last 5 attempts with details\n\n" +
                   "Access from the sidebar under **Analytics**!";
      }
      // SmartQuiz - Cybersecurity
      else if (lowerInput.includes('cybersecurity') || lowerInput.includes('security academy') || lowerInput.includes('security track')) {
        response = "### Cybersecurity Academy\n\n" +
                   "Interactive security learning with **3 tracks** and **lab challenges**:\n\n" +
                   "1. **XSS Prevention** (Advanced): Sanitize input to prevent Cross-Site Scripting\n" +
                   "2. **Secure Authentication** (Expert): JWTs, sessions, MFA, secure cookies\n" +
                   "3. **API Security** (Intermediate): Rate limiting, brute force protection\n\n" +
                   "**Features:**\n" +
                   "• Code examples with syntax highlighting\n" +
                   "• Interactive lab challenges\n" +
                   "• Secure practice guidelines\n" +
                   "• **+1000 XP** reward per completed track\n\n" +
                   "Find it in the sidebar under **Cybersecurity**!";
      }
      // SmartQuiz - Badges
      else if (lowerInput.includes('badge') || lowerInput.includes('achievement') || lowerInput.includes('unlock')) {
        response = "### Achievement Badges\n\n" +
                   "Earn **6 badges** as you progress:\n\n" +
                   "1. **First Flight** - Complete your first quiz\n" +
                   "2. **Quick Learner** - Finish a quiz in under 2 minutes\n" +
                   "3. **Fire Streak** - Maintain a 3-day study streak\n" +
                   "4. **Secure Coder** - Complete a Cybersecurity Track\n" +
                   "5. **Top Tier** - Reach the Top 10 on the Leaderboard\n" +
                   "6. **JS Master** - Solve 10 Hard JavaScript questions\n\n" +
                   "Badges appear on your profile as you earn them!";
      }
      // SmartQuiz - How to earn XP
      else if (lowerInput.includes('earn xp') || lowerInput.includes('how to get xp') || lowerInput.includes('xp') || lowerInput.includes('experience points')) {
        response = "### Earning XP (Experience Points)\n\n" +
                   "**Ways to Earn:**\n" +
                   "• **Quiz Correct Answer**: +50 XP\n" +
                   "• **Streak Bonus**: +10 XP per consecutive correct answer\n" +
                   "• **Cybersecurity Track**: +1000 XP per completed track\n\n" +
                   "**What XP Unlocks:**\n" +
                   "• Higher ranking on the Leaderboard\n" +
                   "• Profile stats and progress tracking\n" +
                   "• Badge eligibility (e.g., Top Tier = Top 10)\n\n" +
                   "XP accumulates across all activities. Check your total on the Dashboard or Profile!";
      }
      // SmartQuiz - Daily Challenge
      else if (lowerInput.includes('daily challenge') || lowerInput.includes('daily quiz') || lowerInput.includes('today challenge')) {
        response = "### Daily Challenge\n\n" +
                   "A quick daily quiz to keep your skills sharp!\n\n" +
                   "**Details:**\n" +
                   "• **5 questions** from your chosen category\n" +
                   "• **Timed**: Easy (30s), Medium (20s), Hard (15s), All (25s) per question\n" +
                   "• Earn **50 XP** per correct answer + streak bonuses\n\n" +
                   "**Goal**: Complete 3 quizzes today for bonus progress!\n\n" +
                   "Find it on your **Dashboard** or in the **Quiz Arena**!";
      }
      // SmartQuiz - How to use / navigate
      else if (lowerInput.includes('how to use') || lowerInput.includes('how do i') || lowerInput.includes('where can i') || lowerInput.includes('navigate') || lowerInput.includes('getting started')) {
        response = "### Getting Started with SmartQuiz\n\n" +
                   "**Quick Guide:**\n\n" +
                   "1. **Dashboard** - Your home base with stats, quick start, and daily challenge\n" +
                   "2. **Quiz Arena** - Take quizzes in 13 categories\n" +
                   "3. **Code Lab** - Run and learn from 79+ code snippets\n" +
                   "4. **Theory Vault** - Read 100+ programming concepts\n" +
                   "5. **AI Tutor** - Chat with me for help!\n" +
                   "6. **Analytics** - Track your scores and progress\n" +
                   "7. **Leaderboard** - See how you rank against others\n" +
                   "8. **Cybersecurity** - Learn security with hands-on labs\n\n" +
                   "Use the **sidebar** on the left to navigate. What would you like to try?";
      }
      // HTML
      else if (lowerInput.includes('html')) {
        response = "### HTML (HyperText Markup Language)\n\n" +
                   "HTML is the standard language for creating web pages. It describes the structure of a web page using **elements** represented by **tags**.\n\n" +
                   "**Basic Structure:**\n" +
                   "```html\n" +
                   "<!DOCTYPE html>\n" +
                   "<html>\n" +
                   "<head>\n" +
                   "  <title>My Page</title>\n" +
                   "</head>\n" +
                   "<body>\n" +
                   "  <h1>Hello World!</h1>\n" +
                   "  <p>This is a paragraph.</p>\n" +
                   "</body>\n" +
                   "</html>\n" +
                   "```\n\n" +
                   "**Common Tags:**\n" +
                   "• `<h1>` to `<h6>` — Headings\n" +
                   "• `<p>` — Paragraph\n" +
                   "• `<a>` — Link\n" +
                   "• `<img>` — Image\n" +
                   "• `<div>` — Container\n" +
                   "• `<ul>`, `<ol>`, `<li>` — Lists";
      }
      // CSS Flexbox
      else if (lowerInput.includes('flexbox') || lowerInput.includes('flex box')) {
        response = "### CSS Flexbox\n\n" +
                   "Flexbox is a one-dimensional layout method for arranging items in rows or columns.\n\n" +
                   "**Key Properties:**\n" +
                   "• `display: flex` — Enables flexbox\n" +
                   "• `flex-direction: row | column` — Main axis direction\n" +
                   "• `justify-content: center | space-between` — Horizontal alignment\n" +
                   "• `align-items: center | stretch` — Vertical alignment\n" +
                   "• `flex-wrap: wrap` — Allow items to wrap\n\n" +
                   "**Example:**\n" +
                   "```css\n" +
                   ".container {\n" +
                   "  display: flex;\n" +
                   "  justify-content: center;\n" +
                   "  align-items: center;\n" +
                   "  gap: 1rem;\n" +
                   "}\n" +
                   "```";
      }
      // CSS Grid
      else if (lowerInput.includes('css grid') || lowerInput.includes('grid layout')) {
        response = "### CSS Grid\n\n" +
                   "Grid is a two-dimensional layout system for complex page layouts.\n\n" +
                   "**Key Properties:**\n" +
                   "• `display: grid` — Enables grid\n" +
                   "• `grid-template-columns` — Define columns\n" +
                   "• `grid-template-rows` — Define rows\n" +
                   "• `gap` — Spacing between items\n\n" +
                   "**Example:**\n" +
                   "```css\n" +
                   ".grid {\n" +
                   "  display: grid;\n" +
                   "  grid-template-columns: repeat(3, 1fr);\n" +
                   "  gap: 1rem;\n" +
                   "}\n" +
                   "```";
      }
      // Math
      else if (lowerInput.includes('math') || lowerInput.includes('calculate') || lowerInput.includes('equation') || lowerInput.includes('formula')) {
        response = "### Math Help\n\n" +
                   "I can help with math! Here are some common formulas:\n\n" +
                   "• **Area of Circle**: A = πr²\n" +
                   "• **Pythagorean Theorem**: a² + b² = c²\n" +
                   "• **Quadratic Formula**: x = (-b ± √(b²-4ac)) / 2a\n" +
                   "• **Slope**: m = (y₂ - y₁) / (x₂ - x₁)\n" +
                   "• **Distance**: d = √((x₂-x₁)² + (y₂-y₁)²)\n\n" +
                   "What specific math topic do you need help with?";
      }
      // Science
      else if (lowerInput.includes('science') || lowerInput.includes('physics') || lowerInput.includes('chemistry') || lowerInput.includes('biology')) {
        response = "### Science\n\n" +
                   "I can help with science topics!\n\n" +
                   "• **Physics**: Forces, energy, electricity, waves, motion.\n" +
                   "• **Chemistry**: Atoms, elements, reactions, periodic table.\n" +
                   "• **Biology**: Cells, genetics, evolution, human body.\n\n" +
                   "Which area interests you? Ask a specific question and I'll explain!";
      }
      // History
      else if (lowerInput.includes('history') || lowerInput.includes('historical')) {
        response = "### History\n\n" +
                   "I can help with history! Some major periods:\n\n" +
                   "• **Ancient**: Egypt, Greece, Rome, Mesopotamia\n" +
                   "• **Medieval**: Feudalism, Crusades, Renaissance\n" +
                   "• **Modern**: Industrial Revolution, World Wars, Cold War\n\n" +
                   "What historical topic or event would you like to learn about?";
      }
      // Closure
      else if (lowerInput.includes('closure')) {
        response = "### JavaScript Closures\n\n" +
                   "A closure is a function that remembers the variables from its outer scope, even after the outer function has finished executing.\n\n" +
                   "**Example:**\n" +
                   "```javascript\n" +
                   "function createCounter() {\n" +
                   "  let count = 0;\n" +
                   "  return () => ++count;\n" +
                   "}\n" +
                   "const counter = createCounter();\n" +
                   "console.log(counter()); // 1\n" +
                   "console.log(counter()); // 2\n" +
                   "```\n\n" +
                   "**Use Cases:** Data privacy, function factories, callback patterns.";
      }
      // Event Loop
      else if (lowerInput.includes('event loop')) {
        response = "### The Event Loop\n\n" +
                   "JavaScript is single-threaded but handles concurrency via the **Event Loop**.\n\n" +
                   "1. **Call Stack**: Executes synchronous code.\n" +
                   "2. **Web APIs**: Handles timers, DOM events, fetch.\n" +
                   "3. **Microtask Queue**: Promises (.then) — highest priority.\n" +
                   "4. **Task Queue**: setTimeout/setInterval.\n\n" +
                   "*Microtasks always run before macrotasks.*";
      }
      // JavaScript
      else if (lowerInput.includes('javascript') || lowerInput.includes('js')) {
        response = "### JavaScript\n\n" +
                   "JavaScript is a lightweight, interpreted language for web development and beyond.\n\n" +
                   "**Key Features:**\n" +
                   "• **Dynamic Typing**: Variables can hold any type.\n" +
                   "• **First-Class Functions**: Functions are values.\n" +
                   "• **Event-Driven**: Responds to user actions.\n" +
                   "• **Multi-Paradigm**: OOP, functional, imperative.\n\n" +
                   "What aspect of JavaScript would you like to learn about?";
      }
      // Loops
      else if (lowerInput.includes('loop')) {
        response = "### Loops\n\n" +
                   "Loops execute code repeatedly. Common types:\n\n" +
                   "```javascript\n" +
                   "// for loop\n" +
                   "for (let i = 0; i < 5; i++) { console.log(i); }\n\n" +
                   "// while loop\n" +
                   "while (condition) { /* ... */ }\n\n" +
                   "// for...of (arrays)\n" +
                   "for (const item of arr) { console.log(item); }\n\n" +
                   "// for...in (objects)\n" +
                   "for (const key in obj) { console.log(key); }\n" +
                   "```";
      }
      // TypeScript
      else if (lowerInput.includes('typescript')) {
        response = "### TypeScript\n\n" +
                   "TypeScript is a superset of JavaScript that adds **static typing**.\n\n" +
                   "**Benefits:**\n" +
                   "• Catch errors at compile time\n" +
                   "• Better IDE support and autocomplete\n" +
                   "• Clearer code documentation\n\n" +
                   "**Example:**\n" +
                   "```typescript\n" +
                   "function greet(name: string): string {\n" +
                   "  return `Hello, ${name}!`;\n" +
                   "}\n" +
                   "```";
      }
      // React
      else if (lowerInput.includes('react')) {
        response = "### React\n\n" +
                   "React is a JavaScript library for building user interfaces.\n\n" +
                   "**Core Concepts:**\n" +
                   "• **Components**: Reusable UI pieces\n" +
                   "• **JSX**: HTML-like syntax in JavaScript\n" +
                   "• **State**: Data that changes over time\n" +
                   "• **Props**: Data passed to components\n" +
                   "• **Virtual DOM**: Efficient rendering\n\n" +
                   "What would you like to learn about React?";
      }
      // CSS
      else if (lowerInput.includes('css')) {
        response = "### CSS (Cascading Style Sheets)\n\n" +
                   "CSS styles HTML elements. Modern CSS is very powerful!\n\n" +
                   "**Key Concepts:**\n" +
                   "• **Flexbox**: 1D layout (rows or columns)\n" +
                   "• **Grid**: 2D layout (rows AND columns)\n" +
                   "• **Variables**: `--primary: #3b82f6;`\n" +
                   "• **Media Queries**: Responsive design\n\n" +
                   "What CSS topic do you need help with?";
      }
      // Python
      else if (lowerInput.includes('python')) {
        response = "### Python\n\n" +
                   "Python is a beginner-friendly, versatile language.\n\n" +
                   "**Example:**\n" +
                   "```python\n" +
                   "# Variables\n" +
                   "name = 'World'\n" +
                   "age = 25\n\n" +
                   "# Function\n" +
                   "def greet(name):\n" +
                   "    return f'Hello, {name}!'\n\n" +
                   "# List comprehension\n" +
                   "squares = [x**2 for x in range(10)]\n" +
                   "```\n\n" +
                   "What would you like to learn in Python?";
      }
      // Java
      else if (lowerInput.includes('java')) {
        response = "### Java\n\n" +
                   "Java is a strongly-typed, object-oriented language used in enterprise, Android, and backend development.\n\n" +
                   "**Example:**\n" +
                   "```java\n" +
                   "public class Main {\n" +
                   "    public static void main(String[] args) {\n" +
                   "        System.out.println(\"Hello, World!\");\n" +
                   "    }\n" +
                   "}\n" +
                   "```\n\n" +
                   "What Java topic would you like to explore?";
      }
      // Data structures
      else if (lowerInput.includes('data structure') || lowerInput.includes('algorithm')) {
        response = "### Data Structures & Algorithms\n\n" +
                   "**Common Data Structures:**\n" +
                   "• **Array**: Indexed collection, O(1) access\n" +
                   "• **Linked List**: Sequential, O(1) insert\n" +
                   "• **Stack**: LIFO (Last In, First Out)\n" +
                   "• **Queue**: FIFO (First In, First Out)\n" +
                   "• **Hash Map**: Key-value pairs, O(1) lookup\n" +
                   "• **Tree**: Hierarchical, e.g., Binary Search Tree\n\n" +
                   "**Common Algorithms:**\n" +
                   "• Binary Search, Sorting (Quick, Merge), BFS, DFS\n\n" +
                   "Which data structure or algorithm would you like to learn?";
      }
      // Greetings
      else if (lowerInput.match(/\b(hello|hi|hey|greetings|good morning|good evening)\b/)) {
        response = "Hello! Welcome to SmartQuiz AI Tutor. I can help with programming, web development, math, science, history, and more. What would you like to learn about?";
      }
      // Thanks
      else if (lowerInput.match(/\b(thank|thanks|thx)\b/)) {
        response = "You're welcome! Feel free to ask me anything else. I'm here to help!";
      }
      // Who are you
      else if (lowerInput.includes('who are you') || lowerInput.includes('what are you')) {
        response = "I'm your **SmartQuiz AI Tutor** — a friendly assistant that can help you learn about programming, web development, math, science, history, and more. Whether you're debugging code or studying for an exam, I'm here to help!";
      }
      // General fallback
      else {
        response = "Great question! I can help with:\n\n" +
                   "• **SmartQuiz**: Quiz Arena, Code Lab, Theory Vault, Analytics, Leaderboard, Cybersecurity Academy\n" +
                   "• **Programming**: JavaScript, Python, Java, C++, and more\n" +
                   "• **Web Development**: HTML, CSS, responsive design\n" +
                   "• **Math**: Algebra, geometry, calculus, statistics\n" +
                   "• **Science**: Physics, chemistry, biology\n" +
                   "• **History**: World history, major events\n" +
                   "• **Study Tips**: How to learn effectively\n\n" +
                   "Try asking me a specific question about any of these topics!";
      }

      setMessages(prev => [...prev, { role: 'bot', content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full px-4 md:px-6 pb-6">
        {/* Chat Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Sparkles className="text-primary" size={28} /> AI Study Assistant
            </h1>
            <p className="text-gray-400 mt-1 text-sm hidden md:block">Your personal tutor for programming, web dev, math, science, and more.</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => setShowApiSettings(!showApiSettings)}
              className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all relative group min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="AI API settings"
              aria-expanded={showApiSettings}
            >
              <Settings size={20} />
              <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-[#111] border border-white/10 rounded-lg text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                AI API Settings
              </div>
            </button>
            <div className={`hidden md:flex items-center gap-2 px-4 py-2 border rounded-full transition-colors ${
              apiKey ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${apiKey ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {apiKey ? 'Live API Active' : 'Simulation Mode'}
              </span>
            </div>
          </div>
        </div>

        {/* API Settings Modal */}
        <AnimatePresence>
          {showApiSettings && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 right-6 w-full max-w-80 glass-card p-6 z-50 border-primary/20 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="API settings"
            >
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Settings size={16} /> OpenAI API Config
              </h3>
              <p className="text-[10px] text-gray-400 mb-4 leading-relaxed">
                Enter your OpenAI API Key to enable real-time, unlimited AI conversations. 
                Get one at <a href="https://platform.openai.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline">OpenAI Platform</a>.
              </p>
              <input 
                type="password" 
                placeholder="Paste API Key here..."
                defaultValue={apiKey}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-primary/50 mb-4"
                onBlur={(e) => saveApiKey(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => saveApiKey('')}
                  className="text-[10px] text-red-400 hover:underline font-bold"
                >
                  Clear Key
                </button>
                <button 
                  onClick={() => setShowApiSettings(false)}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-[10px] font-bold"
                >
                  Save & Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8 flex-1 min-h-0 overflow-hidden">
          {/* Chat Window */}
          <div className="lg:col-span-3 flex flex-col glass-card overflow-hidden min-h-0 max-h-[calc(100vh-220px)]">
            <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-6 custom-scrollbar scroll-smooth">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 md:gap-4 max-w-[85%] md:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        msg.role === 'user' ? 'bg-primary' : 'bg-white/10 text-primary'
                      }`}>
                        {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                      </div>
                      <div className={`p-3 md:p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-white/5 text-gray-300 border border-white/5 rounded-tl-none prose prose-invert prose-sm max-w-none'
                      }`}>
                        {msg.role === 'user' ? (
                          msg.content
                        ) : (
                          <ReactMarkdown
                            components={{
                              h1: ({...props}) => <h1 className="text-xl font-bold text-white mb-2" {...props} />,
                              h2: ({...props}) => <h2 className="text-lg font-bold text-white mb-2" {...props} />,
                              h3: ({...props}) => <h3 className="text-md font-bold text-white mb-2 underline" {...props} />,
                              code: ({inline, ...props}) => 
                                inline 
                                  ? <code className="bg-white/10 px-1 rounded text-primary" {...props} />
                                  : <pre className="bg-black/40 p-4 rounded-xl border border-white/10 overflow-x-auto my-2">
                                      <code className="text-primary-200" {...props} />
                                    </pre>,
                              p: ({...props}) => <p className="mb-2 last:mb-0" {...props} />,
                              ul: ({...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                              li: ({...props}) => <li className="mb-1" {...props} />,
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <div className="flex gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary">
                    <Bot size={20} />
                  </div>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={16} className="text-primary animate-spin" />
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3 md:px-6 py-2 md:py-3 border-t border-white/5 flex gap-2 overflow-x-auto bg-white/[0.01] scrollbar-hide">
              <button 
                type="button"
                onClick={() => setInput("What is SmartQuiz and how do I use it?")}
                className="text-[11px] font-bold text-gray-300 hover:text-white bg-white/5 px-3 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors shrink-0 flex items-center gap-1 min-h-[36px]"
              >
                <span aria-hidden="true">ℹ️</span> What is SmartQuiz?
              </button>
              <button 
                type="button"
                onClick={() => setInput("How does the Quiz Arena work?")}
                className="text-[11px] font-bold text-gray-300 hover:text-white bg-white/5 px-3 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors shrink-0 flex items-center gap-1 min-h-[36px]"
              >
                <span aria-hidden="true">📝</span> Quiz Arena
              </button>
              <button 
                type="button"
                onClick={() => setInput("Explain HTML basics")}
                className="text-[11px] font-bold text-gray-300 hover:text-white bg-white/5 px-3 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors shrink-0 flex items-center gap-1 min-h-[36px]"
              >
                <span aria-hidden="true">📄</span> HTML Basics
              </button>
              <button 
                type="button"
                onClick={() => setInput("How does CSS Flexbox work?")}
                className="text-[11px] font-bold text-gray-300 hover:text-white bg-white/5 px-3 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors shrink-0 flex items-center gap-1 min-h-[36px]"
              >
                <span aria-hidden="true">🎨</span> CSS Flexbox
              </button>
              <button 
                type="button"
                onClick={() => setInput("How do I earn XP?")}
                className="text-[11px] font-bold text-gray-300 hover:text-white bg-white/5 px-3 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors shrink-0 flex items-center gap-1 min-h-[36px]"
              >
                <span aria-hidden="true">⭐</span> Earn XP
              </button>
              <button 
                type="button"
                onClick={() => setInput("What is a Closure?")}
                className="text-[11px] font-bold text-gray-300 hover:text-white bg-white/5 px-3 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors shrink-0 flex items-center gap-1 min-h-[36px]"
              >
                <span aria-hidden="true">🔒</span> Closures
              </button>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 md:p-6 border-t border-white/5 bg-white/[0.02]">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything — programming, math, science, history..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 md:py-4 pl-5 md:pl-6 pr-14 md:pr-16 text-white focus:outline-none focus:border-primary/50 transition-colors text-sm"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white p-3 rounded-xl transition-all disabled:opacity-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>

          {/* AI Insights Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Brain size={16} className="text-primary" /> Learning Insights
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb size={14} className="text-yellow-400" />
                    <span className="text-xs font-bold text-gray-300">Quick Tip</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    {currentTip}
                  </p>
                </div>
                
                {quizHistory.length > 0 && (() => {
                  const recent = quizHistory.slice(0, 5);
                  const weakCategory = recent.reduce((acc, h) => {
                    const cat = h.category || 'General';
                    if (!acc[cat]) acc[cat] = { correct: 0, total: 0 };
                    acc[cat].total += h.total || 0;
                    acc[cat].correct += h.score || 0;
                    return acc;
                  }, {});
                  const worst = Object.entries(weakCategory).sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))[0];
                  
                  return worst ? (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={14} className="text-red-400" />
                        <span className="text-xs font-bold text-gray-300">Weakness Detected</span>
                      </div>
                      <p className="text-[10px] text-gray-500 leading-relaxed">
                        You've scored {Math.round((worst[1].correct / worst[1].total) * 100)}% in <strong className="text-white">{worst[0]}</strong>. Should we review those?
                      </p>
                      <button className="text-[10px] font-bold text-primary mt-2 hover:underline">Start Revision</button>
                    </div>
                  ) : null;
                })()}

                {quizHistory.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy size={14} className="text-green-400" />
                      <span className="text-xs font-bold text-gray-300">Your Stats</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-center p-2 rounded-lg bg-white/5">
                        <p className="text-lg font-bold text-white">{quizHistory.length}</p>
                        <p className="text-[9px] text-gray-500">Quizzes</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-white/5">
                        <p className="text-lg font-bold text-primary">{Math.round(quizHistory.reduce((s, h) => s + (h.percentage || 0), 0) / quizHistory.length)}%</p>
                        <p className="text-[9px] text-gray-500">Avg Score</p>
                      </div>
                    </div>
                  </div>
                )}

                {quizHistory.length === 0 && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Target size={14} className="text-blue-400" />
                      <span className="text-xs font-bold text-gray-300">Getting Started</span>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      Take your first quiz to unlock personalized learning insights and weakness detection.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
