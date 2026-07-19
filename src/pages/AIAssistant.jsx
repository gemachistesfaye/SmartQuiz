import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { Send, Sparkles, Brain, Lightbulb, User, Bot, Loader2, Settings, Target, Trophy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

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
  const { currentUser } = useAuth();
  const [quizHistory, setQuizHistory] = useState([]);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I'm your SmartQuiz AI Tutor. I can help you understand JavaScript concepts, debug code, or suggest topics to study. What's on your mind today?" }
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

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "users", currentUser.uid, "quizHistory"),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const unsub = onSnapshot(q, (snap) => {
      setQuizHistory(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [currentUser]);

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
                content: `You are a specialized "Pro JavaScript Tutor" for the SmartQuiz app. 
                       STRICT RULES:
                       1. ONLY answer questions related to JavaScript, React, Web Security, CSS, and Web Development.
                       2. If a user asks about anything else (history, cooking, politics, etc.), politely decline and remind them you are here for JavaScript mastery.
                       3. Always provide code snippets in JavaScript/JSX where possible.`
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

    // Pro JavaScript Intelligence Simulation (Fallback)
    setTimeout(() => {
      let response = "";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('how can you help') || lowerInput.includes('what can you do')) {
        response = "As a **Pro JS Assistant**, I provide: \n\n" +
                   "• **Deep Dives**: Structural explanations of Engine internals (V8, Event Loop).\n" +
                   "• **Code Audit**: Paste your snippets for optimization suggestions.\n" +
                   "• **Architecture**: Advice on Design Patterns (Singleton, Factory, Observer).\n" +
                   "• **Modern Standards**: ES2023+ features and best practices.";
      } else if (lowerInput.includes('review my code') || lowerInput.includes('code review')) {
        response = "### 🔍 Code Review Simulation\n\n" +
                   "I see you want a code review! Since I am currently in **Simulation Mode**, here are the top 3 things I always look for in JavaScript code:\n\n" +
                   "1. **Scoping**: Are you using `const` and `let`? Avoid `var` at all costs to prevent memory leaks and scoping bugs.\n" +
                   "2. **Comparison**: Always use strict equality (`===`) instead of abstract equality (`==`) to avoid weird type coercion bugs.\n" +
                   "3. **Async Safety**: If you are using `async/await`, make sure your code is wrapped in a `try/catch` block to handle rejected promises.\n\n" +
                   "If you paste a specific small snippet, I can try to give you more targeted feedback!";
      } else if (lowerInput.includes('closure')) {
        response = "### 🔒 JavaScript Closures\n\n" +
                   "A closure is the combination of a function and the **lexical environment** within which that function was declared. \n\n" +
                   "**Key Use Case:** Data Privacy.\n" +
                   "```javascript\n" +
                   "function createCounter() {\n" +
                   "  let count = 0;\n" +
                   "  return () => ++count;\n" +
                   "}\n" +
                   "const count = createCounter();\n" +
                   "console.log(count()); // 1\n" +
                   "```";
      } else if (lowerInput.includes('event loop')) {
        response = "### 🔄 The Event Loop\n\n" +
                   "JavaScript is single-threaded but handles concurrency via the **Event Loop**. \n\n" +
                   "1. **Call Stack**: Executes synchronous code.\n" +
                   "2. **Web APIs**: Handles timers, DOM events, and fetch.\n" +
                   "3. **Microtask Queue**: Where **Promises** (.then) go. Highest priority!\n" +
                   "4. **Task Queue**: Where setTimeout/setInterval go.\n\n" +
                   "*Tip: Microtasks always run before the next render or macrotask.*";
      } else if (lowerInput.includes('javascript') || lowerInput.includes('js')) {
        response = "### 🚀 What is JavaScript?\n\n" +
                   "**JavaScript** is a lightweight, interpreted, object-oriented language with first-class functions. While most known as the scripting language for Web pages, many non-browser environments also use it, such as **Node.js**.\n\n" +
                   "It is a **multi-paradigm** language, supporting event-driven, functional, and imperative programming styles.";
      } else if (lowerInput.includes('loop')) {
        response = "### 🔁 JavaScript Loops\n\n" +
                   "Loops are used to execute a block of code multiple times. Common types include:\n\n" +
                   "• **for**: Standard iteration.\n" +
                   "• **while**: Continues as long as a condition is true.\n" +
                   "• **for...of**: Best for iterating over arrays.\n" +
                   "• **for...in**: Best for iterating over object properties.";
      } else if (lowerInput.includes('typescript')) {
        response = "### 🟦 TypeScript\n\n" +
                   "TypeScript is a strongly typed superset of JavaScript that adds **static types**.\n\n" +
                   "It helps you catch errors early in your editor and makes large codebases much easier to maintain. All valid JavaScript is also valid TypeScript!";
      } else if (lowerInput.includes('react')) {
        response = "### ⚛️ React\n\n" +
                   "React is a component-based JavaScript library for building user interfaces.\n\n" +
                   "• **Virtual DOM**: React updates the actual DOM efficiently by comparing it with a virtual memory representation.\n" +
                   "• **State**: Data that can change over time and affects what is rendered.";
      } else if (lowerInput.includes('css')) {
        response = "### 🎨 CSS\n\n" +
                   "Cascading Style Sheets (CSS) is used to style the structure created by HTML.\n\n" +
                   "Modern CSS features like **Flexbox**, **Grid**, and **Custom Properties (Variables)** make it extremely powerful for creating responsive layouts.";
      } else if (lowerInput.includes('python') || lowerInput.includes('java')) {
        response = "### 🐍☕ Python & Java\n\n" +
                   "I am primarily a JavaScript tutor, but I know about other languages too!\n\n" +
                   "• **Python**: Great for backend, AI, and data science. Known for its clean, readable syntax.\n" +
                   "• **Java**: A strictly typed, object-oriented language used heavily in enterprise environments.";
      } else if (lowerInput.includes('how') || lowerInput.includes('what') || lowerInput.includes('code') || lowerInput.includes('function') || lowerInput.includes('variable')) {
        response = "### 💻 General Programming Assistant\n\n" +
                   "I see you are asking a general programming question! Since I am currently in **Simulation Mode**, here is a quick guide on that topic:\n\n" +
                   "• **Variables**: Always use `const` by default. Only use `let` if you know the value will change. Never use `var`.\n" +
                   "• **Functions**: Break your code into small, reusable functions. A function should ideally do one thing well.\n" +
                   "• **Debugging**: Use `console.log()` to check variable values, or use the browser's debugger to step through code.\n\n" +
                   "Try asking me about **Closures**, **Event Loop**, **Promises**, or **React** for a more detailed specific response!";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = "Welcome back, Senior Dev! I'm ready to assist with your JavaScript architecture or debugging. What's on the roadmap today?";
      } else {
        response = "That's a solid inquiry. While I'm specialized in **ES6+ core mechanics**, I can also discuss **React Reconciliation**, **Virtual DOM**, or **Memory Management**. \n\nWould you like a deep dive into any of these?";
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
            <p className="text-gray-400 mt-1 text-sm hidden md:block">Your personal JavaScript tutor, available 24/7.</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8 flex-1 min-h-0">
          {/* Chat Window */}
          <div className="lg:col-span-3 flex flex-col glass-card overflow-hidden">
            <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-6 custom-scrollbar">
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
                onClick={() => setInput("Review my code: ")}
                className="text-[11px] font-bold text-gray-300 hover:text-white bg-white/5 px-3 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors shrink-0 flex items-center gap-1 min-h-[36px]"
              >
                <span aria-hidden="true">🔍</span> Code Review
              </button>
              <button 
                type="button"
                onClick={() => setInput("Explain the Event Loop")}
                className="text-[11px] font-bold text-gray-300 hover:text-white bg-white/5 px-3 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors shrink-0 flex items-center gap-1 min-h-[36px]"
              >
                <span aria-hidden="true">🔄</span> Event Loop
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
                  placeholder="Ask about JavaScript..."
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
