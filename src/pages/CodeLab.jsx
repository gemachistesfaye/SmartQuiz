import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { Play, Code, Terminal, Sparkles } from 'lucide-react';

const SNIPPETS = [
  { name: "Standard Greeting", code: `const greeting = "Hello, SmartQuiz Master!";\nconst scores = [85, 92, 78, 95];\nconst average = scores.reduce((a, b) => a + b) / scores.length;\nconsole.log(greeting);\nconsole.log("Your average score is:", average);\nreturn "Ready to master JS?";` },
  { name: "Closure Bank", code: `function createBank(name) {\n  let balance = 1000;\n  return {\n    deposit: (amt) => { balance += amt; return balance; },\n    check: () => name + "'s Balance: $" + balance\n  };\n}\nconst myAcc = createBank("Alice");\nmyAcc.deposit(500);\nconsole.log(myAcc.check());\nreturn "Private data secured.";` },
  { name: "Array Mastery", code: `const users = [{n:"A",xp:1200},{n:"B",xp:800},{n:"C",xp:2500}];\nconst legends = users.filter(u => u.xp > 1000).map(u => u.n);\nconsole.log("Legends:", legends);\nreturn "Functional logic.";` },
  { name: "Async Mock", code: `console.log("Start");\nsetTimeout(() => console.log("Task Done!"), 1500);\nconsole.log("Next...");\nreturn "Wait for console.";` },
  { name: "Destructuring", code: `const user = { id: 1, info: { email: "test@sq.com" } };\nconst { info: { email } } = user;\nconsole.log("Email:", email);\nreturn "Clean extraction.";` },
  { name: "Promise Chain", code: `Promise.resolve("Step 1")\n  .then(v => v + " -> Step 2")\n  .then(v => { console.log(v); return "Done"; });\nreturn "Promises are cleaner.";` },
  { name: "Object Factory", code: `const createHero = (name, power) => ({ name, power, use() { return name + " uses " + power; } });\nconst h = createHero("Dev", "Clean Code");\nconsole.log(h.use());\nreturn "Factory pattern.";` },
  { name: "Map vs Set", code: `const s = new Set([1, 2, 2, 3]);\nconst m = new Map([["a", 1]]);\nconsole.log("Set (Unique):", [...s]);\nconsole.log("Map Value:", m.get("a"));\nreturn "New ES6 collections.";` },
  { name: "Recursion (Factorial)", code: `const fact = (n) => n <= 1 ? 1 : n * fact(n-1);\nconsole.log("Factorial of 5:", fact(5));\nreturn "Recursive logic.";` },
  { name: "Proxy Validation", code: `const user = { age: 25 };\nconst proxy = new Proxy(user, {\n  set(target, prop, val) {\n    if (prop === 'age' && val < 0) throw Error("Invalid age");\n    target[prop] = val;\n    return true;\n  }\n});\nproxy.age = 30;\nconsole.log(proxy.age);\nreturn "Advanced Meta-programming.";` },
  { name: "Currying Sum", code: `const sum = a => b => c => a + b + c;\nconsole.log("Sum(1)(2)(3):", sum(1)(2)(3));\nreturn "Currying pattern.";` },
  { name: "Module Pattern", code: `const Counter = (() => {\n  let count = 0;\n  return {\n    inc: () => ++count,\n    val: () => count\n  };\n})();\nCounter.inc();\nconsole.log(Counter.val());\nreturn "Classic IIFE Module.";` },
  { name: "Event Bus (Basic)", code: `const bus = {\n  events: {},\n  on(e, fn) { (this.events[e] = this.events[e] || []).push(fn); },\n  emit(e, d) { this.events[e]?.forEach(fn => fn(d)); }\n};\nbus.on('test', (v) => console.log('Heard:', v));\nbus.emit('test', 'Hello!');\nreturn "Simple Pub/Sub.";` },
  { name: "Fibonacci Iterative", code: `function fib(n) {\n  let [a, b] = [0, 1];\n  while (n-- > 0) [a, b] = [b, a + b];\n  return a;\n}\nconsole.log("Fib 10:", fib(10));\nreturn "Efficient iteration.";` },
  { name: "String Interpolation", code: `const u = "Dev", x = 5000;\nconsole.log(\`User \${u} has \${x} XP\`);\nreturn "Template Literals.";` },
  { name: "Class Inheritance", code: `class Animal { constructor(n) { this.n = n; } speak() { return this.n + " makes a sound."; } }\nclass Dog extends Animal { speak() { return this.n + " barks!"; } }\nconst d = new Dog("Rex");\nconsole.log(d.speak());\nreturn "Modern Classes.";` },
  { name: "Generator Function", code: `function* gen() { yield 1; yield 2; yield 3; }\nconst it = gen();\nconsole.log(it.next().value);\nconsole.log(it.next().value);\nreturn "Generators are cool.";` },
  { name: "Default Parameters", code: `const greet = (n = "Guest") => "Welcome, " + n;\nconsole.log(greet());\nconsole.log(greet("Admin"));\nreturn "Clean defaults.";` },
  { name: "Try/Catch Async", code: `async function test() {\n  try {\n    throw "Boom!";\n  } catch (e) { console.log("Caught:", e); }\n}\ntest();\nreturn "Error handling.";` },
  { name: "Debounce Simulation", code: `const debounce = (fn, delay) => {\n  let t;\n  return () => { clearTimeout(t); t = setTimeout(fn, delay); };\n};\nconst act = debounce(() => console.log('Action!'), 500);\nact(); act(); // Only one log\nreturn "Performance tip.";` },
  { name: "Object Assign", code: `const a = {x:1}, b = {y:2};\nconst c = Object.assign({}, a, b);\nconsole.log(c);\nreturn "Object merging.";` },
  { name: "Symbol Key", code: `const id = Symbol('id');\nconst u = { [id]: 123, name: "A" };\nconsole.log(u[id]);\nreturn "Hidden unique keys.";` },
  { name: "Nullish Coalescing", code: `const x = 0 ?? 10;\nconst y = null ?? 10;\nconsole.log(x, y);\nreturn "Better than || operator.";` },
  { name: "Optional Chaining", code: `const u = { profile: { bio: "Hi" } };\nconsole.log(u?.meta?.tags?.[0]);\nreturn "Safe property access.";` },
  { name: "Pipe Implementation", code: `const pipe = (...fns) => (v) => fns.reduce((a, f) => f(a), v);\nconst add1 = x => x + 1;\nconst sq = x => x * x;\nconsole.log(pipe(add1, sq)(2)); // (2+1)^2 = 9\nreturn "Functional pipes.";` },
  { name: "Deep Clone (Basic)", code: `const obj = { a: { b: 1 } };\nconst clone = JSON.parse(JSON.stringify(obj));\nclone.a.b = 2;\nconsole.log(obj.a.b, clone.a.b);\nreturn "Deep vs Shallow.";` },
  { name: "Memoize Function", code: `const memo = (fn) => {\n  const cache = {};\n  return (n) => cache[n] || (cache[n] = fn(n));\n};\nconst fastFact = memo(n => n <= 1 ? 1 : n * fastFact(n-1));\nconsole.log(fastFact(5));\nreturn "Caching results.";` },
  { name: "Intersection Observer", code: `console.log("Mocking Observer Logic...");\n// Standard JS: new IntersectionObserver(cb, opt);\nreturn "Web API Knowledge.";` },
  { name: "Worker PostMessage", code: `console.log("Main Thread -> Worker");\n// worker.postMessage({cmd: 'start'});\nreturn "Multi-threading in JS.";` },
  { name: "Bitwise XOR Swap", code: `let a = 5, b = 10;\na ^= b; b ^= a; a ^= b;\nconsole.log("Swapped:", a, b);\nreturn "Low-level tricks.";` }
];

