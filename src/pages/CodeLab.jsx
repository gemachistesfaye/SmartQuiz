import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { Play, Code, Terminal, Sparkles, Copy, Check, Wand2 } from 'lucide-react';
import DarkSelect from '../components/ui/DarkSelect';

const SNIPPETS = [
  // JavaScript — Fundamentals
  { name: "Standard Greeting", category: "JavaScript", code: `const greeting = "Hello, SmartQuiz Master!";\nconst scores = [85, 92, 78, 95];\nconst average = scores.reduce((a, b) => a + b) / scores.length;\nconsole.log(greeting);\nconsole.log("Your average score is:", average);\nreturn "Ready to master JS?";` },
  { name: "Destructuring", category: "JavaScript", code: `const user = { id: 1, info: { email: "test@sq.com" } };\nconst { info: { email } } = user;\nconsole.log("Email:", email);\nreturn "Clean extraction.";` },
  { name: "Template Literals", category: "JavaScript", code: `const u = "Dev", x = 5000;\nconsole.log(\`User \${u} has \${x} XP\`);\nreturn "Template Literals.";` },
  { name: "Default Parameters", category: "JavaScript", code: `const greet = (n = "Guest") => "Welcome, " + n;\nconsole.log(greet());\nconsole.log(greet("Admin"));\nreturn "Clean defaults.";` },
  { name: "Nullish Coalescing", category: "JavaScript", code: `const x = 0 ?? 10;\nconst y = null ?? 10;\nconsole.log(x, y);\nreturn "Better than || operator.";` },
  { name: "Optional Chaining", category: "JavaScript", code: `const u = { profile: { bio: "Hi" } };\nconsole.log(u?.meta?.tags?.[0]);\nreturn "Safe property access.";` },
  { name: "Map vs Set", category: "JavaScript", code: `const s = new Set([1, 2, 2, 3]);\nconst m = new Map([["a", 1]]);\nconsole.log("Set (Unique):", [...s]);\nconsole.log("Map Value:", m.get("a"));\nreturn "New ES6 collections.";` },
  { name: "Symbol Key", category: "JavaScript", code: `const id = Symbol('id');\nconst u = { [id]: 123, name: "A" };\nconsole.log(u[id]);\nreturn "Hidden unique keys.";` },

  // JavaScript — Advanced
  { name: "Closure Bank", category: "JavaScript", code: `function createBank(name) {\n  let balance = 1000;\n  return {\n    deposit: (amt) => { balance += amt; return balance; },\n    check: () => name + "'s Balance: $" + balance\n  };\n}\nconst myAcc = createBank("Alice");\nmyAcc.deposit(500);\nconsole.log(myAcc.check());\nreturn "Private data secured.";` },
  { name: "Proxy Validation", category: "JavaScript", code: `const user = { age: 25 };\nconst proxy = new Proxy(user, {\n  set(target, prop, val) {\n    if (prop === 'age' && val < 0) throw Error("Invalid age");\n    target[prop] = val;\n    return true;\n  }\n});\nproxy.age = 30;\nconsole.log(proxy.age);\nreturn "Advanced Meta-programming.";` },
  { name: "Generator Function", category: "JavaScript", code: `function* gen() { yield 1; yield 2; yield 3; }\nconst it = gen();\nconsole.log(it.next().value);\nconsole.log(it.next().value);\nreturn "Generators are cool.";` },
  { name: "Class Inheritance", category: "JavaScript", code: `class Animal { constructor(n) { this.n = n; } speak() { return this.n + " makes a sound."; } }\nclass Dog extends Animal { speak() { return this.n + " barks!"; } }\nconst d = new Dog("Rex");\nconsole.log(d.speak());\nreturn "Modern Classes.";` },
  { name: "Promise Chain", category: "JavaScript", code: `Promise.resolve("Step 1")\n  .then(v => v + " -> Step 2")\n  .then(v => { console.log(v); return "Done"; });\nreturn "Promises are cleaner.";` },
  { name: "Try/Catch Async", category: "JavaScript", code: `async function test() {\n  try {\n    throw "Boom!";\n  } catch (e) { console.log("Caught:", e); }\n}\ntest();\nreturn "Error handling.";` },
  { name: "Recursion (Factorial)", category: "JavaScript", code: `const fact = (n) => n <= 1 ? 1 : n * fact(n-1);\nconsole.log("Factorial of 5:", fact(5));\nreturn "Recursive logic.";` },
  { name: "Fibonacci Iterative", category: "JavaScript", code: `function fib(n) {\n  let [a, b] = [0, 1];\n  while (n-- > 0) [a, b] = [b, a + b];\n  return a;\n}\nconsole.log("Fib 10:", fib(10));\nreturn "Efficient iteration.";` },

  // JavaScript — Functional
  { name: "Currying Sum", category: "JavaScript", code: `const sum = a => b => c => a + b + c;\nconsole.log("Sum(1)(2)(3):", sum(1)(2)(3));\nreturn "Currying pattern.";` },
  { name: "Debounce Simulation", category: "JavaScript", code: `const debounce = (fn, delay) => {\n  let t;\n  return () => { clearTimeout(t); t = setTimeout(fn, delay); };\n};\nconst act = debounce(() => console.log('Action!'), 500);\nact(); act();\nreturn "Performance tip.";` },
  { name: "Memoize Function", category: "JavaScript", code: `const memo = (fn) => {\n  const cache = {};\n  return (n) => cache[n] || (cache[n] = fn(n));\n};\nconst fastFact = memo(n => n <= 1 ? 1 : n * fastFact(n-1));\nconsole.log(fastFact(5));\nreturn "Caching results.";` },
  { name: "Pipe Implementation", category: "JavaScript", code: `const pipe = (...fns) => (v) => fns.reduce((a, f) => f(a), v);\nconst add1 = x => x + 1;\nconst sq = x => x * x;\nconsole.log(pipe(add1, sq)(2));\nreturn "Functional pipes.";` },
  { name: "Module Pattern", category: "JavaScript", code: `const Counter = (() => {\n  let count = 0;\n  return {\n    inc: () => ++count,\n    val: () => count\n  };\n})();\nCounter.inc();\nconsole.log(Counter.val());\nreturn "Classic IIFE Module.";` },

  // HTML
  { name: "Semantic Structure", category: "HTML", code: `const html = \`\n  <header><nav>Menu</nav></header>\n  <main>\n    <article>\n      <h1>Title</h1>\n      <section>Content</section>\n    </article>\n    <aside>Sidebar</aside>\n  </main>\n  <footer>Copyright</footer>\n\`;\nconsole.log("Semantic HTML structure created");\nreturn html;` },
  { name: "Form Validation", category: "HTML", code: `const form = {\n  email: "test@example.com",\n  validateEmail(e) { return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(e); },\n  password: "Secret123",\n  validatePassword(p) { return p.length >= 8 && /[A-Z]/.test(p) && /[0-9]/.test(p); }\n};\nconsole.log("Email valid:", form.validateEmail(form.email));\nconsole.log("Password valid:", form.validatePassword(form.password));\nreturn "HTML5 validation patterns.";` },
  { name: "Accessibility Check", category: "HTML", code: `const a11y = {\n  roles: ["banner", "navigation", "main", "contentinfo"],\n  check(img) { return img.alt ? "Pass" : "Fail: missing alt"; },\n  checkLabel(input) { return input.id ? "Pass" : "Fail: missing label"; }\n};\nconsole.log("Roles:", a11y.roles.join(", "));\nconsole.log("Image:", a11y.check({ alt: "logo" }));\nreturn "a11y best practices.";` },
  { name: "Meta Tags Builder", category: "HTML", code: `const meta = {\n  title: "SmartQuiz - Master JS",\n  description: "Interactive JavaScript learning platform",\n  ogImage: "https://smartquiz.com/og.png",\n  render() {\n    return \`<title>\${this.title}</title>\\n<meta name="description" content="\${this.description}">\\n<meta property="og:image" content="\${this.ogImage}">\`;\n  }\n};\nconsole.log(meta.render());\nreturn "SEO meta tags.";` },
  { name: "Canvas Drawing", category: "HTML", code: `const canvas = { width: 400, height: 300 };\nconst ctx = {\n  fillStyle: "#3b82f6",\n  fillRect(x, y, w, h) { console.log(\`Drawing rect at (\${x},\${y}) \${w}x\${h}\`); },\n  arc(x, y, r) { console.log(\`Drawing circle at (\${x},\${y}) r=\${r}\`); }\n};\nctx.fillRect(10, 10, 100, 50);\nctx.arc(200, 150, 40);\nreturn "Canvas 2D API basics.";` },

  // CSS
  { name: "Flexbox Centering", category: "CSS", code: `const styles = {\n  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" },\n  card: { padding: "2rem", borderRadius: "12px", background: "#1a1a2e" }\n};\nconsole.log("Flex center:", JSON.stringify(styles.container));\nreturn "Perfect centering.";` },
  { name: "Grid Layout", category: "CSS", code: `const grid = {\n  display: "grid",\n  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",\n  gap: "16px"\n};\nconsole.log("Responsive grid:", JSON.stringify(grid));\nreturn "CSS Grid magic.";` },
  { name: "Custom Properties", category: "CSS", code: `const css = {\n  ":root": { "--primary": "#3b82f6", "--radius": "12px", "--spacing": "16px" },\n  ".card": { "background": "var(--primary)", "border-radius": "var(--radius)", "padding": "var(--spacing)" }\n};\nconsole.log("CSS Variables:", JSON.stringify(css));\nreturn "Theme system.";` },
  { name: "Responsive Breakpoints", category: "CSS", code: `const breakpoints = {\n  sm: "640px", md: "768px", lg: "1024px", xl: "1280px"\n};\nconst mediaQuery = (bp, styles) => \`@media (min-width: \${bp}) { \${styles} }\`;\nconsole.log(mediaQuery(breakpoints.md, ".container { padding: 24px; }"));\nreturn "Mobile-first CSS.";` },
  { name: "Animation Keyframes", category: "CSS", code: `const animations = {\n  pulse: "0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); }",\n  slideUp: "from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; }",\n  fadeIn: "from { opacity: 0; } to { opacity: 1; }"\n};\nObject.keys(animations).forEach(name => console.log(\`@keyframes \${name} defined\`));\nreturn "CSS animations.";` },
  { name: "Gradient Builder", category: "CSS", code: `const gradients = {\n  primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",\n  dark: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",\n  glass: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))"\n};\nObject.entries(gradients).forEach(([name, val]) => console.log(\`\${name}: \${val.substring(0, 40)}...\`));\nreturn "Modern gradients.";` },

  // React
  { name: "useState Hook", category: "React", code: `// React component pattern\nconst Counter = () => {\n  let count = 0;\n  const increment = () => { count++; console.log("Count:", count); };\n  return { count, increment };\n};\nconst c = Counter();\nc.increment();\nc.increment();\nconsole.log("Final:", c.count);\nreturn "React state pattern.";` },
  { name: "useEffect Pattern", category: "React", code: `const useEffect = (fn, deps) => {\n  console.log("Effect running, deps:", deps);\n  const cleanup = fn();\n  return () => { console.log("Cleanup:", deps); };\n};\nuseEffect(() => { console.log("Mounted!"); return () => console.log("Unmounted!"); }, []);\nreturn "React lifecycle.";` },
  { name: "Custom Hook", category: "React", code: `const useLocalStorage = (key, initial) => {\n  let value = initial;\n  const get = () => { console.log(\`Reading \${key}\`); return value; };\n  const set = (v) => { value = v; console.log(\`Setting \${key} = \${v}\`); };\n  return [get, set];\n};\nconst [getTheme, setTheme] = useLocalStorage("theme", "dark");\nconsole.log("Theme:", getTheme());\nsetTheme("light");\nreturn "Custom hook pattern.";` },
  { name: "Component Composition", category: "React", code: `const Card = ({ title, children }) => ({ title, children, render: () => \`<div class="card"><h2>\${title}</h2>\${children}</div>\` });\nconst card = Card({ title: "Hello", children: "World" });\nconsole.log(card.render());\nreturn "Composition pattern.";` },

  // Cybersecurity
  { name: "XSS Prevention", category: "Cybersecurity", code: `const sanitize = (input) => input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");\nconst malicious = '<script>alert("XSS")</script>';\nconsole.log("Raw:", malicious);\nconsole.log("Clean:", sanitize(malicious));\nreturn "XSS prevention.";` },
  { name: "Password Hashing", category: "Cybersecurity", code: `const hash = (password) => {\n  let h = 0;\n  for (let i = 0; i < password.length; i++) {\n    h = ((h << 5) - h + password.charCodeAt(i)) | 0;\n  }\n  return h.toString(16);\n};\nconsole.log("Hash:", hash("SecurePass123"));\nconsole.log("Same hash:", hash("SecurePass123") === hash("SecurePass123"));\nreturn "Basic hashing demo.";` },
  { name: "CSRF Token", category: "Cybersecurity", code: `const generateToken = () => {\n  const arr = new Uint8Array(32);\n  crypto.getRandomValues(arr);\n  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');\n};\nconst token = generateToken();\nconsole.log("CSRF Token:", token.substring(0, 16) + "...");\nconsole.log("Token length:", token.length);\nreturn "CSRF protection.";` },
  { name: "Input Validation", category: "Cybersecurity", code: `const validate = {\n  email: (e) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(e),\n  phone: (p) => /^\\+?[1-9]\\d{1,14}$/.test(p),\n  username: (u) => /^[a-zA-Z0-9_]{3,20}$/.test(u)\n};\nconsole.log("Email:", validate.email("test@example.com"));\nconsole.log("Phone:", validate.phone("+1234567890"));\nconsole.log("Username:", validate.username("dev_user"));\nreturn "Input validation.";` },
];

