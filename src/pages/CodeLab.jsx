import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { Play, Code, Terminal, Sparkles, Copy, Check, Wand2, Trophy, Zap, ArrowLeft, ChevronRight, AlertTriangle, X, RotateCcw, Globe, Palette, Atom, Shield, FileText, Database, Cloud, Cpu, Braces, Binary, Server } from 'lucide-react';


const SNIPPETS = [
  { name: "Standard Greeting", category: "JavaScript", difficulty: "easy", code: `const greeting = "Hello, SmartQuiz Master!";\nconst scores = [85, 92, 78, 95];\nconst average = scores.reduce((a, b) => a + b) / scores.length;\nconsole.log(greeting);\nconsole.log("Your average score is:", average);\nreturn "Ready to master JS?";` },
  { name: "Destructuring", category: "JavaScript", difficulty: "easy", code: `const user = { id: 1, info: { email: "test@sq.com" } };\nconst { info: { email } } = user;\nconsole.log("Email:", email);\nreturn "Clean extraction.";` },
  { name: "Template Literals", category: "JavaScript", difficulty: "easy", code: `const u = "Dev", x = 5000;\nconsole.log(\`User \${u} has \${x} XP\`);\nreturn "Template Literals.";` },
  { name: "Default Parameters", category: "JavaScript", difficulty: "easy", code: `const greet = (n = "Guest") => "Welcome, " + n;\nconsole.log(greet());\nconsole.log(greet("Admin"));\nreturn "Clean defaults.";` },
  { name: "Nullish Coalescing", category: "JavaScript", difficulty: "easy", code: `const x = 0 ?? 10;\nconst y = null ?? 10;\nconsole.log(x, y);\nreturn "Better than || operator.";` },
  { name: "Optional Chaining", category: "JavaScript", difficulty: "easy", code: `const u = { profile: { bio: "Hi" } };\nconsole.log(u?.meta?.tags?.[0]);\nreturn "Safe property access.";` },
  { name: "Map vs Set", category: "JavaScript", difficulty: "easy", code: `const s = new Set([1, 2, 2, 3]);\nconst m = new Map([["a", 1]]);\nconsole.log("Set (Unique):", [...s]);\nconsole.log("Map Value:", m.get("a"));\nreturn "New ES6 collections.";` },
  { name: "Symbol Key", category: "JavaScript", difficulty: "medium", code: `const id = Symbol('id');\nconst u = { [id]: 123, name: "A" };\nconsole.log(u[id]);\nreturn "Hidden unique keys.";` },
  { name: "Closure Bank", category: "JavaScript", difficulty: "medium", code: `function createBank(name) {\n  let balance = 1000;\n  return {\n    deposit: (amt) => { balance += amt; return balance; },\n    check: () => name + "'s Balance: $" + balance\n  };\n}\nconst myAcc = createBank("Alice");\nmyAcc.deposit(500);\nconsole.log(myAcc.check());\nreturn "Private data secured.";` },
  { name: "Proxy Validation", category: "JavaScript", difficulty: "hard", code: `const user = { age: 25 };\nconst proxy = new Proxy(user, {\n  set(target, prop, val) {\n    if (prop === 'age' && val < 0) throw Error("Invalid age");\n    target[prop] = val;\n    return true;\n  }\n});\nproxy.age = 30;\nconsole.log(proxy.age);\nreturn "Advanced Meta-programming.";` },
  { name: "Generator Function", category: "JavaScript", difficulty: "hard", code: `function* gen() { yield 1; yield 2; yield 3; }\nconst it = gen();\nconsole.log(it.next().value);\nconsole.log(it.next().value);\nreturn "Generators are cool.";` },
  { name: "Class Inheritance", category: "JavaScript", difficulty: "medium", code: `class Animal { constructor(n) { this.n = n; } speak() { return this.n + " makes a sound."; } }\nclass Dog extends Animal { speak() { return this.n + " barks!"; } }\nconst d = new Dog("Rex");\nconsole.log(d.speak());\nreturn "Modern Classes.";` },
  { name: "Promise Chain", category: "JavaScript", difficulty: "medium", code: `Promise.resolve("Step 1")\n  .then(v => v + " -> Step 2")\n  .then(v => { console.log(v); return "Done"; });\nreturn "Promises are cleaner.";` },
  { name: "Try/Catch Async", category: "JavaScript", difficulty: "medium", code: `async function test() {\n  try {\n    throw "Boom!";\n  } catch (e) { console.log("Caught:", e); }\n}\ntest();\nreturn "Error handling.";` },
  { name: "Recursion (Factorial)", category: "JavaScript", difficulty: "medium", code: `const fact = (n) => n <= 1 ? 1 : n * fact(n-1);\nconsole.log("Factorial of 5:", fact(5));\nreturn "Recursive logic.";` },
  { name: "Fibonacci Iterative", category: "JavaScript", difficulty: "medium", code: `function fib(n) {\n  let [a, b] = [0, 1];\n  while (n-- > 0) [a, b] = [b, a + b];\n  return a;\n}\nconsole.log("Fib 10:", fib(10));\nreturn "Efficient iteration.";` },
  { name: "Currying Sum", category: "JavaScript", difficulty: "hard", code: `const sum = a => b => c => a + b + c;\nconsole.log("Sum(1)(2)(3):", sum(1)(2)(3));\nreturn "Currying pattern.";` },
  { name: "Debounce Simulation", category: "JavaScript", difficulty: "medium", code: `const debounce = (fn, delay) => {\n  let t;\n  return () => { clearTimeout(t); t = setTimeout(fn, delay); };\n};\nconst act = debounce(() => console.log('Action!'), 500);\nact(); act();\nreturn "Performance tip.";` },
  { name: "Memoize Function", category: "JavaScript", difficulty: "hard", code: `const memo = (fn) => {\n  const cache = {};\n  return (n) => cache[n] || (cache[n] = fn(n));\n};\nconst fastFact = memo(n => n <= 1 ? 1 : n * fastFact(n-1));\nconsole.log(fastFact(5));\nreturn "Caching results.";` },
  { name: "Pipe Implementation", category: "JavaScript", difficulty: "hard", code: `const pipe = (...fns) => (v) => fns.reduce((a, f) => f(a), v);\nconst add1 = x => x + 1;\nconst sq = x => x * x;\nconsole.log(pipe(add1, sq)(2));\nreturn "Functional pipes.";` },
  { name: "Module Pattern", category: "JavaScript", difficulty: "medium", code: `const Counter = (() => {\n  let count = 0;\n  return {\n    inc: () => ++count,\n    val: () => count\n  };\n})();\nCounter.inc();\nconsole.log(Counter.val());\nreturn "Classic IIFE Module.";` },
  { name: "Semantic Structure", category: "HTML", difficulty: "easy", code: `const html = \`\n  <header><nav>Menu</nav></header>\n  <main>\n    <article>\n      <h1>Title</h1>\n      <section>Content</section>\n    </article>\n    <aside>Sidebar</aside>\n  </main>\n  <footer>Copyright</footer>\n\`;\nconsole.log("Semantic HTML structure created");\nreturn html;` },
  { name: "Form Validation", category: "HTML", difficulty: "medium", code: `const form = {\n  email: "test@example.com",\n  validateEmail(e) { return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(e); },\n  password: "Secret123",\n  validatePassword(p) { return p.length >= 8 && /[A-Z]/.test(p) && /[0-9]/.test(p); }\n};\nconsole.log("Email valid:", form.validateEmail(form.email));\nconsole.log("Password valid:", form.validatePassword(form.password));\nreturn "HTML5 validation patterns.";` },
  { name: "Accessibility Check", category: "HTML", difficulty: "medium", code: `const a11y = {\n  roles: ["banner", "navigation", "main", "contentinfo"],\n  check(img) { return img.alt ? "Pass" : "Fail: missing alt"; },\n  checkLabel(input) { return input.id ? "Pass" : "Fail: missing label"; }\n};\nconsole.log("Roles:", a11y.roles.join(", "));\nconsole.log("Image:", a11y.check({ alt: "logo" }));\nreturn "a11y best practices.";` },
  { name: "Meta Tags Builder", category: "HTML", difficulty: "easy", code: `const meta = {\n  title: "SmartQuiz - Master JS",\n  description: "Interactive JavaScript learning platform",\n  ogImage: "https://smartquiz.com/og.png",\n  render() {\n    return \`<title>\${this.title}</title>\\n<meta name="description" content="\${this.description}">\\n<meta property="og:image" content="\${this.ogImage}">\`;\n  }\n};\nconsole.log(meta.render());\nreturn "SEO meta tags.";` },
  { name: "Canvas Drawing", category: "HTML", difficulty: "medium", code: `const canvas = { width: 400, height: 300 };\nconst ctx = {\n  fillStyle: "#3b82f6",\n  fillRect(x, y, w, h) { console.log(\`Drawing rect at (\${x},\${y}) \${w}x\${h}\`); },\n  arc(x, y, r) { console.log(\`Drawing circle at (\${x},\${y}) r=\${r}\`); }\n};\nctx.fillRect(10, 10, 100, 50);\nctx.arc(200, 150, 40);\nreturn "Canvas 2D API basics.";` },
  { name: "Flexbox Centering", category: "CSS", difficulty: "easy", code: `const styles = {\n  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" },\n  card: { padding: "2rem", borderRadius: "12px", background: "#1a1a2e" }\n};\nconsole.log("Flex center:", JSON.stringify(styles.container));\nreturn "Perfect centering.";` },
  { name: "Grid Layout", category: "CSS", difficulty: "easy", code: `const grid = {\n  display: "grid",\n  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",\n  gap: "16px"\n};\nconsole.log("Responsive grid:", JSON.stringify(grid));\nreturn "CSS Grid magic.";` },
  { name: "Custom Properties", category: "CSS", difficulty: "medium", code: `const css = {\n  ":root": { "--primary": "#3b82f6", "--radius": "12px", "--spacing": "16px" },\n  ".card": { "background": "var(--primary)", "border-radius": "var(--radius)", "padding": "var(--spacing)" }\n};\nconsole.log("CSS Variables:", JSON.stringify(css));\nreturn "Theme system.";` },
  { name: "Responsive Breakpoints", category: "CSS", difficulty: "medium", code: `const breakpoints = {\n  sm: "640px", md: "768px", lg: "1024px", xl: "1280px"\n};\nconst mediaQuery = (bp, styles) => \`@media (min-width: \${bp}) { \${styles} }\`;\nconsole.log(mediaQuery(breakpoints.md, ".container { padding: 24px; }"));\nreturn "Mobile-first CSS.";` },
  { name: "Animation Keyframes", category: "CSS", difficulty: "medium", code: `const animations = {\n  pulse: "0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); }",\n  slideUp: "from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; }",\n  fadeIn: "from { opacity: 0; } to { opacity: 1; }"\n};\nObject.keys(animations).forEach(name => console.log(\`@keyframes \${name} defined\`));\nreturn "CSS animations.";` },
  { name: "Gradient Builder", category: "CSS", difficulty: "easy", code: `const gradients = {\n  primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",\n  dark: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",\n  glass: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))"\n};\nObject.entries(gradients).forEach(([name, val]) => console.log(\`\${name}: \${val.substring(0, 40)}...\`));\nreturn "Modern gradients.";` },
  { name: "useState Hook", category: "React", difficulty: "easy", code: `const Counter = () => {\n  let count = 0;\n  const increment = () => { count++; console.log("Count:", count); };\n  return { count, increment };\n};\nconst c = Counter();\nc.increment();\nc.increment();\nconsole.log("Final:", c.count);\nreturn "React state pattern.";` },
  { name: "useEffect Pattern", category: "React", difficulty: "medium", code: `const useEffect = (fn, deps) => {\n  console.log("Effect running, deps:", deps);\n  const cleanup = fn();\n  return () => { console.log("Cleanup:", deps); };\n};\nuseEffect(() => { console.log("Mounted!"); return () => console.log("Unmounted!"); }, []);\nreturn "React lifecycle.";` },
  { name: "Custom Hook", category: "React", difficulty: "medium", code: `const useLocalStorage = (key, initial) => {\n  let value = initial;\n  const get = () => { console.log(\`Reading \${key}\`); return value; };\n  const set = (v) => { value = v; console.log(\`Setting \${key} = \${v}\`); };\n  return [get, set];\n};\nconst [getTheme, setTheme] = useLocalStorage("theme", "dark");\nconsole.log("Theme:", getTheme());\nsetTheme("light");\nreturn "Custom hook pattern.";` },
  { name: "Component Composition", category: "React", difficulty: "hard", code: `const Card = ({ title, children }) => ({ title, children, render: () => \`<div class="card"><h2>\${title}</h2>\${children}</div>\` });\nconst card = Card({ title: "Hello", children: "World" });\nconsole.log(card.render());\nreturn "Composition pattern.";` },
  { name: "XSS Prevention", category: "Cybersecurity", difficulty: "medium", code: `const sanitize = (input) => input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");\nconst malicious = '<script>alert("XSS")</script>';\nconsole.log("Raw:", malicious);\nconsole.log("Clean:", sanitize(malicious));\nreturn "XSS prevention.";` },
  { name: "Password Hashing", category: "Cybersecurity", difficulty: "medium", code: `const hash = (password) => {\n  let h = 0;\n  for (let i = 0; i < password.length; i++) {\n    h = ((h << 5) - h + password.charCodeAt(i)) | 0;\n  }\n  return h.toString(16);\n};\nconsole.log("Hash:", hash("SecurePass123"));\nconsole.log("Same hash:", hash("SecurePass123") === hash("SecurePass123"));\nreturn "Basic hashing demo.";` },
  { name: "CSRF Token", category: "Cybersecurity", difficulty: "hard", code: `const generateToken = () => {\n  const arr = new Uint8Array(32);\n  crypto.getRandomValues(arr);\n  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');\n};\nconst token = generateToken();\nconsole.log("CSRF Token:", token.substring(0, 16) + "...");\nconsole.log("Token length:", token.length);\nreturn "CSRF protection.";` },
  { name: "Input Validation", category: "Cybersecurity", difficulty: "easy", code: `const validate = {\n  email: (e) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(e),\n  phone: (p) => /^\\+?[1-9]\\d{1,14}$/.test(p),\n  username: (u) => /^[a-zA-Z0-9_]{3,20}$/.test(u)\n};\nconsole.log("Email:", validate.email("test@example.com"));\nconsole.log("Phone:", validate.phone("+1234567890"));\nconsole.log("Username:", validate.username("dev_user"));\nreturn "Input validation.";` },

  // TypeScript
  { name: "Generic Functions", category: "TypeScript", difficulty: "easy", code: `function identity(arg) { return arg; }\nconst num = identity(42);\nconst str = identity("hello");\nconsole.log("Number:", num);\nconsole.log("String:", str);\nreturn "Generics preserve types.";` },
  { name: "Interface vs Type", category: "TypeScript", difficulty: "medium", code: `const user = { id: 1, name: "Alice", email: "a@b.com" };\nconst isAdmin = typeof user.role !== "undefined";\nconsole.log("User:", user.name);\nconsole.log("Has role prop:", isAdmin);\nreturn "Interfaces and Types differ.";` },
  { name: "Utility Types", category: "TypeScript", difficulty: "medium", code: `const full = { id: 1, name: "Bob", email: "b@c.com" };\nconst partial = { name: "Bob" };\nconst readonly = { id: 1 };\nconsole.log("Full:", full.name);\nconsole.log("Partial:", partial.name);\nreturn "Partial, Pick, Omit types.";` },
  { name: "Type Guards", category: "TypeScript", difficulty: "hard", code: `function process(input) {\n  if (typeof input === "string") {\n    console.log("String length:", input.length);\n    return "string";\n  } else if (typeof input === "number") {\n    console.log("Squared:", input ** 2);\n    return "number";\n  }\n  return "unknown";\n}\nprocess("hello");\nprocess(5);\nreturn "Type narrowing works.";` },
  { name: "Mapped Types", category: "TypeScript", difficulty: "hard", code: `const person = { name: "Alice", age: 30, active: true };\nconst flags = { name: true, age: false, active: true };\nconst filtered = Object.keys(flags).filter(k => flags[k]);\nconsole.log("Active keys:", filtered);\nreturn "Mapped types transform shapes.";` },

  // Python
  { name: "List Comprehensions", category: "Python", difficulty: "easy", code: `const nums = [1, 2, 3, 4, 5];\nconst squares = nums.map(n => n ** 2);\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log("Squares:", squares);\nconsole.log("Evens:", evens);\nreturn "Pythonic list transforms.";` },
  { name: "Decorators", category: "Python", difficulty: "medium", code: `const log = (fn) => (...args) => {\n  console.log("Calling:", fn.name, "with", args);\n  const result = fn(...args);\n  console.log("Result:", result);\n  return result;\n};\nconst add = (a, b) => a + b;\nconst loggedAdd = log(add);\nloggedAdd(3, 4);\nreturn "Decorators wrap functions.";` },
  { name: "Context Managers", category: "Python", difficulty: "medium", code: `const withDB = (fn) => {\n  console.log("Opening DB connection...");\n  const db = { query: (q) => "Results for: " + q };\n  const result = fn(db);\n  console.log("Closing DB connection...");\n  return result;\n};\nconst result = withDB((db) => db.query("SELECT *"));\nconsole.log(result);\nreturn "Context managers handle resources.";` },
  { name: "Generators", category: "Python", difficulty: "hard", code: `function* fibonacci() {\n  let [a, b] = [0, 1];\n  while (true) {\n    yield a;\n    [a, b] = [b, a + b];\n  }\n}\nconst fib = fibonacci();\nconst first5 = Array.from({ length: 5 }, () => fib.next().value);\nconsole.log("Fibonacci:", first5);\nreturn "Generators yield lazily.";` },
  { name: "Lambda & Map", category: "Python", difficulty: "easy", code: `const words = ["hello", "world", "python"];\nconst upper = words.map(w => w.toUpperCase());\nconst lengths = words.map(w => w.length);\nconsole.log("Upper:", upper);\nconsole.log("Lengths:", lengths);\nreturn "Lambda with map.";` },

  // Backend
  { name: "Express Middleware", category: "Backend", difficulty: "medium", code: `const middleware = (req, res, next) => {\n  const start = Date.now();\n  console.log("Method:", req.method, "Path:", req.path);\n  next();\n  const ms = Date.now() - start;\n  console.log("Completed in", ms + "ms");\n};\nmiddleware({ method: "GET", path: "/api" }, {}, () => {});\nreturn "Middleware pattern.";` },
  { name: "JWT Token", category: "Backend", difficulty: "hard", code: `const header = { alg: "HS256", typ: "JWT" };\nconst payload = { sub: "1234567890", name: "John", iat: Date.now() };\nconst token = Buffer.from(JSON.stringify(header)).toString("base64") + "." + Buffer.from(JSON.stringify(payload)).toString("base64");\nconsole.log("JWT:", token.substring(0, 30) + "...");\nconsole.log("Header:", JSON.parse(Buffer.from(token.split(".")[0], "base64")));\nreturn "JWT structure demo.";` },
  { name: "Rate Limiter", category: "Backend", difficulty: "medium", code: `const createLimiter = (limit, windowMs) => {\n  const hits = new Map();\n  return (ip) => {\n    const now = Date.now();\n    const entry = hits.get(ip) || { count: 0, reset: now + windowMs };\n    if (now > entry.reset) { entry.count = 0; entry.reset = now + windowMs; }\n    entry.count++;\n    hits.set(ip, entry);\n    return entry.count <= limit;\n  };\n};\nconst limiter = createLimiter(5, 60000);\nconsole.log("Request 1:", limiter("192.168.1.1"));\nreturn "Rate limiting protects APIs.";` },
  { name: "Cache Pattern", category: "Backend", difficulty: "easy", code: `const cache = new Map();\nconst cached = (key, fn) => {\n  if (cache.has(key)) { console.log("Cache hit:", key); return cache.get(key); }\n  const result = fn();\n  cache.set(key, result);\n  console.log("Cache miss:", key);\n  return result;\n};\ncached("user:1", () => ({ id: 1, name: "Alice" }));\ncached("user:1", () => ({ id: 1, name: "Alice" }));\nreturn "Caching avoids recomputation.";` },
  { name: "REST Handler", category: "Backend", difficulty: "medium", code: `const handlers = {\n  GET: (id) => id ? "Get user " + id : "List all users",\n  POST: (body) => "Created: " + JSON.stringify(body),\n  PUT: (id, body) => "Updated " + id,\n  DELETE: (id) => "Deleted " + id\n};\nconsole.log(handlers.GET());\nconsole.log(handlers.GET(42));\nconsole.log(handlers.POST({ name: "Bob" }));\nreturn "REST verbs pattern.";` },

  // SQL
  { name: "Window Functions", category: "SQL", difficulty: "hard", code: `const data = [\n  { dept: "Eng", name: "Alice", salary: 90000 },\n  { dept: "Eng", name: "Bob", salary: 85000 },\n  { dept: "Sales", name: "Carol", salary: 95000 },\n  { dept: "Sales", name: "Dave", salary: 88000 }\n];\nconst ranked = data.map((row, i, arr) => {\n  const sameDept = arr.filter(r => r.dept === row.dept);\n  const rank = sameDept.filter(r => r.salary > row.salary).length + 1;\n  return { ...row, rank };\n});\nconsole.log("Ranked:", ranked.map(r => r.name + ": " + r.rank));\nreturn "Window functions rank rows.";` },
  { name: "CTEs", category: "SQL", difficulty: "medium", code: `const employees = [\n  { id: 1, name: "Alice", deptId: 10 },\n  { id: 2, name: "Bob", deptId: 10 },\n  { id: 3, name: "Carol", deptId: 20 }\n];\nconst deptCounts = employees.reduce((acc, e) => {\n  acc[e.deptId] = (acc[e.deptId] || 0) + 1;\n  return acc;\n}, {});\nconsole.log("Dept counts:", deptCounts);\nreturn "CTEs break complex queries.";` },
  { name: "JOINs", category: "SQL", difficulty: "easy", code: `const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];\nconst orders = [{ userId: 1, item: "Laptop" }, { userId: 1, item: "Phone" }];\nconst joined = users.flatMap(u =>\n  orders.filter(o => o.userId === u.id).map(o => ({ ...u, item: o.item }))\n);\nconsole.log("Joined:", joined);\nreturn "INNER JOIN combines tables.";` },
  { name: "Index Optimization", category: "SQL", difficulty: "medium", code: `const users = Array.from({ length: 100000 }, (_, i) => ({ id: i, email: \`user\${i}@test.com\` }));\nconst index = new Map(users.map(u => [u.email, u]));\nconst start = performance.now();\nconst found = index.get("user50000@test.com");\nconst ms = (performance.now() - start).toFixed(4);\nconsole.log("Indexed lookup:", ms + "ms");\nconsole.log("Found:", found.email);\nreturn "Indexes speed up reads.";` },
  { name: "Aggregation", category: "SQL", difficulty: "easy", code: `const sales = [\n  { product: "A", amount: 100 },\n  { product: "B", amount: 200 },\n  { product: "A", amount: 150 },\n  { product: "B", amount: 50 }\n];\nconst totals = sales.reduce((acc, s) => {\n  acc[s.product] = (acc[s.product] || 0) + s.amount;\n  return acc;\n}, {});\nconsole.log("Totals:", totals);\nreturn "GROUP BY aggregates data.";` },

  // NoSQL
  { name: "MongoDB Aggregation", category: "NoSQL", difficulty: "hard", code: `const orders = [\n  { status: "complete", amount: 100, region: "US" },\n  { status: "pending", amount: 50, region: "US" },\n  { status: "complete", amount: 200, region: "EU" }\n];\nconst pipeline = orders\n  .filter(o => o.status === "complete")\n  .reduce((acc, o) => {\n    acc[o.region] = (acc[o.region] || 0) + o.amount;\n    return acc;\n  }, {});\nconsole.log("Aggregated:", pipeline);\nreturn "Aggregation pipeline pattern.";` },
  { name: "Redis Caching", category: "NoSQL", difficulty: "medium", code: `const redis = {\n  store: new Map(),\n  set(key, val, ttl = 3600) { this.store.set(key, { val, expires: Date.now() + ttl * 1000 }); },\n  get(key) {\n    const entry = this.store.get(key);\n    if (!entry || Date.now() > entry.expires) { this.store.delete(key); return null; }\n    return entry.val;\n  }\n};\nredis.set("session:abc", { user: "Alice" }, 300);\nconsole.log("Get:", redis.get("session:abc"));\nconsole.log("Expired:", redis.get("session:xyz"));\nreturn "Redis TTL caching.";` },
  { name: "Document Schema", category: "NoSQL", difficulty: "easy", code: `const userSchema = {\n  name: "Alice",\n  email: "alice@test.com",\n  profile: { bio: "Developer", avatar: "/img/alice.png" },\n  tags: ["admin", "user"],\n  createdAt: new Date().toISOString()\n};\nconsole.log("User:", userSchema.name);\nconsole.log("Tags:", userSchema.tags.join(", "));\nreturn "Flexible document schema.";` },
  { name: "DynamoDB Query", category: "NoSQL", difficulty: "hard", code: `const table = [\n  { pk: "USER#1", sk: "PROFILE", data: "Alice" },\n  { pk: "USER#1", sk: "ORDER#101", data: "Laptop" },\n  { pk: "USER#2", sk: "PROFILE", data: "Bob" }\n];\nconst query = table.filter(r => r.pk === "USER#1");\nconsole.log("Results:", query.map(r => r.sk + ": " + r.data));\nreturn "DynamoDB single table design.";` },
  { name: "Graph Traversal", category: "NoSQL", difficulty: "medium", code: `const graph = {\n  A: ["B", "C"],\n  B: ["D"],\n  C: ["D", "E"],\n  D: [],\n  E: []\n};\nconst bfs = (start) => {\n  const visited = new Set();\n  const queue = [start];\n  while (queue.length) {\n    const node = queue.shift();\n    if (visited.has(node)) continue;\n    visited.add(node);\n    queue.push(...graph[node]);\n  }\n  return [...visited];\n};\nconsole.log("BFS from A:", bfs("A"));\nreturn "Graph traversal visits all nodes.";` },

  // AI Engineering
  { name: "Prompt Template", category: "AI Engineering", difficulty: "easy", code: `const template = (role, task, context) => \\\n  \`You are \${role}. Task: \${task}. Context: \${context}\`;\nconst prompt = template("a coding assistant", "explain closures", "JavaScript");\nconsole.log("Prompt:", prompt);\nreturn "Templates standardize prompts.";` },
  { name: "RAG Chunking", category: "AI Engineering", difficulty: "medium", code: `const text = "AI is transforming industries. Machine learning enables automation. Deep learning powers modern AI.";\nconst chunkSize = 40;\nconst chunks = [];\nfor (let i = 0; i < text.length; i += chunkSize) {\n  chunks.push(text.slice(i, i + chunkSize));\n}\nconsole.log("Chunks:", chunks.length);\nchunks.forEach((c, i) => console.log(\`[\${i}]: \${c}\`));\nreturn "Chunking splits documents.";` },
  { name: "Embedding Similarity", category: "AI Engineering", difficulty: "medium", code: `const cosineSim = (a, b) => {\n  const dot = a.reduce((s, v, i) => s + v * b[i], 0);\n  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));\n  const magB = Math.sqrt(b.reduce((s, v) => s + v * b[i], 0));\n  return dot / (magA * magB);\n};\nconst vec1 = [1, 0, 1];\nconst vec2 = [0, 1, 0];\nconsole.log("Similarity:", cosineSim(vec1, vec2).toFixed(2));\nreturn "Cosine similarity measures closeness.";` },
  { name: "Vector Search", category: "AI Engineering", difficulty: "hard", code: `const vectors = [\n  { id: 1, vec: [1, 0, 0], text: "red" },\n  { id: 2, vec: [0, 1, 0], text: "green" },\n  { id: 3, vec: [0, 0, 1], text: "blue" }\n];\nconst query = [1, 0.1, 0];\nconst results = vectors\n  .map(v => ({ ...v, score: v.vec.reduce((s, val, i) => s + val * query[i], 0) }))\n  .sort((a, b) => b.score - a.score);\nconsole.log("Top match:", results[0].text);\nreturn "Vector search finds nearest neighbors.";` },

  // Artificial Intelligence
  { name: "K-Means", category: "Artificial Intelligence", difficulty: "hard", code: `const points = [[1, 2], [1.5, 1.8], [5, 8], [8, 8], [1, 0.6], [9, 11]];\nlet centroids = [[1, 2], [5, 8]];\nconst dist = (a, b) => Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2);\nconst clusters = points.map(p => {\n  const d0 = dist(p, centroids[0]);\n  const d1 = dist(p, centroids[1]);\n  return d0 < d1 ? 0 : 1;\n});\nconsole.log("Cluster assignments:", clusters);\nreturn "K-Means groups similar points.";` },
  { name: "Neural Network Forward Pass", category: "Artificial Intelligence", difficulty: "hard", code: `const sigmoid = (x) => 1 / (1 + Math.exp(-x));\nconst forward = (inputs, weights) => {\n  const weighted = inputs.reduce((s, x, i) => s + x * weights[i], 0);\n  return sigmoid(weighted);\n};\nconst input = [0.5, 0.3, 0.8];\nconst weights = [0.2, 0.4, 0.6];\nconst output = forward(input, weights);\nconsole.log("Output:", output.toFixed(4));\nreturn "Forward pass computes activations.";` },
  { name: "Decision Tree", category: "Artificial Intelligence", difficulty: "medium", code: `const tree = {\n  feature: "age",\n  threshold: 30,\n  left: { feature: "income", threshold: 50000, left: "deny", right: "approve" },\n  right: "approve"\n};\nconst predict = (node, sample) => {\n  if (typeof node === "string") return node;\n  return sample[node.feature] <= node.threshold\n    ? predict(node.left, sample)\n    : predict(node.right, sample);\n};\nconsole.log("Decision:", predict(tree, { age: 25, income: 60000 }));\nreturn "Decision trees classify samples.";` },
  { name: "Gradient Descent", category: "Artificial Intelligence", difficulty: "hard", code: `let w = 0.5;\nconst lr = 0.01;\nconst target = 3;\nconst predict = (x) => w * x;\nconst x = 2;\nfor (let i = 0; i < 5; i++) {\n  const pred = predict(x);\n  const error = pred - target;\n  const grad = error * x;\n  w -= lr * grad;\n  console.log(\`Step \${i+1}: w=\${w.toFixed(4)}, error=\${error.toFixed(4)}\`);\n}\nreturn "Gradient descent minimizes loss.";` },
  { name: "Loss Function", category: "Artificial Intelligence", difficulty: "medium", code: `const mse = (pred, actual) => {\n  const n = pred.length;\n  return pred.reduce((s, p, i) => s + (p - actual[i]) ** 2, 0) / n;\n};\nconst bce = (pred, actual) => {\n  const eps = 1e-7;\n  return -actual.reduce((s, a, i) =>\n    s + a * Math.log(pred[i] + eps) + (1 - a) * Math.log(1 - pred[i] + eps), 0) / pred.length;\n};\nconst pred = [0.9, 0.1, 0.8];\nconst actual = [1, 0, 1];\nconsole.log("MSE:", mse(pred, actual).toFixed(4));\nreturn "Loss functions measure errors.";` },

  // DSA
  { name: "Binary Search", category: "DSA", difficulty: "medium", code: `const binarySearch = (arr, target) => {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    if (arr[mid] === target) return mid;\n    lo = mid + 1;\n  }\n  return -1;\n};\nconst arr = [1, 3, 5, 7, 9, 11];\nconsole.log("Found at:", binarySearch(arr, 7));\nreturn "Binary search is O(log n).";` },
  { name: "BFS/DFS", category: "DSA", difficulty: "hard", code: `const tree = { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } };\nconst bfs = (root) => {\n  const result = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    result.push(node.val);\n    if (node.left) queue.push(node.left);\n    if (node.right) queue.push(node.right);\n  }\n  return result;\n};\nconsole.log("BFS:", bfs(tree));\nreturn "BFS traverses level by level.";` },
  { name: "Merge Sort", category: "DSA", difficulty: "hard", code: `const mergeSort = (arr) => {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  const result = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    result.push(left[i] < right[j] ? left[i++] : right[j++]);\n  }\n  return [...result, ...left.slice(i), ...right.slice(j)];\n};\nconsole.log("Sorted:", mergeSort([38, 27, 43, 3, 9, 82, 10]));\nreturn "Merge sort is O(n log n).";` },
  { name: "Hash Table", category: "DSA", difficulty: "medium", code: `class HashMap {\n  constructor() { this.buckets = Array.from({ length: 10 }, () => []); }\n  hash(key) { let h = 0; for (let i = 0; i < key.length; i++) h = ((h << 5) - h + key.charCodeAt(i)) | 0; return Math.abs(h) % 10; }\n  set(k, v) { const i = this.hash(k); const e = this.buckets[i].find(e => e[0] === k); if (e) e[1] = v; else this.buckets[i].push([k, v]); }\n  get(k) { const e = this.buckets[this.hash(k)].find(e => e[0] === k); return e ? e[1] : undefined; }\n}\nconst map = new HashMap();\nmap.set("name", "Alice");\nconsole.log("Get:", map.get("name"));\nreturn "Hash tables provide O(1) lookup.";` },
  { name: "Stack Calculator", category: "DSA", difficulty: "medium", code: `const evalRPN = (tokens) => {\n  const stack = [];\n  const ops = {\n    "+": (a, b) => a + b,\n    "-": (a, b) => a - b,\n    "*": (a, b) => a * b,\n    "/": (a, b) => a / b\n  };\n  for (const t of tokens) {\n    if (ops[t]) {\n      const b = stack.pop();\n      const a = stack.pop();\n      stack.push(ops[t](a, b));\n    } else stack.push(Number(t));\n  }\n  return stack[0];\n};\nconsole.log("Result:", evalRPN(["2", "1", "+", "3", "*"]));\nreturn "Stacks evaluate postfix expressions.";` },
];