export default function CodeLab() {
  const [code, setCode] = useState(SNIPPETS[0].code);
  const [output, setOutput] = useState([]);
  const [result, setResult] = useState(null);

  const runCode = () => {
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
  };

  const loadSnippet = (s) => {
    setCode(s.code);
    setOutput([]);
    setResult(null);
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
          <div className="flex gap-4">
            <button 
              onClick={runCode}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-primary/30 flex items-center gap-2 group"
            >
              <Play size={18} className="fill-current group-hover:scale-110 transition-transform" /> Run Code
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 flex-1 min-h-0 pb-10">
          {/* Snippet Library */}
          <div className="xl:col-span-1 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2 mb-4 sticky top-0 bg-[#0a0a0a] py-2 z-10">Snippet Library</h3>
            {SNIPPETS.map((s, i) => (
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
                <span><Code size={12} className="inline mr-2" /> script.js</span>
                <span className="text-primary">Editable Mode</span>
              </div>
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                className="flex-1 w-full bg-transparent p-6 text-primary-200 font-mono text-sm focus:outline-none resize-none custom-scrollbar leading-relaxed"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-6 h-full"
            >
              <div className="glass-card flex-1 flex flex-col overflow-hidden">
                <div className="p-4 bg-black/40 border-b border-white/10 flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <Terminal size={12} /> Console Output
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