export default function CodeLab() {
  const [code, setCode] = useState(SNIPPETS[0].code);
  const [output, setOutput] = useState([]);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState(SNIPPETS[0].name);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const lineCount = useMemo(() => code.split('\n').length, [code]);

  const CATEGORIES = useMemo(() => ['All', ...new Set(SNIPPETS.map(s => s.category))], []);
  const filteredSnippets = useMemo(() =>
    selectedCategory === 'All' ? SNIPPETS : SNIPPETS.filter(s => s.category === selectedCategory),
    [selectedCategory]
  );

  const copyOutput = () => {
    const text = [...output, result !== null ? `Return: ${String(result)}` : ''].filter(Boolean).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCode = () => {
    const lines = code.split('\n');
    let indent = 0;
    const formatted = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) indent = Math.max(0, indent - 1);
      const result = '  '.repeat(indent) + trimmed;
      if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) indent++;
      return result;
    });
    setCode(formatted.join('\n'));
  };

  const runCode = useCallback(() => {
    const logs = [];
    const customConsole = {
      log: (...args) => logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '))
    };

    try {
      const executeCode = new Function('console', code);
      const res = executeCode(customConsole);
      setOutput(logs);
      setResult(res);
    } catch (error) {
      setOutput([...logs, `Error: ${error.message}`]);
      setResult(null);
    }
  }, [code]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [runCode]);

  const loadSnippet = (s) => {
    setCode(s.code);
    setOutput([]);
    setResult(null);
    setSelectedSnippet(s.name);
  };

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Code className="text-primary" size={32} /> Code Lab
              </h1>
              <p className="text-gray-400 mt-1">Real-time JavaScript experimental sandbox.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-44">
                <DarkSelect
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  options={CATEGORIES.map(c => ({ value: c, label: c }))}
                />
              </div>
              <div className="w-56">
                <DarkSelect
                  value={selectedSnippet}
                  onChange={(name) => {
                    const s = filteredSnippets.find(sn => sn.name === name);
                    if (s) loadSnippet(s);
                  }}
                  options={filteredSnippets.map(s => ({ value: s.name, label: s.name }))}
                />
              </div>
              <button 
                onClick={runCode}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-primary/30 flex items-center gap-2 group"
              >
                <Play size={18} className="fill-current group-hover:scale-110 transition-transform" /> Run
              </button>
            </div>
          </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 flex-1 min-h-0 pb-10">
          {/* Snippet Library */}
          <div className="xl:col-span-1 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2 mb-4 sticky top-0 bg-[#0a0a0a] py-2 z-10">Snippet Library</h3>
            {filteredSnippets.map((s, i) => (
              <button
                key={i}
                onClick={() => loadSnippet(s)}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  code === s.code 
                    ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/5' 
                    : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Terminal size={14} />
                  <span className="text-xs font-bold">{s.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Editor Area */}
          <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card flex flex-col overflow-hidden"
            >
              <div className="p-4 bg-black/40 border-b border-white/10 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span className="flex items-center gap-2"><Code size={12} /> script.js</span>
                <div className="flex items-center gap-3">
                  <button onClick={formatCode} className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors" title="Format code">
                    <Wand2 size={12} /> Format
                  </button>
                  <span className="text-primary">Editable Mode</span>
                </div>
              </div>
              <div className="flex-1 flex overflow-hidden">
                <div className="w-12 bg-black/30 border-r border-white/5 py-6 px-2 text-right text-[11px] text-gray-600 font-mono select-none overflow-hidden">
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i} className="leading-[1.625rem]">{i + 1}</div>
                  ))}
                </div>
                <textarea 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck="false"
                  className="flex-1 w-full bg-transparent p-6 text-primary-200 font-mono text-sm focus:outline-none resize-none custom-scrollbar leading-relaxed"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-6 h-full"
            >
              <div className="glass-card flex-1 flex flex-col overflow-hidden">
                <div className="p-4 bg-black/40 border-b border-white/10 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Terminal size={12} /> Console Output</span>
                  {(output.length > 0 || result !== null) && (
                    <button onClick={copyOutput} className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors">
                      {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
                <div className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar space-y-2 bg-black/20">
                  {output.length === 0 && !result && (
                    <p className="text-gray-600 italic">No output yet. Click 'Run Code' to see results.</p>
                  )}
                  {output.map((line, i) => (
                    <div key={i} className="text-gray-300 border-l-2 border-primary/30 pl-4 py-1">
                      {line}
                    </div>
                  ))}
                  {result !== null && (
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-3">
                      <Sparkles className="text-yellow-400 mt-1 shrink-0" size={16} />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Return Value:</p>
                        <p className="text-primary font-bold">{String(result)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