const DIFF_BG = { easy: 'bg-green-500/10 text-green-400 border-green-500/20', medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', hard: 'bg-red-500/10 text-red-400 border-red-500/20' };
const CAT_BG = {
  JavaScript: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  HTML: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  CSS: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  React: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  Cybersecurity: 'bg-red-500/10 text-red-400 border-red-500/20',
  TypeScript: 'bg-blue-600/10 text-blue-300 border-blue-600/20',
  Python: 'bg-green-500/10 text-green-400 border-green-500/20',
  Backend: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  SQL: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  NoSQL: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  "AI Engineering": 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
  "Artificial Intelligence": 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  DSA: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
};
const CAT_COLORS = { JavaScript: 'text-yellow-400', HTML: 'text-orange-400', CSS: 'text-blue-400', React: 'text-cyan-400', Cybersecurity: 'text-red-400', TypeScript: 'text-blue-300', Python: 'text-green-400', Backend: 'text-purple-400', SQL: 'text-amber-400', NoSQL: 'text-emerald-400', "AI Engineering": 'text-fuchsia-400', "Artificial Intelligence": 'text-rose-400', DSA: 'text-indigo-400' };

function ExitConfirm({ isOpen, onStay, onExit }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Quit challenge confirmation">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card max-w-sm w-full p-8 text-center">
        <div className="bg-red-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-red-400" size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Quit Challenge?</h3>
        <p className="text-gray-400 mb-6">Your progress will be lost.</p>
        <div className="flex gap-3">
          <button onClick={onStay} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold transition-all">Stay</button>
          <button onClick={onExit} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-all">Quit</button>
        </div>
      </motion.div>
    </div>
  );
}

const CODE_CAT_META = [
  { value: 'all', label: 'All Categories', icon: <Code size={20} className="text-primary" />, count: 79, color: 'from-primary/20 to-primary/5 border-primary/30' },
  { value: 'JavaScript', label: 'JavaScript', icon: <Zap size={20} className="text-yellow-400" />, count: 21, color: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30' },
  { value: 'HTML', label: 'HTML', icon: <Globe size={20} className="text-orange-400" />, count: 5, color: 'from-orange-500/20 to-orange-500/5 border-orange-500/30' },
  { value: 'CSS', label: 'CSS', icon: <Palette size={20} className="text-blue-400" />, count: 6, color: 'from-blue-500/20 to-blue-500/5 border-blue-500/30' },
  { value: 'React', label: 'React', icon: <Atom size={20} className="text-cyan-400" />, count: 4, color: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30' },
  { value: 'Cybersecurity', label: 'Cybersecurity', icon: <Shield size={20} className="text-red-400" />, count: 4, color: 'from-red-500/20 to-red-500/5 border-red-500/30' },
  { value: 'TypeScript', label: 'TypeScript', icon: <Braces size={20} className="text-blue-300" />, count: 5, color: 'from-blue-600/20 to-blue-600/5 border-blue-600/30' },
  { value: 'Python', label: 'Python', icon: <Terminal size={20} className="text-green-400" />, count: 5, color: 'from-green-500/20 to-green-500/5 border-green-500/30' },
  { value: 'Backend', label: 'Backend', icon: <Server size={20} className="text-purple-400" />, count: 5, color: 'from-purple-500/20 to-purple-500/5 border-purple-500/30' },
  { value: 'SQL', label: 'SQL', icon: <Database size={20} className="text-amber-400" />, count: 5, color: 'from-amber-500/20 to-amber-500/5 border-amber-500/30' },
  { value: 'NoSQL', label: 'NoSQL', icon: <Cloud size={20} className="text-emerald-400" />, count: 5, color: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30' },
  { value: 'AI Engineering', label: 'AI Engineering', icon: <Cpu size={20} className="text-fuchsia-400" />, count: 4, color: 'from-fuchsia-500/20 to-fuchsia-500/5 border-fuchsia-500/30' },
  { value: 'Artificial Intelligence', label: 'Artificial Intelligence', icon: <Sparkles size={20} className="text-rose-400" />, count: 5, color: 'from-rose-500/20 to-rose-500/5 border-rose-500/30' },
  { value: 'DSA', label: 'DSA', icon: <Binary size={20} className="text-indigo-400" />, count: 5, color: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30' },
];

const CODE_DIFF_META = [
  { value: 'all', label: 'All Levels', color: 'bg-white/10 text-white border-white/20' },
  { value: 'easy', label: 'Easy', color: 'bg-green-500/10 text-green-400 border-green-500/30' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' },
  { value: 'hard', label: 'Hard', color: 'bg-red-500/10 text-red-400 border-red-500/30' },
];

const CODE_COUNT_META = [
  { value: '5', label: '5 Snippets', icon: <FileText size={16} className="text-primary" /> },
  { value: '10', label: '10 Snippets', icon: <FileText size={16} className="text-primary" /> },
  { value: 'all', label: 'All Snippets', icon: <Code size={16} className="text-primary" /> },
];

function ChallengeSettings({ settings, setSettings, onStart, isLaunching }) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 md:py-8">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 md:mb-10">
        <div className="relative inline-block mb-3 md:mb-5">
          <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-2xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-primary/30 to-primary/10 w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border border-primary/30">
            <Code className="text-primary" size={28} />
          </div>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Code Challenge</h1>
        <p className="text-gray-400 text-sm md:text-base px-4">Work through code snippets one by one.</p>
        <div className="flex items-center justify-center gap-3 md:gap-4 mt-3 text-[10px] md:text-xs text-gray-500">
          <span className="flex items-center gap-1"><Code size={10} /> 79 snippets</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1"><FileText size={10} /> 13 categories</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1"><Zap size={10} /> 3 difficulty levels</span>
        </div>
      </motion.div>

      {/* Category Dropdown */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-5 md:mb-8">
        <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Category</p>
        <div className="relative">
          <select
            value={settings.category}
            onChange={(e) => setSettings({...settings, category: e.target.value})}
            className="w-full bg-[#0c0c14] border border-white/10 rounded-2xl px-4 py-3.5 text-sm font-bold text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer min-h-[50px] transition-all hover:border-white/20 shadow-lg shadow-black/30"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
          >
            {CODE_CAT_META.map(cat => (
              <option key={cat.value} value={cat.value} className="bg-[#0c0c14] text-white">{cat.label} ({cat.count})</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Difficulty Pills */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-5 md:mb-8">
        <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Difficulty</p>
        <div className="flex flex-wrap gap-2">
          {CODE_DIFF_META.map(d => (
            <button
              key={d.value}
              onClick={() => setSettings({...settings, difficulty: d.value})}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                settings.difficulty === d.value
                  ? `${d.color} shadow-lg`
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Count Cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6 md:mb-8">
        <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Count</p>
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {CODE_COUNT_META.map(c => (
            <button
              key={c.value}
              onClick={() => setSettings({...settings, count: c.value})}
              className={`p-4 rounded-xl md:rounded-2xl border text-center transition-all ${
                settings.count === c.value
                  ? 'bg-primary/10 border-primary/30 ring-2 ring-primary shadow-lg shadow-primary/10'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-center mb-1">{c.icon}</div>
              <p className="text-xs md:text-sm font-bold text-white">{c.label}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Launch Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={onStart}
        disabled={isLaunching}
        className="w-full md:w-auto md:min-w-[280px] mx-auto relative group bg-gradient-to-r from-primary to-primary/80 text-white py-3 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-xl hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 md:gap-3 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative flex items-center gap-2 md:gap-3">
          {isLaunching ? (
            <>
              <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <span className="hidden md:inline"><Play size={20} className="fill-current" /></span> Start Challenge
            </>
          )}
        </span>
      </motion.button>
    </div>
  );
}

function ChallengeResults({ results, onRestart }) {
  const [reviewMode, setReviewMode] = useState(false);
  const total = results.length;
  const successCount = results.filter(r => !r.hasError).length;
  const percentage = total > 0 ? Math.round((successCount / total) * 100) : 0;
  const xp = results.reduce((sum, r) => sum + (r.hasError ? 0 : 50), 0);

  const categoryBreakdown = results.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = { success: 0, total: 0 };
    acc[r.category].total++;
    if (!r.hasError) acc[r.category].success++;
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center mb-6 md:mb-10">
        <div className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-3 md:mb-6 ${percentage >= 80 ? 'bg-green-500/20' : percentage >= 50 ? 'bg-yellow-500/20' : 'bg-red-500/20'}`}>
          <Trophy className={percentage >= 80 ? 'text-green-400' : percentage >= 50 ? 'text-yellow-400' : 'text-red-400'} size={32} />
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">Challenge Complete!</h2>
        <p className="text-gray-400 text-sm">{percentage >= 80 ? 'Outstanding work!' : percentage >= 50 ? 'Good effort!' : 'Keep practicing!'}</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
        <div className="glass-card p-3 md:p-5 text-center">
          <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase mb-1">Completed</p>
          <p className="text-xl md:text-3xl font-bold text-white">{successCount}/{total}</p>
          <p className="text-[10px] md:text-xs text-gray-500 mt-1">{percentage}%</p>
        </div>
        <div className="glass-card p-3 md:p-5 text-center">
          <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase mb-1">XP Earned</p>
          <p className="text-xl md:text-3xl font-bold text-primary">+{xp}</p>
        </div>
        <div className="glass-card p-3 md:p-5 text-center">
          <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase mb-1">Errors</p>
          <p className="text-xl md:text-3xl font-bold text-red-400">{results.filter(r => r.hasError).length}</p>
        </div>
      </div>

      {Object.keys(categoryBreakdown).length > 0 && (
        <div className="glass-card p-5 mb-8">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(categoryBreakdown).map(([cat, data]) => (
              <div key={cat} className="flex items-center justify-between">
                <span className={`text-sm font-medium ${CAT_COLORS[cat] || 'text-gray-300'}`}>{cat}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(data.success / data.total) * 100}%` }} />
                  </div>
                  <span className="text-xs text-gray-400 w-12 text-right">{data.success}/{data.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button onClick={() => setReviewMode(!reviewMode)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 min-h-[48px] rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border border-white/10">
          <Terminal size={20} /> {reviewMode ? 'Hide Review' : 'Review Snippets'}
        </button>
        <button onClick={onRestart} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 min-h-[48px] rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border border-white/10">
          <RotateCcw size={20} /> Try Again
        </button>
      </div>

      <AnimatePresence>
        {reviewMode && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="space-y-3 mb-8">
              {results.map((r, i) => (
                <div key={i} className={`glass-card p-4 border-l-4 ${r.hasError ? 'border-l-red-500' : 'border-l-green-500'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-500">#{i + 1}</span>
                      <span className="text-sm font-bold text-white">{r.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${CAT_BG[r.category]}`}>{r.category}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${DIFF_BG[r.difficulty]}`}>{r.difficulty}</span>
                      {r.hasError ? <X size={14} className="text-red-400" /> : <Check size={14} className="text-green-400" />}
                    </div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 font-mono text-xs text-gray-400 mb-2 overflow-x-auto whitespace-pre">{r.code}</div>
                  <p className="text-xs text-gray-500">{r.output || 'No output'}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActiveChallenge({ snippets, currentIndex, results, onRun, onNext, isRunning, setIsRunning, showExit, setShowExit }) {
  const current = snippets[currentIndex];
  const [code, setCode] = useState(current?.code || '');
  const [output, setOutput] = useState([]);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('editor');
  const currentResult = results[currentIndex];

  const runCode = useCallback(() => {
    setIsRunning(true);
    if (window.innerWidth < 1024) setActiveTab('output');
    const logs = [];
    const customConsole = {
      log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '))
    };
    setTimeout(() => {
      try {
        const res = new Function('console', code)(customConsole);
        setOutput(logs);
        setResult(res);
        onRun(currentIndex, false, logs, res);
      } catch (error) {
        setOutput([...logs, `Error: ${error.message}`]);
        setResult(null);
        onRun(currentIndex, true, [...logs, `Error: ${error.message}`], null);
      }
      setIsRunning(false);
    }, 300);
  }, [code, currentIndex, onRun]);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runCode(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [runCode]);

  const lineCount = useMemo(() => code.split('\n').length, [code]);
  const isCompleted = currentResult !== undefined;
  const hasError = currentResult?.hasError;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setShowExit(true)} className="flex items-center gap-2 px-3 py-2 min-h-[44px] bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
          <ArrowLeft size={16} /> Exit
        </button>
        <div className="flex items-center gap-4">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${CAT_BG[current?.category]}`}>{current?.category}</span>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${DIFF_BG[current?.difficulty]}`}>{current?.difficulty}</span>
          <span className="text-sm font-bold text-gray-400">{currentIndex + 1}/{snippets.length}</span>
        </div>
      </div>

      {/* Progress Strip */}
      <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-2">
        {snippets.map((s, i) => {
          const r = results[i];
          let bg = 'bg-white/10';
          if (i === currentIndex) bg = 'bg-primary shadow-lg shadow-primary/30';
          else if (r !== undefined) bg = r.hasError ? 'bg-red-500/30' : 'bg-green-500/30';
          return (
            <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all ${bg} ${i === currentIndex ? 'text-white scale-110' : 'text-gray-400'}`}>
              {i + 1}
            </div>
          );
        })}
      </div>

      {/* Mobile tab bar */}
      <div className="flex lg:hidden gap-2 mb-3">
        <button onClick={() => setActiveTab('editor')} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-primary text-white' : 'bg-white/5 text-gray-400'}`}>
          <Code size={14} className="inline mr-1" /> Editor
        </button>
        <button onClick={() => setActiveTab('output')} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'output' ? 'bg-primary text-white' : 'bg-white/5 text-gray-400'}`}>
          <Terminal size={14} className="inline mr-1" /> Output
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Editor */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`glass-card flex flex-col overflow-hidden ${activeTab !== 'editor' ? 'hidden lg:flex' : ''}`}>
          <div className="p-3 bg-black/40 border-b border-white/10 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Code size={12} /> {current?.name}</span>
            <span className="text-primary">Editable</span>
          </div>
          <div className="flex-1 flex overflow-hidden">
            <div className="w-10 bg-black/30 border-r border-white/5 py-4 px-1.5 text-right text-[11px] text-gray-600 font-mono select-none">
              {Array.from({ length: lineCount }, (_, i) => <div key={i} className="leading-[1.625rem]">{i + 1}</div>)}
            </div>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck="false" className="flex-1 w-full bg-transparent p-4 text-primary-200 font-mono text-sm focus:outline-none resize-none custom-scrollbar leading-relaxed" />
          </div>
          <div className="p-3 bg-black/40 border-t border-white/10 flex gap-3">
            <button onClick={runCode} disabled={isRunning} className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 min-h-[44px] rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              {isRunning ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Running...</>) : (<><Play size={16} className="fill-current" /> Run</>)}
            </button>
            {isCompleted && (
              <button onClick={onNext} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 min-h-[44px] rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-white/10">
                {currentIndex + 1 < snippets.length ? (<>Next <ChevronRight size={16} /></>) : (<>Finish <Trophy size={16} /></>)}
              </button>
            )}
          </div>
        </motion.div>

        {/* Output */}
        <div className={`glass-card flex flex-col overflow-hidden ${activeTab !== 'output' ? 'hidden lg:flex' : ''}`}>
          <div className="p-3 bg-black/40 border-b border-white/10 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Terminal size={12} /> Output</span>
            {isCompleted && (
              <span className={`flex items-center gap-1 ${hasError ? 'text-red-400' : 'text-green-400'}`}>
                {hasError ? <><X size={12} /> Error</> : <><Check size={12} /> Success</>}
              </span>
            )}
          </div>
          <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar space-y-1.5 bg-black/20">
            {output.length === 0 && !isRunning && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Terminal size={32} className="text-gray-700 mb-3" />
                <p className="text-gray-600 text-sm">Run the code to complete this snippet</p>
                <p className="text-gray-700 text-xs mt-1">Ctrl + Enter</p>
              </div>
            )}
            {isRunning && (
              <div className="flex items-center gap-2 text-primary">
                <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                <span className="text-sm">Executing...</span>
              </div>
            )}
            {output.map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="text-gray-300 border-l-2 border-primary/30 pl-3 py-0.5">{line}</motion.div>
            ))}
            {result !== null && (
              <div className="mt-3 pt-3 border-t border-white/5 flex items-start gap-2">
                <Sparkles className="text-yellow-400 mt-0.5 shrink-0" size={14} />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Return</p>
                  <p className="text-primary font-bold">{String(result)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ExitConfirm isOpen={showExit} onStay={() => setShowExit(false)} onExit={() => window.location.href = '/dashboard'} />
    </div>
  );
}

export default function CodeLab() {
  const [mode, setMode] = useState('sandbox');
  const [settings, setSettings] = useState({ category: 'all', difficulty: 'all', count: '5' });
  const [challengeSnippets, setChallengeSnippets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState({});
  const [isLaunching, setIsLaunching] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showChallengeResults, setShowChallengeResults] = useState(false);

  const [sandboxCode, setSandboxCode] = useState(SNIPPETS[0].code);
  const [sandboxOutput, setSandboxOutput] = useState([]);
  const [sandboxResult, setSandboxResult] = useState(null);
  const [sandboxCopied, setSandboxCopied] = useState(false);
  const [sandboxCategory, setSandboxCategory] = useState('All');
  const [sandboxHistory, setSandboxHistory] = useState([]);

  const CATEGORIES = useMemo(() => ['All', ...new Set(SNIPPETS.map(s => s.category))], []);
  const filteredSnippets = useMemo(() => sandboxCategory === 'All' ? SNIPPETS : SNIPPETS.filter(s => s.category === sandboxCategory), [sandboxCategory]);
  const snippetCounts = useMemo(() => { const c = {}; SNIPPETS.forEach(s => { c[s.category] = (c[s.category] || 0) + 1; }); return c; }, []);

  const startChallenge = () => {
    setIsLaunching(true);
    setTimeout(() => {
      let pool = [...SNIPPETS];
      if (settings.category !== 'all') pool = pool.filter(s => s.category === settings.category);
      if (settings.difficulty !== 'all') pool = pool.filter(s => s.difficulty === settings.difficulty);
      const shuffled = pool.sort(() => Math.random() - 0.5);
      const count = settings.count === 'all' ? shuffled.length : parseInt(settings.count);
      setChallengeSnippets(shuffled.slice(0, count));
      setCurrentIndex(0);
      setResults({});
      setShowChallengeResults(false);
      setMode('challenge');
      setIsLaunching(false);
    }, 500);
  };

  const handleChallengeRun = (index, hasError, logs, res) => {
    setResults(prev => ({ ...prev, [index]: { hasError, output: [...logs, res !== null ? `Return: ${String(res)}` : ''].filter(Boolean).join('\n'), code: challengeSnippets[index].code, name: challengeSnippets[index].name, category: challengeSnippets[index].category, difficulty: challengeSnippets[index].difficulty } }));
  };

  const handleNextSnippet = () => {
    if (currentIndex + 1 < challengeSnippets.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowChallengeResults(true);
    }
  };

  const handleRestartChallenge = () => {
    startChallenge();
  };

  const formatCode = (code, setCode) => {
    const lines = code.split('\n');
    let indent = 0;
    const formatted = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) indent = Math.max(0, indent - 1);
      const r = '  '.repeat(indent) + trimmed;
      if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) indent++;
      return r;
    });
    setCode(formatted.join('\n'));
  };

  const sandboxRun = useCallback(() => {
    const logs = [];
    const customConsole = { log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')) };
    try {
      const res = new Function('console', sandboxCode)(customConsole);
      setSandboxOutput(logs);
      setSandboxResult(res);
      setSandboxHistory(prev => [{ code: sandboxCode.substring(0, 60) + '...', output: [...logs, res !== null ? `Return: ${String(res)}` : ''].filter(Boolean).join('\n'), ts: new Date().toLocaleTimeString(), err: false }, ...prev].slice(0, 8));
    } catch (error) {
      setSandboxOutput([...logs, `Error: ${error.message}`]);
      setSandboxResult(null);
      setSandboxHistory(prev => [{ code: sandboxCode.substring(0, 60) + '...', output: `Error: ${error.message}`, ts: new Date().toLocaleTimeString(), err: true }, ...prev].slice(0, 8));
    }
  }, [sandboxCode]);

  if (mode === 'challenge' && !showChallengeResults) {
    return (
      <DashboardLayout>
        <div className="p-4 md:p-6">
          <ActiveChallenge key={currentIndex} snippets={challengeSnippets} currentIndex={currentIndex} results={results} onRun={handleChallengeRun} onNext={handleNextSnippet} isRunning={isRunning} setIsRunning={setIsRunning} showExit={showExit} setShowExit={setShowExit} />
        </div>
      </DashboardLayout>
    );
  }

  if (showChallengeResults) {
    const resultsArray = Object.entries(results).map(([idx, r]) => ({ ...r, index: parseInt(idx) })).sort((a, b) => a.index - b.index);
    return (
      <DashboardLayout>
        <div className="p-4 md:p-6">
          <ChallengeResults results={resultsArray} onRestart={handleRestartChallenge} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Code className="text-primary" size={28} /> Code Lab
            </h1>
            <p className="text-gray-400 mt-1">
              {SNIPPETS.length} snippets across {CATEGORIES.length - 1} categories
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setMode('challenge-settings')} className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2.5 rounded-xl text-sm font-bold transition-all border border-primary/20 flex items-center gap-2">
              <Zap size={16} /> Challenge Mode
            </button>
          </div>
        </div>

        {mode === 'challenge-settings' && (
          <ChallengeSettings settings={settings} setSettings={setSettings} onStart={startChallenge} isLaunching={isLaunching} />
        )}

        {mode === 'sandbox' && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <select
                value={sandboxCategory}
                onChange={(e) => setSandboxCategory(e.target.value)}
                className="flex-1 md:flex-none bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-primary/50 appearance-none cursor-pointer min-h-[44px]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
              >
                {CATEGORIES.map(c => {
                  const count = c === 'All' ? SNIPPETS.length : (snippetCounts[c] || 0);
                  return <option key={c} value={c}>{c} ({count})</option>;
                })}
              </select>
              <button onClick={sandboxRun} className="bg-primary hover:bg-primary/90 text-white px-4 md:px-6 py-2.5 min-h-[44px] rounded-xl font-bold transition-all shadow-lg shadow-primary/30 flex items-center gap-2">
                <Play size={16} className="fill-current" /> Run
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1 min-h-0 pb-6">
              <div className="xl:col-span-1 space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 custom-scrollbar">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 mb-3 sticky top-0 bg-[#0a0a0a] py-2 z-10">Snippets ({filteredSnippets.length})</h3>
                {filteredSnippets.map((s, i) => (
                  <button key={i} onClick={() => { setSandboxCode(s.code); setSandboxOutput([]); setSandboxResult(null); }} className={`w-full p-3 rounded-xl border text-left transition-all ${sandboxCode === s.code ? 'bg-primary/10 border-primary/50 shadow-lg shadow-primary/5' : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/5'}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-bold ${sandboxCode === s.code ? 'text-primary' : 'text-gray-300'}`}>{s.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${CAT_BG[s.category]}`}>{s.category}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${DIFF_BG[s.difficulty]}`}>{s.difficulty}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-5 h-full">
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass-card flex flex-col overflow-hidden">
                  <div className="p-3 bg-black/40 border-b border-white/10 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Code size={12} /> script.js</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => formatCode(sandboxCode, setSandboxCode)} className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors"><Wand2 size={12} /> Format</button>
                      <span className="text-primary">Editable</span>
                    </div>
                  </div>
                  <div className="flex-1 flex overflow-hidden">
                    <div className="w-10 bg-black/30 border-r border-white/5 py-4 px-1.5 text-right text-[11px] text-gray-600 font-mono select-none">
                      {Array.from({ length: sandboxCode.split('\n').length }, (_, i) => <div key={i} className="leading-[1.625rem]">{i + 1}</div>)}
                    </div>
                    <textarea value={sandboxCode} onChange={(e) => setSandboxCode(e.target.value)} spellCheck="false" className="flex-1 w-full bg-transparent p-4 text-primary-200 font-mono text-sm focus:outline-none resize-none custom-scrollbar leading-relaxed" />
                  </div>
                </motion.div>

                <div className="flex flex-col gap-5 h-full">
                  <div className="glass-card flex-1 flex flex-col overflow-hidden">
                    <div className="p-3 bg-black/40 border-b border-white/10 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      <span className="flex items-center gap-2"><Terminal size={12} /> Output</span>
                      {sandboxOutput.length > 0 && (
                        <button onClick={() => { navigator.clipboard.writeText([...sandboxOutput, sandboxResult !== null ? `Return: ${String(sandboxResult)}` : ''].filter(Boolean).join('\n')); setSandboxCopied(true); setTimeout(() => setSandboxCopied(false), 2000); }} className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors">
                          {sandboxCopied ? <><Check size={12} className="text-green-400" /> Copied!</> : <><Copy size={12} /> Copy</>}
                        </button>
                      )}
                    </div>
                    <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar space-y-1.5 bg-black/20">
                      {sandboxOutput.length === 0 && !sandboxResult && (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <Terminal size={32} className="text-gray-700 mb-3" />
                          <p className="text-gray-600 text-sm">No output yet</p>
                          <p className="text-gray-700 text-xs mt-1">Click Run or Ctrl+Enter</p>
                        </div>
                      )}
                      {sandboxOutput.map((line, i) => <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-gray-300 border-l-2 border-primary/30 pl-3 py-0.5">{line}</motion.div>)}
                      {sandboxResult !== null && (
                        <div className="mt-3 pt-3 border-t border-white/5 flex items-start gap-2">
                          <Sparkles className="text-yellow-400 mt-0.5 shrink-0" size={14} />
                          <div><p className="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Return</p><p className="text-primary font-bold">{String(sandboxResult)}</p></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {sandboxHistory.length > 0 && (
                    <div className="glass-card p-4 max-h-36 overflow-y-auto custom-scrollbar">
                      <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Recent Runs</h4>
                      <div className="space-y-1.5">
                        {sandboxHistory.map((h, i) => (
                          <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${h.err ? 'bg-red-400' : 'bg-green-400'}`} />
                              <span className="text-gray-500">{h.ts}</span>
                              <span className="text-gray-600 truncate max-w-[200px]">{h.code}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
